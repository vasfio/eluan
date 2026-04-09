"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const contactSectionVariants = cva("w-full", {
  variants: {
    size: {
      sm: "py-[var(--spacing-2xl)]",
      default: "py-[var(--spacing-3xl)]",
      lg: "py-[var(--spacing-4xl)]",
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
        <div className="container mx-auto px-[var(--spacing-md)]">{children}</div>
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
      "grid gap-[var(--spacing-3xl)] lg:grid-cols-2",
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
  <div ref={ref} className={cn("flex flex-col justify-center space-y-[var(--spacing-lg)]", className)} {...props} />
))
ContactInfo.displayName = "ContactInfo"

const ContactHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-[var(--spacing-md)]", className)} {...props} />
))
ContactHeader.displayName = "ContactHeader"

const ContactTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading text-3xl font-medium tracking-tight text-[var(--container-fg)] sm:text-4xl",
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
    className={cn("text-lg text-[var(--container-fg-alt)]", className)}
    {...props}
  />
))
ContactDescription.displayName = "ContactDescription"

const ContactDetails = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-[var(--spacing-md)]", className)} {...props} />
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
      className={cn("flex items-start gap-[var(--spacing-md)]", className)}
      {...props}
    >
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--curves-lg)] bg-[var(--container-bg-alt)] text-[var(--container-fg)]">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-[var(--container-fg-alt)]">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-[var(--container-fg)] hover:text-[var(--action-primary-bg)] hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-[var(--container-fg)]">{value}</p>
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
  <div ref={ref} className={cn("flex gap-[var(--spacing-sm)]", className)} {...props} />
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
        "flex h-10 w-10 items-center justify-center rounded-[var(--curves-lg)] bg-[var(--container-bg-alt)] text-[var(--container-fg-alt)] transition-colors hover:bg-[var(--action-primary-bg)] hover:text-[var(--action-primary-fg)]",
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
const contactFormVariants = cva("space-y-[var(--spacing-lg)]", {
  variants: {
    variant: {
      default: "",
      card: "rounded-[var(--curves-xl)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]",
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
    className={cn("grid gap-[var(--spacing-md)] sm:grid-cols-2", className)}
    {...props}
  />
))
ContactFormRow.displayName = "ContactFormRow"

const ContactFormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-[var(--spacing-sm)]", className)} {...props} />
))
ContactFormField.displayName = "ContactFormField"

const ContactFormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-[var(--container-fg)]", className)}
    {...props}
  >
    {children}
    {required && <span className="ml-[var(--spacing-xs)] text-[var(--negative-fg)]">*</span>}
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
      "flex h-11 w-full rounded-[var(--curves-lg)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-sm text-[var(--container-fg)] placeholder:text-[var(--container-fg-alt)] focus:outline-none focus:ring-1 focus:ring-[var(--action-primary-bg)] focus:border-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
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
      "flex min-h-[120px] w-full rounded-[var(--curves-lg)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-sm text-[var(--container-fg)] placeholder:text-[var(--container-fg-alt)] focus:outline-none focus:ring-1 focus:ring-[var(--action-primary-bg)] focus:border-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
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
      "flex h-11 w-full rounded-[var(--curves-lg)] border border-[color:var(--container-border-alt)] bg-[var(--container-bg)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-sm text-[var(--container-fg)] focus:outline-none focus:ring-1 focus:ring-[var(--action-primary-bg)] focus:border-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
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
      "flex items-center gap-[var(--spacing-sm)] rounded-[var(--curves-lg)] bg-[var(--positive-bg)] p-[var(--spacing-md)] text-[var(--positive-fg)]",
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
