import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DateRangePicker } from "@/components/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date>();

    return (
      <div className="w-[280px]">
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="w-[280px]">
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const CustomFormat: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date>();

    return (
      <div className="w-[280px]">
        <DatePicker
          value={date}
          onChange={setDate}
          dateFormat="dd/MM/yyyy"
          placeholder="DD/MM/YYYY"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[280px]">
      <DatePicker disabled placeholder="Select a date" />
    </div>
  ),
};

export const DateRange: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<{
      from: Date | undefined;
      to: Date | undefined;
    }>({
      from: undefined,
      to: undefined,
    });

    return (
      <div className="w-[300px]">
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Select date range"
        />
      </div>
    );
  },
};

export const DateRangeWithValue: Story = {
  render: function Render() {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const [range, setRange] = React.useState<{
      from: Date | undefined;
      to: Date | undefined;
    }>({
      from: today,
      to: nextWeek,
    });

    return (
      <div className="w-[300px]">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: function Render() {
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

    return (
      <div className="w-[300px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            placeholder="Select start date"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="Select end date"
          />
        </div>
      </div>
    );
  },
};
