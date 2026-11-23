import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Row } from "../row";

// Token mapping is checked relationally (see stack.test.tsx): StyleX class
// names are hashed, so no test pins one.
const classesOf = (ui: React.ReactElement) => {
  const { container, unmount } = render(ui);
  const classes = [...(container.firstElementChild as HTMLElement).classList].sort().join(" ");
  unmount();
  return classes;
};

const spacing = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

describe("Row", () => {
  it("renders a div with its children", () => {
    render(<Row>Content</Row>);
    expect(screen.getByText("Content").tagName).toBe("DIV");
  });

  it("honours the `as` override", () => {
    render(
      <ul>
        <Row as="li">Item</Row>
      </ul>,
    );
    expect(screen.getByRole("listitem")).toHaveTextContent("Item");
  });

  it("renders the child element with asChild", () => {
    render(
      <Row asChild gap="sm">
        <a href="/profile">Profile</a>
      </Row>,
    );
    const link = screen.getByRole("link", { name: "Profile" });
    expect(link).toHaveAttribute("href", "/profile");
    expect([...link.classList].sort().join(" ")).toBe(classesOf(<Row gap="sm" />));
  });

  it("forwards refs", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Row ref={ref}>Content</Row>);
    expect(ref.current).toBe(screen.getByText("Content"));
  });

  it("forwards aria and data attributes", () => {
    render(
      <Row aria-label="Actions" data-testid="actions" role="toolbar">
        Content
      </Row>,
    );
    const el = screen.getByRole("toolbar", { name: "Actions" });
    expect(el).toHaveAttribute("data-testid", "actions");
  });

  it("drops className and style", () => {
    const props = { className: "override", style: { color: "red" } } as Record<string, unknown>;
    render(<Row {...props}>Content</Row>);
    const el = screen.getByText("Content");
    expect(el).not.toHaveClass("override");
    expect(el).not.toHaveAttribute("style");
  });

  it("defaults to gap md, centred", () => {
    expect(classesOf(<Row />)).toBe(classesOf(<Row gap="md" align="center" />));
  });

  it("maps every spacing token to its own style", () => {
    expect(new Set(spacing.map((gap) => classesOf(<Row gap={gap} />))).size).toBe(spacing.length);
  });

  it("adds wrap and inline as their own styles", () => {
    const base = classesOf(<Row />).split(" ");
    const wrapped = classesOf(<Row wrap />).split(" ");
    expect(wrapped).toHaveLength(base.length + 1);
    expect(classesOf(<Row inline />)).not.toBe(classesOf(<Row />));
    expect(classesOf(<Row wrap={false} inline={false} />)).toBe(classesOf(<Row />));
  });

  it("takes the box props", () => {
    expect(classesOf(<Row pad="sm" padX="lg" />)).toBe(classesOf(<Row padY="sm" padX="lg" />));
    expect(classesOf(<Row grow />)).not.toBe(classesOf(<Row />));
  });

  it("takes the flex, height, position and overflow props", () => {
    const base = classesOf(<Row />).split(" ");
    const styled = classesOf(<Row shrink={false} height="full" overflow="auto" position="relative" />).split(" ");
    expect(styled).toHaveLength(base.length + 4);
    render(
      <Row shrink={false} height="screen" inset="bottom" overflow="hidden">
        Content
      </Row>,
    );
    const el = screen.getByText("Content");
    for (const attr of ["shrink", "height", "inset", "overflow"]) expect(el).not.toHaveAttribute(attr);
  });
});
