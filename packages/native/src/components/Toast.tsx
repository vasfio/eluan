import React, { useEffect, useRef, createContext, useContext, useState, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  useColorScheme,
  Animated,
  Pressable,
  Dimensions,
} from "react-native"
import { fontSizes } from "@vasf/ragnar-tokens"
import { sp, curves, getSemanticColors } from "../utils/styles"

export interface ToastProps {
  /** Toast ID */
  id: string
  /** Toast title */
  title: string
  /** Toast description */
  description?: string
  /** Toast variant */
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  /** Duration in ms (0 for persistent) */
  duration?: number
  /** Action button */
  action?: {
    label: string
    onPress: () => void
  }
  /** Called when toast is dismissed */
  onDismiss?: () => void
  /** Container style */
  style?: ViewStyle
}

export function Toast({
  id: _id,
  title,
  description,
  variant = "default",
  duration = 4000,
  action,
  onDismiss,
  style,
}: ToastProps) {
  const colorScheme = useColorScheme() ?? "light"
  const isDark = colorScheme === "dark"
  const colors = getSemanticColors(colorScheme)
  const translateY = useRef(new Animated.Value(-100)).current
  const opacity = useRef(new Animated.Value(0)).current

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.()
    })
  }, [onDismiss, opacity, translateY])

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 60,
        friction: 10,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()

    // Auto dismiss
    if (duration > 0) {
      const timer = setTimeout(() => {
        dismiss()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [dismiss, duration, opacity, translateY])

  const variantStyles = {
    default: {
      container: {
        backgroundColor: isDark ? "#27272a" : "#ffffff",
        borderColor: colors.container.border,
      },
      icon: "ℹ️",
      iconColor: colors.container.fg,
    },
    success: {
      container: {
        backgroundColor: colors.positive.bgSubtle,
        borderColor: isDark ? "#166534" : "#bbf7d0",
      },
      icon: "✓",
      iconColor: colors.positive.bg,
    },
    warning: {
      container: {
        backgroundColor: colors.cautionary.bgSubtle,
        borderColor: isDark ? "#92400e" : "#fde68a",
      },
      icon: "⚠",
      iconColor: colors.cautionary.bg,
    },
    destructive: {
      container: {
        backgroundColor: colors.destructive.bgSubtle,
        borderColor: isDark ? "#991b1b" : "#fecaca",
      },
      icon: "✕",
      iconColor: colors.destructive.bg,
    },
    info: {
      container: {
        backgroundColor: colors.informative.bgSubtle,
        borderColor: isDark ? "#1e40af" : "#bfdbfe",
      },
      icon: "ℹ",
      iconColor: colors.informative.bg,
    },
  }

  const currentVariant = variantStyles[variant]

  return (
    <Animated.View
      style={[
        styles.toast,
        currentVariant.container,
        { transform: [{ translateY }], opacity },
        style,
      ]}
    >
      <View style={styles.toastContent}>
        <Text style={[styles.icon, { color: currentVariant.iconColor }]}>
          {currentVariant.icon}
        </Text>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: colors.container.fg },
            ]}
          >
            {title}
          </Text>
          {description && (
            <Text
              style={[
                styles.description,
                { color: colors.container.fgAlt },
              ]}
            >
              {description}
            </Text>
          )}
        </View>
        {action && (
          <Pressable onPress={action.onPress} style={styles.action}>
            <Text
              style={[
                styles.actionText,
                { color: colors.container.fg },
              ]}
            >
              {action.label}
            </Text>
          </Pressable>
        )}
        <Pressable onPress={dismiss} style={styles.close}>
          <Text style={{ color: colors.interactive.fgAlt, fontSize: 18 }}>
            ×
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  )
}

// Toast context for global toast management
interface ToastContextValue {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id" | "onDismiss">) => string
  removeToast: (id: string) => void
  removeAllToasts: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Convenience methods
export function useToastActions() {
  const { addToast, removeAllToasts } = useToast()

  return {
    toast: (props: Omit<ToastProps, "id" | "onDismiss">) => addToast(props),
    success: (title: string, description?: string) =>
      addToast({ title, description, variant: "success" }),
    error: (title: string, description?: string) =>
      addToast({ title, description, variant: "destructive" }),
    warning: (title: string, description?: string) =>
      addToast({ title, description, variant: "warning" }),
    info: (title: string, description?: string) =>
      addToast({ title, description, variant: "info" }),
    dismiss: removeAllToasts,
  }
}

export interface ToastProviderProps {
  children: React.ReactNode
  /** Position of toasts */
  position?: "top" | "bottom"
  /** Maximum number of visible toasts */
  maxToasts?: number
}

export function ToastProvider({
  children,
  position = "top",
  maxToasts = 3,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = useCallback(
    (toast: Omit<ToastProps, "id" | "onDismiss">) => {
      const id = `toast-${Date.now()}-${Math.random()}`
      setToasts((prev) => {
        const newToasts = [{ ...toast, id }, ...prev]
        return newToasts.slice(0, maxToasts)
      })
      return id
    },
    [maxToasts]
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, removeAllToasts }}
    >
      {children}
      <ToastContainer position={position} toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  position: "top" | "bottom"
  toasts: ToastProps[]
  onDismiss: (id: string) => void
}

function ToastContainer({ position, toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  const { width } = Dimensions.get("window")

  return (
    <View
      style={[
        styles.container,
        position === "top" ? styles.containerTop : styles.containerBottom,
        { width },
      ]}
      pointerEvents="box-none"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: sp.xs,
    gap: sp.xxs,
    zIndex: 9999,
  },
  containerTop: {
    top: 60, // Account for status bar
  },
  containerBottom: {
    bottom: 40,
  },
  toast: {
    width: "100%",
    maxWidth: 400,
    borderRadius: curves.xs,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: sp.xs,
    gap: sp.xxs,
  },
  icon: {
    fontSize: 16,
    marginTop: sp.xxs,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  description: {
    fontSize: fontSizes.xs,
    marginTop: sp.xxs,
  },
  action: {
    paddingHorizontal: sp.xxs,
    paddingVertical: sp.xxs,
    borderRadius: curves.xxs,
  },
  actionText: {
    fontSize: fontSizes.xs,
    fontWeight: "600",
  },
  close: {
    padding: sp.xxs,
  },
})
