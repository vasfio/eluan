import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import {
  AIParameters,
  AIParameterSlider,
  AIParameterToggle,
  AIParameterSelect,
} from "./ai-parameters"

const meta: Meta<typeof AIParameters> = {
  title: "AI/Tuners/AIParameters",
  component: AIParameters,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [temperature, setTemperature] = React.useState(0.7)
    const [maxTokens, setMaxTokens] = React.useState(2048)
    const [creative, setCreative] = React.useState(false)

    return (
      <AIParameters style={{ maxWidth: 360 }}>
        <AIParameterSlider
          label="Temperature"
          min={0}
          max={2}
          step={0.1}
          value={temperature}
          onChange={setTemperature}
        />
        <AIParameterSlider
          label="Max Tokens"
          min={100}
          max={4096}
          step={100}
          value={maxTokens}
          onChange={setMaxTokens}
        />
        <AIParameterToggle
          label="Creative Mode"
          description="Switch between creative and precise outputs"
          checked={creative}
          onChange={setCreative}
        />
      </AIParameters>
    )
  },
}

export const SliderOnly: Story = {
  render: () => {
    const [value, setValue] = React.useState(0.7)

    return (
      <div style={{ maxWidth: 360 }}>
        <AIParameterSlider
          label="Temperature"
          min={0}
          max={2}
          step={0.1}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const ToggleOnly: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true)

    return (
      <div style={{ maxWidth: 360 }}>
        <AIParameterToggle
          label="Stream Response"
          description="Enable real-time token streaming"
          checked={checked}
          onChange={setChecked}
        />
      </div>
    )
  },
}

export const SelectOnly: Story = {
  render: () => {
    const [value, setValue] = React.useState("medium")

    return (
      <div style={{ maxWidth: 360 }}>
        <AIParameterSelect
          label="Quality Level"
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const Complete: Story = {
  render: () => {
    const [temperature, setTemperature] = React.useState(0.7)
    const [maxTokens, setMaxTokens] = React.useState(2048)
    const [topP, setTopP] = React.useState(0.9)
    const [streaming, setStreaming] = React.useState(true)
    const [quality, setQuality] = React.useState("medium")

    return (
      <AIParameters style={{ maxWidth: 360 }}>
        <AIParameterSlider
          label="Temperature"
          min={0}
          max={2}
          step={0.1}
          value={temperature}
          onChange={setTemperature}
        />
        <AIParameterSlider
          label="Max Tokens"
          min={100}
          max={4096}
          step={100}
          value={maxTokens}
          onChange={setMaxTokens}
        />
        <AIParameterSlider
          label="Top P"
          min={0}
          max={1}
          step={0.05}
          value={topP}
          onChange={setTopP}
        />
        <AIParameterToggle
          label="Stream Response"
          description="Enable real-time token streaming"
          checked={streaming}
          onChange={setStreaming}
        />
        <AIParameterSelect
          label="Quality Level"
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          value={quality}
          onChange={setQuality}
        />
      </AIParameters>
    )
  },
}
