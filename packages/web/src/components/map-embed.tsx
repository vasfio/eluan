import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const mapContainerVariants = cva("relative overflow-hidden bg-muted", {
  variants: {
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    },
    aspectRatio: {
      auto: "",
      video: "aspect-video",
      square: "aspect-square",
      "4/3": "aspect-[4/3]",
      "3/2": "aspect-[3/2]",
    },
  },
  defaultVariants: {
    rounded: "lg",
    aspectRatio: "video",
  },
})

// Google Maps embed
export interface GoogleMapEmbedProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement>,
    VariantProps<typeof mapContainerVariants> {
  /**
   * Google Maps embed API key
   */
  apiKey?: string
  /**
   * Place query (address or place name)
   */
  query: string
  /**
   * Zoom level (1-21)
   * @default 15
   */
  zoom?: number
  /**
   * Map type
   * @default "roadmap"
   */
  mapType?: "roadmap" | "satellite"
  /**
   * Container className
   */
  containerClassName?: string
}

const GoogleMapEmbed = React.forwardRef<HTMLIFrameElement, GoogleMapEmbedProps>(
  (
    {
      className,
      containerClassName,
      rounded,
      aspectRatio,
      apiKey,
      query,
      zoom = 15,
      mapType = "roadmap",
      title = "Google Map",
      ...props
    },
    ref
  ) => {
    const encodedQuery = encodeURIComponent(query)
    const src = apiKey
      ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedQuery}&zoom=${zoom}&maptype=${mapType}`
      : `https://maps.google.com/maps?q=${encodedQuery}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`

    return (
      <div
        className={cn(
          mapContainerVariants({ rounded, aspectRatio }),
          containerClassName
        )}
      >
        <iframe
          ref={ref}
          src={src}
          title={title}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn("h-full w-full border-0", className)}
          {...props}
        />
      </div>
    )
  }
)
GoogleMapEmbed.displayName = "GoogleMapEmbed"

// OpenStreetMap embed
export interface OpenStreetMapEmbedProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement>,
    VariantProps<typeof mapContainerVariants> {
  /**
   * Latitude
   */
  lat: number
  /**
   * Longitude
   */
  lng: number
  /**
   * Zoom level (1-19)
   * @default 15
   */
  zoom?: number
  /**
   * Marker label
   */
  marker?: string
  /**
   * Container className
   */
  containerClassName?: string
}

const OpenStreetMapEmbed = React.forwardRef<
  HTMLIFrameElement,
  OpenStreetMapEmbedProps
>(
  (
    {
      className,
      containerClassName,
      rounded,
      aspectRatio,
      lat,
      lng,
      zoom = 15,
      marker,
      title = "OpenStreetMap",
      ...props
    },
    ref
  ) => {
    const bbox = getBoundingBox(lat, lng, zoom)
    const markerParam = marker
      ? `&marker=${lat}%2C${lng}`
      : ""

    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox.west}%2C${bbox.south}%2C${bbox.east}%2C${bbox.north}&layer=mapnik${markerParam}`

    return (
      <div
        className={cn(
          mapContainerVariants({ rounded, aspectRatio }),
          containerClassName
        )}
      >
        <iframe
          ref={ref}
          src={src}
          title={title}
          loading="lazy"
          className={cn("h-full w-full border-0", className)}
          {...props}
        />
      </div>
    )
  }
)
OpenStreetMapEmbed.displayName = "OpenStreetMapEmbed"

// Helper function to calculate bounding box
function getBoundingBox(_lat: number, lng: number, zoom: number) {
  const offset = 0.01 * (20 - zoom)

  return {
    west: lng - offset,
    east: lng + offset,
    north: _lat + offset,
    south: _lat - offset,
  }
}



// Map with info card overlay
export interface MapWithInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Address or location name
   */
  address: string
  /**
   * Phone number
   */
  phone?: string
  /**
   * Email
   */
  email?: string
  /**
   * Hours of operation
   */
  hours?: string
  /**
   * Direction link
   */
  directionsUrl?: string
}

const MapWithInfo = React.forwardRef<HTMLDivElement, MapWithInfoProps>(
  (
    {
      className,
      address,
      phone,
      email,
      hours,
      directionsUrl,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <div className="absolute bottom-4 left-4 right-4 rounded-lg border bg-card p-4 shadow-lg sm:left-auto sm:right-4 sm:max-w-xs">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm text-foreground">{address}</p>
          </div>

          {phone && (
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 shrink-0 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href={`tel:${phone}`}
                className="text-sm text-foreground hover:underline"
              >
                {phone}
              </a>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 shrink-0 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${email}`}
                className="text-sm text-foreground hover:underline"
              >
                {email}
              </a>
            </div>
          )}

          {hours && (
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 shrink-0 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-muted-foreground">{hours}</p>
            </div>
          )}

          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Directions
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
)
MapWithInfo.displayName = "MapWithInfo"

export {
  GoogleMapEmbed,
  OpenStreetMapEmbed,
  MapWithInfo,
}

// Static map variant intentionally removed -- only interactive/embedded maps are supported.
