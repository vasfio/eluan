import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const blogGridVariants = cva("grid gap-[var(--spacing-lg)]", {
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
  "group flex flex-col overflow-hidden rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.04]",
  {
    variants: {
      variant: {
        default: "",
        bordered: "hover:border-[color:var(--container-border-alt)]",
        elevated: "shadow-sm hover:border-[color:var(--container-border-alt)]",
        minimal: "border-transparent bg-transparent hover:shadow-none hover:translate-y-0",
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
        "relative overflow-hidden bg-[var(--container-bg-alt)]",
        aspectRatio === "video" && "aspect-[16/9]",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "wide" && "aspect-[2/1]",
        className
      )}
    >
      {props.src && (
        <img
          alt={alt}
          className="h-full w-full rounded-[var(--curves-lg)] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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
    className={cn("flex flex-1 flex-col p-[var(--spacing-md)] md:p-[var(--spacing-md)]", className)}
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
      "mb-[var(--spacing-sm)] flex flex-wrap items-center gap-[var(--spacing-sm)] text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]",
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
      "text-[length:var(--font-size-xs)] font-normal uppercase tracking-wider text-[color:var(--action-primary-bg)]",
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
  <time ref={ref} className={cn("text-[color:var(--container-fg-alt)]", className)} {...props} />
))
BlogCardDate.displayName = "BlogCardDate"

const BlogCardReadTime = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("text-[color:var(--container-fg-alt)]", className)} {...props} />
))
BlogCardReadTime.displayName = "BlogCardReadTime"

const BlogCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-[length:var(--font-size-lg)] font-medium leading-tight text-[color:var(--container-fg)]",
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
      "mt-[var(--spacing-sm)] line-clamp-2 text-[length:var(--font-size-sm)] text-[color:var(--container-fg-alt)]",
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
      "mt-auto flex items-center gap-[var(--spacing-sm)] pt-[var(--spacing-md)]",
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
      className={cn("flex items-center gap-[var(--spacing-sm)]", className)}
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
      "h-[var(--size-md)] w-[var(--size-md)] overflow-hidden rounded-full bg-[var(--container-bg-alt)]",
      className
    )}
  >
    {props.src ? (
      <img alt={alt} className="h-full w-full object-cover" {...props} />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-[length:var(--font-size-sm)] font-medium text-[color:var(--container-fg-alt)]">
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
    className={cn("text-[length:var(--font-size-sm)] font-normal text-[color:var(--container-fg)]", className)}
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
      "ml-auto inline-flex items-center gap-[var(--spacing-xs)] text-[length:var(--font-size-sm)] font-normal text-[color:var(--action-primary-bg)] transition-all duration-200 group-hover:gap-[var(--spacing-sm)]",
      className
    )}
    {...props}
  >
    {children || "Read more"}
    <svg
      className="h-[var(--size-xxs)] w-[var(--size-xxs)]"
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
        "group grid overflow-hidden rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] transition-all duration-300 ease-out hover:shadow-lg hover:shadow-black/[0.04] md:grid-cols-2",
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
