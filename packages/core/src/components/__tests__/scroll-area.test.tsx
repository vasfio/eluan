import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollArea } from "../scroll-area";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(<ScrollArea><p>Scrollable content</p></ScrollArea>);
    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("does not forward className overrides", () => {
    const { container } = render(
      <ScrollArea {...({ className: "h-64" } as never)}><p>Content</p></ScrollArea>
    );
    expect(container.querySelector(".h-64")).toBeNull();
  });
});
