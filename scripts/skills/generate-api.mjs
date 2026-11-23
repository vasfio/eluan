#!/usr/bin/env node
// Reconciles the API tables between <!-- api:start --> and <!-- api:end --> in
// skills/eluan/components/*.md with the real prop types of @eluan/core, using
// the TypeScript compiler on packages/core/src.
//
// Per table (a "### Part" heading names the component; no heading means the
// file's frontmatter `name`):
// - every prop named in a row must exist on the component's props; unknown
//   props are reported, and a row whose props are all unknown is dropped
// - Type and Default cells are regenerated for props Eluan declares itself
//   (defaults come from the component's parameter destructuring)
// - props Eluan declares that no row mentions are added, described from JSDoc
// - descriptions, Radix/HTML props and `...props` rows are kept as written
//
// Usage: node scripts/skills/generate-api.mjs [--check] [--verbose]

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import ts from "typescript";

const CHECK = process.argv.includes("--check");
const VERBOSE = process.argv.includes("--verbose");
const COMPONENTS = "skills/eluan/components";
const CORE = resolve("packages/core");
const OWN = `${CORE}/src/`;

// ---------- TypeScript program ----------

const configPath = join(CORE, "tsconfig.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, CORE);
const program = ts.createProgram([join(CORE, "src/index.ts")], { ...parsed.options, noEmit: true });
const checker = program.getTypeChecker();
const indexFile = program.getSourceFile(join(CORE, "src/index.ts"));
const exportsByName = new Map(
  checker.getExportsOfModule(checker.getSymbolAtLocation(indexFile)).map((s) => [s.name, s]),
);

const realSymbol = (s) => (s.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(s) : s);
const isOwn = (sym) => (sym.declarations ?? []).some((d) => d.getSourceFile().fileName.startsWith(OWN));

function propsTypeOf(name) {
  const exp = exportsByName.get(name);
  if (!exp) return null;
  const sym = realSymbol(exp);
  if (sym.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias) && !(sym.flags & ts.SymbolFlags.Value)) {
    return checker.getDeclaredTypeOfSymbol(sym); // a props-like interface such as ActionPopoverItem
  }
  const decl = sym.valueDeclaration ?? sym.declarations?.[0];
  if (!decl) return null;
  const sig = checker.getTypeOfSymbolAtLocation(sym, decl).getCallSignatures()[0];
  const param = sig?.parameters[0];
  return param ? checker.getTypeOfSymbolAtLocation(param, decl) : null;
}

// Properties of a props type, merged across union members.
function propsOf(type) {
  const out = new Map();
  for (const t of type.isUnion() ? type.types : [type]) {
    for (const p of checker.getPropertiesOfType(checker.getApparentType(t))) if (!out.has(p.name)) out.set(p.name, p);
  }
  return out;
}

const squash = (s) => s.replace(/\s+/g, " ").replace(/^\| /, "").replace(/;\s*}/g, " }").trim();

// The literal union a local alias stands for, following aliases of aliases
// (type TypographyTone = Tone; type Tone = "default" | …), or null.
function literalUnion(node) {
  if (!ts.isTypeReferenceNode(node)) return null;
  const sym = checker.getSymbolAtLocation(node.typeName);
  const decl = sym && realSymbol(sym).declarations?.find(ts.isTypeAliasDeclaration);
  if (!decl || !decl.getSourceFile().fileName.startsWith(OWN)) return null;
  if (ts.isUnionTypeNode(decl.type) && decl.type.types.every((m) => ts.isLiteralTypeNode(m))) {
    return squash(decl.type.getText());
  }
  return literalUnion(decl.type);
}

// A local alias of a literal union (type ButtonVariant = "default" | …) expands to its
// members in source order; anything else keeps the name the author wrote.
function expandAlias(node) {
  const union = literalUnion(node);
  if (union) return union;
  if (ts.isUnionTypeNode(node)) return node.types.map(expandAlias).join(" | ");
  return squash(node.getText());
}

const ownDecl = (prop) =>
  (prop.declarations ?? []).find((d) => d.getSourceFile().fileName.startsWith(OWN)) ?? prop.valueDeclaration ?? prop.declarations?.[0];

// The checker's fully resolved type text, without the `| undefined` of optional props.
function resolvedText(prop) {
  const decl = ownDecl(prop);
  const t = checker.getTypeOfSymbolAtLocation(prop, decl);
  const flags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias;
  // unions are spelled member by member so a top-level alias expands
  const members = t.isUnion() ? t.types : [t];
  let s = members.map((m) => checker.typeToString(m, undefined, flags)).join(" | ");
  s = s.replace(/\bfalse \| true\b|\btrue \| false\b/g, "boolean");
  if (prop.flags & ts.SymbolFlags.Optional) s = s.replace(/ \| undefined\b/g, "").replace(/^undefined \| /, "");
  return s.replace(/^\((.*)\)$/, "$1");
}

