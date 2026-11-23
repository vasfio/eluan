import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Icon } from "../icon";

// Token mapping is checked relationally (see stack.test.tsx): StyleX class
// names are hashed, so no test pins one.
const classesOf = (ui: React.ReactElement) => {
  const { container, unmount } = render(ui);
  const classes = [...(container.firstElementChild as HTMLElement).classList].sort().join(" ");
  unmount();
  return classes;
};

const Glyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
    <path d="M4 12h16" />
  </svg>
);

const sizes = ["xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

describe("Icon", () => {
  it("wraps the svg in a span with the class hook that sizes it", () => {
    render(
      <Icon data-testid="icon">
        <Glyph />
      </Icon>,
    );
    const el = screen.getByTestId("icon");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("eluan-icon");
    expect(el.querySelector("svg")).not.toBeNull();
  });

  it("is decorative by default", () => {
    render(
      <Icon data-testid="icon">
        <Glyph />
      </Icon>,
    );
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("can carry meaning when asked", () => {
    render(
      <Icon aria-hidden={false} role="img" aria-label="Warning">
        <Glyph />
      </Icon>,
    );
    expect(screen.getByRole("img", { name: "Warning" })).not.toHaveAttribute("aria-hidden", "true");
  });

  it("sizes the svg itself with asChild", () => {
    const { container } = render(
      <Icon asChild size="sm">
        <Glyph />
      </Icon>,
    );
    const svg = container.firstElementChild as SVGElement;
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("eluan-icon");
  });

  it("forwards refs", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <Icon ref={ref} data-testid="icon">
        <Glyph />
      </Icon>,
    );
    expect(ref.current).toBe(screen.getByTestId("icon"));
  });

  it("drops className and style", () => {
    const props = { className: "override", style: { color: "red" } } as Record<string, unknown>;
    render(
      <Icon {...props} data-testid="icon">
        <Glyph />
      </Icon>,
    );
    const el = screen.getByTestId("icon");
    expect(el).not.toHaveClass("override");
    expect(el).not.toHaveAttribute("style");
  });

  it("defaults to size xs", () => {
    expect(classesOf(<Icon />)).toBe(classesOf(<Icon size="xs" />));
  });

  it("maps every size token to its own style", () => {
    expect(new Set(sizes.map((size) => classesOf(<Icon size={size} />))).size).toBe(sizes.length);
  });

  it("adds a trailing gap with after", () => {
    expect(classesOf(<Icon after="sm" />).split(" ")).toHaveLength(classesOf(<Icon />).split(" ").length + 1);
    expect(classesOf(<Icon after="sm" />)).not.toBe(classesOf(<Icon after="md" />));
  });

  it("inherits the text colour by default", () => {
    expect(classesOf(<Icon />)).toBe(classesOf(<Icon tone="inherit" />));
  });

  it("gives every other tone its own colour", () => {
    const tones = ["default", "muted", "inverse", "positive", "destructive", "interactive", "interactive-muted"] as const;
    const base = classesOf(<Icon />).split(" ").length;
    const toned = tones.map((tone) => classesOf(<Icon tone={tone} />));
    expect(toned.every((classes) => classes.split(" ").length === base + 1)).toBe(true);
    expect(new Set(toned).size).toBe(tones.length);
  });
});
