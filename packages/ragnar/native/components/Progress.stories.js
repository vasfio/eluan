import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Progress, CircularProgress, IndeterminateProgress } from "./Progress";
import { Button } from "./Button";
const meta = {
    title: "Components/Progress",
    component: Progress,
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: { type: "range", min: 0, max: 100, step: 1 },
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
        },
        variant: {
            control: "select",
            options: ["default", "success", "warning", "destructive"],
        },
        showValue: {
            control: "boolean",
        },
        animated: {
            control: "boolean",
        },
    },
};
export default meta;
export const Default = {
    args: {
        value: 60,
    },
};
export const WithLabel = {
    args: {
        value: 75,
        label: "Progress",
        showValue: true,
    },
};
export const Sizes = {
    render: () => (<View style={{ gap: 16 }}>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Small</Text>
        <Progress value={60} size="sm"/>
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Default</Text>
        <Progress value={60} size="default"/>
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Large</Text>
        <Progress value={60} size="lg"/>
      </View>
    </View>),
};
export const Variants = {
    render: () => (<View style={{ gap: 16 }}>
      <Progress value={60} variant="default" label="Default" showValue/>
      <Progress value={80} variant="success" label="Success" showValue/>
      <Progress value={45} variant="warning" label="Warning" showValue/>
      <Progress value={25} variant="destructive" label="Destructive" showValue/>
    </View>),
};
export const CustomFormat = {
    render: () => (<View style={{ gap: 16 }}>
      <Progress value={750} max={1000} label="Storage Used" showValue formatValue={(value, max) => `${value}MB / ${max}MB`}/>
      <Progress value={15} max={20} label="Tasks Completed" showValue formatValue={(value, max) => `${value} of ${max}`}/>
      <Progress value={4500} max={10000} label="XP Progress" showValue formatValue={(value, max) => `${value.toLocaleString()} / ${max.toLocaleString()} XP`}/>
    </View>),
};
export const Animated = {
    render: function AnimatedStory() {
        const [value, setValue] = useState(0);
        useEffect(() => {
            const interval = setInterval(() => {
                setValue((prev) => (prev >= 100 ? 0 : prev + 10));
            }, 1000);
            return () => clearInterval(interval);
        }, []);
        return (<View style={{ gap: 16 }}>
        <Progress value={value} label="Auto-incrementing" showValue/>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button size="sm" onPress={() => setValue(0)}>Reset</Button>
          <Button size="sm" onPress={() => setValue(50)}>50%</Button>
          <Button size="sm" onPress={() => setValue(100)}>100%</Button>
        </View>
      </View>);
    },
};
export const Circular = {
    render: () => (<View style={{ flexDirection: "row", flexWrap: "wrap", gap: 24 }}>
      <CircularProgress value={25}/>
      <CircularProgress value={50}/>
      <CircularProgress value={75}/>
      <CircularProgress value={100}/>
    </View>),
};
export const CircularSizes = {
    render: () => (<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <CircularProgress value={65} size={40} strokeWidth={3}/>
      <CircularProgress value={65} size={64} strokeWidth={4}/>
      <CircularProgress value={65} size={96} strokeWidth={6}/>
      <CircularProgress value={65} size={128} strokeWidth={8}/>
    </View>),
};
export const CircularVariants = {
    render: () => (<View style={{ flexDirection: "row", gap: 16 }}>
      <CircularProgress value={75} variant="default"/>
      <CircularProgress value={75} variant="success"/>
      <CircularProgress value={75} variant="warning"/>
      <CircularProgress value={75} variant="destructive"/>
    </View>),
};
export const CircularWithContent = {
    render: () => (<View style={{ flexDirection: "row", gap: 24 }}>
      <CircularProgress value={85} size={80} showValue={false}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#18181b" }}>85</Text>
        <Text style={{ fontSize: 10, color: "#71717a" }}>Score</Text>
      </CircularProgress>
      <CircularProgress value={60} size={80} showValue={false} variant="warning">
        <Text style={{ fontSize: 16, color: "#18181b" }}>⏰</Text>
        <Text style={{ fontSize: 10, color: "#71717a" }}>3 min</Text>
      </CircularProgress>
    </View>),
};
export const Indeterminate = {
    render: () => (<View style={{ gap: 16 }}>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Default</Text>
        <IndeterminateProgress />
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Success</Text>
        <IndeterminateProgress variant="success"/>
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Small</Text>
        <IndeterminateProgress size="sm"/>
      </View>
      <View>
        <Text style={{ color: "#71717a", marginBottom: 8 }}>Large</Text>
        <IndeterminateProgress size="lg"/>
      </View>
    </View>),
};
export const UploadExample = {
    render: function UploadStory() {
        const [uploading, setUploading] = useState(false);
        const [progress, setProgress] = useState(0);
        const startUpload = () => {
            setUploading(true);
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setUploading(false);
                        return 100;
                    }
                    return prev + Math.random() * 15;
                });
            }, 300);
        };
        return (<View style={{
                padding: 16,
                backgroundColor: "#f4f4f5",
                borderRadius: 12,
                gap: 16,
            }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ fontSize: 24 }}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "500", color: "#18181b" }}>
              document.pdf
            </Text>
            <Text style={{ fontSize: 12, color: "#71717a" }}>2.4 MB</Text>
          </View>
          {progress === 100 && (<Text style={{ color: "#22c55e", fontWeight: "500" }}>✓</Text>)}
        </View>

        {uploading ? (<Progress value={progress} variant={progress === 100 ? "success" : "default"} showValue/>) : progress === 100 ? (<Text style={{ color: "#22c55e", fontSize: 14 }}>Upload complete!</Text>) : (<Button onPress={startUpload}>Upload File</Button>)}
      </View>);
    },
};
export const StepsProgress = {
    render: () => {
        const steps = ["Account", "Profile", "Settings", "Review"];
        const currentStep = 2;
        return (<View style={{ gap: 16 }}>
        <Progress value={(currentStep / steps.length) * 100}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {steps.map((step, index) => (<View key={step} style={{ alignItems: "center" }}>
              <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: index < currentStep ? "#18181b" : index === currentStep ? "#71717a" : "#e4e4e7",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 4,
                }}>
                <Text style={{ color: index <= currentStep ? "#fafafa" : "#71717a", fontSize: 12 }}>
                  {index < currentStep ? "✓" : index + 1}
                </Text>
              </View>
              <Text style={{
                    fontSize: 12,
                    color: index <= currentStep ? "#18181b" : "#71717a",
                }}>
                {step}
              </Text>
            </View>))}
        </View>
      </View>);
    },
};
//# sourceMappingURL=Progress.stories.js.map