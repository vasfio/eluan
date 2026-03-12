import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Media } from "../media";

describe("Media", () => {
  it("renders an image", () => {
    render(<Media src="photo.jpg" alt="A photo" />);
    expect(screen.getByRole("img", { name: "A photo" })).toBeInTheDocument();
  });

  it("has correct src", () => {
    render(<Media src="photo.jpg" alt="Photo" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "photo.jpg");
  });

  it("forwards className", () => {
    render(<Media src="x.jpg" alt="x" className="rounded-lg" />);
    expect(screen.getByRole("img")).toHaveClass("rounded-lg");
  });
});
