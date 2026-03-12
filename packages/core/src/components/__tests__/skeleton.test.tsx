import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<Skeleton className="w-32 h-4" />);
    expect(container.firstChild).toHaveClass("w-32", "h-4");
  });

  it("applies animate-pulse class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });
});
