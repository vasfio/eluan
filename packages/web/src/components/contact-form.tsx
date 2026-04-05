"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const contactSectionVariants = cva("w-full", {
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

export interface ContactSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contactSectionVariants> {}

const ContactSection = React.forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(contactSectionVariants({ size }), className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    )
  }
)
ContactSection.displayName = "ContactSection"

const ContactContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid gap-16 lg:grid-cols-2",
      className
    )}
    {...props}
  />
))
ContactContent.displayName = "ContactContent"

const ContactInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col justify-center space-y-8", className)} {...props} />
))
ContactInfo.displayName = "ContactInfo"

const ContactHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
))
ContactHeader.displayName = "ContactHeader"

const ContactTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-3xl font-medium tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl",
      className
    )}
    {...props}
  />
))
ContactTitle.displayName = "ContactTitle"

const ContactDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-lg text-[var(--foregrounds-tertiary)]", className)}
    {...props}
  />
))
ContactDescription.displayName = "ContactDescription"

const ContactDetails = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
))
ContactDetails.displayName = "ContactDetails"

export interface ContactDetailItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label: string
  value: string
  href?: string
}

const ContactDetailItem = React.forwardRef<HTMLDivElement, ContactDetailItemProps>(
  ({ className, icon, label, value, href, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start gap-4", className)}
      {...props}
    >
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-secondary)]">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-[var(--foregrounds-tertiary)]">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-[var(--foregrounds-primary)] hover:text-[var(--action-primary-bg)] hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-[var(--foregrounds-primary)]">{value}</p>
        )}
      </div>
    </div>
  )
)
ContactDetailItem.displayName = "ContactDetailItem"

const ContactSocials = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-3", className)} {...props} />
))
ContactSocials.displayName = "ContactSocials"

export interface ContactSocialLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
}

const ContactSocialLink = React.forwardRef<HTMLAnchorElement, ContactSocialLinkProps>(
  ({ className, label, children, ...props }, ref) => (
    <a
      ref={ref}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-tertiary)] transition-colors hover:bg-[var(--action-primary-bg)] hover:text-[var(--action-primary-fg)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
)
ContactSocialLink.displayName = "ContactSocialLink"

// Contact form
const contactFormVariants = cva("space-y-8", {
  variants: {
    variant: {
      default: "",
      card: "rounded-2xl border border-[var(--container-border)]/50 bg-[var(--container-bg)] p-8 md:p-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ContactFormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof contactFormVariants> {}

const ContactForm = React.forwardRef<HTMLFormElement, ContactFormProps>(
  ({ className, variant, ...props }, ref) => (
    <form
      ref={ref}
      className={cn(contactFormVariants({ variant }), className)}
      {...props}
    />
  )
)
ContactForm.displayName = "ContactForm"

const ContactFormRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid gap-4 sm:grid-cols-2", className)}
    {...props}
  />
))
ContactFormRow.displayName = "ContactFormRow"

const ContactFormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
ContactFormField.displayName = "ContactFormField"

const ContactFormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-[var(--foregrounds-primary)]", className)}
    {...props}
  >
    {children}
    {required && <span className="ml-1 text-[var(--negative-fg)]">*</span>}
  </label>
))
ContactFormLabel.displayName = "ContactFormLabel"

const ContactFormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-lg border border-[var(--container-border)]/60 bg-[var(--container-bg)] px-4 py-2 text-sm text-[var(--foregrounds-primary)] placeholder:text-[var(--foregrounds-tertiary)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--action-primary-bg)] focus:border-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
      className
    )}
    {...props}
  />
))
ContactFormInput.displayName = "ContactFormInput"

const ContactFormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-lg border border-[var(--container-border)]/60 bg-[var(--container-bg)] px-4 py-3 text-sm text-[var(--foregrounds-primary)] placeholder:text-[var(--foregrounds-tertiary)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--action-primary-bg)] focus:border-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
      className
    )}
    {...props}
  />
))
ContactFormTextarea.displayName = "ContactFormTextarea"

const ContactFormSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-lg border border-[var(--container-border)]/60 bg-[var(--container-bg)] px-4 py-2 text-sm text-[var(--foregrounds-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--action-primary-bg)] focus:border-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
      className
    )}
    {...props}
  />
))
ContactFormSelect.displayName = "ContactFormSelect"

const ContactFormError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--negative-fg)]", className)}
    {...props}
  />
))
ContactFormError.displayName = "ContactFormError"

const ContactFormSuccess = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-lg bg-[var(--positive-bg)] p-4 text-[var(--positive-fg)]",
      className
    )}
    {...props}
  />
))
ContactFormSuccess.displayName = "ContactFormSuccess"

export {
  ContactSection,
  ContactContent,
  ContactInfo,
  ContactHeader,
  ContactTitle,
  ContactDescription,
  ContactDetails,
  ContactDetailItem,
  ContactSocials,
  ContactSocialLink,
  ContactForm,
  ContactFormRow,
  ContactFormField,
  ContactFormLabel,
  ContactFormInput,
  ContactFormTextarea,
  ContactFormSelect,
  ContactFormError,
  ContactFormSuccess,
}
