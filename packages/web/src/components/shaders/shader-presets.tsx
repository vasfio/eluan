"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ShaderCanvasOGL, type ShaderCanvasOGLProps } from "./shader-canvas-ogl"
import type { BaseShaderProps } from "./types"

// ============================================
// Shader Background (wrapper component)
// ============================================

export interface ShaderBackgroundProps
  extends Omit<ShaderCanvasOGLProps, "preset">,
    React.HTMLAttributes<HTMLDivElement> {
  /** Shader preset */
  shader: ShaderCanvasOGLProps["preset"]
  /** Children to render on top */
  children?: React.ReactNode
  /** Overlay opacity (0-1) for better text readability */
  overlay?: number
  /** Overlay color */
  overlayColor?: string
  /** Whether to use fixed positioning */
  fixed?: boolean
}

const ShaderBackground = React.forwardRef<HTMLDivElement, ShaderBackgroundProps>(
  (
    {
      className,
      shader,
      children,
      overlay = 0,
      overlayColor = "black",
      fixed = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          fixed ? "fixed inset-0" : "h-full w-full",
          className
        )}
      >
        <ShaderCanvasOGL
          preset={shader}
          className="absolute inset-0 -z-10"
          {...props}
        />
        {overlay > 0 && (
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundColor: overlayColor,
              opacity: overlay,
            }}
          />
        )}
        {children && (
          <div className="relative z-10 h-full w-full">{children}</div>
        )}
      </div>
    )
  }
)
ShaderBackground.displayName = "ShaderBackground"

// ============================================
// Gradient Shader
// ============================================

export interface ShaderGradientProps extends BaseShaderProps {
  className?: string
  /** Gradient colors (3 colors) */
  colors?: [string, string, string]
}

const ShaderGradient = React.forwardRef<HTMLDivElement, ShaderGradientProps>(
  ({ className, colors = ["#ff0080", "#7928ca", "#0070f3"], ...props }, ref) => (
    <ShaderCanvasOGL
      ref={ref}
      preset="gradient"
      colors={colors}
      className={className}
      {...props}
    />
  )
)
ShaderGradient.displayName = "ShaderGradient"

// ============================================
// Aurora Shader
// ============================================

export interface ShaderAuroraProps extends BaseShaderProps {
  className?: string
  /** Aurora colors (3 colors) */
  colors?: [string, string, string]
}

const ShaderAurora = React.forwardRef<HTMLDivElement, ShaderAuroraProps>(
  ({ className, colors = ["#00ff87", "#60efff", "#7b2dff"], ...props }, ref) => (
    <ShaderCanvasOGL
      ref={ref}
      preset="aurora"
      colors={colors}
      className={className}
      {...props}
    />
  )
)
ShaderAurora.displayName = "ShaderAurora"

// ============================================
// Blob Shader
// ============================================

export interface ShaderBlobProps extends BaseShaderProps {
  className?: string
  /** Blob colors (3 colors) */
  colors?: [string, string, string]
}

const ShaderBlob = React.forwardRef<HTMLDivElement, ShaderBlobProps>(
  ({ className, colors = ["#ff6b6b", "#feca57", "#48dbfb"], ...props }, ref) => (
    <ShaderCanvasOGL
      ref={ref}
      preset="blob"
      colors={colors}
      className={className}
      {...props}
    />
  )
)
ShaderBlob.displayName = "ShaderBlob"

// ============================================
// Noise Shader
// ============================================

export interface ShaderNoiseProps extends BaseShaderProps {
  className?: string
  /** Noise color */
  color?: string
}

const ShaderNoise = React.forwardRef<HTMLDivElement, ShaderNoiseProps>(
  ({ className, color = "#ffffff", intensity = 0.15, ...props }, ref) => (
    <ShaderCanvasOGL
      ref={ref}
      preset="noise"
      colors={[color]}
      intensity={intensity}
      className={className}
      {...props}
    />
  )
)
ShaderNoise.displayName = "ShaderNoise"

// ============================================
// Wave Shader
// ============================================

export interface ShaderWaveProps extends BaseShaderProps {
  className?: string
  /** Wave colors (2 colors) */
  colors?: [string, string]
}

const ShaderWave = React.forwardRef<HTMLDivElement, ShaderWaveProps>(
  ({ className, colors = ["#667eea", "#764ba2"], ...props }, ref) => (
    <ShaderCanvasOGL
      ref={ref}
      preset="wave"
      colors={colors}
      className={className}
      {...props}
    />
  )
)
ShaderWave.displayName = "ShaderWave"

// ============================================
// Mesh Gradient Shader
// ============================================

export interface ShaderMeshProps extends BaseShaderProps {
  className?: string
  /** Mesh gradient colors (4 colors for corners) */
  colors?: [string, string, string, string]
}

