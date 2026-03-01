import { View, Text, StyleSheet, Pressable } from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>@ragnar/native</Text>
        <Text style={styles.subtitle}>Component Library</Text>

        <Link href="/storybook" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Open Storybook</Text>
          </Pressable>
        </Link>

        <Text style={styles.hint}>
          Browse and test all native components on device
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fafafa",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#a1a1aa",
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#fafafa",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonText: {
    color: "#09090b",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    color: "#71717a",
    fontSize: 14,
    textAlign: "center",
  },
})
