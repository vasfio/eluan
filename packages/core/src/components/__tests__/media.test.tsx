import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Image } from "../media";

describe("Image", () => {
  it("renders an image", () => {
    render(<Image src="photo.jpg" alt="A photo" />);
    expect(screen.getByRole("img", { name: "A photo" })).toBeInTheDocument();
  });

  it("has correct src", () => {
    render(<Image src="photo.jpg" alt="Photo" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "photo.jpg");
  });

  it("forwards className to the wrapper", () => {
    // Image wraps the <img> in a positioned <div> for aspect-ratio / fallback —
    // className is applied to the wrapper, not the img.
    const { container } = render(<Image src="x.jpg" alt="x" className="custom-img" />);
    expect(container.querySelector(".custom-img")).not.toBeNull();
  });
});
