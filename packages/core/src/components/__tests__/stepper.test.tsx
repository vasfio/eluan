import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stepper, StepperItem, StepperTrigger, StepperContent } from "../stepper";

describe("Stepper", () => {
  const TestStepper = () => (
    <Stepper value={1}>
      <StepperItem step={1}>
        <StepperTrigger>Step 1</StepperTrigger>
        <StepperContent>Content 1</StepperContent>
      </StepperItem>
      <StepperItem step={2}>
        <StepperTrigger>Step 2</StepperTrigger>
        <StepperContent>Content 2</StepperContent>
      </StepperItem>
    </Stepper>
  );

  it("renders step triggers", () => {
    render(<TestStepper />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("shows content of current step", () => {
    render(<TestStepper />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });
});
