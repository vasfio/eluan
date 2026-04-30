import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InputOTP } from "../input-otp";

describe("InputOTP", () => {
  it("renders the default 6 slots", () => {
    const { container } = render(<InputOTP />);
    // Each slot is an <input>; OTP renders `length` of them (default 6).
    expect(container.querySelectorAll("input").length).toBe(6);
  });

  it("renders the correct number of slots when length is specified", () => {
    const { container } = render(<InputOTP length={4} />);
    expect(container.querySelectorAll("input").length).toBe(4);
  });
});
