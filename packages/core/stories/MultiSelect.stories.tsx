import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "@/components/multi-select";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "qwik", label: "Qwik" },
  { value: "preact", label: "Preact" },
];

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
  { value: "orange", label: "Orange" },
  { value: "mango", label: "Mango" },
  { value: "strawberry", label: "Strawberry" },
];

export const Default: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <div className="w-[350px]">
        <MultiSelect
          options={frameworks}
          value={selected}
          onChange={setSelected}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<string[]>(["react", "vue"]);

    return (
      <div className="w-[350px]">
        <MultiSelect
          options={frameworks}
          value={selected}
          onChange={setSelected}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};

export const WithManySelected: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<string[]>([
      "apple",
      "banana",
      "blueberry",
      "grapes",
      "pineapple",
    ]);

    return (
      <div className="w-[350px]">
        <MultiSelect
          options={fruits}
          value={selected}
          onChange={setSelected}
          placeholder="Select fruits..."
          maxDisplayedItems={3}
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<string[]>([]);

    const optionsWithDisabled = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular", disabled: true },
      { value: "svelte", label: "Svelte" },
      { value: "ember", label: "Ember (Deprecated)", disabled: true },
    ];

    return (
      <div className="w-[350px]">
        <MultiSelect
          options={optionsWithDisabled}
          value={selected}
          onChange={setSelected}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[350px]">
      <MultiSelect
        options={frameworks}
        value={["react", "vue"]}
        disabled
        placeholder="Select frameworks..."
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: function Render() {
    const [skills, setSkills] = React.useState<string[]>([]);

    const skillOptions = [
      { value: "js", label: "JavaScript" },
      { value: "ts", label: "TypeScript" },
      { value: "react", label: "React" },
      { value: "node", label: "Node.js" },
      { value: "python", label: "Python" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
      { value: "sql", label: "SQL" },
    ];

    return (
      <div className="w-[400px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Skills</label>
          <MultiSelect
            options={skillOptions}
            value={skills}
            onChange={setSkills}
            placeholder="Select your skills..."
            searchPlaceholder="Search skills..."
          />
          <p className="text-sm text-muted-foreground">
            Select all the skills that apply to you.
          </p>
        </div>
        {skills.length > 0 && (
          <p className="text-sm">
            Selected: {skills.join(", ")}
          </p>
        )}
      </div>
    );
  },
};

export const CustomMaxDisplay: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<string[]>([
      "apple",
      "banana",
      "blueberry",
      "grapes",
    ]);

    return (
      <div className="space-y-4 w-[350px]">
        <div>
          <p className="text-sm mb-2">Max 1 displayed:</p>
          <MultiSelect
            options={fruits}
            value={selected}
            onChange={setSelected}
            maxDisplayedItems={1}
          />
        </div>
        <div>
          <p className="text-sm mb-2">Max 2 displayed:</p>
          <MultiSelect
            options={fruits}
            value={selected}
            onChange={setSelected}
            maxDisplayedItems={2}
          />
        </div>
        <div>
          <p className="text-sm mb-2">Max 5 displayed:</p>
          <MultiSelect
            options={fruits}
            value={selected}
            onChange={setSelected}
            maxDisplayedItems={5}
          />
        </div>
      </div>
    );
  },
};
