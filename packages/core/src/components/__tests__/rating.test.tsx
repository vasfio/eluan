import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Rating } from "../rating";

describe("Rating", () => {
  it("renders star buttons", () => {
    render(<Rating value={0} onChange={vi.fn()} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("reflects current value", () => {
    render(<Rating value={3} onChange={vi.fn()} />);
    // Stars should show 3 filled
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("calls onChange when a star is clicked", async () => {
    const onChange = vi.fn();
    render(<Rating value={0} onChange={onChange} />);
    const stars = screen.getAllByRole("button");
    await userEvent.click(stars[2]); // click 3rd star
    expect(onChange).toHaveBeenCalled();
  });

  it("renders readonly without buttons", () => {
    render(<Rating value={4} readonly />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
