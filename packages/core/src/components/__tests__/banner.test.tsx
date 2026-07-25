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

    rerender(<Banner variant="caution">Warning</Banner>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("does not forward className overrides", () => {
    const { container } = render(<Banner {...({ className: "extra" } as never)}>Notice</Banner>);
    expect(container.firstChild).not.toHaveClass("extra");
  });
});
