import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star, Quote } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, Avatar, AvatarFallback, AvatarImage } from "@vasf/ragnar-core"

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
          <Quote className="mb-4 h-8 w-8 text-primary/20" />
        )}
        <div className="mb-6 text-lg text-foreground">{children}</div>
        {rating !== undefined && (
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-4">
          <Avatar>
            {author.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
            <AvatarFallback>
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{author.name}</span>
            {(author.title || author.company) && (
              <span className="text-sm text-muted-foreground">
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
        <Card ref={ref} className={cn("", className)} {...props}>
          <CardContent className="pt-6">{content}</CardContent>
        </Card>
      )
    }

    if (variant === "featured") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12",
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
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === currentIndex
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
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
