import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DatetimePicker } from "../datetime-picker";

describe("DatetimePicker", () => {
  it("renders without crashing", () => {
    render(<DatetimePicker />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
