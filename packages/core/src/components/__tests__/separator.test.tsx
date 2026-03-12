import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "../separator";

describe("Separator", () => {
  it("renders a separator", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("is horizontal by default", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "vertical");
  });

  it("forwards className", () => {
    render(<Separator className="my-sep" />);
    expect(screen.getByRole("separator")).toHaveClass("my-sep");
  });
});
