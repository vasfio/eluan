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

  it("content hidden by default", () => {
    render(<TestDrawer />);
    expect(screen.queryByText("Drawer Title")).not.toBeInTheDocument();
  });

  it("shows content on trigger click", async () => {
    render(<TestDrawer />);
    await userEvent.click(screen.getByText("Open Drawer"));
    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
  });
});
