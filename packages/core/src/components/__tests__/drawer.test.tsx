import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../drawer";

describe("Drawer", () => {
  const TestDrawer = (props: Partial<React.ComponentProps<typeof Drawer>>) => (
    <Drawer {...props}>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <p>Drawer body</p>
      </DrawerContent>
    </Drawer>
  );

  const panelOf = (title: HTMLElement) =>
    title.closest("[data-state]") as HTMLElement;

  it("renders the trigger", () => {
    render(<TestDrawer />);
    expect(screen.getByText("Open Drawer")).toBeInTheDocument();
  });

  it("keeps content mounted inline and closed by default", () => {
    render(<TestDrawer />);
    const title = screen.getByText("Drawer Title");
    // The inline panel is always mounted; it collapses rather than unmounts.
    expect(title).toBeInTheDocument();
    expect(panelOf(title)).toHaveAttribute("data-state", "closed");
    expect(screen.getByText("Open Drawer")).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("expands the panel when the trigger is clicked (uncontrolled)", async () => {
    render(<TestDrawer />);
    const trigger = screen.getByText("Open Drawer");
    await userEvent.click(trigger);
    expect(panelOf(screen.getByText("Drawer Title"))).toHaveAttribute(
      "data-state",
      "open"
    );
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles the panel closed again on a second click", async () => {
    render(<TestDrawer defaultOpen />);
    const trigger = screen.getByText("Open Drawer");
    expect(panelOf(screen.getByText("Drawer Title"))).toHaveAttribute(
      "data-state",
      "open"
    );
    await userEvent.click(trigger);
    expect(panelOf(screen.getByText("Drawer Title"))).toHaveAttribute(
      "data-state",
      "closed"
    );
  });

  it("respects the controlled open prop and calls onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <TestDrawer open={false} onOpenChange={onOpenChange} />
    );
    expect(panelOf(screen.getByText("Drawer Title"))).toHaveAttribute(
      "data-state",
      "closed"
    );

    await userEvent.click(screen.getByText("Open Drawer"));
    // Controlled: state does not change until the parent updates the prop.
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(panelOf(screen.getByText("Drawer Title"))).toHaveAttribute(
      "data-state",
      "closed"
    );

    rerender(<TestDrawer open onOpenChange={onOpenChange} />);
    expect(panelOf(screen.getByText("Drawer Title"))).toHaveAttribute(
      "data-state",
      "open"
    );
  });
});
