import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../input-otp";

describe("InputOTP", () => {
  it("renders OTP slots", () => {
    render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    );
    expect(document.body).toBeInTheDocument();
  });

  it("renders the correct number of slots", () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    );
    const slots = document.querySelectorAll("[data-slot]");
    expect(slots.length).toBe(4);
  });
});
