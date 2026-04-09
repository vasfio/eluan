"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  BaseShaderProps,
  ShaderPreset,
  SHADER_PRESETS,
  PRESET_COLORS,
  VERTEX_SHADER_DEFAULT,
  hexToVec3,
} from "./types"

export interface ShaderCanvasOGLProps
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
}

/**
 * OGL-based shader canvas - lightweight WebGL shader renderer
 * Best for: 2D effects, backgrounds, simple animations
 */
const ShaderCanvasOGL = React.forwardRef<HTMLDivElement, ShaderCanvasOGLProps>(
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
      onReady,
      onFrame,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const rendererRef = React.useRef<OGLRenderer | null>(null)
    const rafRef = React.useRef<number>(0)
    const mouseRef = React.useRef({ x: 0.5, y: 0.5 })
    const timeRef = React.useRef(0)

    // Resolve colors (memoized to prevent infinite re-render loops)
    const resolvedColors = colors || PRESET_COLORS[preset]
    const color1 = React.useMemo(() => hexToVec3(resolvedColors[0] || "#ffffff"), [resolvedColors[0]])
    const color2 = React.useMemo(() => hexToVec3(resolvedColors[1] || resolvedColors[0] || "#ffffff"), [resolvedColors[1], resolvedColors[0]])
    const color3 = React.useMemo(() => hexToVec3(resolvedColors[2] || resolvedColors[0] || "#ffffff"), [resolvedColors[2], resolvedColors[0]])
    const color4Vec = React.useMemo(() => hexToVec3(color4 || resolvedColors[3] || resolvedColors[0] || "#ffffff"), [color4, resolvedColors[3], resolvedColors[0]])

    // Resolve shader (memoized to prevent effect re-runs)
    const frag = React.useMemo(() => fragmentShader || SHADER_PRESETS[preset], [fragmentShader, preset])
    const vert = React.useMemo(() => vertexShader || VERTEX_SHADER_DEFAULT, [vertexShader])

    // Quality settings
    const qualityRatio = quality === "low" ? 0.5 : quality === "high" ? 1 : 0.75
    const dpr = (pixelRatio || (typeof window !== "undefined" ? window.devicePixelRatio : 1)) * qualityRatio

    // Stable callback refs
    const onReadyRef = React.useRef(onReady)
    onReadyRef.current = onReady
    const onFrameRef = React.useRef(onFrame)
    onFrameRef.current = onFrame

    React.useEffect(() => {
      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return

      let gl: WebGLRenderingContext | null = null
      let program: WebGLProgram | null = null
      let positionBuffer: WebGLBuffer | null = null
      let uvBuffer: WebGLBuffer | null = null

      const init = () => {
        gl = canvas.getContext("webgl", {
          alpha: true,
          antialias: false,
          premultipliedAlpha: false,
        })
        if (!gl) {
          console.warn("WebGL not supported")
          return
        }

        // Create shaders
        const vertShader = gl.createShader(gl.VERTEX_SHADER)!
        gl.shaderSource(vertShader, vert)
        gl.compileShader(vertShader)

        if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
          console.error("Vertex shader error:", gl.getShaderInfoLog(vertShader))
          return
        }

        const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!
        gl.shaderSource(fragShader, frag)
        gl.compileShader(fragShader)

        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
          console.error("Fragment shader error:", gl.getShaderInfoLog(fragShader))
          return
        }

        // Create program
        program = gl.createProgram()!
        gl.attachShader(program, vertShader)
        gl.attachShader(program, fragShader)
        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error("Program link error:", gl.getProgramInfoLog(program))
          return
        }

        gl.useProgram(program)

        // Create geometry (full-screen quad)
        const positions = new Float32Array([
          -1, -1,
          1, -1,
          -1, 1,
          1, 1,
        ])

        const uvs = new Float32Array([
          0, 0,
          1, 0,
          0, 1,
          1, 1,
        ])

        positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
        const positionLoc = gl.getAttribLocation(program, "position")
        gl.enableVertexAttribArray(positionLoc)
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

        uvBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)
        const uvLoc = gl.getAttribLocation(program, "uv")
        gl.enableVertexAttribArray(uvLoc)
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0)

        // Enable blending for transparency
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

        rendererRef.current = { gl, program }
        onReadyRef.current?.()
      }

      const resize = () => {
        if (!canvas || !gl) return
        const rect = container.getBoundingClientRect()
        const width = Math.floor(rect.width * dpr)
        const height = Math.floor(rect.height * dpr)
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }

      const render = (time: number) => {
        if (!gl || !program || paused) {
          rafRef.current = requestAnimationFrame(render)
          return
        }

        timeRef.current = time * 0.001 * speed
        onFrameRef.current?.(timeRef.current)

        gl.useProgram(program)

        // Set uniforms
        const setUniform = (name: string, value: number | number[]) => {
          const loc = gl!.getUniformLocation(program!, name)
          if (!loc) return
          if (Array.isArray(value)) {
            if (value.length === 2) gl!.uniform2f(loc, value[0], value[1])
            else if (value.length === 3) gl!.uniform3f(loc, value[0], value[1], value[2])
            else if (value.length === 4) gl!.uniform4f(loc, value[0], value[1], value[2], value[3])
          } else {
            gl!.uniform1f(loc, value)
          }
        }

        setUniform("uTime", timeRef.current)
        setUniform("uResolution", [canvas.width, canvas.height])
        setUniform("uMouse", [mouseRef.current.x, mouseRef.current.y])
        setUniform("uIntensity", intensity)
        setUniform("uColor1", color1 as number[])
        setUniform("uColor2", color2 as number[])
        setUniform("uColor3", color3 as number[])
        setUniform("uColor4", color4Vec as number[])

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        rafRef.current = requestAnimationFrame(render)
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!interactive) return
        const rect = container.getBoundingClientRect()
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: 1 - (e.clientY - rect.top) / rect.height,
        }
      }

      init()
      resize()
      rafRef.current = requestAnimationFrame(render)

      window.addEventListener("resize", resize)
      if (interactive) {
        container.addEventListener("mousemove", handleMouseMove)
      }

      return () => {
        cancelAnimationFrame(rafRef.current)
        window.removeEventListener("resize", resize)
        if (interactive) {
          container.removeEventListener("mousemove", handleMouseMove)
        }
        if (gl) {
          if (positionBuffer) gl.deleteBuffer(positionBuffer)
          if (uvBuffer) gl.deleteBuffer(uvBuffer)
          if (program) gl.deleteProgram(program)
          // Explicitly release WebGL context to avoid hitting browser limits
          const ext = gl.getExtension("WEBGL_lose_context")
          if (ext) ext.loseContext()
        }
        rendererRef.current = null
      }
    }, [frag, vert, speed, interactive, intensity, paused, dpr, color1, color2, color3, color4Vec])

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
      </div>
    )
  }
)
ShaderCanvasOGL.displayName = "ShaderCanvasOGL"

interface OGLRenderer {
  gl: WebGLRenderingContext
  program: WebGLProgram
}

export { ShaderCanvasOGL }
