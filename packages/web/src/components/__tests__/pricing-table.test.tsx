import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  PricingTable,
  PricingCard,
  PricingCardTitle,
  PricingCardPrice,
  PricingCardDescription,
  PricingCardFeatures,
  PricingCardAction,
} from "../pricing-table";

describe("PricingTable", () => {
  it("renders pricing cards", () => {
    render(
      <PricingTable>
        <PricingCard>
          <PricingCardTitle>Starter</PricingCardTitle>
          <PricingCardPrice>$0/mo</PricingCardPrice>
          <PricingCardDescription>For individuals</PricingCardDescription>
          <PricingCardFeatures>
            <li>Feature A</li>
          </PricingCardFeatures>
          <PricingCardAction>Get started</PricingCardAction>
        </PricingCard>
        <PricingCard>
          <PricingCardTitle>Pro</PricingCardTitle>
          <PricingCardPrice>$29/mo</PricingCardPrice>
          <PricingCardAction>Upgrade</PricingCardAction>
        </PricingCard>
      </PricingTable>
    );
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("$0/mo")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("$29/mo")).toBeInTheDocument();
    expect(screen.getByText("Feature A")).toBeInTheDocument();
  });
});