// Ways to spell a prop's type: as written in source (multi-line types via the checker,
// so object members keep their separators), with local literal unions expanded, and
// fully resolved. The first is what gets written.
function typeSpellings(prop) {
  const decl = ownDecl(prop);
  const out = [];
  if (decl?.type) {
    const written = decl.type.getText();
    if (written.includes("\n")) {
      out.push(checker.typeToString(checker.getTypeFromTypeNode(decl.type), undefined, ts.TypeFormatFlags.NoTruncation));
    } else {
      out.push(expandAlias(decl.type), squash(written));
    }
  }
  out.push(resolvedText(prop));
  return out;
}

// Same meaning, different spelling: compares the sorted words and brackets of each
// spelling, so union order, member order, `React.` prefixes, `| undefined` on optional
// members and separators don't count as changes.
const sameType = (a, b) => {
  const words = (s) =>
    (s.replace(/\\\|/g, "|").replace(/\bReact\./g, "").match(/[\w"'$-]+|\[\]|=>|\?/g) ?? [])
      .filter((w) => w !== "undefined")
      .sort()
      .join(" ");
  return words(a) === words(b);
};

const doc = (prop) => ts.displayPartsToString(prop.getDocumentationComment(checker)).replace(/\s+/g, " ").trim();

// Defaults from the first destructured parameter of the component function.
function defaultsOf(name, seen = new Set()) {
  const exp = exportsByName.get(name);
  if (!exp || seen.has(name)) return new Map();
  seen.add(name);
  const decl = realSymbol(exp).valueDeclaration;
  const out = new Map();
  if (!decl) return out;
  // const FormLabel = Label → follow the alias
  if (ts.isVariableDeclaration(decl) && decl.initializer && ts.isIdentifier(decl.initializer)) {
    return defaultsOf(decl.initializer.text, seen);
  }
  let fn = null;
  const find = (node) => {
    if (fn) return;
    if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node)) &&
        node.parameters[0] && ts.isObjectBindingPattern(node.parameters[0].name)) {
      fn = node;
      return;
    }
    ts.forEachChild(node, find);
  };
  find(decl);
  for (const el of fn?.parameters[0].name.elements ?? []) {
    if (el.initializer && !el.dotDotDotToken) {
      const key = (el.propertyName ?? el.name).getText();
      let init = el.initializer;
      if (ts.isIdentifier(init)) {
        const c = checker.getSymbolAtLocation(init)?.valueDeclaration;
        if (c && ts.isVariableDeclaration(c) && c.initializer && c.initializer.getText().length <= 40) init = c.initializer;
      }
      out.set(key, init.getText().replace(/\s+/g, " ").replace(/ as const$/, ""));
    }
  }
  return out;
}

// ---------- Markdown ----------

// Escape backslashes first, so a `\` already in the text can't cancel the pipe escape.
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
const code = (s) => (s.includes("`") ? `\`\` ${esc(s)} \`\`` : `\`${esc(s)}\``);
const splitRow = (line) => line.replace(/^\|/, "").replace(/\|\s*$/, "").split(/(?<!\\)\|/).map((c) => c.trim());
const rowNames = (cell) => [...cell.matchAll(/`([A-Za-z_$][\w$-]*)`/g)].map((m) => m[1]);
const row = (cells) => `| ${cells.join(" | ")} |`.replace(/\|  \|/g, "| |");
const frontmatterName = (text) => text.match(/^name:\s*(.+)$/m)?.[1].trim();

const report = { files: 0, changed: [], unknown: [], dropped: [], added: [], updated: 0, unresolved: [] };

