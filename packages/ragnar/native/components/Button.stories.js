import React from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";
const meta = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
        },
        disabled: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    args: {
        children: "Button",
        variant: "default",
        size: "default",
    },
};
export const Variants = {
    render: () => (<View style={{ gap: 12 }}>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </View>),
};
export const Sizes = {
    render: () => (<View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Text style={{ color: "#fafafa" }}>★</Text>
      </Button>
    </View>),
};
export const Disabled = {
    render: () => (<View style={{ gap: 12 }}>
      <Button disabled>Disabled Default</Button>
      <Button variant="destructive" disabled>Disabled Destructive</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
    </View>),
};
export const WithIcon = {
    render: () => (<View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ color: "#fafafa" }}>→</Text>
          <Text style={{ color: "#fafafa", fontWeight: "500" }}>Continue</Text>
        </View>
      </Button>
      <Button variant="outline">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ color: "#18181b" }}>+</Text>
          <Text style={{ color: "#18181b", fontWeight: "500" }}>Add Item</Text>
        </View>
      </Button>
    </View>),
};
export const FullWidth = {
    render: () => (<View style={{ gap: 12, width: "100%" }}>
      <Button style={{ width: "100%" }}>Full Width Button</Button>
      <Button variant="outline" style={{ width: "100%" }}>Full Width Outline</Button>
    </View>),
};
//# sourceMappingURL=Button.stories.js.map