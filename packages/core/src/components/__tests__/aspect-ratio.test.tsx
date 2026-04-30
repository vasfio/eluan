import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AspectRatio } from "../aspect-ratio";

describe("AspectRatio", () => {
  it("renders children", () => {
    render(<AspectRatio ratio={16 / 9}><img src="x.jpg" alt="test" /></AspectRatio>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("forwards className", () => {
    // Radix AspectRatio.Root wraps in an outer positioned div + an inner
    // styled div — className is applied to the inner element.
    const { container } = render(
      <AspectRatio className="custom-aspect" ratio={1} data-testid="ar"><div /></AspectRatio>
    );
    expect(container.querySelector(".custom-aspect")).not.toBeNull();
  });
});
