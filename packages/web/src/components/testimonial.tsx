import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star, Quote } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@vasf/ragnar-core"

const testimonialVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
        card: "",
        minimal: "",
        featured: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TestimonialProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof testimonialVariants> {
  author: {
    name: string
    title?: string
    company?: string
    avatar?: string
  }
  rating?: number
  showQuoteIcon?: boolean
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  (
    {
      className,
      variant,
      author,
      rating,
      showQuoteIcon = true,
      children,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {showQuoteIcon && variant !== "minimal" && (
          <Quote className="mb-[var(--spacing-md)] h-[var(--size-sm)] w-[var(--size-sm)] text-[color:var(--container-border-alt)]" />
        )}
        <div className="mb-[var(--spacing-md)] text-[length:var(--font-size-base)] font-normal leading-relaxed text-[color:var(--container-fg)]">{children}</div>
        {rating !== undefined && (
          <div className="mb-[var(--spacing-md)] flex gap-[var(--spacing-xs)]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-[var(--size-xxs)] w-[var(--size-xxs)]",
                  i < rating
                    ? "fill-[var(--cautionary-main)] text-[color:var(--cautionary-main)]"
                    : "text-[color:var(--container-border-alt)]"
                )}
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-[var(--spacing-sm)]">
          <Avatar className="h-[var(--size-lg)] w-[var(--size-lg)]">
            {author.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
            <AvatarFallback className="bg-[var(--container-bg-alt)] text-[length:var(--font-size-xs)] text-[color:var(--container-fg-alt)]">
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-normal text-[color:var(--container-fg)]">{author.name}</span>
            {(author.title || author.company) && (
              <span className="text-[length:var(--font-size-sm)] text-[color:var(--container-fg-alt)]">
                {author.title}
                {author.title && author.company && " at "}
                {author.company}
              </span>
            )}
          </div>
        </div>
      </>
    )

    if (variant === "card") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-md)] transition-all duration-300 hover:shadow-md hover:shadow-black/[0.03]",
            className
          )}
          {...props}
        >
          {content}
        </div>
      )
    }

    if (variant === "featured") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-lg)] md:p-[var(--spacing-2xl)]",
            className
          )}
          {...props}
        >
          {content}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {content}
      </div>
    )
  }
)
Testimonial.displayName = "Testimonial"

export interface TestimonialGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3
}

const TestimonialGrid = React.forwardRef<HTMLDivElement, TestimonialGridProps>(
  ({ className, columns = 3, ...props }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    }

    return (
      <div
        ref={ref}
        className={cn("grid gap-[var(--spacing-md)]", gridCols[columns], className)}
        {...props}
      />
    )
  }
)
TestimonialGrid.displayName = "TestimonialGrid"

export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Array<{
    content: React.ReactNode
    author: TestimonialProps["author"]
    rating?: number
  }>
  autoPlay?: boolean
  interval?: number
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, autoPlay = true, interval = 5000, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    React.useEffect(() => {
      if (!autoPlay) return

      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, interval)

      return () => clearInterval(timer)
    }, [autoPlay, interval, testimonials.length])

    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full shrink-0 px-[var(--spacing-md)]">
              <Testimonial
                author={testimonial.author}
                rating={testimonial.rating}
                variant="featured"
                className="mx-auto max-w-3xl"
              >
                {testimonial.content}
              </Testimonial>
            </div>
          ))}
        </div>
        <div className="mt-[var(--spacing-lg)] flex justify-center gap-[var(--spacing-sm)]">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                index === currentIndex
                  ? "h-2.5 w-[var(--size-md)] bg-[var(--action-primary-bg)]"
                  : "h-2.5 w-2.5 bg-[var(--foregrounds-tertiary)]/30 hover:bg-[var(--foregrounds-tertiary)]/60"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { Testimonial, TestimonialGrid, TestimonialCarousel }
