import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Loader2, Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react"

export type MediaRatio = "auto" | "square" | "video" | "portrait" | "wide"
export type MediaRounded = "none" | "sm" | "md" | "lg" | "xl" | "full"

type MediaVariantOptions = {
  ratio?: MediaRatio | null
  rounded?: MediaRounded | null
}

const mediaVariants = (_options?: MediaVariantOptions) => ""

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "className" | "style">,
    MediaVariantOptions {
  fallback?: React.ReactNode
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      ratio = "auto",
      rounded = "md",
      fallback,
      alt,
      onError,
      onLoad,
      ...props
    },
    ref
  ) => {
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const mediaRatio = ratio ?? "auto"
    const mediaRounded = rounded ?? "md"

    if (error && fallback) {
      return (
        <div
          {...stylex.props(
            styles.frame,
            ratioStyles[mediaRatio],
            roundedStyles[mediaRounded],
            styles.fallbackFrame
          )}
        >
          {fallback}
        </div>
      )
    }

    return (
      <div {...stylex.props(styles.frame, ratioStyles[mediaRatio], roundedStyles[mediaRounded])}>
        {loading && (
          <div {...stylex.props(styles.loadingOverlay)}>
            <Loader2 {...stylex.props(styles.spinner)} />
          </div>
        )}
        <img
          ref={ref}
          alt={alt}
          onError={(event) => {
            setError(true)
            onError?.(event)
          }}
          onLoad={(event) => {
            setLoading(false)
            onLoad?.(event)
          }}
          {...props}
          {...stylex.props(styles.media, roundedStyles[mediaRounded])}
        />
      </div>
    )
  }
)
Image.displayName = "Image"

