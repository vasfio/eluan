import React, { useState } from "react";
import { View, Text } from "react-native";
import { BottomTabBar } from "./BottomTabBar";
const meta = {
    title: "Components/BottomTabBar",
    component: BottomTabBar,
    tags: ["autodocs"],
    argTypes: {
        showLabels: {
            control: "boolean",
        },
    },
};
export default meta;
// Simple icon component for stories
const Icon = ({ name, color }) => (<Text style={{ fontSize: 24, color }}>{name}</Text>);
export const Default = {
    render: function DefaultStory() {
        const [activeTab, setActiveTab] = useState("home");
        const tabs = [
            {
                key: "home",
                label: "Home",
                icon: ({ color }) => <Icon name="🏠" color={color}/>,
            },
            {
                key: "search",
                label: "Search",
                icon: ({ color }) => <Icon name="🔍" color={color}/>,
            },
            {
                key: "notifications",
                label: "Notifications",
                icon: ({ color }) => <Icon name="🔔" color={color}/>,
            },
            {
                key: "profile",
                label: "Profile",
                icon: ({ color }) => <Icon name="👤" color={color}/>,
            },
        ];
        return (<View style={{ flex: 1 }}>
        <View style={{
                flex: 1,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
            }}>
          <Text style={{ color: "#71717a" }}>Active tab: {activeTab}</Text>
        </View>
        <BottomTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab}/>
      </View>);
    },
};
export const WithBadges = {
    render: function WithBadgesStory() {
        const [activeTab, setActiveTab] = useState("inbox");
        const tabs = [
            {
                key: "inbox",
                label: "Inbox",
                icon: ({ color }) => <Icon name="📥" color={color}/>,
                badge: 12,
            },
            {
                key: "sent",
                label: "Sent",
                icon: ({ color }) => <Icon name="📤" color={color}/>,
            },
            {
                key: "drafts",
                label: "Drafts",
                icon: ({ color }) => <Icon name="📝" color={color}/>,
                badge: 3,
            },
            {
                key: "trash",
                label: "Trash",
                icon: ({ color }) => <Icon name="🗑️" color={color}/>,
            },
        ];
        return (<BottomTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab}/>);
    },
};
export const LargeBadge = {
    render: function LargeBadgeStory() {
        const [activeTab, setActiveTab] = useState("messages");
        const tabs = [
            {
                key: "messages",
                label: "Messages",
                icon: ({ color }) => <Icon name="💬" color={color}/>,
                badge: 150, // Shows as 99+
            },
            {
                key: "calls",
                label: "Calls",
                icon: ({ color }) => <Icon name="📞" color={color}/>,
                badge: 5,
            },
            {
                key: "contacts",
                label: "Contacts",
                icon: ({ color }) => <Icon name="👥" color={color}/>,
            },
        ];
        return (<BottomTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab}/>);
    },
};
export const WithoutLabels = {
    render: function WithoutLabelsStory() {
        const [activeTab, setActiveTab] = useState("home");
        const tabs = [
            {
                key: "home",
                label: "Home",
                icon: ({ color }) => <Icon name="🏠" color={color}/>,
            },
            {
                key: "discover",
                label: "Discover",
                icon: ({ color }) => <Icon name="🧭" color={color}/>,
            },
            {
                key: "add",
                label: "Add",
                icon: ({ color }) => <Icon name="➕" color={color}/>,
            },
            {
                key: "activity",
                label: "Activity",
                icon: ({ color }) => <Icon name="❤️" color={color}/>,
                badge: 8,
            },
            {
                key: "profile",
                label: "Profile",
                icon: ({ color }) => <Icon name="👤" color={color}/>,
            },
        ];
        return (<BottomTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} showLabels={false}/>);
    },
};
export const ThreeTabs = {
    render: function ThreeTabsStory() {
        const [activeTab, setActiveTab] = useState("feed");
        const tabs = [
            {
                key: "feed",
                label: "Feed",
                icon: ({ color }) => <Icon name="📰" color={color}/>,
            },
            {
                key: "explore",
                label: "Explore",
                icon: ({ color }) => <Icon name="🔍" color={color}/>,
            },
            {
                key: "settings",
                label: "Settings",
                icon: ({ color }) => <Icon name="⚙️" color={color}/>,
            },
        ];
        return (<BottomTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab}/>);
    },
};
export const FiveTabs = {
    render: function FiveTabsStory() {
        const [activeTab, setActiveTab] = useState("home");
        const tabs = [
            {
                key: "home",
                label: "Home",
                icon: ({ color }) => <Icon name="🏠" color={color}/>,
            },
            {
                key: "search",
                label: "Search",
                icon: ({ color }) => <Icon name="🔍" color={color}/>,
            },
            {
                key: "create",
                label: "Create",
                icon: ({ color }) => <Icon name="➕" color={color}/>,
            },
            {
                key: "reels",
                label: "Reels",
                icon: ({ color }) => <Icon name="🎬" color={color}/>,
            },
            {
                key: "profile",
                label: "Profile",
                icon: ({ color }) => <Icon name="👤" color={color}/>,
            },
        ];
        return (<BottomTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab}/>);
    },
};
export const FullScreenExample = {
    render: function FullScreenExampleStory() {
        const [activeTab, setActiveTab] = useState("home");
        const tabs = [
            {
                key: "home",
                label: "Home",
                icon: ({ color }) => <Icon name="🏠" color={color}/>,
            },
            {
                key: "search",
                label: "Search",
                icon: ({ color }) => <Icon name="🔍" color={color}/>,
            },
            {
                key: "cart",
                label: "Cart",
                icon: ({ color }) => <Icon name="🛒" color={color}/>,
                badge: 3,
            },
            {
                key: "profile",
                label: "Profile",
                icon: ({ color }) => <Icon name="👤" color={color}/>,
            },
        ];
        const content = {
            home: { title: "Home", description: "Welcome to our app!" },
            search: { title: "Search", description: "Find products, brands, and more" },
            cart: { title: "Cart", description: "You have 3 items in your cart" },
            profile: { title: "Profile", description: "Manage your account settings" },
        };
        return (<View style={{ height: 400, backgroundColor: "#f4f4f5" }}>
        <View style={{
                flex: 1,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
            }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#18181b" }}>
            {content[activeTab].title}
          </Text>
          <Text style={{ color: "#71717a", marginTop: 8 }}>
            {content[activeTab].description}
          </Text>
        </View>
        <BottomTabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab}/>
      </View>);
    },
};
//# sourceMappingURL=BottomTabBar.stories.js.map