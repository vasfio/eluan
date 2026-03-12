import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant class", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toHaveClass("bg-primary");
  });

  it("applies secondary variant", () => {
    render(<Badge variant="secondary">Beta</Badge>);
    expect(screen.getByText("Beta")).toHaveClass("bg-secondary");
  });

  it("applies destructive variant", () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toHaveClass("bg-destructive");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">Draft</Badge>);
    expect(screen.getByText("Draft")).toHaveClass("text-foreground");
  });

  it("forwards className", () => {
    render(<Badge className="custom-class">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("custom-class");
  });
});
