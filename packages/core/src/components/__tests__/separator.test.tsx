import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "../separator";

// `Separator` defaults to `decorative={true}`, so Radix renders it without a
// `role="separator"`. Pass `decorative={false}` when asserting on the role.
describe("Separator", () => {
  it("renders a separator (semantic)", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("is horizontal by default", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders vertical orientation", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "vertical");
  });

  it("forwards className", () => {
    const { container } = render(<Separator className="my-sep" />);
    expect(container.querySelector(".my-sep")).not.toBeNull();
  });
});
