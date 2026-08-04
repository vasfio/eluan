import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Typography } from "../typography";

// StyleX class names are hashed and change on any refactor, so nothing here
// asserts on them. The stable surface is the rendered element (which carries
// the document semantics) plus text content and forwarded attributes.

describe("Typography", () => {
  it("renders a <p> with the body variant by default", () => {
    render(<Typography>Copy</Typography>);

    const el = screen.getByText("Copy");
    expect(el.tagName).toBe("P");
  });

  it("maps each variant to its default element", () => {
    const cases = [
      ["display", "H1"],
      ["title", "H2"],
      ["heading", "H3"],
      ["subheading", "H4"],
      ["lead", "P"],
      ["body", "P"],
      ["label", "SPAN"],
      ["caption", "SPAN"],
    ] as const;

    for (const [variant, tag] of cases) {
      const { unmount } = render(<Typography variant={variant}>{variant}</Typography>);
      expect(screen.getByText(variant).tagName).toBe(tag);
      unmount();
    }
  });

  it("gives display/title/heading/subheading real heading roles", () => {
    render(
      <>
        <Typography variant="display">One</Typography>
        <Typography variant="title">Two</Typography>
        <Typography variant="heading">Three</Typography>
        <Typography variant="subheading">Four</Typography>
      </>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("One");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Two");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Three");
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Four");
  });

  it("honours the `as` override without changing the variant", () => {
    render(
      <Typography variant="display" as="span">
        Big but inline
      </Typography>,
    );

    const el = screen.getByText("Big but inline");
    expect(el.tagName).toBe("SPAN");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("supports every element in the `as` union", () => {
    const tags = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "div",
      "blockquote",
      "figcaption",
    ] as const;

    for (const tag of tags) {
      const { unmount } = render(<Typography as={tag}>{tag}</Typography>);
      expect(screen.getByText(tag).tagName).toBe(tag.toUpperCase());
      unmount();
    }
  });

  it("renders the child element with asChild", () => {
    render(
      <Typography variant="heading" asChild>
        <a href="/docs">Docs</a>
      </Typography>,
    );

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("accepts a step override on any variant", () => {
    render(
      <Typography variant="caption" step="6">
        Loud caption
      </Typography>,
    );

    // Still the caption's element/semantics — only the typeset rung changed.
    expect(screen.getByText("Loud caption").tagName).toBe("SPAN");
  });

  it("renders each tone", () => {
    const { rerender } = render(<Typography tone="default">Tone</Typography>);
    expect(screen.getByText("Tone")).toBeInTheDocument();

    rerender(<Typography tone="muted">Tone</Typography>);
    expect(screen.getByText("Tone")).toBeInTheDocument();

    rerender(<Typography tone="inverse">Tone</Typography>);
    expect(screen.getByText("Tone")).toBeInTheDocument();
  });

  it("renders each weight and family", () => {
    const { rerender } = render(
      <Typography weight="normal" family="body">
        Weighted
      </Typography>,
    );
    expect(screen.getByText("Weighted")).toBeInTheDocument();

    rerender(
      <Typography weight="medium" family="mono">
        Weighted
      </Typography>,
    );
    expect(screen.getByText("Weighted")).toBeInTheDocument();

    rerender(
      <Typography weight="medium" family="heading">
        Weighted
      </Typography>,
    );
    expect(screen.getByText("Weighted")).toBeInTheDocument();
  });

  it("renders each alignment and truncates", () => {
    const { rerender } = render(<Typography align="center">Aligned</Typography>);
    expect(screen.getByText("Aligned")).toBeInTheDocument();

    rerender(<Typography align="end">Aligned</Typography>);
    expect(screen.getByText("Aligned")).toBeInTheDocument();

    rerender(<Typography truncate>Aligned</Typography>);
    expect(screen.getByText("Aligned")).toBeInTheDocument();
  });

  it("forwards arbitrary attributes and refs", () => {
    let node: HTMLElement | null = null;

    render(
      <Typography
        ref={(el) => {
          node = el;
        }}
        id="intro"
        data-testid="typo"
        lang="en"
      >
        Intro
      </Typography>,
    );

    const el = screen.getByTestId("typo");
    expect(el).toHaveAttribute("id", "intro");
    expect(el).toHaveAttribute("lang", "en");
    expect(node).toBe(el);
  });

  it("does not forward className or style overrides", () => {
    render(
      <Typography
        data-testid="typo"
        {...({ className: "custom-class", style: { color: "red" } } as never)}
      >
        Locked
      </Typography>,
    );

    const el = screen.getByTestId("typo");
    expect(el).not.toHaveClass("custom-class");
    expect(el.style.color).toBe("");
  });
});
