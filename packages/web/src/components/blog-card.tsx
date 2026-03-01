import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const blogGridVariants = cva("grid gap-8", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
})

export interface BlogGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blogGridVariants> {}

const BlogGrid = React.forwardRef<HTMLDivElement, BlogGridProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(blogGridVariants({ columns }), className)}
      {...props}
    />
  )
)
BlogGrid.displayName = "BlogGrid"

const blogCardVariants = cva(
  "group flex flex-col overflow-hidden rounded-lg transition-shadow",
  {
    variants: {
      variant: {
        default: "bg-card",
        bordered: "border bg-card hover:shadow-md",
        elevated: "bg-card shadow-sm hover:shadow-lg",
        minimal: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "bordered",
    },
  }
)

export interface BlogCardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof blogCardVariants> {
  href?: string
}

const BlogCard = React.forwardRef<HTMLElement, BlogCardProps>(
  ({ className, variant, href, children, ...props }, ref) => {
    const Comp = href ? "a" : "article"

    return (
      <Comp
        ref={ref as React.Ref<HTMLAnchorElement & HTMLElement>}
        href={href}
        className={cn(blogCardVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
BlogCard.displayName = "BlogCard"

export interface BlogCardImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "video" | "square" | "wide"
}

const BlogCardImage = React.forwardRef<HTMLDivElement, BlogCardImageProps>(
  ({ className, aspectRatio = "video", alt, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "wide" && "aspect-[2/1]",
        className
      )}
    >
      {props.src && (
        <img
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          {...props}
        />
      )}
    </div>
  )
)
BlogCardImage.displayName = "BlogCardImage"

const BlogCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col p-4 md:p-6", className)}
    {...props}
  />
))
BlogCardContent.displayName = "BlogCardContent"

const BlogCardMeta = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
      className
    )}
    {...props}
  />
))
BlogCardMeta.displayName = "BlogCardMeta"

const BlogCardCategory = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary",
      className
    )}
    {...props}
  />
))
BlogCardCategory.displayName = "BlogCardCategory"

const BlogCardDate = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time ref={ref} className={cn("text-muted-foreground", className)} {...props} />
))
BlogCardDate.displayName = "BlogCardDate"

const BlogCardReadTime = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("text-muted-foreground", className)} {...props} />
))
BlogCardReadTime.displayName = "BlogCardReadTime"

const BlogCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary",
      className
    )}
    {...props}
  />
))
BlogCardTitle.displayName = "BlogCardTitle"

const BlogCardExcerpt = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mt-2 line-clamp-2 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
BlogCardExcerpt.displayName = "BlogCardExcerpt"

const BlogCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-auto flex items-center gap-3 pt-4",
      className
    )}
    {...props}
  />
))
BlogCardFooter.displayName = "BlogCardFooter"

export interface BlogCardAuthorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BlogCardAuthor = React.forwardRef<HTMLDivElement, BlogCardAuthorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  )
)
BlogCardAuthor.displayName = "BlogCardAuthor"

export interface BlogCardAuthorAvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

const BlogCardAuthorAvatar = React.forwardRef<
  HTMLDivElement,
  BlogCardAuthorAvatarProps
>(({ className, alt, fallback, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-8 w-8 overflow-hidden rounded-full bg-muted",
      className
    )}
  >
    {props.src ? (
      <img alt={alt} className="h-full w-full object-cover" {...props} />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
        {fallback || alt?.charAt(0).toUpperCase()}
      </div>
    )}
  </div>
))
BlogCardAuthorAvatar.displayName = "BlogCardAuthorAvatar"

const BlogCardAuthorName = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
))
BlogCardAuthorName.displayName = "BlogCardAuthorName"

const BlogCardLink = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:underline",
      className
    )}
    {...props}
  >
    {children || "Read more"}
    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </span>
))
BlogCardLink.displayName = "BlogCardLink"

// Featured blog card variant
const BlogCardFeatured = React.forwardRef<
  HTMLElement,
  BlogCardProps
>(({ className, href, children, ...props }, ref) => {
  const Comp = href ? "a" : "article"

  return (
    <Comp
      ref={ref as React.Ref<HTMLAnchorElement & HTMLElement>}
      href={href}
      className={cn(
        "group grid overflow-hidden rounded-lg border bg-card md:grid-cols-2",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
BlogCardFeatured.displayName = "BlogCardFeatured"

export {
  BlogGrid,
  BlogCard,
  BlogCardImage,
  BlogCardContent,
  BlogCardMeta,
  BlogCardCategory,
  BlogCardDate,
  BlogCardReadTime,
  BlogCardTitle,
  BlogCardExcerpt,
  BlogCardFooter,
  BlogCardAuthor,
  BlogCardAuthorAvatar,
  BlogCardAuthorName,
  BlogCardLink,
  BlogCardFeatured,
}
