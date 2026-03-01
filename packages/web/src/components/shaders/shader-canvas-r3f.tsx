"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  BaseShaderProps,
  ShaderPreset,
  SHADER_PRESETS,
  PRESET_COLORS,
  hexToVec3,
} from "./types"

export interface ShaderCanvasR3FProps
  extends BaseShaderProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Shader preset to use */
  preset?: ShaderPreset
  /** Custom fragment shader (overrides preset) */
  fragmentShader?: string
  /** Custom vertex shader */
  vertexShader?: string
  /** Fourth color (for mesh gradient) */
  color4?: string
  /** Enable 3D mode (perspective camera) */
  mode3D?: boolean
}

// Vertex shader for R3F (uses Three.js built-in attributes)
const R3F_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * React Three Fiber shader canvas - full 3D WebGL renderer
 * Best for: 3D effects, complex animations, post-processing
 *
 * Note: Requires three.js as a peer dependency.
 * Install with: npm install three @types/three
 */
const ShaderCanvasR3F = React.forwardRef<HTMLDivElement, ShaderCanvasR3FProps>(
  (
    {
      className,
      preset = "gradient",
      fragmentShader,
      vertexShader,
      speed = 1,
      interactive = true,
      intensity = 0.8,
      colors,
      color4,
      paused = false,
      pixelRatio,
      quality = "medium",
      mode3D = false,
      onReady,
      onFrame,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const rendererRef = React.useRef<any>(null)
    const sceneRef = React.useRef<any>(null)
    const cameraRef = React.useRef<any>(null)
    const materialRef = React.useRef<any>(null)
    const clockRef = React.useRef<any>(null)
    const rafRef = React.useRef<number>(0)
    const mouseRef = React.useRef({ x: 0.5, y: 0.5 })
    const [threeLoaded, setThreeLoaded] = React.useState(false)
    const [loadError, setLoadError] = React.useState<string | null>(null)

    // Resolve colors
    const resolvedColors = colors || PRESET_COLORS[preset]
    const color1 = hexToVec3(resolvedColors[0] || "#ffffff")
    const color2 = hexToVec3(resolvedColors[1] || resolvedColors[0] || "#ffffff")
    const color3 = hexToVec3(resolvedColors[2] || resolvedColors[0] || "#ffffff")
    const color4Vec = hexToVec3(color4 || resolvedColors[3] || resolvedColors[0] || "#ffffff")

    // Resolve shader
    const frag = fragmentShader || SHADER_PRESETS[preset]
    const vert = vertexShader || R3F_VERTEX_SHADER

    // Quality settings
    const qualityRatio = quality === "low" ? 0.5 : quality === "high" ? 1 : 0.75
    const dpr = (pixelRatio || (typeof window !== "undefined" ? window.devicePixelRatio : 1)) * qualityRatio

    React.useEffect(() => {
      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return

      let cleanup: (() => void) | null = null
      let mounted = true

      const init = async () => {
        // Dynamically import Three.js using a variable to avoid static analysis
        let THREE: any
        try {
          const moduleName = "three"
          THREE = await import(/* webpackIgnore: true */ moduleName)
        } catch {
          if (mounted) {
            setLoadError("three.js not installed. Install with: npm install three")
          }
          return
        }

        if (!mounted) return

        const {
          WebGLRenderer,
          Scene,
          OrthographicCamera,
          PerspectiveCamera,
          PlaneGeometry,
          Mesh,
          ShaderMaterial,
          Vector2,
          Vector3,
          Clock,
        } = THREE

        // Create renderer
        const renderer = new WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          premultipliedAlpha: false,
        })
        renderer.setPixelRatio(dpr)
        rendererRef.current = renderer

        // Create scene
        const scene = new Scene()
        sceneRef.current = scene

        // Create camera
        const camera = mode3D
          ? new PerspectiveCamera(75, 1, 0.1, 100)
          : new OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
        camera.position.z = 1
        cameraRef.current = camera

        // Create shader material
        const material = new ShaderMaterial({
          vertexShader: vert,
          fragmentShader: frag,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new Vector2(1, 1) },
            uMouse: { value: new Vector2(0.5, 0.5) },
            uIntensity: { value: intensity },
            uColor1: { value: new Vector3(...color1) },
            uColor2: { value: new Vector3(...color2) },
            uColor3: { value: new Vector3(...color3) },
            uColor4: { value: new Vector3(...color4Vec) },
          },
          transparent: true,
        })
        materialRef.current = material

        // Create mesh
        const geometry = new PlaneGeometry(2, 2)
        const mesh = new Mesh(geometry, material)
        scene.add(mesh)

        // Clock for animation
        const clock = new Clock()
        clockRef.current = clock

        // Resize handler
        const resize = () => {
          if (!mounted) return
          const rect = container.getBoundingClientRect()
          const width = rect.width
          const height = rect.height

          renderer.setSize(width, height)
          material.uniforms.uResolution.value.set(width * dpr, height * dpr)

          if (mode3D && camera.isPerspectiveCamera) {
            camera.aspect = width / height
            camera.updateProjectionMatrix()
          }
        }

        // Animation loop
        const animate = () => {
          if (!mounted) return

          if (!paused) {
            const elapsed = clock.getElapsedTime() * speed
            onFrame?.(elapsed)

            material.uniforms.uTime.value = elapsed
            material.uniforms.uIntensity.value = intensity

            if (interactive) {
              material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
            }

            renderer.render(scene, camera)
          }

          rafRef.current = requestAnimationFrame(animate)
        }

        // Mouse handler
        const handleMouseMove = (e: MouseEvent) => {
          if (!interactive || !mounted) return
          const rect = container.getBoundingClientRect()
          mouseRef.current = {
            x: (e.clientX - rect.left) / rect.width,
            y: 1 - (e.clientY - rect.top) / rect.height,
          }
        }

        resize()
        animate()
        setThreeLoaded(true)
        onReady?.()

        window.addEventListener("resize", resize)
        if (interactive) {
          container.addEventListener("mousemove", handleMouseMove)
        }

        cleanup = () => {
          cancelAnimationFrame(rafRef.current)
          window.removeEventListener("resize", resize)
          if (interactive) {
            container.removeEventListener("mousemove", handleMouseMove)
          }
          renderer.dispose()
          geometry.dispose()
          material.dispose()
        }
      }

      init()

      return () => {
        mounted = false
        cleanup?.()
      }
    }, [frag, vert, speed, interactive, intensity, paused, dpr, mode3D, color1, color2, color3, color4Vec, onReady, onFrame])

    // Update uniforms when intensity changes
    React.useEffect(() => {
      if (materialRef.current) {
        materialRef.current.uniforms.uIntensity.value = intensity
      }
    }, [intensity])

    if (loadError) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative flex h-full w-full items-center justify-center bg-muted text-muted-foreground",
            className
          )}
          {...props}
        >
          <p className="text-sm">{loadError}</p>
        </div>
      )
    }

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn("relative h-full w-full overflow-hidden", className)}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />
        {!threeLoaded && !loadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    )
  }
)
ShaderCanvasR3F.displayName = "ShaderCanvasR3F"

/* eslint-enable @typescript-eslint/no-explicit-any */

export { ShaderCanvasR3F }
