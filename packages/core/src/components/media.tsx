import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const mediaVariants = cva("relative overflow-hidden", {
  variants: {
    ratio: {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      wide: "aspect-[21/9]",
    },
    rounded: {
      none: "",
      sm: "rounded-[var(--curves-sm)]",
      md: "rounded-[var(--curves-md)]",
      lg: "rounded-[var(--curves-lg)]",
      xl: "rounded-[var(--curves-xl)]",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    ratio: "auto",
    rounded: "md",
  },
})

export interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof mediaVariants> {
  fallback?: React.ReactNode
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ratio, rounded, fallback, alt, ...props }, ref) => {
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    if (error && fallback) {
      return (
        <div
          className={cn(
            mediaVariants({ ratio, rounded }),
            "flex items-center justify-center bg-[var(--container-bg-alt)]",
            className
          )}
        >
          {fallback}
        </div>
      )
    }

    return (
      <div className={cn(mediaVariants({ ratio, rounded }), className)}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--container-bg-alt)]">
            <Loader2 className="h-[var(--size-sm)] w-[var(--size-sm)] animate-spin text-[var(--container-fg-alt)]" />
          </div>
        )}
        <img
          ref={ref}
          alt={alt}
          className={cn("h-full w-full object-cover", rounded && mediaVariants({ rounded }))}
          onError={() => setError(true)}
          onLoad={() => setLoading(false)}
          {...props}
        />
      </div>
    )
  }
)
Image.displayName = "Image"

export interface VideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement>,
    VariantProps<typeof mediaVariants> {
  showControls?: boolean
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, ratio = "video", rounded, showControls = true, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [isMuted, setIsMuted] = React.useState(false)
    const [progress, setProgress] = React.useState(0)

    React.useImperativeHandle(ref, () => videoRef.current!)

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progress =
          (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(progress)
      }
    }

    const handleFullscreen = () => {
      if (videoRef.current) {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          videoRef.current.requestFullscreen()
        }
      }
    }

    return (
      <div className={cn(mediaVariants({ ratio, rounded }), "group", className)}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          {...props}
        />
        {showControls && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-[var(--spacing-md)] opacity-0 transition-opacity group-hover:opacity-100">
            <div className="mb-[var(--spacing-sm)] h-[var(--spacing-xs)] w-full overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <button
                type="button"
                onClick={togglePlay}
                className="rounded-full p-1 text-[var(--interactive-fg-inverse)] hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-[var(--size-xs)] w-[var(--size-xs)]" />
                ) : (
                  <Play className="h-[var(--size-xs)] w-[var(--size-xs)]" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="rounded-full p-1 text-[var(--interactive-fg-inverse)] hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="h-[var(--size-xs)] w-[var(--size-xs)]" />
                ) : (
                  <Volume2 className="h-[var(--size-xs)] w-[var(--size-xs)]" />
                )}
              </button>
              <div className="flex-1" />
              <button
                type="button"
                onClick={handleFullscreen}
                className="rounded-full p-[var(--spacing-xxs)] text-[var(--interactive-fg-inverse)] hover:bg-white/20"
              >
                <Maximize className="h-[var(--size-xs)] w-[var(--size-xs)]" />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
Video.displayName = "Video"

export { Image, Video, mediaVariants }
