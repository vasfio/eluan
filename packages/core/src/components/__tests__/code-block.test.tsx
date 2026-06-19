import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CodeBlock } from "../code-block";

describe("CodeBlock", () => {
  it("renders code content", () => {
    // Prism splits highlighted code into multiple <span>s, so a string match
    // won't work — check the rendered <code> element's textContent instead.
    const { container } = render(<CodeBlock code="const x = 1;" language="typescript" />);
    expect(container.querySelector("code")?.textContent).toContain("const x = 1");
  });

  it("does not forward className overrides", () => {
    const { container } = render(
      <CodeBlock
        {...({ className: "custom" } as never)}
        code="console.log()"
        language="javascript"
      />
    );
    expect(container.querySelector(".custom")).toBeNull();
  });
});
