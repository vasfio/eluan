import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DatePicker } from "../date-picker";

describe("DatePicker", () => {
  it("renders without crashing", () => {
    render(<DatePicker />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });
});
