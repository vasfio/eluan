import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateTimePicker } from "../datetime-picker";

describe("DateTimePicker", () => {
  it("renders without crashing", () => {
    render(<DateTimePicker />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
