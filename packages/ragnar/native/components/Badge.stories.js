import React from "react";
import { View, Text } from "react-native";
import { Badge, NotificationBadge } from "./Badge";
const meta = {
    title: "Components/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "secondary", "destructive", "outline", "success", "warning"],
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
        },
        dot: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    args: {
        children: "Badge",
        variant: "default",
    },
};
export const Variants = {
    render: () => (<View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </View>),
};
export const Sizes = {
    render: () => (<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </View>),
};
export const Dots = {
    render: () => (<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Badge dot variant="default"/>
      <Badge dot variant="success"/>
      <Badge dot variant="warning"/>
      <Badge dot variant="destructive"/>
      <Badge dot size="sm" variant="success"/>
      <Badge dot size="lg" variant="destructive"/>
    </View>),
};
export const WithStatus = {
    render: () => (<View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Badge variant="success" size="sm">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Badge dot variant="success" size="sm"/>
            <Text style={{ color: "#fafafa", fontSize: 12 }}>Online</Text>
          </View>
        </Badge>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Badge variant="warning" size="sm">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Badge dot variant="warning" size="sm"/>
            <Text style={{ color: "#18181b", fontSize: 12 }}>Away</Text>
          </View>
        </Badge>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Badge variant="secondary" size="sm">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Badge dot variant="secondary" size="sm"/>
            <Text style={{ color: "#18181b", fontSize: 12 }}>Offline</Text>
          </View>
        </Badge>
      </View>
    </View>),
};
export const NotificationBadges = {
    render: () => (<View style={{ flexDirection: "row", gap: 24 }}>
      <NotificationBadge count={3}>
        <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#e4e4e7",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
          <Text>🔔</Text>
        </View>
      </NotificationBadge>

      <NotificationBadge count={99}>
        <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#e4e4e7",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
          <Text>✉️</Text>
        </View>
      </NotificationBadge>

      <NotificationBadge count={150} max={99}>
        <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#e4e4e7",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
          <Text>💬</Text>
        </View>
      </NotificationBadge>

      <NotificationBadge dot>
        <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#e4e4e7",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
          <Text>⚙️</Text>
        </View>
      </NotificationBadge>
    </View>),
};
export const NotificationColors = {
    render: () => (<View style={{ flexDirection: "row", gap: 24 }}>
      <NotificationBadge count={5} color="destructive">
        <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#e4e4e7",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
          <Text>🔴</Text>
        </View>
      </NotificationBadge>

      <NotificationBadge count={5} color="success">
        <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#e4e4e7",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
          <Text>🟢</Text>
        </View>
      </NotificationBadge>

      <NotificationBadge count={5} color="default">
        <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#e4e4e7",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        }}>
          <Text>⚫</Text>
        </View>
      </NotificationBadge>
    </View>),
};
export const InContext = {
    render: () => (<View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 16, color: "#18181b" }}>React Native</Text>
        <Badge variant="secondary" size="sm">v0.73</Badge>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 16, color: "#18181b" }}>Build Status</Text>
        <Badge variant="success" size="sm">Passing</Badge>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 16, color: "#18181b" }}>New Feature</Text>
        <Badge variant="warning" size="sm">Beta</Badge>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 16, color: "#18181b" }}>Deprecated API</Text>
        <Badge variant="destructive" size="sm">Removed</Badge>
      </View>
    </View>),
};
//# sourceMappingURL=Badge.stories.js.map