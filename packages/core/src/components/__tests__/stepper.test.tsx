import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stepper, StepperContent } from "../stepper";

const steps = [
  { id: "1", title: "Step 1", description: "First step" },
  { id: "2", title: "Step 2", description: "Second step" },
];

describe("Stepper", () => {
  it("renders step titles", () => {
    render(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("shows content of current step", () => {
    render(
      <>
        <Stepper steps={steps} currentStep={0} />
        <StepperContent step={0} currentStep={0}>Content 1</StepperContent>
        <StepperContent step={1} currentStep={0}>Content 2</StepperContent>
      </>
    );
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });
});
