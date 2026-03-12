import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "../spinner";

describe("Spinner", () => {
  it("renders without crashing", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<Spinner className="text-red-500" />);
    expect(container.firstChild).toHaveClass("text-red-500");
  });
});
