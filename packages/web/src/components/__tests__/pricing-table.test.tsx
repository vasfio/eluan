import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PricingTable } from "../pricing-table";

const plans = [
  { id: "starter", name: "Starter", price: "$0/mo", description: "For individuals", buttonText: "Get started" },
  { id: "pro", name: "Pro", price: "$29/mo", buttonText: "Upgrade" },
];

const features = [
  { name: "Feature A", values: { starter: true, pro: true } },
  { name: "Feature B", values: { starter: false, pro: true } },
];

describe("PricingTable", () => {
  it("renders pricing plans", () => {
    render(<PricingTable plans={plans} features={features} />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("$0/mo")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("$29/mo")).toBeInTheDocument();
    expect(screen.getByText("Feature A")).toBeInTheDocument();
  });
});
