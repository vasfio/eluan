import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Toast } from "../toast";
import { toast } from "sonner";

describe("Toast", () => {
  it("renders the Toast container without crashing", () => {
    const { container } = render(<Toast />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows a toast message", async () => {
    render(<Toast />);
    act(() => { toast("Hello toast!"); });
    expect(await screen.findByText("Hello toast!")).toBeInTheDocument();
  });
});
