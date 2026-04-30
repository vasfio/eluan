import * as React from "react"
import { Globe } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge, Card, CardContent } from "@vasf/ragnar-core"

export interface AICitationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index: number
}

const AICitation = React.forwardRef<HTMLSpanElement, AICitationProps>(
  ({ className, index, ...props }, ref) => (
    <span ref={ref} {...(props as React.HTMLAttributes<HTMLSpanElement>)}>
      <Badge
        variant="informative"
        className={cn(
          "cursor-pointer align-super text-[10px] px-1.5 py-0 h-[var(--size-xxs)] min-w-[var(--size-xxs)] justify-center leading-none",
          className
        )}
        role="button"
        tabIndex={0}
      >
        {index}
      </Badge>
    </span>
  )
)
AICitation.displayName = "AICitation"

export interface AICitationSourceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  url?: string
  domain?: string
  favicon?: string
  snippet?: string
  onNavigate?: () => void
}

const AICitationSource = React.forwardRef<HTMLDivElement, AICitationSourceProps>(
  (
    {
      className,
      title,
      url,
      domain,
      favicon,
      snippet,
      onNavigate,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      clickable={!!onNavigate}
      elevation="none"
      className={cn("overflow-hidden", className)}
      onClick={onNavigate}
      role={onNavigate ? "button" : undefined}
      tabIndex={onNavigate ? 0 : undefined}
      onKeyDown={
        onNavigate
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onNavigate()
              }
            }
          : undefined
      }
      {...props}
    >
      <CardContent className="flex flex-row items-start gap-[var(--spacing-sm)] p-[var(--spacing-sm)]">
        {/* Favicon / Icon */}
        <div className="shrink-0 mt-[var(--spacing-xxs)]">
          {favicon ? (
            <img
              src={favicon}
              alt=""
              className="h-[var(--size-xxs)] w-[var(--size-xxs)] rounded-[var(--curves-sm)] object-cover"
            />
          ) : (
            <Globe className="h-[var(--size-xxs)] w-[var(--size-xxs)] text-[color:var(--container-fg-alt)]" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--container-fg)] truncate">
            {title}
          </span>
          {(url || domain) && (
            <span className="text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] truncate">
              {domain ?? url}
            </span>
          )}
          {snippet && (
            <p className="mt-[var(--spacing-xxs)] text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)] line-clamp-2">
              {snippet}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
)
AICitationSource.displayName = "AICitationSource"

export interface AICitationListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string
}

const AICitationList = React.forwardRef<HTMLDivElement, AICitationListProps>(
  ({ className, heading = "Sources", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[var(--spacing-xs)]", className)}
      {...props}
    >
      {heading && (
        <h4 className="text-[length:var(--font-size-sm)] font-medium text-[color:var(--container-fg)]">
          {heading}
        </h4>
      )}
      {children}
    </div>
  )
)
AICitationList.displayName = "AICitationList"

export { AICitation, AICitationSource, AICitationList }
