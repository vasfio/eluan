import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Timeline, TimelineItem, TimelineContent, TimelineTitle, TimelineDescription } from "../timeline";

describe("Timeline", () => {
  it("renders timeline items", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Event One</TimelineTitle>
            <TimelineDescription>Description one</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent>
            <TimelineTitle>Event Two</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    expect(screen.getByText("Event One")).toBeInTheDocument();
    expect(screen.getByText("Event Two")).toBeInTheDocument();
    expect(screen.getByText("Description one")).toBeInTheDocument();
  });

  it("does not forward className overrides to Timeline", () => {
    const { container } = render(
      <Timeline {...({ className: "custom" } as never)}>
        <TimelineItem><TimelineContent /></TimelineItem>
      </Timeline>
    );
    expect(container.querySelector(".custom")).toBeNull();
  });
});
