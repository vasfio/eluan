import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("does not forward className overrides", () => {
    const { container } = render(
      <Skeleton {...({ className: "w-32 h-4" } as never)} />
    );
    expect(container.firstChild).not.toHaveClass("w-32", "h-4");
  });

  it("applies generated styles", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("class");
  });
});
