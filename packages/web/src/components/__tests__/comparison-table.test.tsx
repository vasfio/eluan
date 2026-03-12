import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ComparisonTable } from "../comparison-table";

const plans = [
  { name: "Free", price: "$0", features: { storage: "1 GB", users: "1" } },
  { name: "Pro", price: "$29", features: { storage: "100 GB", users: "10" } },
];

describe("ComparisonTable", () => {
  it("renders plan names", () => {
    render(<ComparisonTable plans={plans} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("renders feature values", () => {
    render(<ComparisonTable plans={plans} />);
    expect(screen.getByText("1 GB")).toBeInTheDocument();
    expect(screen.getByText("100 GB")).toBeInTheDocument();
  });
});
