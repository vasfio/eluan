import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} className="w-[300px]" />,
};

export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = React.useState([33]);

    return (
      <div className="w-[300px] space-y-2">
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
      </div>
    );
  },
};

export const Range: Story = {
  render: function Render() {
    const [value, setValue] = React.useState([25, 75]);

    return (
      <div className="w-[300px] space-y-2">
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-sm text-muted-foreground">
          Range: {value[0]} - {value[1]}
        </p>
      </div>
    );
  },
};

export const Steps: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <p className="text-sm mb-2">Step: 1</p>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      <div>
        <p className="text-sm mb-2">Step: 10</p>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>
      <div>
        <p className="text-sm mb-2">Step: 25</p>
        <Slider defaultValue={[50]} max={100} step={25} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} disabled className="w-[300px]" />,
};

export const VolumeControl: Story = {
  render: function Render() {
    const [volume, setVolume] = React.useState([75]);

    return (
      <div className="w-[300px] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Volume</span>
          <span className="text-sm text-muted-foreground">{volume[0]}%</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          </svg>
          <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </div>
      </div>
    );
  },
};

export const PriceRange: Story = {
  render: function Render() {
    const [price, setPrice] = React.useState([20, 80]);

    return (
      <div className="w-[300px] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Price Range</span>
          <span className="text-sm text-muted-foreground">
            ${price[0]} - ${price[1]}
          </span>
        </div>
        <Slider value={price} onValueChange={setPrice} max={100} step={1} />
      </div>
    );
  },
};
