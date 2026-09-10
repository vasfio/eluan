import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Popover, PopoverTrigger, PopoverContent } from "../../components/popover";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../../components/hover-card";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../../components/tooltip";
import { PortalContainerProvider } from "../portal-container";

describe("PortalContainerProvider", () => {
  const Scoped = ({ container }: { container?: HTMLElement | null }) => (
    <div data-testid="scope" data-theme="minimal" data-mode="dark">
      <PortalContainerProvider container={container}>
        <Popover defaultOpen>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
      </PortalContainerProvider>
    </div>
  );

  const Harness = () => {
    const [scope, setScope] = React.useState<HTMLElement | null>(null);
    return (
      <div ref={setScope} data-testid="scope" data-theme="minimal" data-mode="dark">
        <PortalContainerProvider container={scope}>
          <Popover defaultOpen>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Popover content</PopoverContent>
          </Popover>
        </PortalContainerProvider>
      </div>
    );
  };

  it("mounts overlay content inside the provided container", () => {
    render(<Harness />);
    const scope = screen.getByTestId("scope");
    expect(scope).toContainElement(screen.getByText("Popover content"));
  });

  it("resolves a ref object after mount", async () => {
    const Ref = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const [open, setOpen] = React.useState(false);
      return (
        <div ref={ref} data-testid="scope">
          <PortalContainerProvider container={ref}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>Open</PopoverTrigger>
              <PopoverContent>Popover content</PopoverContent>
            </Popover>
          </PortalContainerProvider>
        </div>
      );
    };
    render(<Ref />);
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByTestId("scope")).toContainElement(
      screen.getByText("Popover content")
    );
  });

  it("falls back to document.body without a container", () => {
    render(<Scoped container={null} />);
    const content = screen.getByText("Popover content");
    expect(screen.getByTestId("scope")).not.toContainElement(content);
    expect(document.body).toContainElement(content);
  });

  it("an explicit container prop overrides the provider", () => {
    const override = document.createElement("div");
    override.setAttribute("data-testid", "override");
    document.body.appendChild(override);

    const Override = () => {
      const [scope, setScope] = React.useState<HTMLElement | null>(null);
      return (
        <div ref={setScope} data-testid="scope">
          <PortalContainerProvider container={scope}>
            <Popover defaultOpen>
              <PopoverTrigger>Open</PopoverTrigger>
              <PopoverContent container={override}>Popover content</PopoverContent>
            </Popover>
          </PortalContainerProvider>
        </div>
      );
    };

    render(<Override />);
    expect(override).toContainElement(screen.getByText("Popover content"));
    override.remove();
  });

  it("mounts tooltip content inside the provided container", () => {
    const Harness = () => {
      const [scope, setScope] = React.useState<HTMLElement | null>(null);
      return (
        <div ref={setScope} data-testid="scope">
          <PortalContainerProvider container={scope}>
            <TooltipProvider>
              <Tooltip open>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip content</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PortalContainerProvider>
        </div>
      );
    };
    render(<Harness />);
    expect(screen.getByTestId("scope")).toContainElement(
      screen.getAllByText("Tooltip content")[0]
    );
  });

  it("mounts hover card content inside the provided container", () => {
    const Harness = () => {
      const [scope, setScope] = React.useState<HTMLElement | null>(null);
      return (
        <div ref={setScope} data-testid="scope">
          <PortalContainerProvider container={scope}>
            <HoverCard open>
              <HoverCardTrigger>@eluan</HoverCardTrigger>
              <HoverCardContent>Hover card content</HoverCardContent>
            </HoverCard>
          </PortalContainerProvider>
        </div>
      );
    };
    render(<Harness />);
    expect(screen.getByTestId("scope")).toContainElement(
      screen.getByText("Hover card content")
    );
  });
});