const ShaderMesh = React.forwardRef<HTMLDivElement, ShaderMeshProps>(
  (
    {
      className,
      colors = ["#f093fb", "#f5576c", "#4facfe", "#00f2fe"],
      ...props
    },
    ref
  ) => (
    <ShaderCanvasOGL
      ref={ref}
      preset="mesh"
      colors={colors.slice(0, 3)}
      color4={colors[3]}
      className={className}
      {...props}
    />
  )
)
ShaderMesh.displayName = "ShaderMesh"

// ============================================
// Particles Shader
// ============================================

export interface ShaderParticlesProps extends BaseShaderProps {
  className?: string
  /** Particle colors (2 colors) */
  colors?: [string, string]
}

const ShaderParticles = React.forwardRef<HTMLDivElement, ShaderParticlesProps>(
  ({ className, colors = ["#ffffff", "#60efff"], ...props }, ref) => (
    <ShaderCanvasOGL
      ref={ref}
      preset="particles"
      colors={colors}
      className={className}
      {...props}
    />
  )
)
ShaderParticles.displayName = "ShaderParticles"

// ============================================
// Shader Hero Section
// ============================================

export interface ShaderHeroProps extends ShaderBackgroundProps {
  /** Title text */
  title?: string
  /** Subtitle text */
  subtitle?: string
  /** Hero size */
  size?: "sm" | "default" | "lg" | "full"
  /** Content alignment */
  align?: "left" | "center" | "right"
}

const ShaderHero = React.forwardRef<HTMLDivElement, ShaderHeroProps>(
  (
    {
      className,
      shader = "gradient",
      title,
      subtitle,
      size = "default",
      align = "center",
      children,
      overlay = 0.3,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "min-h-[40vh] py-[var(--spacing-3xl)]",
      default: "min-h-[60vh] py-[var(--spacing-4xl)]",
      lg: "min-h-[80vh] py-[var(--spacing-4xl)]",
      full: "min-h-screen py-[var(--spacing-4xl)]",
    }

    const alignClasses = {
      left: "items-start text-left",
      center: "items-center text-center",
      right: "items-end text-right",
    }

    return (
      <ShaderBackground
        ref={ref}
        shader={shader}
        overlay={overlay}
        className={cn(
          "flex flex-col justify-center",
          sizeClasses[size],
          alignClasses[align],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "container mx-auto px-[var(--spacing-md)]",
            align === "center" && "flex flex-col items-center"
          )}
        >
          {title && (
            <h1 className="max-w-4xl text-[var(--font-size-4xl)] font-bold tracking-tight text-white sm:text-[var(--font-size-5xl)] md:text-6xl lg:text-7xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-[var(--spacing-md)] max-w-2xl text-[var(--font-size-lg)] text-white/80 sm:text-[var(--font-size-xl)] md:text-[var(--font-size-2xl)]">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </ShaderBackground>
    )
  }
)
ShaderHero.displayName = "ShaderHero"

// ============================================
// Shader Card
// ============================================

export interface ShaderCardProps
  extends Omit<ShaderBackgroundProps, "children"> {
  /** Card content */
  children?: React.ReactNode
  /** Card padding */
  padding?: "sm" | "default" | "lg"
  /** Border radius */
  rounded?: "sm" | "default" | "lg" | "xl" | "2xl" | "full"
}

const ShaderCard = React.forwardRef<HTMLDivElement, ShaderCardProps>(
  (
    {
      className,
      shader = "mesh",
      children,
      padding = "default",
      rounded = "xl",
      overlay = 0.5,
      intensity = 0.6,
      speed = 0.5,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      sm: "p-[var(--spacing-md)]",
      default: "p-[var(--spacing-md)]",
      lg: "p-[var(--spacing-lg)]",
    }

    const roundedClasses = {
      sm: "rounded-[var(--curves-sm)]",
      default: "rounded",
      lg: "rounded-[var(--curves-lg)]",
      xl: "rounded-[var(--curves-xl)]",
      "2xl": "rounded-[var(--curves-xl)]",
      full: "rounded-full",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          roundedClasses[rounded],
          className
        )}
      >
        <ShaderCanvasOGL
          preset={shader}
          intensity={intensity}
          speed={speed}
          className="absolute inset-0"
          {...props}
        />
        {overlay > 0 && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "black", opacity: overlay }}
          />
        )}
        <div className={cn("relative z-10", paddingClasses[padding])}>
          {children}
        </div>
      </div>
    )
  }
)
ShaderCard.displayName = "ShaderCard"

export {
  ShaderBackground,
  ShaderGradient,
  ShaderAurora,
  ShaderBlob,
  ShaderNoise,
  ShaderWave,
  ShaderMesh,
  ShaderParticles,
  ShaderHero,
  ShaderCard,
}
