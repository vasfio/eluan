import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sonner } from "../sonner";
import { toast } from "sonner";

describe("Sonner", () => {
  it("renders the Sonner container without crashing", () => {
    const { container } = render(<Sonner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows a toast message", async () => {
    render(<Sonner />);
    act(() => { toast("Hello toast!"); });
    expect(await screen.findByText("Hello toast!")).toBeInTheDocument();
  });
});
