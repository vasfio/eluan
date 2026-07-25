import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Kbd, KbdGroup, Shortcut, formatKey, KEY_SYMBOLS } from "../kbd";

describe("Kbd", () => {
  it("renders children inside a <kbd> element", () => {
    render(<Kbd>Esc</Kbd>);
    const el = screen.getByText("Esc");
    expect(el.tagName).toBe("KBD");
  });

  it("renders symbols and a separator for a combined key string", () => {
    render(<Kbd keys="cmd+k" />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("accepts keys as an array", () => {
    render(<Kbd keys={["shift", "enter"]} />);
    expect(screen.getByText("⇧")).toBeInTheDocument();
    expect(screen.getByText("↵")).toBeInTheDocument();
  });

  it("renders variants and sizes without error", () => {
    const { rerender } = render(
      <Kbd variant="outline" size="lg">
        A
      </Kbd>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    rerender(
      <Kbd variant="ghost" size="sm">
        A
      </Kbd>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});

describe("KbdGroup", () => {
  it("groups multiple keycaps", () => {
    render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Alt</Kbd>
        <Kbd>Del</Kbd>
      </KbdGroup>
    );
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
    expect(screen.getByText("Del")).toBeInTheDocument();
  });
});

describe("Shortcut", () => {
  it("renders the keys for a named shortcut", () => {
    render(<Shortcut shortcut="save" />);
    // Both mac (⌘) and non-mac (⌃) platforms include the "S" key.
    expect(screen.getByText("S")).toBeInTheDocument();
  });
});

describe("kbd helpers", () => {
  it("formatKey maps known keys to symbols and uppercases the rest", () => {
    expect(formatKey("cmd")).toBe(KEY_SYMBOLS.cmd);
    expect(formatKey("enter")).toBe("↵");
    expect(formatKey("g")).toBe("G");
  });
});