export interface VideoProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "className" | "style">,
    MediaVariantOptions {
  showControls?: boolean
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      ratio = "video",
      rounded = "md",
      showControls = true,
      onTimeUpdate,
      onPlay,
      onPause,
      ...props
    },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [isMuted, setIsMuted] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [controlsVisible, setControlsVisible] = React.useState(false)
    const mediaRatio = ratio ?? "video"
    const mediaRounded = rounded ?? "md"

    React.useImperativeHandle(ref, () => videoRef.current!)

    const togglePlay = () => {
      if (!videoRef.current) return

      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }

    const toggleMute = () => {
      if (!videoRef.current) return

      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }

    const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
      if (videoRef.current) {
        const duration = videoRef.current.duration
        setProgress(duration ? (videoRef.current.currentTime / duration) * 100 : 0)
      }

      onTimeUpdate?.(event)
    }

    const handleFullscreen = () => {
      if (!videoRef.current) return

      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }

    return (
      <div
        onFocusCapture={() => setControlsVisible(true)}
        onBlurCapture={() => setControlsVisible(false)}
        onMouseEnter={() => setControlsVisible(true)}
        onMouseLeave={() => setControlsVisible(false)}
        {...stylex.props(styles.frame, ratioStyles[mediaRatio], roundedStyles[mediaRounded])}
      >
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onPlay={(event) => {
            setIsPlaying(true)
            onPlay?.(event)
          }}
          onPause={(event) => {
            setIsPlaying(false)
            onPause?.(event)
          }}
          {...props}
          {...stylex.props(styles.media)}
        />
        {showControls && (
          <div {...stylex.props(styles.controls, controlsVisible && styles.controlsVisible)}>
            <div {...stylex.props(styles.progressTrack)}>
              <div {...stylex.props(styles.progressFill)} style={{ width: `${progress}%` }} />
            </div>
            <div {...stylex.props(styles.controlRow)}>
              <button
                type="button"
                onClick={togglePlay}
                {...stylex.props(styles.controlButton)}
              >
                {isPlaying ? (
                  <Pause {...stylex.props(styles.controlIcon)} />
                ) : (
                  <Play {...stylex.props(styles.controlIcon)} />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                {...stylex.props(styles.controlButton)}
              >
                {isMuted ? (
                  <VolumeX {...stylex.props(styles.controlIcon)} />
                ) : (
                  <Volume2 {...stylex.props(styles.controlIcon)} />
                )}
              </button>
              <div {...stylex.props(styles.spacer)} />
              <button
                type="button"
                onClick={handleFullscreen}
                {...stylex.props(styles.controlButton)}
              >
                <Maximize {...stylex.props(styles.controlIcon)} />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
Video.displayName = "Video"

const spin = stylex.keyframes({
  to: {
    transform: "rotate(360deg)",
  },
})

const styles = stylex.create({
  frame: {
    overflow: "hidden",
    position: "relative",
  },
  ratioAuto: {
    aspectRatio: "auto",
  },
  ratioSquare: {
    aspectRatio: "1 / 1",
  },
  ratioVideo: {
    aspectRatio: "16 / 9",
  },
  ratioPortrait: {
    aspectRatio: "3 / 4",
  },
  ratioWide: {
    aspectRatio: "21 / 9",
  },
  roundedNone: {
    borderRadius: 0,
  },
  roundedSm: {
    borderRadius: "var(--curves-sm)",
  },
  roundedMd: {
    borderRadius: "var(--curves-md)",
  },
  roundedLg: {
    borderRadius: "var(--curves-lg)",
  },
  roundedXl: {
    borderRadius: "var(--curves-xl)",
  },
  roundedFull: {
    borderRadius: "var(--radius-radius-full)",
  },
  fallbackFrame: {
    alignItems: "center",
    backgroundColor: "var(--container-bg-alt)",
    display: "flex",
    justifyContent: "center",
  },
  loadingOverlay: {
    alignItems: "center",
    backgroundColor: "var(--container-bg-alt)",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  spinner: {
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    color: "var(--container-fg-alt)",
    height: "var(--size-sm)",
    width: "var(--size-sm)",
  },
  media: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  controls: {
    backgroundImage: "linear-gradient(to top, rgb(0 0 0 / 0.6), transparent)",
    bottom: 0,
    left: 0,
    opacity: 0,
    padding: "var(--spacing-md)",
    position: "absolute",
    right: 0,
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  controlsVisible: {
    opacity: 1,
  },
  progressTrack: {
    backgroundColor: "rgb(255 255 255 / 0.3)",
    borderRadius: "var(--radius-radius-full)",
    height: "var(--spacing-xs)",
    marginBottom: "var(--spacing-sm)",
    overflow: "hidden",
    width: "100%",
  },
  progressFill: {
    backgroundColor: "var(--container-fg-inverse)",
    height: "100%",
    transitionDuration: "150ms",
    transitionProperty: "width",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  controlRow: {
    alignItems: "center",
    display: "flex",
    gap: "var(--spacing-sm)",
  },
  controlButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "var(--radius-radius-full)",
    color: "var(--container-fg-inverse)",
    cursor: "pointer",
    padding: "var(--spacing-xxs)",
    ":hover": {
      backgroundColor: "rgb(255 255 255 / 0.2)",
    },
    ":focus": {
      outlineStyle: "none",
    },
    ":focus-visible": {
      boxShadow: "0 0 0 1px var(--container-fg-inverse)",
    },
  },
  controlIcon: {
    height: "var(--size-xs)",
    width: "var(--size-xs)",
  },
  spacer: {
    flex: 1,
  },
})

const ratioStyles = {
  auto: styles.ratioAuto,
  square: styles.ratioSquare,
  video: styles.ratioVideo,
  portrait: styles.ratioPortrait,
  wide: styles.ratioWide,
} satisfies Record<MediaRatio, stylex.StyleXStyles>

const roundedStyles = {
  none: styles.roundedNone,
  sm: styles.roundedSm,
  md: styles.roundedMd,
  lg: styles.roundedLg,
  xl: styles.roundedXl,
  full: styles.roundedFull,
} satisfies Record<MediaRounded, stylex.StyleXStyles>

export { Image, Video, mediaVariants }
