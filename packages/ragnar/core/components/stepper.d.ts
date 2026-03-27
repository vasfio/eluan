import * as React from "react";
export interface Step {
    id: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
}
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    steps: Step[];
    currentStep: number;
    orientation?: "horizontal" | "vertical";
    onStepClick?: (step: number) => void;
    allowClickOnCompleted?: boolean;
}
declare const Stepper: React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLDivElement>>;
export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
    step: number;
    currentStep: number;
}
declare const StepperContent: React.ForwardRefExoticComponent<StepperContentProps & React.RefAttributes<HTMLDivElement>>;
export { Stepper, StepperContent };
