import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RichText } from "../rich-text";

// Tiptap uses DOM APIs — smoke test only
describe("RichText", () => {
  it("renders without crashing", () => {
    const { container } = render(<RichText onChange={vi.fn()} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with initial content", () => {
    render(<RichText value="Hello editor" onChange={vi.fn()} />);
    expect(screen.getByText("Hello editor")).toBeInTheDocument();
  });
});
