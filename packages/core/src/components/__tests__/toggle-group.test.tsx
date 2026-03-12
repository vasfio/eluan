import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";

describe("ToggleGroup", () => {
  it("renders all items", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByRole("button", { name: "A" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "B" })).toBeInTheDocument();
  });

  it("selects item on click (single)", async () => {
    const handler = vi.fn();
    render(
      <ToggleGroup type="single" onValueChange={handler}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
    await userEvent.click(screen.getByRole("button", { name: "Left" }));
    expect(handler).toHaveBeenCalledWith("left");
  });

  it("allows multiple selections in multiple type", async () => {
    const handler = vi.fn();
    render(
      <ToggleGroup type="multiple" onValueChange={handler}>
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
      </ToggleGroup>
    );
    await userEvent.click(screen.getByRole("button", { name: "B" }));
    await userEvent.click(screen.getByRole("button", { name: "I" }));
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
