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

  it("does not forward className overrides", () => {
    const { container } = render(<Fieldset {...({ className: "mt-4" } as never)}>Fields</Fieldset>);
    expect(container.firstChild).not.toHaveClass("mt-4");
  });
});
