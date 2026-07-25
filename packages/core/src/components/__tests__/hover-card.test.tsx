import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  type HoverCardProps,
} from "../hover-card";

const TestHoverCard = (props: HoverCardProps) => (
  <HoverCard openDelay={0} closeDelay={0} {...props}>
    <HoverCardTrigger>@eluan</HoverCardTrigger>
    <HoverCardContent>The Eluan design system</HoverCardContent>
  </HoverCard>
);

describe("HoverCard", () => {
  it("renders the trigger", () => {
    render(<TestHoverCard />);
    expect(screen.getByText("@eluan")).toBeInTheDocument();
  });

  it("keeps content hidden by default", () => {
    render(<TestHoverCard />);
    expect(
      screen.queryByText("The Eluan design system")
    ).not.toBeInTheDocument();
  });

  it("reveals content on hover", async () => {
    render(<TestHoverCard />);
    await userEvent.hover(screen.getByText("@eluan"));
    expect(
      await screen.findByText("The Eluan design system")
    ).toBeInTheDocument();
  });

  it("renders content when opened via the controlled prop", () => {
    render(<TestHoverCard open />);
    expect(screen.getByText("The Eluan design system")).toBeInTheDocument();
  });
});
