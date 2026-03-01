import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const faqSectionVariants = cva("w-full", {
  variants: {
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface FAQSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof faqSectionVariants> {}

const FAQSection = React.forwardRef<HTMLDivElement, FAQSectionProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(faqSectionVariants({ size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    )
  }
)
FAQSection.displayName = "FAQSection"

const FAQHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-12 text-center", className)}
    {...props}
  />
))
FAQHeader.displayName = "FAQHeader"

const FAQTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
      className
    )}
    {...props}
  />
))
FAQTitle.displayName = "FAQTitle"

const FAQDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
      className
    )}
    {...props}
  />
))
FAQDescription.displayName = "FAQDescription"

const faqListVariants = cva("mx-auto", {
  variants: {
    variant: {
      default: "divide-y divide-border",
      separated: "space-y-4",
      cards: "space-y-4",
    },
    maxWidth: {
      sm: "max-w-xl",
      md: "max-w-2xl",
      lg: "max-w-3xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    variant: "default",
    maxWidth: "lg",
  },
})

export interface FAQListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof faqListVariants> {}

const FAQList = React.forwardRef<HTMLDivElement, FAQListProps>(
  ({ className, variant, maxWidth, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(faqListVariants({ variant, maxWidth }), className)}
      {...props}
    />
  )
)
FAQList.displayName = "FAQList"

export interface FAQItemProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
}

const FAQItem = React.forwardRef<HTMLDivElement, FAQItemProps>(
  ({ className, defaultOpen = false, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
      <div
        ref={ref}
        className={cn("py-4", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === FAQQuestion) {
              return React.cloneElement(child as React.ReactElement<FAQQuestionProps>, {
                isOpen,
                onToggle: () => setIsOpen(!isOpen),
              })
            }
            if (child.type === FAQAnswer) {
              return React.cloneElement(child as React.ReactElement<FAQAnswerProps>, {
                isOpen,
              })
            }
          }
          return child
        })}
      </div>
    )
  }
)
FAQItem.displayName = "FAQItem"

export interface FAQItemCardProps extends FAQItemProps {}

const FAQItemCard = React.forwardRef<HTMLDivElement, FAQItemCardProps>(
  ({ className, defaultOpen = false, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === FAQQuestion) {
              return React.cloneElement(child as React.ReactElement<FAQQuestionProps>, {
                isOpen,
                onToggle: () => setIsOpen(!isOpen),
              })
            }
            if (child.type === FAQAnswer) {
              return React.cloneElement(child as React.ReactElement<FAQAnswerProps>, {
                isOpen,
              })
            }
          }
          return child
        })}
      </div>
    )
  }
)
FAQItemCard.displayName = "FAQItemCard"

interface FAQQuestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean
  onToggle?: () => void
}

const FAQQuestion = React.forwardRef<HTMLButtonElement, FAQQuestionProps>(
  ({ className, isOpen, onToggle, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between text-left font-medium text-foreground transition-colors hover:text-foreground/80",
        className
      )}
      aria-expanded={isOpen}
      {...props}
    >
      <span className="pr-4">{children}</span>
      <svg
        className={cn(
          "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
)
FAQQuestion.displayName = "FAQQuestion"

interface FAQAnswerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
}

const FAQAnswer = React.forwardRef<HTMLDivElement, FAQAnswerProps>(
  ({ className, isOpen, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid transition-all duration-200",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("pt-4 text-muted-foreground", className)}>
          {children}
        </div>
      </div>
    </div>
  )
)
FAQAnswer.displayName = "FAQAnswer"

const FAQContact = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-12 text-center",
      className
    )}
    {...props}
  />
))
FAQContact.displayName = "FAQContact"

export {
  FAQSection,
  FAQHeader,
  FAQTitle,
  FAQDescription,
  FAQList,
  FAQItem,
  FAQItemCard,
  FAQQuestion,
  FAQAnswer,
  FAQContact,
}
