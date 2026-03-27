import React from "react";
import { View, Text } from "react-native";
import { ScrollView, KeyboardAwareScrollView, HorizontalScrollView, EmptyScrollView, } from "./ScrollView";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Button } from "./Button";
const meta = {
    title: "Layout/ScrollView",
    component: ScrollView,
    tags: ["autodocs"],
    argTypes: {
        showsIndicators: {
            control: "boolean",
        },
        padding: {
            control: "number",
        },
    },
};
export default meta;
export const Default = {
    render: () => (<View style={{ height: 300, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8 }}>
      <ScrollView padding={16}>
        {Array.from({ length: 10 }).map((_, i) => (<View key={i} style={{
                padding: 16,
                backgroundColor: "#f4f4f5",
                borderRadius: 8,
                marginBottom: 8,
            }}>
            <Text style={{ color: "#18181b" }}>Item {i + 1}</Text>
          </View>))}
      </ScrollView>
    </View>),
};
export const WithPadding = {
    render: () => (<View style={{ height: 250, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8 }}>
      <ScrollView padding={24} backgroundColor="#f4f4f5">
        <Text style={{ color: "#18181b", marginBottom: 16 }}>
          This ScrollView has 24px padding on all sides.
        </Text>
        {Array.from({ length: 6 }).map((_, i) => (<View key={i} style={{
                padding: 12,
                backgroundColor: "#ffffff",
                borderRadius: 8,
                marginBottom: 8,
            }}>
            <Text style={{ color: "#18181b" }}>Content Item {i + 1}</Text>
          </View>))}
      </ScrollView>
    </View>),
};
export const HideIndicators = {
    render: () => (<View style={{ height: 200, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8 }}>
      <ScrollView showsIndicators={false} padding={16}>
        {Array.from({ length: 8 }).map((_, i) => (<View key={i} style={{
                padding: 12,
                backgroundColor: "#f4f4f5",
                borderRadius: 8,
                marginBottom: 8,
            }}>
            <Text style={{ color: "#18181b" }}>No scroll indicators visible</Text>
          </View>))}
      </ScrollView>
    </View>),
};
export const Horizontal = {
    render: () => (<View style={{ height: 180 }}>
      <Text style={{ color: "#71717a", marginBottom: 8, paddingHorizontal: 16 }}>
        Horizontal ScrollView
      </Text>
      <HorizontalScrollView itemGap={12}>
        {Array.from({ length: 8 }).map((_, i) => (<View key={i} style={{
                width: 120,
                height: 120,
                backgroundColor: "#f4f4f5",
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Text style={{ fontSize: 24 }}>📦</Text>
            <Text style={{ color: "#18181b", marginTop: 8 }}>Item {i + 1}</Text>
          </View>))}
      </HorizontalScrollView>
    </View>),
};
export const HorizontalWithSnapping = {
    render: () => (<View style={{ height: 200 }}>
      <Text style={{ color: "#71717a", marginBottom: 8, paddingHorizontal: 16 }}>
        Snap to Items (300px width)
      </Text>
      <HorizontalScrollView itemGap={16} snapToItems itemWidth={300}>
        {["Feature 1", "Feature 2", "Feature 3", "Feature 4"].map((feature, i) => (<View key={i} style={{
                height: 150,
                backgroundColor: `hsl(${i * 60}, 70%, 95%)`,
                borderRadius: 16,
                padding: 20,
                justifyContent: "flex-end",
            }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
              {feature}
            </Text>
            <Text style={{ color: "#71717a", marginTop: 4 }}>
              Swipe to see more cards
            </Text>
          </View>))}
      </HorizontalScrollView>
    </View>),
};
export const EmptyState = {
    render: () => (<View style={{ height: 300, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8 }}>
      <EmptyScrollView isEmpty={true} emptyTitle="No items yet" emptyDescription="Start by adding your first item"/>
    </View>),
};
export const EmptyWithCustomComponent = {
    render: () => (<View style={{ height: 300, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8 }}>
      <EmptyScrollView isEmpty={true} emptyComponent={<View style={{ alignItems: "center", padding: 32 }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📭</Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b" }}>
              Your inbox is empty
            </Text>
            <Text style={{ color: "#71717a", marginTop: 8, textAlign: "center" }}>
              When you receive messages, they'll appear here
            </Text>
            <Button style={{ marginTop: 20 }}>Compose Message</Button>
          </View>}/>
    </View>),
};
export const KeyboardAware = {
    render: () => (<View style={{ height: 350, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8 }}>
      <KeyboardAwareScrollView padding={16}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#18181b", marginBottom: 16 }}>
          Keyboard Aware Form
        </Text>
        <View style={{ gap: 12 }}>
          {["Name", "Email", "Phone", "Address", "City", "Country"].map((field) => (<View key={field}>
              <Text style={{ color: "#71717a", marginBottom: 4 }}>{field}</Text>
              <View style={{
                height: 44,
                borderWidth: 1,
                borderColor: "#e4e4e7",
                borderRadius: 8,
                backgroundColor: "#ffffff",
            }}/>
            </View>))}
        </View>
      </KeyboardAwareScrollView>
    </View>),
};
export const CardList = {
    render: () => (<View style={{ height: 400, backgroundColor: "#f4f4f5" }}>
      <ScrollView paddingVertical={16} paddingHorizontal={16}>
        {[
            { title: "Getting Started", content: "Learn the basics" },
            { title: "Components", content: "Explore our component library" },
            { title: "Theming", content: "Customize the look and feel" },
            { title: "Best Practices", content: "Tips for building great apps" },
        ].map((item, i) => (<Card key={i} style={{ marginBottom: 12 }}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={{ color: "#71717a" }}>{item.content}</Text>
            </CardContent>
          </Card>))}
      </ScrollView>
    </View>),
};
export const ProductGrid = {
    render: () => (<View style={{ height: 400 }}>
      <HorizontalScrollView itemGap={16}>
        {[
            { name: "Shoes", price: "$129", emoji: "👟" },
            { name: "Watch", price: "$299", emoji: "⌚" },
            { name: "Headphones", price: "$199", emoji: "🎧" },
            { name: "Backpack", price: "$89", emoji: "🎒" },
            { name: "Sunglasses", price: "$159", emoji: "🕶️" },
        ].map((product, i) => (<View key={i} style={{
                width: 160,
                backgroundColor: "#ffffff",
                borderRadius: 16,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#e4e4e7",
            }}>
            <View style={{
                height: 120,
                backgroundColor: "#f4f4f5",
                alignItems: "center",
                justifyContent: "center",
            }}>
              <Text style={{ fontSize: 48 }}>{product.emoji}</Text>
            </View>
            <View style={{ padding: 12 }}>
              <Text style={{ fontWeight: "500", color: "#18181b" }}>{product.name}</Text>
              <Text style={{ color: "#71717a", marginTop: 4 }}>{product.price}</Text>
            </View>
          </View>))}
      </HorizontalScrollView>
    </View>),
};
//# sourceMappingURL=ScrollView.stories.js.map