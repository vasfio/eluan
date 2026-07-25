import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Header, type NavItem } from "../header";

const items: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact" },
];

describe("Header", () => {
  it("renders the logo and nav items", () => {
    render(<Header logo={<span>Eluan</span>} items={items} />);
    expect(screen.getByText("Eluan")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
  });

  it("wires hrefs and marks the active item with aria-current", () => {
    render(<Header items={items} />);
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
    expect(home).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Pricing" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("fires onClick for items without an href", async () => {
    const onClick = vi.fn();
    render(<Header items={[{ label: "Contact", onClick }]} />);
    await userEvent.click(screen.getByRole("button", { name: "Contact" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a labelled mobile menu toggle", () => {
    render(<Header items={items} />);
    expect(screen.getByText("Toggle menu")).toBeInTheDocument();
  });

  it("renders action slot content", () => {
    render(<Header items={items} actions={<button>Sign in</button>} />);
    expect(
      screen.getByRole("button", { name: "Sign in" })
    ).toBeInTheDocument();
  });
});
