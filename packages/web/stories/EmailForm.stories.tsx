import type { Meta, StoryObj } from "@storybook/react";
import { EmailForm } from "@/components/email-form";

const meta: Meta<typeof EmailForm> = {
  title: "Marketing/EmailForm",
  component: EmailForm,
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["inline", "stacked"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmailForm>;

export const Default: Story = {
  args: {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    onSubmit: (email) => {
      console.log("Submitted:", email);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    helperText: "We'll never share your email with anyone else.",
    successMessage: "Thanks for subscribing!",
    errorMessage: "Something went wrong. Please try again.",
    onSubmit: (email) => {
      console.log("Submitted:", email);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const Stacked: Story = {
  args: {
    layout: "stacked",
    placeholder: "Enter your email address",
    buttonText: "Join Newsletter",
    helperText: "Get weekly updates on new features and tips.",
    onSubmit: (email) => {
      console.log("Submitted:", email);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    placeholder: "Your email",
    buttonText: "Go",
    onSubmit: (email) => {
      console.log("Submitted:", email);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    placeholder: "Enter your work email",
    buttonText: "Get Early Access",
    helperText: "Join 10,000+ professionals already on the waitlist.",
    onSubmit: (email) => {
      console.log("Submitted:", email);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Coming soon...",
    buttonText: "Subscribe",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    errorMessage: "Please enter a valid email address.",
    onSubmit: () => {
      return Promise.reject(new Error("Invalid email"));
    },
  },
};
