import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AspectRatio } from "../aspect-ratio";

describe("AspectRatio", () => {
  it("renders children", () => {
    render(<AspectRatio ratio={16 / 9}><img src="x.jpg" alt="test" /></AspectRatio>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("does not forward className overrides", () => {
    const { container } = render(
      <AspectRatio {...({ className: "custom-aspect" } as never)} ratio={1} data-testid="ar"><div /></AspectRatio>
    );
    expect(container.querySelector(".custom-aspect")).toBeNull();
  });
});
