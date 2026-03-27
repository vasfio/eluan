import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from "./SafeAreaView";
const meta = {
    title: "Layout/SafeAreaView",
    component: SafeAreaView,
    tags: ["autodocs"],
    argTypes: {
        mode: {
            control: "select",
            options: ["padding", "margin"],
        },
    },
};
export default meta;
export const Default = {
    render: () => (<SafeAreaView style={{ backgroundColor: "#f4f4f5" }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
          Safe Area View
        </Text>
        <Text style={{ color: "#71717a", marginTop: 8 }}>
          Content is inset from the edges of the screen, avoiding the notch and home indicator.
        </Text>
      </View>
    </SafeAreaView>),
};
export const SelectiveEdges = {
    render: () => (<View style={{ gap: 16 }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#dcfce7", padding: 16 }}>
        <Text style={{ color: "#166534" }}>Top edge only</Text>
      </SafeAreaView>

      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#dbeafe", padding: 16 }}>
        <Text style={{ color: "#1e40af" }}>Bottom edge only</Text>
      </SafeAreaView>

      <SafeAreaView edges={["top", "bottom"]} style={{ backgroundColor: "#fef3c7", padding: 16 }}>
        <Text style={{ color: "#92400e" }}>Top and bottom edges</Text>
      </SafeAreaView>
    </View>),
};
export const PaddingMode = {
    render: () => (<SafeAreaView mode="padding" style={{ backgroundColor: "#e4e4e7" }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
          Padding Mode
        </Text>
        <Text style={{ color: "#71717a", marginTop: 4 }}>
          Safe area is applied as padding (default).
        </Text>
      </View>
    </SafeAreaView>),
};
export const MarginMode = {
    render: () => (<View style={{ backgroundColor: "#18181b" }}>
      <SafeAreaView mode="margin" style={{ backgroundColor: "#ffffff" }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#18181b" }}>
            Margin Mode
          </Text>
          <Text style={{ color: "#71717a", marginTop: 4 }}>
            Safe area is applied as margin. Notice the dark background showing through.
          </Text>
        </View>
      </SafeAreaView>
    </View>),
};
export const CustomBackground = {
    render: () => (<SafeAreaView backgroundColor="#3b82f6">
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#ffffff" }}>
          Custom Background
        </Text>
        <Text style={{ color: "#dbeafe", marginTop: 8 }}>
          SafeAreaView with a custom blue background color.
        </Text>
      </View>
    </SafeAreaView>),
};
function InsetDisplay() {
    const insets = useSafeAreaInsets();
    return (<View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b", marginBottom: 16 }}>
        Safe Area Insets
      </Text>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#71717a" }}>Top:</Text>
          <Text style={{ color: "#18181b", fontWeight: "500" }}>{insets.top}px</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#71717a" }}>Bottom:</Text>
          <Text style={{ color: "#18181b", fontWeight: "500" }}>{insets.bottom}px</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#71717a" }}>Left:</Text>
          <Text style={{ color: "#18181b", fontWeight: "500" }}>{insets.left}px</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#71717a" }}>Right:</Text>
          <Text style={{ color: "#18181b", fontWeight: "500" }}>{insets.right}px</Text>
        </View>
      </View>
    </View>);
}
export const WithProvider = {
    render: () => (<SafeAreaProvider>
      <View style={{ backgroundColor: "#f4f4f5", borderRadius: 12, overflow: "hidden" }}>
        <InsetDisplay />
      </View>
    </SafeAreaProvider>),
};
export const CustomInsets = {
    render: () => (<SafeAreaProvider insets={{ top: 60, bottom: 40 }}>
      <View style={{ backgroundColor: "#fef3c7", borderRadius: 12, overflow: "hidden" }}>
        <InsetDisplay />
      </View>
    </SafeAreaProvider>),
};
export const AppLayout = {
    render: () => (<View style={{ height: 500, backgroundColor: "#18181b" }}>
      <SafeAreaView style={{ flex: 1 }} backgroundColor="#ffffff">
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#e4e4e7",
        }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
              App Header
            </Text>
          </View>

          {/* Content */}
          <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
            <Text style={{ color: "#71717a", textAlign: "center" }}>
              Main content area with safe area margins
            </Text>
          </View>

          {/* Footer */}
          <View style={{
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: "#e4e4e7",
        }}>
            <Text style={{ color: "#71717a", textAlign: "center" }}>
              Footer content
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>),
};
//# sourceMappingURL=SafeAreaView.stories.js.map