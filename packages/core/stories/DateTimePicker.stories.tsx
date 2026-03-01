import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePicker } from "@/components/datetime-picker";

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  argTypes: {
    showSeconds: {
      control: "boolean",
    },
    use24Hour: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date>();

    return (
      <div className="w-[280px]">
        <DateTimePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="w-[280px]">
        <DateTimePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const With24Hour: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="w-[280px]">
        <DateTimePicker value={date} onChange={setDate} use24Hour />
      </div>
    );
  },
};

export const WithSeconds: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="w-[320px]">
        <DateTimePicker value={date} onChange={setDate} showSeconds />
      </div>
    );
  },
};

export const With24HourAndSeconds: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="w-[320px]">
        <DateTimePicker
          value={date}
          onChange={setDate}
          use24Hour
          showSeconds
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[280px]">
      <DateTimePicker disabled placeholder="Select date and time" />
    </div>
  ),
};

export const FormExample: Story = {
  render: function Render() {
    const [eventDate, setEventDate] = React.useState<Date>();

    return (
      <div className="w-[320px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Date & Time</label>
          <DateTimePicker
            value={eventDate}
            onChange={setEventDate}
            placeholder="When is the event?"
          />
          <p className="text-sm text-muted-foreground">
            Select when your event will take place.
          </p>
        </div>
      </div>
    );
  },
};
