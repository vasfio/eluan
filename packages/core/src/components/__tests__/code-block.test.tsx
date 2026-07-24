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

  it("escapes raw code in the default (text) branch instead of injecting markup", () => {
    // Regression: the "text" language and missing-grammar fallbacks route the
    // raw `code` prop into dangerouslySetInnerHTML. It must be HTML-escaped so a
    // payload cannot inject live elements. See code-block.tsx escapeHtml().
    const payload = '<img src=x onerror=alert(1)>';
    const { container } = render(<CodeBlock code={payload} />);

    // No element was injected from the payload...
    expect(container.querySelector("img")).toBeNull();
    // ...but the literal text is still shown to the reader.
    expect(container.querySelector("code")?.textContent).toContain(payload);
  });

  it("does not inject a script element from malicious code", () => {
    const { container } = render(
      <CodeBlock code={'</code><script>alert(document.cookie)</script>'} />
    );
    expect(container.querySelector("script")).toBeNull();
  });
});
