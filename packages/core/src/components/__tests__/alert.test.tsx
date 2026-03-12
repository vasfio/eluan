import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Alert, AlertTitle, AlertDescription } from "../alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByText("Alert content")).toBeInTheDocument();
  });

  it("renders an alert role", () => {
    render(<Alert role="alert">Warning</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    const { container } = render(<Alert>Default</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies destructive variant class", () => {
    const { container } = render(<Alert variant="destructive">Error</Alert>);
    expect(container.firstChild).toHaveClass("text-destructive");
  });

  it("renders AlertTitle and AlertDescription", () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description text</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<Alert className="custom">Content</Alert>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
