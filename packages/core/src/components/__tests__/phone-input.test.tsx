import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PhoneInput } from "../phone-input";

describe("PhoneInput", () => {
  it("renders without crashing", () => {
    render(<PhoneInput />);
    expect(document.body.firstChild).toBeInTheDocument();
  });

  it("renders a text input", () => {
    render(<PhoneInput />);
    const inputs = document.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThan(0);
  });
});
