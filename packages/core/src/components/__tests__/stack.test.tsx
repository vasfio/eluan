import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stack } from "../stack";

// StyleX class names are hashed, so nothing here pins one. Token mapping is
// checked relationally instead: the same props give the same classes, a
// different token gives different ones, and defaults match their explicit
// values. (The real CSS values are checked in Storybook.)
const classesOf = (ui: React.ReactElement) => {
  const { container, unmount } = render(ui);
  const classes = [...(container.firstElementChild as HTMLElement).classList].sort().join(" ");
  unmount();
  return classes;
};

const spacing = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

describe("Stack", () => {
  it("renders a div with its children", () => {
    render(<Stack>Content</Stack>);
    expect(screen.getByText("Content").tagName).toBe("DIV");
  });

  it("honours the `as` override", () => {
    render(
      <Stack as="section" aria-label="Settings">
        Content
      </Stack>,
    );
    expect(screen.getByRole("region", { name: "Settings" }).tagName).toBe("SECTION");
  });

  it("renders the child element with asChild", () => {
    render(
      <Stack asChild gap="lg">
        <form aria-label="Sign in">Content</form>
      </Stack>,
    );
    const form = screen.getByRole("form", { name: "Sign in" });
    expect(form.tagName).toBe("FORM");
    // The layout styles land on the child itself.
    expect([...form.classList].sort().join(" ")).toBe(classesOf(<Stack gap="lg" />));
  });

  it("forwards refs", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Stack ref={ref}>Content</Stack>);
    expect(ref.current).toBe(screen.getByText("Content"));
  });

  it("forwards aria and data attributes", () => {
    render(
      <Stack aria-label="Steps" data-testid="steps" role="list">
        Content
      </Stack>,
    );
    const el = screen.getByTestId("steps");
    expect(el).toHaveAttribute("aria-label", "Steps");
    expect(el).toHaveAttribute("role", "list");
  });

  it("drops className and style", () => {
    const props = { className: "override", style: { color: "red" } } as Record<string, unknown>;
    render(<Stack {...props}>Content</Stack>);
    const el = screen.getByText("Content");
    expect(el).not.toHaveClass("override");
    expect(el).not.toHaveAttribute("style");
  });

  it("emits no inline styles", () => {
    render(
      <Stack gap="xl" pad="lg" align="center" justify="between" grow>
        Content
      </Stack>,
    );
    expect(screen.getByText("Content")).not.toHaveAttribute("style");
  });

  it("defaults the gap to md", () => {
    expect(classesOf(<Stack />)).toBe(classesOf(<Stack gap="md" />));
  });

  it("maps every spacing token to its own style", () => {
    const seen = new Set(spacing.map((gap) => classesOf(<Stack gap={gap} />)));
    expect(seen.size).toBe(spacing.length);
  });

  it("maps every alignment to its own style", () => {
    const align = ["start", "center", "end", "stretch", "baseline"] as const;
    const justify = ["start", "center", "end", "between"] as const;
    expect(new Set(align.map((a) => classesOf(<Stack align={a} />))).size).toBe(align.length);
    expect(new Set(justify.map((j) => classesOf(<Stack justify={j} />))).size).toBe(justify.length);
  });

  it("lets padX and padY override pad per axis", () => {
    expect(classesOf(<Stack pad="sm" padX="lg" />)).toBe(classesOf(<Stack padY="sm" padX="lg" />));
    expect(classesOf(<Stack pad="sm" padY="lg" />)).toBe(classesOf(<Stack padX="sm" padY="lg" />));
    expect(classesOf(<Stack pad="sm" />)).toBe(classesOf(<Stack padX="sm" padY="sm" />));
  });

  it("takes the flex, height, position and overflow props", () => {
    const base = classesOf(<Stack />).split(" ");
    const styled = classesOf(<Stack shrink={false} height="full" overflow="auto" position="relative" />).split(" ");
    expect(styled).toHaveLength(base.length + 4);
    render(
      <Stack shrink={false} height="screen" inset="bottom" overflow="hidden">
        Content
      </Stack>,
    );
    const el = screen.getByText("Content");
    for (const attr of ["shrink", "height", "inset", "overflow"]) expect(el).not.toHaveAttribute(attr);
  });
});
