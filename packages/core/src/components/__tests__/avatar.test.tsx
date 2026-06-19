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

  it("does not forward className overrides", () => {
    const { container } = render(
      <Avatar {...({ className: "size-16" } as never)}>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector(".size-16")).toBeNull();
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
