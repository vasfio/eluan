// Web package smoke tests — components that compose from @frolda/ragnar-core
// These tests verify they render correctly in the web context

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AnnouncementBar } from "../announcement-bar";

describe("AnnouncementBar", () => {
  it("renders children", () => {
    render(<AnnouncementBar>Summer sale 50% off!</AnnouncementBar>);
    expect(screen.getByText("Summer sale 50% off!")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<AnnouncementBar variant="success">Success</AnnouncementBar>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with action link", () => {
    render(
      <AnnouncementBar>
        Promo <a href="/sale">Shop now</a>
      </AnnouncementBar>
    );
    expect(screen.getByRole("link", { name: "Shop now" })).toBeInTheDocument();
  });
});
