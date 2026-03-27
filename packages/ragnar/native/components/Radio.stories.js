import React, { useState } from "react";
import { View, Text } from "react-native";
import { RadioGroup, Radio } from "./Radio";
const meta = {
    title: "Components/RadioGroup",
    component: RadioGroup,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
        },
        direction: {
            control: "select",
            options: ["vertical", "horizontal"],
        },
        radioPosition: {
            control: "select",
            options: ["left", "right"],
        },
        disabled: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    render: function RadioGroupStory() {
        const [value, setValue] = useState("option1");
        return (<RadioGroup value={value} onValueChange={setValue} options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
            ]}/>);
    },
};
export const WithDescriptions = {
    render: function RadioGroupWithDescriptionsStory() {
        const [value, setValue] = useState("comfortable");
        return (<RadioGroup value={value} onValueChange={setValue} options={[
                {
                    value: "default",
                    label: "Default",
                    description: "The default system settings",
                },
                {
                    value: "comfortable",
                    label: "Comfortable",
                    description: "More space between elements",
                },
                {
                    value: "compact",
                    label: "Compact",
                    description: "Less space between elements",
                },
            ]}/>);
    },
};
export const Sizes = {
    render: function SizesStory() {
        const [small, setSmall] = useState("a");
        const [medium, setMedium] = useState("a");
        const [large, setLarge] = useState("a");
        return (<View style={{ gap: 24 }}>
        <View>
          <Text style={{ color: "#71717a", marginBottom: 8 }}>Small</Text>
          <RadioGroup size="sm" value={small} onValueChange={setSmall} options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
            ]}/>
        </View>
        <View>
          <Text style={{ color: "#71717a", marginBottom: 8 }}>Default</Text>
          <RadioGroup size="default" value={medium} onValueChange={setMedium} options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
            ]}/>
        </View>
        <View>
          <Text style={{ color: "#71717a", marginBottom: 8 }}>Large</Text>
          <RadioGroup size="lg" value={large} onValueChange={setLarge} options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
            ]}/>
        </View>
      </View>);
    },
};
export const Horizontal = {
    render: function HorizontalStory() {
        const [value, setValue] = useState("monthly");
        return (<View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
          Billing Period
        </Text>
        <RadioGroup direction="horizontal" value={value} onValueChange={setValue} options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "lifetime", label: "Lifetime" },
            ]}/>
      </View>);
    },
};
export const RadioPosition = {
    render: function RadioPositionStory() {
        const [left, setLeft] = useState("a");
        const [right, setRight] = useState("a");
        return (<View style={{ gap: 24 }}>
        <View>
          <Text style={{ color: "#71717a", marginBottom: 8 }}>Radio on Left</Text>
          <RadioGroup radioPosition="left" value={left} onValueChange={setLeft} options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
            ]}/>
        </View>
        <View>
          <Text style={{ color: "#71717a", marginBottom: 8 }}>Radio on Right</Text>
          <RadioGroup radioPosition="right" value={right} onValueChange={setRight} options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
            ]}/>
        </View>
      </View>);
    },
};
export const DisabledOptions = {
    render: function DisabledOptionsStory() {
        const [value, setValue] = useState("free");
        return (<View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
          Select Plan
        </Text>
        <RadioGroup value={value} onValueChange={setValue} options={[
                { value: "free", label: "Free", description: "Basic features" },
                { value: "pro", label: "Pro", description: "Advanced features" },
                {
                    value: "enterprise",
                    label: "Enterprise",
                    description: "Contact sales",
                    disabled: true,
                },
            ]}/>
      </View>);
    },
};
export const DisabledGroup = {
    render: () => (<RadioGroup disabled value="option2" options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ]}/>),
};
export const IndividualRadio = {
    render: function IndividualRadioStory() {
        const [selected, setSelected] = useState("a");
        return (<View style={{ gap: 12 }}>
        <Radio selected={selected === "a"} onPress={() => setSelected("a")} label="Radio A"/>
        <Radio selected={selected === "b"} onPress={() => setSelected("b")} label="Radio B" description="With a description"/>
        <Radio selected={selected === "c"} onPress={() => setSelected("c")} label="Radio C"/>
      </View>);
    },
};
export const CardSelection = {
    render: function CardSelectionStory() {
        const [value, setValue] = useState("standard");
        const plans = [
            { value: "basic", label: "Basic", price: "$9/mo", features: ["5 projects", "1GB storage"] },
            { value: "standard", label: "Standard", price: "$29/mo", features: ["Unlimited projects", "10GB storage"] },
            { value: "premium", label: "Premium", price: "$99/mo", features: ["Everything", "Priority support"] },
        ];
        return (<View style={{ gap: 12 }}>
        {plans.map((plan) => (<View key={plan.value} style={{
                    padding: 16,
                    borderWidth: 2,
                    borderColor: value === plan.value ? "#18181b" : "#e4e4e7",
                    borderRadius: 12,
                    backgroundColor: value === plan.value ? "#f4f4f5" : "#ffffff",
                }}>
            <Radio selected={value === plan.value} onPress={() => setValue(plan.value)} label={plan.label}/>
            <View style={{ marginLeft: 28, marginTop: 8 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#18181b" }}>
                {plan.price}
              </Text>
              {plan.features.map((feature) => (<Text key={feature} style={{ color: "#71717a", marginTop: 4 }}>
                  ✓ {feature}
                </Text>))}
            </View>
          </View>))}
      </View>);
    },
};
//# sourceMappingURL=Radio.stories.js.map