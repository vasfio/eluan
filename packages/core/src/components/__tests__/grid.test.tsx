import * as React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { breakpoints } from "@eluan/tokens";
import { Grid } from "../grid";

// Token mapping is checked relationally (see stack.test.tsx): StyleX class
// names are hashed, so no test pins one.
const classesOf = (ui: React.ReactElement) => {
  const { container, unmount } = render(ui);
  const classes = [...(container.firstElementChild as HTMLElement).classList].sort().join(" ");
  unmount();
  return classes;
};

const styleOf = (ui: React.ReactElement) => {
  const { container, unmount } = render(ui);
  const style = (container.firstElementChild as HTMLElement).getAttribute("style");
  unmount();
  return style;
};

const spacing = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;
const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

describe("Grid", () => {
  it("renders a div with its children", () => {
    render(<Grid>Content</Grid>);
    expect(screen.getByText("Content").tagName).toBe("DIV");
  });

  it("carries the class hook that gives children min-width: 0", () => {
    render(<Grid>Content</Grid>);
    expect(screen.getByText("Content")).toHaveClass("eluan-grid");
  });

  it("honours the `as` override", () => {
    render(
      <Grid as="ul" cols={2}>
        <li>One</li>
      </Grid>,
    );
    expect(screen.getByRole("list").tagName).toBe("UL");
  });

  it("renders the child element with asChild", () => {
    render(
      <Grid asChild cols={3}>
        <section aria-label="Stats">Content</section>
      </Grid>,
    );
    const el = screen.getByRole("region", { name: "Stats" });
    expect(el).toHaveClass("eluan-grid");
    expect([...el.classList].sort().join(" ")).toBe(classesOf(<Grid cols={3} />));
  });

  it("forwards refs and attributes", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Grid ref={ref} aria-label="Cards" role="list" data-testid="cards">
        Content
      </Grid>,
    );
    expect(ref.current).toBe(screen.getByRole("list", { name: "Cards" }));
    expect(ref.current).toHaveAttribute("data-testid", "cards");
  });

  it("drops className and style", () => {
    const props = { className: "override", style: { color: "red" } } as Record<string, unknown>;
    render(<Grid {...props}>Content</Grid>);
    const el = screen.getByText("Content");
    expect(el).not.toHaveClass("override");
    expect(el).not.toHaveAttribute("style");
  });

  it("defaults the gap to md", () => {
    expect(classesOf(<Grid />)).toBe(classesOf(<Grid gap="md" />));
  });

  it("maps every spacing token to its own gap", () => {
    expect(new Set(spacing.map((gap) => classesOf(<Grid gap={gap} />))).size).toBe(spacing.length);
  });

  it("gives every count a static style, at every level", () => {
    const levels = ["base", ...Object.keys(breakpoints)] as const;
    const seen = new Set<string>();
    for (const level of levels) {
      for (const n of counts) {
        const ui = <Grid cols={{ [level]: n }} />;
        expect(styleOf(ui)).toBeNull();
        seen.add(classesOf(ui));
      }
    }
    expect(seen.size).toBe(levels.length * counts.length);
  });

  it("treats a bare count as the base level", () => {
    expect(classesOf(<Grid cols={3} />)).toBe(classesOf(<Grid cols={{ base: 3 }} />));
  });

  it("adds one style per breakpoint level", () => {
    const base = classesOf(<Grid cols={2} />).split(" ");
    const responsive = classesOf(<Grid cols={{ base: 2, m: 3, l: 4 }} />).split(" ");
    // Each level's custom property replaces its default, so the class count holds.
    expect(responsive).toHaveLength(base.length);
    expect(responsive.filter((c) => !base.includes(c))).toHaveLength(2);
  });

  it("passes a raw template through as a custom property", () => {
    const style = styleOf(<Grid cols={{ base: 1, l: "auto minmax(0, 1fr)" }} />);
    expect(style).toContain("auto minmax(0, 1fr)");
    expect(styleOf(<Grid cols="200px 1fr" />)).toContain("200px 1fr");
  });

  it("falls back to a template for a count outside 1–12", () => {
    expect(styleOf(<Grid cols={16 as 12} />)).toContain("repeat(16, minmax(0, 1fr))");
  });

  it("uses the breakpoint widths from @eluan/tokens", () => {
    // StyleX compiles the media queries ahead of time, so they're literals in
    // grid.tsx; this keeps them in step with the tokens.
    const source = readFileSync(join(__dirname, "../grid.tsx"), "utf8");
    const queries = [...source.matchAll(/"@media \(min-width: (\d+)px\)": "var\(--eluan-grid-cols-([a-z0-9]+)\)"/g)];
    expect(Object.fromEntries(queries.map(([, px, name]) => [name, Number(px)]))).toEqual(breakpoints);
  });
});
