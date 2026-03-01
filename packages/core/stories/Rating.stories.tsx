import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "@/components/rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 5, step: 0.5 },
    },
    max: {
      control: { type: "number", min: 1, max: 10 },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    readonly: {
      control: "boolean",
    },
    showValue: {
      control: "boolean",
    },
    precision: {
      control: "select",
      options: [0.5, 1],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(3);
    return <Rating value={value} onChange={setValue} />;
  },
};

export const Readonly: Story = {
  render: () => <Rating value={4} readonly />,
};

export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(3.5);
    return <Rating value={value} onChange={setValue} showValue />;
  },
};

export const HalfStars: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(3.5);
    return <Rating value={value} onChange={setValue} precision={0.5} showValue />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Small:</span>
        <Rating value={4} size="sm" readonly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Default:</span>
        <Rating value={4} size="default" readonly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Large:</span>
        <Rating value={4} size="lg" readonly />
      </div>
    </div>
  ),
};

export const CustomMax: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(7);
    return <Rating value={value} onChange={setValue} max={10} showValue />;
  },
};

export const ProductRating: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="rounded-lg border p-4">
        <h3 className="font-medium">Premium Headphones</h3>
        <div className="flex items-center gap-2 mt-2">
          <Rating value={4.5} readonly precision={0.5} size="sm" />
          <span className="text-sm text-muted-foreground">(128 reviews)</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          High-quality wireless headphones with noise cancellation.
        </p>
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="font-medium">Wireless Mouse</h3>
        <div className="flex items-center gap-2 mt-2">
          <Rating value={3.5} readonly precision={0.5} size="sm" />
          <span className="text-sm text-muted-foreground">(56 reviews)</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Ergonomic wireless mouse for everyday use.
        </p>
      </div>
    </div>
  ),
};

export const ReviewForm: Story = {
  render: function Render() {
    const [rating, setRating] = React.useState(0);

    return (
      <div className="w-[400px] space-y-4">
        <h3 className="font-medium">Leave a Review</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Rating</label>
          <Rating
            value={rating}
            onChange={setRating}
            showValue
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Review</label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Write your review here..."
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          disabled={rating === 0}
        >
          Submit Review
        </button>
      </div>
    );
  },
};

export const AllValues: Story = {
  render: () => (
    <div className="space-y-2">
      {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
        <div key={value} className="flex items-center gap-4">
          <span className="text-sm w-8">{value}</span>
          <Rating value={value} readonly precision={0.5} />
        </div>
      ))}
    </div>
  ),
};
