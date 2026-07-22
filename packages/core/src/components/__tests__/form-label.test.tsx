import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormLabel } from "../form-label";

describe("FormLabel", () => {
  it("renders label text", () => {
    render(<FormLabel htmlFor="email">Email address</FormLabel>);
    expect(screen.getByText("Email address")).toBeInTheDocument();
  });

  it("associates with input via htmlFor", () => {
    render(
      <>
        <FormLabel htmlFor="name">Name</FormLabel>
        <input id="name" />
      </>
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("does not forward className overrides", () => {
    render(<FormLabel {...({ className: "required" } as never)}>Field</FormLabel>);
    expect(screen.getByText("Field")).not.toHaveClass("required");
  });

  it("renders a disabled label without forwarding the disabled attribute", () => {
    render(<FormLabel htmlFor="x" disabled>Disabled Field</FormLabel>);
    const label = screen.getByText("Disabled Field");
    expect(label).toBeInTheDocument();
    expect(label).not.toHaveAttribute("disabled");
  });
});
