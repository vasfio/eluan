"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const videoContainerVariants = cva(
  "relative overflow-hidden bg-black",
  {
    variants: {
      rounded: {
        none: "",
        sm: "rounded-[var(--curves-sm)]",
        md: "rounded-[var(--curves-md)]",
        lg: "rounded-[var(--curves-lg)]",
        xl: "rounded-[var(--curves-xl)]",
        "2xl": "rounded-[var(--curves-xl)]",
      },
      aspectRatio: {
        video: "aspect-video",
        square: "aspect-square",
        "4/3": "aspect-[4/3]",
        "21/9": "aspect-[21/9]",
        auto: "",
      },
    },
    defaultVariants: {
      rounded: "lg",
      aspectRatio: "video",
    },
  }
)

export interface VideoPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement>,
    VariantProps<typeof videoContainerVariants> {
  /**
   * Video source URL
   */
  src: string
  /**
   * Poster image URL
   */
  poster?: string
  /**
   * Whether to show custom controls
   * @default true
   */
  showControls?: boolean
  /**
   * Whether to show a play button overlay
   * @default true
   */
  showPlayButton?: boolean
  /**
   * Container className
   */
  containerClassName?: string
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      className,
      containerClassName,
      rounded,
      aspectRatio,
      src,
      poster,
      showControls = true,
      showPlayButton = true,
      autoPlay = false,
      muted = false,
      loop = false,
      playsInline = true,
      ...props
    },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(autoPlay)
    const [showOverlay, setShowOverlay] = React.useState(!autoPlay)

    const combinedRef = React.useCallback(
      (node: HTMLVideoElement | null) => {
        (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLVideoElement | null>).current = node
        }
      },
      [ref]
    )

    const handlePlay = () => {
      if (videoRef.current) {
        videoRef.current.play()
        setIsPlaying(true)
        setShowOverlay(false)
      }
    }

    const handlePause = () => {
      if (videoRef.current) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }

    const handleClick = () => {
      if (isPlaying) {
        handlePause()
      } else {
        handlePlay()
      }
    }

    return (
      <div
        className={cn(
          videoContainerVariants({ rounded, aspectRatio }),
          containerClassName
        )}
      >
        <video
          ref={combinedRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={showControls && isPlaying}
          onClick={handleClick}
          onEnded={() => setIsPlaying(false)}
          className={cn("h-full w-full object-cover", className)}
          {...props}
        />

        {/* Play button overlay */}
        {showPlayButton && showOverlay && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
            aria-label="Play video"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform hover:scale-110 md:h-20 md:w-20">
              <svg
                className="ml-[var(--spacing-xs)] h-8 w-8 md:h-10 md:w-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>
    )
  }
)
VideoPlayer.displayName = "VideoPlayer"

// YouTube embed
export interface YouTubeEmbedProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement>,
    VariantProps<typeof videoContainerVariants> {
  /**
   * YouTube video ID
   */
  videoId: string
  /**
   * Whether to autoplay
   * @default false
   */
  autoPlay?: boolean
  /**
   * Container className
   */
  containerClassName?: string
}

const YouTubeEmbed = React.forwardRef<HTMLIFrameElement, YouTubeEmbedProps>(
  (
    {
      className,
      containerClassName,
      rounded,
      aspectRatio,
      videoId,
      autoPlay = false,
      title = "YouTube video",
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = React.useState(false)

    return (
      <div
        className={cn(
          videoContainerVariants({ rounded, aspectRatio }),
          containerClassName
        )}
      >
        {!isLoaded && (
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Play YouTube video"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 md:h-20 md:w-20">
              <svg
                className="ml-[var(--spacing-xs)] h-8 w-8 md:h-10 md:w-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}

        {isLoaded && (
          <iframe
            ref={ref}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={cn("h-full w-full", className)}
            {...props}
          />
        )}
      </div>
    )
  }
)
YouTubeEmbed.displayName = "YouTubeEmbed"

// Vimeo embed
export interface VimeoEmbedProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement>,
    VariantProps<typeof videoContainerVariants> {
  /**
   * Vimeo video ID
   */
  videoId: string
  /**
   * Whether to autoplay
   * @default false
   */
  autoPlay?: boolean
  /**
   * Container className
   */
  containerClassName?: string
}

const VimeoEmbed = React.forwardRef<HTMLIFrameElement, VimeoEmbedProps>(
  (
    {
      className,
      containerClassName,
      rounded,
      aspectRatio,
      videoId,
      autoPlay = false,
      title = "Vimeo video",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          videoContainerVariants({ rounded, aspectRatio }),
          containerClassName
        )}
      >
        <iframe
          ref={ref}
          src={`https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={cn("h-full w-full", className)}
          {...props}
        />
      </div>
    )
  }
)
VimeoEmbed.displayName = "VimeoEmbed"

// Video modal/lightbox
export interface VideoModalProps {
  /**
   * Video source URL
   */
  src: string
  /**
   * Whether the modal is open
   */
  isOpen: boolean
  /**
   * Callback when modal closes
   */
  onClose: () => void
  /**
   * Video title
   */
  title?: string
}

const VideoModal = React.forwardRef<HTMLDivElement, VideoModalProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ src, isOpen, onClose, title: _title = "Video" }, ref) => {
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose()
      }

      if (isOpen) {
        document.addEventListener("keydown", handleEscape)
        document.body.style.overflow = "hidden"
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = ""
      }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-[var(--spacing-md)]"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300"
            aria-label="Close video"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <VideoPlayer
            src={src}
            autoPlay
            showPlayButton={false}
            className="w-full"
          />
        </div>
      </div>
    )
  }
)
VideoModal.displayName = "VideoModal"

export {
  VideoPlayer,
  YouTubeEmbed,
  VimeoEmbed,
  VideoModal,
}
