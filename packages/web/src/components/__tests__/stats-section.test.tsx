import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsSection, StatItem, StatValue, StatLabel } from "../stats-section";

describe("StatsSection", () => {
  it("renders stats", () => {
    render(
      <StatsSection>
        <StatItem>
          <StatValue>10k+</StatValue>
          <StatLabel>Users</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>99%</StatValue>
          <StatLabel>Uptime</StatLabel>
        </StatItem>
      </StatsSection>
    );
    expect(screen.getByText("10k+")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("99%")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
  });
});
