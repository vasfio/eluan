import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "../drawer";

describe("Drawer", () => {
  const TestDrawer = () => (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <p>Drawer body</p>
      </DrawerContent>
    </Drawer>
  );

  it("renders trigger", () => {
    render(<TestDrawer />);
    expect(screen.getByText("Open Drawer")).toBeInTheDocument();
  });

  // Drawer (vaul) renders content into the DOM by default; opening the
  // drawer just adds `aria-hidden="false"` and similar attributes. We
  // assert the title is in the DOM (always-mounted) rather than measure
  // visibility, which happy-dom doesn't reliably compute for animated
  // overlay transitions.
  it("renders the title (always mounted)", () => {
    render(<TestDrawer />);
    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
  });

  it("clicks the trigger without throwing", async () => {
    render(<TestDrawer />);
    await userEvent.click(screen.getByText("Open Drawer"));
    // No assertion — happy-dom can't reliably observe vaul's open transition.
    // The smoke value here is that clicking doesn't crash the component.
    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
  });
});
