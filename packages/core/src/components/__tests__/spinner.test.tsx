import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "../spinner";

describe("Spinner", () => {
  it("renders without crashing", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("does not forward className overrides", () => {
    const { container } = render(
      <Spinner {...({ className: "text-red-500" } as never)} />
    );
    expect(container.firstChild).not.toHaveClass("text-red-500");
  });
});
