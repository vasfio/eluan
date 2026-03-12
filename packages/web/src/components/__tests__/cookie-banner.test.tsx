import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CookieBanner } from "../cookie-banner";

describe("CookieBanner", () => {
  it("renders the banner", () => {
    render(<CookieBanner onAccept={vi.fn()} onDecline={vi.fn()} />);
    expect(document.body.firstChild).toBeInTheDocument();
  });

  it("calls onAccept when accept button clicked", async () => {
    const onAccept = vi.fn();
    render(<CookieBanner onAccept={onAccept} onDecline={vi.fn()} />);
    const acceptBtn = screen.getByRole("button", { name: /accept/i });
    await userEvent.click(acceptBtn);
    expect(onAccept).toHaveBeenCalled();
  });

  it("calls onDecline when decline button clicked", async () => {
    const onDecline = vi.fn();
    render(<CookieBanner onAccept={vi.fn()} onDecline={onDecline} />);
    const declineBtn = screen.getByRole("button", { name: /decline|reject/i });
    await userEvent.click(declineBtn);
    expect(onDecline).toHaveBeenCalled();
  });
});
