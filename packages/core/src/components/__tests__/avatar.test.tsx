import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

describe("Avatar", () => {
  it("renders fallback text when image fails", async () => {
    render(
      <Avatar>
        <AvatarImage src="broken.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(await screen.findByText("JD")).toBeInTheDocument();
  });

  it("forwards className to root", () => {
    const { container } = render(
      <Avatar className="size-16">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toHaveClass("size-16");
  });

  it("renders fallback without image", () => {
    render(
      <Avatar>
        <AvatarFallback>MJ</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("MJ")).toBeInTheDocument();
  });
});
