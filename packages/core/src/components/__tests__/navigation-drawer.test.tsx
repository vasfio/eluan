import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { NavigationDrawer, NavigationDrawerToggle, NavigationDrawerContent } from "../navigation-drawer";

describe("NavigationDrawer", () => {
  const TestDrawer = () => (
    <NavigationDrawer>
      <NavigationDrawerToggle>Menu</NavigationDrawerToggle>
      <NavigationDrawerContent>
        <nav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
        </nav>
      </NavigationDrawerContent>
    </NavigationDrawer>
  );

  it("renders trigger", () => {
    render(<TestDrawer />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("shows nav links on open", async () => {
    render(<TestDrawer />);
    await userEvent.click(screen.getByText("Menu"));
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });
});
