import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CodeBlock } from "../code-block";

describe("CodeBlock", () => {
  it("renders code content", () => {
    render(<CodeBlock code="const x = 1;" language="typescript" />);
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(
      <CodeBlock code="console.log()" language="javascript" className="custom" />
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
