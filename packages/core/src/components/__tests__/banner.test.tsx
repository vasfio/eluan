import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Banner } from "../banner";

describe("Banner", () => {
  it("renders children", () => {
    render(<Banner>Important notice</Banner>);
    expect(screen.getByText("Important notice")).toBeInTheDocument();
  });

  it("renders with variant classes", () => {
    const { rerender, container } = render(<Banner variant="destructive">Error</Banner>);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Banner variant="warning">Warning</Banner>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<Banner className="extra">Notice</Banner>);
    expect(container.firstChild).toHaveClass("extra");
  });
});
