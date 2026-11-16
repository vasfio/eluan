import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Box } from "../box";

// Token mapping is checked relationally (see stack.test.tsx): StyleX class
// names are hashed, so no test pins one.
const classesOf = (ui: React.ReactElement) => {
  const { container, unmount } = render(ui);
  const classes = [...(container.firstElementChild as HTMLElement).classList].sort().join(" ");
  unmount();
  return classes;
};

const spacing = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

describe("Box", () => {
  it("renders a plain div with no styles of its own", () => {
    render(<Box>Content</Box>);
    const el = screen.getByText("Content");
    expect(el.tagName).toBe("DIV");
    expect(el.classList).toHaveLength(0);
  });

  it("honours the `as` override", () => {
    render(<Box as="span">Inline</Box>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });

  it("renders the child element with asChild", () => {
    render(
      <Box asChild pad="md">
        <button type="button">Go</button>
      </Box>,
    );
    const button = screen.getByRole("button", { name: "Go" });
    expect([...button.classList].sort().join(" ")).toBe(classesOf(<Box pad="md" />));
  });

  it("forwards refs", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Box ref={ref}>Content</Box>);
    expect(ref.current).toBe(screen.getByText("Content"));
  });

  it("forwards aria and data attributes", () => {
    render(
      <Box aria-live="polite" data-state="idle">
        Content
      </Box>,
    );
    const el = screen.getByText("Content");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(el).toHaveAttribute("data-state", "idle");
  });

  it("drops className and style", () => {
    const props = { className: "override", style: { color: "red" } } as Record<string, unknown>;
    render(<Box {...props}>Content</Box>);
    const el = screen.getByText("Content");
    expect(el).not.toHaveClass("override");
    expect(el).not.toHaveAttribute("style");
  });

  it("maps every spacing token to its own padding", () => {
    expect(new Set(spacing.map((pad) => classesOf(<Box pad={pad} />))).size).toBe(spacing.length);
  });

  it("pads both axes with pad, one axis with padX or padY", () => {
    expect(classesOf(<Box pad="lg" />).split(" ")).toHaveLength(2);
    expect(classesOf(<Box padX="lg" />).split(" ")).toHaveLength(1);
    expect(classesOf(<Box padY="lg" />).split(" ")).toHaveLength(1);
    expect(classesOf(<Box padX="lg" />)).not.toBe(classesOf(<Box padY="lg" />));
  });

  it("lets padX and padY override pad", () => {
    expect(classesOf(<Box pad="sm" padX="lg" />)).toBe(classesOf(<Box padY="sm" padX="lg" />));
    expect(classesOf(<Box pad="sm" padY="none" />)).toBe(classesOf(<Box padX="sm" padY="none" />));
  });

  it("adds the grow style", () => {
    expect(classesOf(<Box grow />)).not.toBe("");
    expect(classesOf(<Box grow={false} />)).toBe("");
  });

  describe("flex, height, position and overflow", () => {
    const layoutAttrs = ["shrink", "height", "minheight", "position", "inset", "overflow"];

    it("holds its size with shrink={false}, and shrink restores it", () => {
      expect(classesOf(<Box shrink={false} />).split(" ")).toHaveLength(1);
      expect(classesOf(<Box shrink={false} />)).not.toBe(classesOf(<Box shrink />));
    });

    it("lets a growing box keep its share with shrink={false}", () => {
      const grow = classesOf(<Box grow />).split(" ");
      const held = classesOf(<Box grow shrink={false} />).split(" ");
      expect(held).toHaveLength(grow.length);
      expect(held).toContain(classesOf(<Box shrink={false} />));
    });

    it("maps every height and minHeight value to its own style", () => {
      const sized = [
        <Box height="full" />,
        <Box height="screen" />,
        <Box minHeight="full" />,
        <Box minHeight="screen" />,
      ].map(classesOf);
      expect(sized.every((classes) => classes !== "")).toBe(true);
      expect(new Set(sized).size).toBe(sized.length);
    });

    it("maps every position, inset and overflow value to its own style", () => {
      const placed = [
        <Box position="relative" />,
        <Box position="absolute" />,
        <Box inset="fill" />,
        <Box inset="top" />,
        <Box inset="bottom" />,
        <Box overflow="hidden" />,
        <Box overflow="auto" />,
      ].map(classesOf);
      expect(placed.every((classes) => classes !== "")).toBe(true);
      expect(new Set(placed).size).toBe(placed.length);
    });

    it("positions an inset box absolutely", () => {
      const absolute = classesOf(<Box position="absolute" />);
      for (const inset of ["fill", "top", "bottom"] as const) {
        expect(classesOf(<Box inset={inset} />).split(" ")).toContain(absolute);
      }
    });

    it("lets an explicit position win over the one inset implies", () => {
      const fill = classesOf(<Box inset="fill" />).split(" ");
      const relative = classesOf(<Box inset="fill" position="relative" />).split(" ");
      expect(relative).toHaveLength(fill.length);
      expect(relative).toContain(classesOf(<Box position="relative" />));
      expect(relative).not.toContain(classesOf(<Box position="absolute" />));
    });

    it("keeps the layout props off the element", () => {
      render(
        <Box shrink={false} height="screen" minHeight="full" position="relative" inset="fill" overflow="auto">
          Content
        </Box>,
      );
      const el = screen.getByText("Content");
      for (const attr of layoutAttrs) expect(el).not.toHaveAttribute(attr);
    });
  });
});
