import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, StepperContent, type Step } from "@/components/stepper";
import { Button } from "@/components/button";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    allowClickOnCompleted: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps: Step[] = [
  { id: "step-1", title: "Account", description: "Create your account" },
  { id: "step-2", title: "Profile", description: "Set up your profile" },
  { id: "step-3", title: "Settings", description: "Configure preferences" },
  { id: "step-4", title: "Complete", description: "All done!" },
];

export const Default: Story = {
  render: () => <Stepper steps={steps} currentStep={1} />,
};

export const WithStepContent: Story = {
  render: function Render() {
    const [currentStep, setCurrentStep] = React.useState(0);

    return (
      <div className="w-[600px] space-y-6">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <StepperContent step={0} currentStep={currentStep}>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Create Your Account</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your email and create a password.
            </p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Create a password"
                />
              </div>
            </div>
          </div>
        </StepperContent>

        <StepperContent step={1} currentStep={currentStep}>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Set Up Your Profile</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tell us about yourself.
            </p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
          </div>
        </StepperContent>

        <StepperContent step={2} currentStep={currentStep}>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Configure Preferences</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Customize your experience.
            </p>
          </div>
        </StepperContent>

        <StepperContent step={3} currentStep={currentStep}>
          <div className="rounded-lg border p-4 text-center">
            <h3 className="font-medium text-lg">All Done!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your account has been set up successfully.
            </p>
          </div>
        </StepperContent>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 2 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: function Render() {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="flex gap-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          orientation="vertical"
          onStepClick={setCurrentStep}
        />
        <div className="flex-1">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">{steps[currentStep].title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {steps[currentStep].description}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const iconSteps: Step[] = [
      {
        id: "cart",
        title: "Cart",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        ),
      },
      {
        id: "shipping",
        title: "Shipping",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
        ),
      },
      {
        id: "payment",
        title: "Payment",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        ),
      },
      {
        id: "confirm",
        title: "Confirm",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ),
      },
    ];

    return <Stepper steps={iconSteps} currentStep={2} />;
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-4">Step 0 (First step active)</p>
        <Stepper steps={steps} currentStep={0} />
      </div>
      <div>
        <p className="text-sm font-medium mb-4">Step 1 (One completed)</p>
        <Stepper steps={steps} currentStep={1} />
      </div>
      <div>
        <p className="text-sm font-medium mb-4">Step 2 (Two completed)</p>
        <Stepper steps={steps} currentStep={2} />
      </div>
      <div>
        <p className="text-sm font-medium mb-4">Step 3 (All completed)</p>
        <Stepper steps={steps} currentStep={3} />
      </div>
    </div>
  ),
};
