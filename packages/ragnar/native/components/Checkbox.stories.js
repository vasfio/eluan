import React, { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox, CheckboxGroup } from "./Checkbox";
const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
        },
        position: {
            control: "select",
            options: ["left", "right"],
        },
        disabled: {
            control: "boolean",
        },
        indeterminate: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    render: function CheckboxStory() {
        const [checked, setChecked] = useState(false);
        return <Checkbox checked={checked} onCheckedChange={setChecked}/>;
    },
};
export const WithLabel = {
    render: function CheckboxWithLabelStory() {
        const [checked, setChecked] = useState(false);
        return (<Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms and conditions"/>);
    },
};
export const WithDescription = {
    render: function CheckboxWithDescriptionStory() {
        const [checked, setChecked] = useState(true);
        return (<Checkbox checked={checked} onCheckedChange={setChecked} label="Send me updates" description="You will receive email notifications about new features"/>);
    },
};
export const Sizes = {
    render: function CheckboxSizesStory() {
        const [small, setSmall] = useState(true);
        const [medium, setMedium] = useState(true);
        const [large, setLarge] = useState(true);
        return (<View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Checkbox size="sm" checked={small} onCheckedChange={setSmall}/>
          <Text style={{ color: "#71717a" }}>Small</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Checkbox size="default" checked={medium} onCheckedChange={setMedium}/>
          <Text style={{ color: "#71717a" }}>Default</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Checkbox size="lg" checked={large} onCheckedChange={setLarge}/>
          <Text style={{ color: "#71717a" }}>Large</Text>
        </View>
      </View>);
    },
};
export const States = {
    render: () => (<View style={{ gap: 16 }}>
      <Checkbox checked={false} label="Unchecked"/>
      <Checkbox checked={true} label="Checked"/>
      <Checkbox indeterminate label="Indeterminate"/>
      <Checkbox disabled label="Disabled"/>
      <Checkbox checked disabled label="Disabled Checked"/>
    </View>),
};
export const Positions = {
    render: function PositionsStory() {
        const [left, setLeft] = useState(true);
        const [right, setRight] = useState(false);
        return (<View style={{ gap: 16 }}>
        <Checkbox checked={left} onCheckedChange={setLeft} label="Checkbox on left" position="left"/>
        <Checkbox checked={right} onCheckedChange={setRight} label="Checkbox on right" position="right"/>
      </View>);
    },
};
export const Group = {
    render: function GroupStory() {
        const [selected, setSelected] = useState(["react"]);
        return (<View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
          Select your frameworks:
        </Text>
        <CheckboxGroup value={selected} onValueChange={setSelected} options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "angular", label: "Angular" },
                { value: "svelte", label: "Svelte" },
            ]}/>
        <Text style={{ color: "#71717a", fontSize: 12 }}>
          Selected: {selected.join(", ") || "None"}
        </Text>
      </View>);
    },
};
export const GroupWithDescriptions = {
    render: function GroupWithDescriptionsStory() {
        const [selected, setSelected] = useState(["email"]);
        return (<View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
          Notification preferences:
        </Text>
        <CheckboxGroup value={selected} onValueChange={setSelected} options={[
                {
                    value: "email",
                    label: "Email notifications",
                    description: "Receive updates via email",
                },
                {
                    value: "push",
                    label: "Push notifications",
                    description: "Receive notifications on your device",
                },
                {
                    value: "sms",
                    label: "SMS notifications",
                    description: "Receive text messages for urgent updates",
                },
            ]}/>
      </View>);
    },
};
export const HorizontalGroup = {
    render: function HorizontalGroupStory() {
        const [selected, setSelected] = useState(["s", "m"]);
        return (<View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
          Select sizes:
        </Text>
        <CheckboxGroup value={selected} onValueChange={setSelected} direction="horizontal" options={[
                { value: "xs", label: "XS" },
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
                { value: "xl", label: "XL" },
            ]}/>
      </View>);
    },
};
export const FormExample = {
    render: function FormStory() {
        const [agreeTerms, setAgreeTerms] = useState(false);
        const [agreePrivacy, setAgreePrivacy] = useState(false);
        const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
        const canSubmit = agreeTerms && agreePrivacy;
        return (<View style={{ gap: 20 }}>
        <View style={{ gap: 12 }}>
          <Checkbox checked={agreeTerms} onCheckedChange={setAgreeTerms} label="I agree to the Terms of Service"/>
          <Checkbox checked={agreePrivacy} onCheckedChange={setAgreePrivacy} label="I agree to the Privacy Policy"/>
          <Checkbox checked={subscribeNewsletter} onCheckedChange={setSubscribeNewsletter} label="Subscribe to newsletter" description="Get notified about new features and updates"/>
        </View>

        <View style={{
                padding: 12,
                backgroundColor: canSubmit ? "#dcfce7" : "#fee2e2",
                borderRadius: 8,
            }}>
          <Text style={{ color: canSubmit ? "#166534" : "#991b1b" }}>
            {canSubmit ? "✓ Ready to submit" : "Please agree to the required terms"}
          </Text>
        </View>
      </View>);
    },
};
//# sourceMappingURL=Checkbox.stories.js.map