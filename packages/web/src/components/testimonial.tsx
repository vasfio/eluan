import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star, Quote } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@ragnar/core"

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
          <Quote className="mb-4 h-6 w-6 text-[var(--backgrounds-quaternary)]" />
        )}
        <div className="mb-6 text-base font-normal leading-relaxed text-[var(--foregrounds-secondary)]">{children}</div>
        {rating !== undefined && (
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < rating
                    ? "fill-[var(--cautionary-main)] text-[var(--cautionary-main)]"
                    : "text-[var(--backgrounds-quaternary)]"
                )}
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            {author.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
            <AvatarFallback className="bg-[var(--backgrounds-tertiary)] text-xs text-[var(--foregrounds-tertiary)]">
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-normal text-[var(--foregrounds-primary)]">{author.name}</span>
            {(author.title || author.company) && (
              <span className="text-sm text-[var(--foregrounds-tertiary)]">
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
            "rounded-2xl border border-[var(--container-border)]/60 bg-[var(--container-bg)] p-6 transition-all duration-300 hover:shadow-md hover:shadow-black/[0.03]",
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
            "rounded-2xl border border-[var(--container-border)]/60 bg-[var(--container-bg)] p-8 md:p-12",
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
        className={cn("grid gap-6", gridCols[columns], className)}
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
            <div key={index} className="w-full shrink-0 px-4">
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
        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                index === currentIndex
                  ? "h-2.5 w-8 bg-[var(--action-primary-bg)]"
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
