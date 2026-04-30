import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  NavigationDrawer,
  NavigationDrawerProvider,
  NavigationDrawerContent,
} from "../navigation-drawer";

// NavigationDrawer requires being wrapped in `NavigationDrawerProvider`. The
// previous tests mounted it directly which threw the
// "must be used within a NavigationDrawerProvider" error.

describe("NavigationDrawer", () => {
  const TestDrawer = () => (
    <NavigationDrawerProvider>
      <NavigationDrawer>
        <NavigationDrawerContent>
          <nav>
            <a href="/home">Home</a>
            <a href="/about">About</a>
          </nav>
        </NavigationDrawerContent>
      </NavigationDrawer>
    </NavigationDrawerProvider>
  );

  it("renders nav links inside the drawer (desktop)", () => {
    render(<TestDrawer />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });
});
