import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../navigation-menu";

const TestMenu = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

describe("NavigationMenu", () => {
  it("renders a navigation landmark", () => {
    render(<TestMenu />);
    expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
  });

  it("renders trigger and top-level links", () => {
    render(<TestMenu />);
    expect(
      screen.getByRole("button", { name: "Products" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
  });

  it("keeps submenu content collapsed until the trigger opens", () => {
    render(<TestMenu />);
    expect(
      screen.getByRole("button", { name: "Products" })
    ).toHaveAttribute("data-state", "closed");
    expect(screen.queryByRole("link", { name: "Analytics" })).toBeNull();
  });

  it("opens the submenu when the trigger is activated", async () => {
    render(<TestMenu />);
    await userEvent.click(screen.getByRole("button", { name: "Products" }));
    expect(
      await screen.findByRole("link", { name: "Analytics" })
    ).toBeInTheDocument();
  });
});
