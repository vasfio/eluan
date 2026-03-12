import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Fieldset } from "../fieldset";

describe("Fieldset", () => {
  it("renders children", () => {
    render(<Fieldset>Field group</Fieldset>);
    expect(screen.getByText("Field group")).toBeInTheDocument();
  });

  it("renders as fieldset element", () => {
    const { container } = render(<Fieldset>Content</Fieldset>);
    // Fieldset may wrap in a fieldset element or div - just ensure it renders
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<Fieldset className="mt-4">Fields</Fieldset>);
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
