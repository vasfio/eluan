import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RichText } from "../rich-text";

// Tiptap uses DOM APIs — smoke test only
describe("RichText", () => {
  it("renders without crashing", () => {
    const { container } = render(<RichText onValueChange={vi.fn()} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with initial content", () => {
    render(<RichText value="Hello editor" onValueChange={vi.fn()} />);
    expect(screen.getByText("Hello editor")).toBeInTheDocument();
  });

  it("disables every toolbar button when disabled", async () => {
    render(<RichText value="<p>Read only</p>" disabled />);
    const bold = await screen.findByLabelText("Bold");
    const heading = await screen.findByLabelText("Heading 1");
    expect(bold).toBeDisabled();
    expect(heading).toBeDisabled();
  });
});
