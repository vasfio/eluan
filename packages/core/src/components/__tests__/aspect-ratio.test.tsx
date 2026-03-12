import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AspectRatio } from "../aspect-ratio";

describe("AspectRatio", () => {
  it("renders children", () => {
    render(<AspectRatio ratio={16 / 9}><img src="x.jpg" alt="test" /></AspectRatio>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<AspectRatio className="overflow-hidden" ratio={1}><div /></AspectRatio>);
    expect(container.firstChild).toHaveClass("overflow-hidden");
  });
});
