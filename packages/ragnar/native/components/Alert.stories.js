import React, { useState } from "react";
import { View, Text } from "react-native";
import { Alert, InlineAlert, AlertBanner } from "./Alert";
import { Button } from "./Button";
const meta = {
    title: "Components/Alert",
    component: Alert,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "info", "success", "warning", "destructive"],
        },
        closable: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    args: {
        title: "Heads up!",
        children: "You can add components and dependencies to your app using the CLI.",
        variant: "default",
    },
};
export const Variants = {
    render: () => (<View style={{ gap: 12 }}>
      <Alert variant="default" title="Default">
        This is a default alert message.
      </Alert>
      <Alert variant="info" title="Info">
        Here's some helpful information for you.
      </Alert>
      <Alert variant="success" title="Success">
        Your action was completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review this before continuing.
      </Alert>
      <Alert variant="destructive" title="Error">
        Something went wrong. Please try again.
      </Alert>
    </View>),
};
export const WithoutTitle = {
    render: () => (<View style={{ gap: 12 }}>
      <Alert variant="info">
        This is an informational alert without a title.
      </Alert>
      <Alert variant="warning">
        Warning message without a title.
      </Alert>
    </View>),
};
export const Closable = {
    render: function ClosableStory() {
        const [visible1, setVisible1] = useState(true);
        const [visible2, setVisible2] = useState(true);
        return (<View style={{ gap: 12 }}>
        {visible1 && (<Alert variant="info" title="Dismissible Alert" closable onClose={() => setVisible1(false)}>
            Click the X to dismiss this alert.
          </Alert>)}
        {visible2 && (<Alert variant="success" title="Success!" closable onClose={() => setVisible2(false)}>
            Your changes have been saved.
          </Alert>)}
        {(!visible1 || !visible2) && (<Button size="sm" variant="outline" onPress={() => {
                    setVisible1(true);
                    setVisible2(true);
                }}>
            Reset Alerts
          </Button>)}
      </View>);
    },
};
export const WithAction = {
    render: () => (<View style={{ gap: 12 }}>
      <Alert variant="warning" title="Subscription Expiring" action={{
            label: "Renew Now",
            onPress: () => console.log("Renew pressed"),
        }}>
        Your subscription will expire in 3 days.
      </Alert>
      <Alert variant="info" title="New Update Available" action={{
            label: "Learn More",
            onPress: () => console.log("Learn more pressed"),
        }}>
        Version 2.0 is now available with new features.
      </Alert>
    </View>),
};
export const InlineAlerts = {
    render: () => (<View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, color: "#18181b" }}>Email</Text>
        <View style={{
            height: 44,
            borderWidth: 1,
            borderColor: "#e4e4e7",
            borderRadius: 8,
            justifyContent: "center",
            paddingHorizontal: 12,
        }}>
          <Text style={{ color: "#71717a" }}>invalid-email</Text>
        </View>
        <InlineAlert variant="error">Please enter a valid email address</InlineAlert>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, color: "#18181b" }}>Password</Text>
        <View style={{
            height: 44,
            borderWidth: 1,
            borderColor: "#e4e4e7",
            borderRadius: 8,
            justifyContent: "center",
            paddingHorizontal: 12,
        }}>
          <Text style={{ color: "#71717a" }}>••••••••</Text>
        </View>
        <InlineAlert variant="success">Password meets all requirements</InlineAlert>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, color: "#18181b" }}>Username</Text>
        <View style={{
            height: 44,
            borderWidth: 1,
            borderColor: "#e4e4e7",
            borderRadius: 8,
            justifyContent: "center",
            paddingHorizontal: 12,
        }}>
          <Text style={{ color: "#71717a" }}>john_doe</Text>
        </View>
        <InlineAlert variant="warning">Username may already be taken</InlineAlert>
      </View>
    </View>),
};
export const Banners = {
    render: function BannersStory() {
        const [visible, setVisible] = useState(true);
        return (<View style={{ gap: 12 }}>
        <AlertBanner variant="info">
          New feature: Dark mode is now available!
        </AlertBanner>

        <AlertBanner variant="success" action={{
                label: "View",
                onPress: () => console.log("View pressed"),
            }}>
          Your order has been shipped.
        </AlertBanner>

        <AlertBanner variant="warning">
          Scheduled maintenance tonight at 2 AM EST.
        </AlertBanner>

        {visible && (<AlertBanner variant="destructive" closable onClose={() => setVisible(false)} action={{
                    label: "Retry",
                    onPress: () => console.log("Retry pressed"),
                }}>
            Connection lost. Please check your internet.
          </AlertBanner>)}

        {!visible && (<Button size="sm" variant="outline" onPress={() => setVisible(true)}>
            Show Error Banner
          </Button>)}
      </View>);
    },
};
export const LongContent = {
    render: () => (<Alert variant="info" title="Terms of Service Update">
      We've updated our terms of service to comply with new regulations.
      The key changes include enhanced privacy protections, clearer data usage policies,
      and updated dispute resolution procedures. Please review the full document
      to understand how these changes may affect you.
    </Alert>),
};
export const CustomIcon = {
    render: () => (<View style={{ gap: 12 }}>
      <Alert variant="info" title="Custom Icon" icon={<Text style={{ fontSize: 16 }}>🚀</Text>}>
        You can use custom icons in alerts.
      </Alert>
      <Alert variant="success" title="Achievement Unlocked" icon={<Text style={{ fontSize: 16 }}>🏆</Text>}>
        Congratulations! You've earned a new badge.
      </Alert>
    </View>),
};
//# sourceMappingURL=Alert.stories.js.map