import "@eluan/core/styles.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Banner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeBlock,
  EluanProvider,
  SegmentedControl,
  SegmentedControlItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@eluan/core";
import type { Mode } from "./fixtures";
import {
  CRITERIA,
  RUN_DATE,
  SIDES,
  TASKS,
  compiles,
  log,
  navigation,
  score,
  source,
  total,
  typecheck,
  type Side,
  type Task,
} from "./data";

const NAV_NOTES: Record<string, string> = {
  t03: "Read a few files it didn't use, such as toast.md and empty-states.md.",
  t15: "The router row \"Search, filter or run a command\" sent it to search-input.md first.",
};

const column = (gap: string) => ({ display: "flex", flexDirection: "column", gap }) as const;
const row = (gap: string) => ({ display: "flex", alignItems: "center", gap }) as const;

const scoreVariant = (n: number) => (n === 2 ? "positive" : n === 1 ? "caution" : "destructive");

function useFrameHeights() {
  const [heights, setHeights] = React.useState<Record<string, number>>({});
  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; run?: string; mode?: string; height?: number };
      if (data?.type !== "eval-frame-height" || !data.run) return;
      setHeights((current) => ({ ...current, [`${data.run}:${data.mode}`]: data.height ?? 0 }));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  return heights;
}

function Summary() {
  const sums = { a: 0, b: 0 };
  let nav = 0;
  let compileA = 0;
  let compileB = 0;
  for (const task of TASKS) {
    sums.a += total(score(task.id, "a"));
    sums.b += total(score(task.id, "b"));
    nav += navigation(task.id);
    if (compiles(`${task.id}-a`)) compileA++;
    if (compiles(`${task.id}-b`)) compileB++;
  }
  const stats = [
    { label: "With skill", value: `${sums.b} / 120`, note: "Blind-scored tokens, reuse, choice and accessibility" },
    { label: "Docs only", value: `${sums.a} / 120`, note: "Same tasks with only the docs site and README" },
    { label: "Navigation", value: `${nav} / 30`, note: "With skill: read the router, then only the right files" },
    { label: "Compiles", value: `${compileB} vs ${compileA} of 15`, note: "Typechecked against the real @eluan/core" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, calc(var(--size-4xl) * 2)), 1fr))", gap: "var(--spacing-md)" }}>
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle>{stat.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="caption" tone="muted">{stat.note}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TaskList({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <nav aria-label="Tasks" style={column("var(--spacing-xxs)")}>
      {TASKS.map((task) => {
        const a = total(score(task.id, "a"));
        const b = total(score(task.id, "b"));
        const current = task.id === selected;
        return (
          <Button
            key={task.id}
            variant={current ? "secondary" : "ghost"}
            align="start"
            fullWidth
            aria-current={current ? "page" : undefined}
            title={`${task.id} ${task.title}`}
            onClick={() => onSelect(task.id)}
          >
            <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", textAlign: "start" }}>
              {task.id} {task.title}
            </span>
            <span style={{ flexShrink: 0 }} aria-label={`docs only ${a}, with skill ${b}, out of 8`}>
              {a} → {b}
            </span>
          </Button>
        );
      })}
    </nav>
  );
}

function ScoreCell({ value, max = 2, note }: { value: number; max?: number; note?: string }) {
  return (
    <div style={column("var(--spacing-xxs)")}>
      <span>
        <Badge variant={scoreVariant(Math.round((value / max) * 2))}>
          {value} / {max}
        </Badge>
      </span>
      {note && <Typography variant="caption" tone="muted">{note}</Typography>}
    </div>
  );
}

function Scores({ task }: { task: Task }) {
  const a = score(task.id, "a");
  const b = score(task.id, "b");
  const nav = navigation(task.id);
  return (
    <Table aria-label={`Scores for ${task.id}`}>
      <TableHeader>
        <TableRow>
          <TableHead>Criterion</TableHead>
          <TableHead>{SIDES.a}</TableHead>
          <TableHead>{SIDES.b}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {CRITERIA.map((c) => (
          <TableRow key={c.key}>
            <TableCell>{c.label}</TableCell>
            <TableCell><ScoreCell value={a[c.key]} note={a.notes[c.key]} /></TableCell>
            <TableCell><ScoreCell value={b[c.key]} note={b.notes[c.key]} /></TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Navigation</TableCell>
          <TableCell><Typography variant="caption" tone="muted">Not scored (no skill to navigate)</Typography></TableCell>
          <TableCell><ScoreCell value={nav} note={NAV_NOTES[task.id] ?? "Read the router, then only files it used."} /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Typecheck</TableCell>
          {(["a", "b"] as Side[]).map((side) => (
            <TableCell key={side}>
              <Badge variant={compiles(`${task.id}-${side}`) ? "positive" : "destructive"}>
                {compiles(`${task.id}-${side}`) ? "Compiles" : "Type error"}
              </Badge>
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell><ScoreCell value={total(a)} max={8} /></TableCell>
          <TableCell><ScoreCell value={total(b)} max={8} /></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function RunPanel({ task, side, mode, height }: { task: Task; side: Side; mode: Mode; height?: number }) {
  const run = `${task.id}-${side}`;
  return (
    <Card>
      <CardHeader>
        <div style={{ ...row("var(--spacing-sm)"), justifyContent: "space-between" }}>
          <CardTitle>{SIDES[side]}</CardTitle>
          <Badge variant={scoreVariant(Math.round((total(score(task.id, side)) / 8) * 2))}>
            {total(score(task.id, side))} / 8
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div style={column("var(--spacing-md)")}>
          <iframe
            key={`${run}:${mode}`}
            src={`frame.html?run=${run}&mode=${mode}`}
            title={`${SIDES[side]} output for ${task.title}`}
            style={{
              width: "100%",
              height: `max(calc(var(--size-4xl) * 4), ${height ?? 0}px)`,
              border: "1px solid var(--container-border)",
              borderRadius: "var(--curves-md)",
              background: "var(--container-bg)",
            }}
          />
          <Accordion type="multiple">
            <AccordionItem value="source">
              <AccordionTrigger>Source</AccordionTrigger>
              <AccordionContent>
                <CodeBlock code={source(run)} language="tsx" filename={`${run}.tsx`} showLineNumbers />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="log">
              <AccordionTrigger>Files read and open questions</AccordionTrigger>
              <AccordionContent>
                <CodeBlock code={log(run)} filename={`${run}.log.md`} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="typecheck">
              <AccordionTrigger>Typecheck output</AccordionTrigger>
              <AccordionContent>
                <CodeBlock code={typecheck(run)} filename={`typecheck/${run}.txt`} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}

type Layout = "side" | "stack";

function TaskDetail({ task, mode, layout, heights }: { task: Task; mode: Mode; layout: Layout; heights: Record<string, number> }) {
  return (
    <section aria-labelledby="task-heading" style={column("var(--spacing-xl)")}>
      <div style={column("var(--spacing-xs)")}>
        <Typography as="h2" id="task-heading" variant="heading">
          {task.id} · {task.title}
        </Typography>
        <Typography variant="lead">“{task.prompt}”</Typography>
        <Typography variant="caption" tone="muted">A correct answer chooses: {task.tests}.</Typography>
      </div>
      <Scores task={task} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            layout === "stack" ? "minmax(0, 1fr)" : "repeat(auto-fit, minmax(min(100%, calc(var(--size-4xl) * 3)), 1fr))",
          gap: "var(--spacing-lg)",
        }}
      >
        {(["a", "b"] as Side[]).map((side) => (
          <RunPanel key={side} task={task} side={side} mode={mode} height={heights[`${task.id}-${side}:${mode}`]} />
        ))}
      </div>
    </section>
  );
}

const initialTask = () => {
  const id = window.location.hash.slice(1);
  return TASKS.some((task) => task.id === id) ? id : TASKS[0].id;
};

function App() {
  const [taskId, setTaskId] = React.useState(initialTask);
  const [mode, setMode] = React.useState<Mode>("light");
  const [layout, setLayout] = React.useState<Layout>("side");
  const heights = useFrameHeights();
  const task = TASKS.find((t) => t.id === taskId)!;

  React.useEffect(() => {
    const onHash = () => setTaskId(initialTask());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <main style={{ ...column("var(--spacing-xl)"), padding: "var(--spacing-xl)" }}>
      <div style={{ ...row("var(--spacing-lg)"), justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={column("var(--spacing-xxs)")}>
          <Typography as="h1" variant="title">Skill evals</Typography>
          <Typography tone="muted">
            Run {RUN_DATE}: 15 tasks, each built twice, by an agent with only the docs (A) and one with the skill (B).
          </Typography>
        </div>
        <div style={{ ...row("var(--spacing-lg)"), flexWrap: "wrap" }}>
          <div style={row("var(--spacing-sm)")}>
            <Typography variant="label" id="layout-label">Layout</Typography>
            <SegmentedControl value={layout} onValueChange={(value) => setLayout(value as Layout)} aria-labelledby="layout-label">
              <SegmentedControlItem value="side">Side by side</SegmentedControlItem>
              <SegmentedControlItem value="stack">Stacked</SegmentedControlItem>
            </SegmentedControl>
          </div>
          <div style={row("var(--spacing-sm)")}>
            <Typography variant="label" id="mode-label">Render in</Typography>
            <SegmentedControl value={mode} onValueChange={(value) => setMode(value as Mode)} aria-labelledby="mode-label">
              <SegmentedControlItem value="light">Light</SegmentedControlItem>
              <SegmentedControlItem value="dim">Dim</SegmentedControlItem>
              <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
            </SegmentedControl>
          </div>
        </div>
      </div>
      <Summary />
      <Banner variant="caution" position="inline" role="status">
        The skill's examples mirror 10 of these 15 prompts, so these scores show it on tasks it was written for. A held-out
        set is still needed to show it generalises.
      </Banner>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 4fr)", gap: "var(--spacing-xl)", alignItems: "start" }}>
        <TaskList
          selected={taskId}
          onSelect={(id) => {
            window.location.hash = id;
            setTaskId(id);
          }}
        />
        <TaskDetail task={task} mode={mode} layout={layout} heights={heights} />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <EluanProvider persist={false}>
    <App />
  </EluanProvider>,
);
