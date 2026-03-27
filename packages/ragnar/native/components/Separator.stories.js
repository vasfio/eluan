import React from "react";
import { View, Text } from "react-native";
import { Separator, LabeledSeparator, Divider, Spacer } from "./Separator";
const meta = {
    title: "Components/Separator",
    component: Separator,
    tags: ["autodocs"],
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
        },
    },
};
export default meta;
export const Horizontal = {
    render: () => (<View style={{ gap: 16 }}>
      <Text style={{ color: "#18181b" }}>Content above</Text>
      <Separator />
      <Text style={{ color: "#18181b" }}>Content below</Text>
    </View>),
};
export const Vertical = {
    render: () => (<View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
      <Text style={{ color: "#18181b" }}>Left</Text>
      <Separator orientation="vertical" style={{ marginHorizontal: 16 }}/>
      <Text style={{ color: "#18181b" }}>Right</Text>
    </View>),
};
export const WithLabel = {
    render: () => (<View style={{ gap: 24 }}>
      <LabeledSeparator label="OR"/>
      <LabeledSeparator label="Continue with" labelPosition="center"/>
      <LabeledSeparator label="Section" labelPosition="left"/>
      <LabeledSeparator label="End" labelPosition="right"/>
    </View>),
};
export const Dividers = {
    render: () => (<View>
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "600", color: "#18181b" }}>Item 1</Text>
        <Text style={{ color: "#71717a" }}>Description for item 1</Text>
      </View>
      <Divider />
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "600", color: "#18181b" }}>Item 2</Text>
        <Text style={{ color: "#71717a" }}>Description for item 2</Text>
      </View>
      <Divider />
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "600", color: "#18181b" }}>Item 3</Text>
        <Text style={{ color: "#71717a" }}>Description for item 3</Text>
      </View>
    </View>),
};
export const InsetDividers = {
    render: () => (<View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
        <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#e4e4e7",
            marginRight: 12,
        }}/>
        <View>
          <Text style={{ fontWeight: "500", color: "#18181b" }}>John Doe</Text>
          <Text style={{ color: "#71717a", fontSize: 12 }}>john@example.com</Text>
        </View>
      </View>
      <Divider inset={64}/>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
        <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#e4e4e7",
            marginRight: 12,
        }}/>
        <View>
          <Text style={{ fontWeight: "500", color: "#18181b" }}>Jane Smith</Text>
          <Text style={{ color: "#71717a", fontSize: 12 }}>jane@example.com</Text>
        </View>
      </View>
      <Divider inset={64}/>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
        <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#e4e4e7",
            marginRight: 12,
        }}/>
        <View>
          <Text style={{ fontWeight: "500", color: "#18181b" }}>Bob Wilson</Text>
          <Text style={{ color: "#71717a", fontSize: 12 }}>bob@example.com</Text>
        </View>
      </View>
    </View>),
};
export const Spacers = {
    render: () => (<View>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f4f4f5", padding: 8 }}>
        <Text style={{ color: "#18181b" }}>Start</Text>
        <Spacer size="sm"/>
        <View style={{ width: 1, height: 16, backgroundColor: "#e4e4e7" }}/>
        <Spacer size="sm"/>
        <Text style={{ color: "#18181b" }}>End</Text>
      </View>

      <Spacer size="md"/>

      <View style={{ flexDirection: "row", backgroundColor: "#f4f4f5", padding: 8 }}>
        <Text style={{ color: "#18181b" }}>Left</Text>
        <Spacer flex/>
        <Text style={{ color: "#18181b" }}>Right</Text>
      </View>

      <Spacer size="lg"/>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1, padding: 16, backgroundColor: "#f4f4f5", borderRadius: 8 }}>
          <Text style={{ color: "#18181b" }}>Card 1</Text>
        </View>
        <View style={{ flex: 1, padding: 16, backgroundColor: "#f4f4f5", borderRadius: 8 }}>
          <Text style={{ color: "#18181b" }}>Card 2</Text>
        </View>
      </View>
    </View>),
};
export const SpacerSizes = {
    render: () => (<View>
      {["xs", "sm", "md", "lg", "xl"].map((size) => (<View key={size}>
          <View style={{
                padding: 8,
                backgroundColor: "#f4f4f5",
                borderRadius: 4,
            }}>
            <Text style={{ color: "#18181b" }}>Size: {size}</Text>
          </View>
          <Spacer size={size}/>
        </View>))}
      <View style={{
            padding: 8,
            backgroundColor: "#f4f4f5",
            borderRadius: 4,
        }}>
        <Text style={{ color: "#18181b" }}>End</Text>
      </View>
    </View>),
};
export const LoginDivider = {
    render: () => (<View style={{ gap: 16 }}>
      <View style={{
            height: 44,
            backgroundColor: "#18181b",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
        <Text style={{ color: "#fafafa", fontWeight: "500" }}>Sign in</Text>
      </View>

      <LabeledSeparator label="OR"/>

      <View style={{
            height: 44,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e4e4e7",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
        }}>
        <Text>🍎</Text>
        <Text style={{ color: "#18181b", fontWeight: "500" }}>Continue with Apple</Text>
      </View>

      <View style={{
            height: 44,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e4e4e7",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
        }}>
        <Text>G</Text>
        <Text style={{ color: "#18181b", fontWeight: "500" }}>Continue with Google</Text>
      </View>
    </View>),
};
//# sourceMappingURL=Separator.stories.js.map