import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CodeBlock } from "../code-block";

describe("CodeBlock", () => {
  it("renders code content", () => {
    render(<CodeBlock language="typescript">const x = 1;</CodeBlock>);
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(
      <CodeBlock language="javascript" className="custom">console.log()</CodeBlock>
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
