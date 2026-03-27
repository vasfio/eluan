import React, { useState } from "react";
import { View, Text } from "react-native";
import { Slider, RangeSlider } from "./Slider";
const meta = {
    title: "Components/Slider",
    component: Slider,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
        },
        min: {
            control: "number",
        },
        max: {
            control: "number",
        },
        step: {
            control: "number",
        },
        showValue: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    render: function SliderStory() {
        const [value, setValue] = useState(50);
        return <Slider value={value} onValueChange={setValue}/>;
    },
};
export const WithLabel = {
    render: function SliderWithLabelStory() {
        const [value, setValue] = useState(75);
        return (<Slider value={value} onValueChange={setValue} label="Volume" showValue/>);
    },
};
export const Sizes = {
    render: function SizesStory() {
        const [small, setSmall] = useState(50);
        const [medium, setMedium] = useState(50);
        const [large, setLarge] = useState(50);
        return (<View style={{ gap: 24 }}>
        <Slider size="sm" value={small} onValueChange={setSmall} label="Small" showValue/>
        <Slider size="default" value={medium} onValueChange={setMedium} label="Default" showValue/>
        <Slider size="lg" value={large} onValueChange={setLarge} label="Large" showValue/>
      </View>);
    },
};
export const WithSteps = {
    render: function StepsStory() {
        const [value, setValue] = useState(50);
        return (<View style={{ gap: 16 }}>
        <Slider value={value} onValueChange={setValue} step={10} label="Step: 10" showValue/>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (<Text key={tick} style={{ color: "#71717a", fontSize: 10 }}>{tick}</Text>))}
        </View>
      </View>);
    },
};
export const CustomRange = {
    render: function CustomRangeStory() {
        const [temperature, setTemperature] = useState(72);
        return (<Slider value={temperature} onValueChange={setTemperature} min={60} max={85} label="Temperature" showValue formatValue={(v) => `${v}°F`}/>);
    },
};
export const CustomFormat = {
    render: function CustomFormatStory() {
        const [price, setPrice] = useState(250);
        return (<View style={{ gap: 24 }}>
        <Slider value={price} onValueChange={setPrice} min={0} max={1000} step={50} label="Budget" showValue formatValue={(v) => `$${v}`}/>
        <Slider value={50} min={0} max={100} label="Completion" showValue formatValue={(v) => `${v}%`}/>
      </View>);
    },
};
export const Disabled = {
    render: () => (<View style={{ gap: 16 }}>
      <Slider value={30} disabled label="Disabled" showValue/>
      <Slider value={70} disabled label="Disabled (higher value)" showValue/>
    </View>),
};
export const Range = {
    render: function RangeStory() {
        const [value, setValue] = useState([25, 75]);
        return (<RangeSlider value={value} onValueChange={setValue} label="Price Range" showValue formatValue={(v) => `$${v}`}/>);
    },
};
export const RangeSizes = {
    render: () => (<View style={{ gap: 24 }}>
      <RangeSlider size="sm" defaultValue={[20, 80]} label="Small" showValue/>
      <RangeSlider size="default" defaultValue={[20, 80]} label="Default" showValue/>
      <RangeSlider size="lg" defaultValue={[20, 80]} label="Large" showValue/>
    </View>),
};
export const VolumeControl = {
    render: function VolumeControlStory() {
        const [volume, setVolume] = useState(65);
        const [bass, setBass] = useState(50);
        const [treble, setTreble] = useState(50);
        return (<View style={{
                padding: 20,
                backgroundColor: "#18181b",
                borderRadius: 16,
                gap: 24,
            }}>
        <Text style={{ color: "#fafafa", fontSize: 18, fontWeight: "600" }}>
          Audio Settings
        </Text>

        <Slider value={volume} onValueChange={setVolume} label="Volume" showValue formatValue={(v) => `${v}%`}/>

        <Slider value={bass} onValueChange={setBass} min={-50} max={50} label="Bass" showValue formatValue={(v) => (v > 0 ? `+${v}` : `${v}`)}/>

        <Slider value={treble} onValueChange={setTreble} min={-50} max={50} label="Treble" showValue formatValue={(v) => (v > 0 ? `+${v}` : `${v}`)}/>
      </View>);
    },
};
export const FilterExample = {
    render: function FilterExampleStory() {
        const [priceRange, setPriceRange] = useState([0, 500]);
        const [rating, setRating] = useState(3);
        return (<View style={{
                padding: 16,
                backgroundColor: "#f4f4f5",
                borderRadius: 12,
                gap: 24,
            }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
          Filters
        </Text>

        <RangeSlider value={priceRange} onValueChange={setPriceRange} min={0} max={1000} step={25} label="Price Range" showValue formatValue={(v) => `$${v}`}/>

        <Slider value={rating} onValueChange={setRating} min={1} max={5} step={1} label="Minimum Rating" showValue formatValue={(v) => `${"★".repeat(v)}${"☆".repeat(5 - v)}`}/>
      </View>);
    },
};
//# sourceMappingURL=Slider.stories.js.map