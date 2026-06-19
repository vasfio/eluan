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

  it("does not forward className overrides", () => {
    const { container } = render(
      <Image {...({ className: "custom-img" } as never)} src="x.jpg" alt="x" />
    );
    expect(container.querySelector(".custom-img")).toBeNull();
  });
});
