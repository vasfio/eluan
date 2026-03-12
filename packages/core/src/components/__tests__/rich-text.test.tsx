import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RichTextEditor } from "../rich-text";

// Tiptap uses DOM APIs — smoke test only
describe("RichTextEditor", () => {
  it("renders without crashing", () => {
    const { container } = render(<RichTextEditor onChange={vi.fn()} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with initial content", () => {
    render(<RichTextEditor content="Hello editor" onChange={vi.fn()} />);
    expect(screen.getByText("Hello editor")).toBeInTheDocument();
  });
});
