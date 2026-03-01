import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "The progress value (0-100)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Animated: Story = {
  render: function Render() {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return <Progress value={progress} className="w-[60%]" />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div>
        <p className="text-sm mb-2">Small (h-2)</p>
        <Progress value={60} className="h-2" />
      </div>
      <div>
        <p className="text-sm mb-2">Default (h-4)</p>
        <Progress value={60} />
      </div>
      <div>
        <p className="text-sm mb-2">Large (h-6)</p>
        <Progress value={60} className="h-6" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>75%</span>
      </div>
      <Progress value={75} />
    </div>
  ),
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Downloads</span>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Uploads</span>
          <span>50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Processing</span>
          <span>90%</span>
        </div>
        <Progress value={90} />
      </div>
    </div>
  ),
};
