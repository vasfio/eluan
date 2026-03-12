import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimePicker } from "../time-picker";

describe("TimePicker", () => {
  it("renders without crashing", () => {
    render(<TimePicker />);
    expect(document.body.firstChild).toBeInTheDocument();
  });

  it("renders time inputs", () => {
    render(<TimePicker />);
    const inputs = document.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThan(0);
  });
});
