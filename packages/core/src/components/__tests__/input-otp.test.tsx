import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("resizes to a changed length, preserving digits on grow and truncating on shrink", async () => {
    const { container, rerender } = render(<InputOTP length={4} />);

    let inputs = container.querySelectorAll("input");
    await userEvent.type(inputs[0], "1");
    await userEvent.type(inputs[1], "2");
    await userEvent.type(inputs[2], "3");
    await userEvent.type(inputs[3], "4");

    // Grow: existing digits are preserved, new slots start empty.
    rerender(<InputOTP length={6} />);
    inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(6);
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[3]).toHaveValue("4");
    expect(inputs[4]).toHaveValue("");

    // Shrink: the tail is dropped, leading digits survive.
    rerender(<InputOTP length={2} />);
    inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(2);
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
  });
});