function reconcileTable(file, targets, lines) {
  const resolved = targets.map((t) => ({ name: t, type: propsTypeOf(t) })).filter((t) => t.type);
  if (!resolved.length) {
    report.unresolved.push(`${file}: ${targets.join(", ")}`);
    return lines;
  }
  const props = new Map();
  for (const t of resolved) for (const [k, v] of propsOf(t.type)) if (!props.has(k)) props.set(k, v);
  const single = resolved.length === 1 && targets.length === 1 ? resolved[0] : null;
  const defaults = single ? defaultsOf(single.name) : new Map();

  const out = [];
  const mentioned = new Set();
  let spreadIndex = -1;
  for (const line of lines) {
    if (!line.startsWith("| ") || line.startsWith("| Prop") || line.startsWith("| ---")) {
      out.push(line);
      continue;
    }
    const cells = splitRow(line);
    const first = cells[0] ?? "";
    if (first.includes("...")) {
      spreadIndex = out.length;
      out.push(line);
      continue;
    }
    const names = rowNames(first);
    if (!names.length) {
      out.push(line);
      continue;
    }
    names.forEach((n) => mentioned.add(n));
    // data-* attributes are valid on any element without being in the props type
    const unknown = names.filter((n) => !props.has(n) && !n.startsWith("data-"));
    for (const n of unknown) report.unknown.push(`${file}: ${targets.join(", ")} has no prop \`${n}\``);
    if (unknown.length === names.length) {
      report.dropped.push(`${file}: ${first}`);
      continue;
    }
    if (names.length === 1 && cells.length >= 4) {
      const prop = props.get(names[0]);
      if (prop && isOwn(prop)) {
        const spellings = typeSpellings(prop);
        const keep = spellings.some((s) => sameType(cells[1], s) || cells[1].startsWith(code(s)));
        const t = keep ? cells[1] : code(spellings[0]);
        const gd = defaults.has(names[0]) ? code(defaults.get(names[0])) : null;
        // keep an annotated default ("`320` (px)") when it starts with the real value
        // a default that's only an identifier (defaultFilterFn) says less than a written description
        const named = gd !== null && /^`[A-Za-z_$][\w$]*`$/.test(gd) && !/^`(true|false|null|undefined)`$/.test(gd);
        // an empty object default ({}) means "see the effective defaults" a written cell may spell out
        const empty = gd === "`{}`";
        const d = gd === null || cells[2].startsWith(gd) || ((named || empty) && cells[2]) ? cells[2] : gd;
        const next = row([cells[0], t, d, ...cells.slice(3)]);
        if (next !== line) report.updated++;
        out.push(next);
        continue;
      }
    }
    out.push(line);
  }

  // Add only props declared directly in the component's own props type, so variants
  // that extend a sibling's props (CurrencyInputProps extends DecimalInputProps)
  // aren't flooded with inherited rows; helpers (lowercase names) get none.
  if (single && /^[A-Z]/.test(single.name)) {
    // forwardRef props arrive as `XProps & RefAttributes<…>`; find the *Props member
    const members = single.type.isIntersection() ? single.type.types : [single.type];
    const typeName = members
      .map((m) => (m.aliasSymbol ?? m.getSymbol())?.name)
      .find((n) => n && /Props$/.test(n));
    const declaredHere = (p) =>
      !typeName ||
      (p.declarations ?? []).some((d) => {
        const owner = ts.isTypeLiteralNode(d.parent) ? d.parent.parent : d.parent;
        return owner?.name?.getText?.() === typeName;
      });
    const missing = [...props.values()].filter(
      (p) => isOwn(p) && declaredHere(p) && !mentioned.has(p.name) && p.name !== "ref",
    );
    const rows = missing.map((p) => {
      report.added.push(`${file}: ${single.name}.${p.name}`);
      const d = defaults.has(p.name) ? code(defaults.get(p.name)) : "";
      return row([`\`${p.name}\``, code(typeSpellings(p)[0]), d, esc(doc(p)) || "<!-- REVIEW: undocumented prop, added by generate-api -->"]);
    });
    if (rows.length) {
      const at = spreadIndex !== -1 ? spreadIndex : out.findLastIndex((l) => l.startsWith("| ")) + 1;
      out.splice(at, 0, ...rows);
    }
  }
  return out;
}

function reconcileBlock(file, name, block) {
  // Split into sections at "### " headings; the first section belongs to the frontmatter name.
  const lines = block.split("\n");
  const out = [];
  let targets = [name];
  let buf = [];
  const flush = () => {
    out.push(...(buf.some((l) => l.startsWith("| Prop")) ? reconcileTable(file, targets, buf) : buf));
    buf = [];
  };
  for (const line of lines) {
    const h = line.match(/^### (.+)$/);
    if (h) {
      flush();
      out.push(line);
      targets = [...h[1].matchAll(/[A-Za-z_$][\w$]*/g)].map((m) => m[0]).filter((w) => exportsByName.has(w));
      if (!targets.length) targets = [h[1].trim()];
      continue;
    }
    buf.push(line);
  }
  flush();
  return out.join("\n");
}

for (const f of readdirSync(COMPONENTS).filter((f) => f.endsWith(".md")).sort()) {
  const p = join(COMPONENTS, f);
  const text = readFileSync(p, "utf8");
  const s = text.indexOf("<!-- api:start -->");
  const e = text.indexOf("<!-- api:end -->");
  if (s === -1 || e === -1) continue;
  report.files++;
  const head = s + "<!-- api:start -->".length;
  const next = text.slice(0, head) + reconcileBlock(p, frontmatterName(text), text.slice(head, e)) + text.slice(e);
  if (next !== text) {
    report.changed.push(p);
    if (!CHECK) writeFileSync(p, next);
  }
}

const list = (title, items) => items.length && console.log(`${title} (${items.length})${VERBOSE || CHECK ? "\n  " + items.join("\n  ") : ""}`);
console.log(`${report.files} files, ${report.changed.length} ${CHECK ? "stale" : "changed"}, ${report.updated} cells regenerated`);
list("unknown props", report.unknown);
list("rows dropped", report.dropped);
list("props added", report.added);
list("tables not resolved to an export", report.unresolved);
if (CHECK && (report.changed.length || report.unknown.length)) process.exit(1);
