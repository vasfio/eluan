import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";
const meta = {
    title: "Components/BottomSheet",
    component: BottomSheet,
    tags: ["autodocs"],
    argTypes: {
        snapPoint: {
            control: { type: "range", min: 0.2, max: 0.9, step: 0.1 },
        },
        showHandle: {
            control: "boolean",
        },
        closeOnBackdropPress: {
            control: "boolean",
        },
        enableDrag: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    render: function DefaultStory() {
        const [visible, setVisible] = useState(false);
        return (<View>
        <Button onPress={() => setVisible(true)}>Open Bottom Sheet</Button>

        <BottomSheet visible={visible} onClose={() => setVisible(false)}>
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#18181b" }}>
              Bottom Sheet
            </Text>
            <Text style={{ color: "#71717a" }}>
              This is a bottom sheet. Drag down or tap the backdrop to close it.
            </Text>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </View>
        </BottomSheet>
      </View>);
    },
};
export const DifferentHeights = {
    render: function DifferentHeightsStory() {
        const [visible, setVisible] = useState(false);
        const [snapPoint, setSnapPoint] = useState(0.5);
        const openSheet = (height) => {
            setSnapPoint(height);
            setVisible(true);
        };
        return (<View style={{ gap: 12 }}>
        <Button onPress={() => openSheet(0.3)}>Small (30%)</Button>
        <Button onPress={() => openSheet(0.5)}>Medium (50%)</Button>
        <Button onPress={() => openSheet(0.8)}>Large (80%)</Button>

        <BottomSheet visible={visible} onClose={() => setVisible(false)} snapPoint={snapPoint}>
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
              {snapPoint * 100}% Height Sheet
            </Text>
            <Text style={{ color: "#71717a" }}>
              This sheet takes up {snapPoint * 100}% of the screen height.
            </Text>
          </View>
        </BottomSheet>
      </View>);
    },
};
export const WithoutHandle = {
    render: function WithoutHandleStory() {
        const [visible, setVisible] = useState(false);
        return (<View>
        <Button onPress={() => setVisible(true)}>Open Sheet (No Handle)</Button>

        <BottomSheet visible={visible} onClose={() => setVisible(false)} showHandle={false}>
          <View style={{ gap: 16, paddingTop: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
              No Handle
            </Text>
            <Text style={{ color: "#71717a" }}>
              This sheet doesn't have a drag handle. You can still drag the content or tap the backdrop to close.
            </Text>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </View>
        </BottomSheet>
      </View>);
    },
};
export const NonDismissable = {
    render: function NonDismissableStory() {
        const [visible, setVisible] = useState(false);
        return (<View>
        <Button onPress={() => setVisible(true)}>Open Non-Dismissable Sheet</Button>

        <BottomSheet visible={visible} onClose={() => setVisible(false)} closeOnBackdropPress={false} enableDrag={false}>
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
              Non-Dismissable
            </Text>
            <Text style={{ color: "#71717a" }}>
              This sheet can only be closed by pressing the button below.
              Tapping the backdrop or dragging won't close it.
            </Text>
            <Button onPress={() => setVisible(false)}>Close Sheet</Button>
          </View>
        </BottomSheet>
      </View>);
    },
};
export const WithScrollableContent = {
    render: function ScrollableStory() {
        const [visible, setVisible] = useState(false);
        const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
        return (<View>
        <Button onPress={() => setVisible(true)}>Open Scrollable Sheet</Button>

        <BottomSheet visible={visible} onClose={() => setVisible(false)} snapPoint={0.7}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b", marginBottom: 16 }}>
              Scrollable Content
            </Text>
            <ScrollView style={{ flex: 1 }}>
              {items.map((item) => (<View key={item} style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#e4e4e7",
                }}>
                  <Text style={{ color: "#18181b" }}>{item}</Text>
                </View>))}
            </ScrollView>
          </View>
        </BottomSheet>
      </View>);
    },
};
export const ShareSheet = {
    render: function ShareSheetStory() {
        const [visible, setVisible] = useState(false);
        const shareOptions = [
            { icon: "📧", label: "Email" },
            { icon: "💬", label: "Messages" },
            { icon: "📋", label: "Copy Link" },
            { icon: "🐦", label: "Twitter" },
            { icon: "📘", label: "Facebook" },
            { icon: "💼", label: "LinkedIn" },
        ];
        return (<View>
        <Button onPress={() => setVisible(true)}>Share</Button>

        <BottomSheet visible={visible} onClose={() => setVisible(false)} snapPoint={0.4}>
          <View>
            <Text style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#18181b",
                textAlign: "center",
                marginBottom: 20,
            }}>
              Share
            </Text>
            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 20,
            }}>
              {shareOptions.map((option) => (<View key={option.label} style={{ alignItems: "center", width: 70 }}>
                  <View style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "#f4f4f5",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                }}>
                    <Text style={{ fontSize: 24 }}>{option.icon}</Text>
                  </View>
                  <Text style={{ fontSize: 12, color: "#71717a" }}>{option.label}</Text>
                </View>))}
            </View>
          </View>
        </BottomSheet>
      </View>);
    },
};
export const FilterSheet = {
    render: function FilterSheetStory() {
        const [visible, setVisible] = useState(false);
        return (<View>
        <Button onPress={() => setVisible(true)}>Open Filters</Button>

        <BottomSheet visible={visible} onClose={() => setVisible(false)} snapPoint={0.6}>
          <View style={{ gap: 20 }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
                Filters
              </Text>
              <Button variant="ghost" size="sm" onPress={() => { }}>
                Reset
              </Button>
            </View>

            <View>
              <Text style={{ fontWeight: "500", color: "#18181b", marginBottom: 8 }}>
                Price Range
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <View style={{
                flex: 1,
                padding: 12,
                borderWidth: 1,
                borderColor: "#e4e4e7",
                borderRadius: 8,
            }}>
                  <Text style={{ color: "#71717a" }}>Min</Text>
                </View>
                <View style={{
                flex: 1,
                padding: 12,
                borderWidth: 1,
                borderColor: "#e4e4e7",
                borderRadius: 8,
            }}>
                  <Text style={{ color: "#71717a" }}>Max</Text>
                </View>
              </View>
            </View>

            <View>
              <Text style={{ fontWeight: "500", color: "#18181b", marginBottom: 8 }}>
                Categories
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {["Electronics", "Clothing", "Home", "Sports", "Books"].map((cat) => (<View key={cat} style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: "#f4f4f5",
                    borderRadius: 20,
                }}>
                    <Text style={{ color: "#18181b" }}>{cat}</Text>
                  </View>))}
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
              <Button variant="outline" style={{ flex: 1 }} onPress={() => setVisible(false)}>
                Cancel
              </Button>
              <Button style={{ flex: 1 }} onPress={() => setVisible(false)}>
                Apply Filters
              </Button>
            </View>
          </View>
        </BottomSheet>
      </View>);
    },
};
//# sourceMappingURL=BottomSheet.stories.js.map