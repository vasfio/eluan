import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Toaster } from "../sonner";
import { toast } from "sonner";

describe("Sonner (Toaster)", () => {
  it("renders the toaster container without crashing", () => {
    const { container } = render(<Toaster />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows a toast message", async () => {
    render(<Toaster />);
    act(() => { toast("Hello toast!"); });
    expect(await screen.findByText("Hello toast!")).toBeInTheDocument();
  });
});
