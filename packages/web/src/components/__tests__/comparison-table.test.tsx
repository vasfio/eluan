import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  ComparisonTable,
  ComparisonTableInner,
  ComparisonTableHead,
  ComparisonTableBody,
  ComparisonTableRow,
  ComparisonHeaderCell,
  ComparisonCell,
  ComparisonFeatureCell,
} from "../comparison-table";

describe("ComparisonTable", () => {
  it("renders plan names", () => {
    render(
      <ComparisonTable>
        <ComparisonTableInner>
          <ComparisonTableHead>
            <ComparisonTableRow>
              <ComparisonHeaderCell />
              <ComparisonHeaderCell>Free</ComparisonHeaderCell>
              <ComparisonHeaderCell>Pro</ComparisonHeaderCell>
            </ComparisonTableRow>
          </ComparisonTableHead>
        </ComparisonTableInner>
      </ComparisonTable>
    );
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("renders feature values", () => {
    render(
      <ComparisonTable>
        <ComparisonTableInner>
          <ComparisonTableHead>
            <ComparisonTableRow>
              <ComparisonHeaderCell />
              <ComparisonHeaderCell>Free</ComparisonHeaderCell>
              <ComparisonHeaderCell>Pro</ComparisonHeaderCell>
            </ComparisonTableRow>
          </ComparisonTableHead>
          <ComparisonTableBody>
            <ComparisonTableRow>
              <ComparisonFeatureCell>Storage</ComparisonFeatureCell>
              <ComparisonCell>1 GB</ComparisonCell>
              <ComparisonCell>100 GB</ComparisonCell>
            </ComparisonTableRow>
          </ComparisonTableBody>
        </ComparisonTableInner>
      </ComparisonTable>
    );
    expect(screen.getByText("1 GB")).toBeInTheDocument();
    expect(screen.getByText("100 GB")).toBeInTheDocument();
  });
});
