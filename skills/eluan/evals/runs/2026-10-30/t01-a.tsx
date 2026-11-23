"use client";

import * as React from "react";
import { CircleAlert } from "lucide-react";
import {
  Banner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Checkbox,
  EmailInput,
  FormLabel,
  Input,
  PasswordInput,
  Spinner,
  Typography,
} from "@eluan/core";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SignupValues {
  name: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

export type SignupField = keyof SignupValues;

export type SignupErrors = Partial<Record<SignupField, string>>;

/**
 * What `onSubmit` may return when the server rejects the signup.
 * Resolve with nothing (or redirect) on success.
 */
export interface SignupSubmitResult {
  /** Per-field messages, e.g. `{ email: "An account with this email already exists." }`. */
  fieldErrors?: SignupErrors;
  /** A message about the submission as a whole. */
  formError?: string;
}

export interface SignupFormProps {
  /**
   * Receives trimmed values once client-side validation passes. Throwing (or
   * rejecting) shows a generic error; return `SignupSubmitResult` to show
   * specific server-side messages.
   */
  onSubmit: (
    values: SignupValues,
  ) => SignupSubmitResult | void | Promise<SignupSubmitResult | void>;
  termsHref?: string;
  privacyHref?: string;
}

// ─── Validation ─────────────────────────────────────────────────────────────

/**
 * Shared by the PasswordInput strength checklist and our own validation, so
 * the checklist the user sees and the rule we enforce can't drift apart.
 */
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** DOM order — the first invalid field in this list receives focus. */
const FIELD_ORDER: readonly SignupField[] = ["name", "email", "password", "acceptedTerms"];

const INITIAL_VALUES: SignupValues = {
  name: "",
  email: "",
  password: "",
  acceptedTerms: false,
};

const GENERIC_SUBMIT_ERROR = "We couldn't create your account. Please try again.";

function getPasswordError(password: string): string | undefined {
  const { minLength, requireUppercase, requireLowercase, requireNumbers } = PASSWORD_REQUIREMENTS;
  if (!password) return "Enter a password.";
  if (password.length < minLength) return `Use at least ${minLength} characters.`;
  if (requireUppercase && !/[A-Z]/.test(password)) return "Include at least one uppercase letter.";
  if (requireLowercase && !/[a-z]/.test(password)) return "Include at least one lowercase letter.";
  if (requireNumbers && !/[0-9]/.test(password)) return "Include at least one number.";
  return undefined;
}

function validateSignup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";

  const email = values.email.trim();
  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address, like you@example.com.";

  const passwordError = getPasswordError(values.password);
  if (passwordError) errors.password = passwordError;

  if (!values.acceptedTerms) errors.acceptedTerms = "You need to accept the terms to create an account.";

  return errors;
}

// ─── Layout ─────────────────────────────────────────────────────────────────
// Eluan components take no className/style, so only these plain wrapper
// elements are styled — with semantic tokens, never raw colors.

const formStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "28rem",
};

const stackStyle: React.CSSProperties = {
  display: "grid",
  gap: "var(--spacing-lg)",
};

const fieldStyle: React.CSSProperties = {
  display: "grid",
  gap: "var(--spacing-xs)",
};

const checkboxRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "var(--spacing-sm)",
};

// Nudges the box down onto the label's first line.
const checkboxOffsetStyle: React.CSSProperties = {
  marginTop: "var(--spacing-xxs)",
};

const checkboxTextStyle: React.CSSProperties = {
  display: "grid",
  gap: "var(--spacing-xxs)",
  minWidth: 0,
};

// Same typeset step as <Typography variant="caption">, in the error tone
// (Typography has no destructive tone).
const fieldErrorStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "var(--font-size-step-neg2)",
  lineHeight: "var(--line-height-step-neg2)",
  letterSpacing: "var(--letter-spacing-step-neg2)",
  color: "var(--destructive-fg)",
};

const linkStyle: React.CSSProperties = {
  color: "var(--container-fg)",
  textDecorationLine: "underline",
  textUnderlineOffset: "0.2em",
};

const visuallyHiddenStyle: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} style={fieldErrorStyle}>
      {message}
    </p>
  );
}

/** Opens in a new tab so following it doesn't throw away the half-filled form. */
function ExternalTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
      {children}
      <span style={visuallyHiddenStyle}> (opens in a new tab)</span>
    </a>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

type TextField = "name" | "email" | "password";

/**
 * Account signup: name, email, password (with strength checklist) and a
 * required terms checkbox. Validates on submit, then live per field;
 * empty fields aren't flagged on blur until the user tries to submit.
 */
export default function SignupForm({
  onSubmit,
  termsHref = "/terms",
  privacyHref = "/privacy",
}: SignupFormProps) {
  const baseId = React.useId();
  const ids = React.useMemo(
    () => ({
      heading: `${baseId}-heading`,
      termsDescription: `${baseId}-terms-description`,
      name: `${baseId}-name`,
      email: `${baseId}-email`,
      password: `${baseId}-password`,
      acceptedTerms: `${baseId}-terms`,
    }),
    [baseId],
  );
  const errorId = (field: SignupField) => `${ids[field]}-error`;

  const [values, setValues] = React.useState<SignupValues>(INITIAL_VALUES);
  const [touched, setTouched] = React.useState<Partial<Record<SignupField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState<SignupErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [focusTarget, setFocusTarget] = React.useState<SignupField | null>(null);
  // Guards against a double submit before the disabled state has rendered.
  const submittingRef = React.useRef(false);

  const clientErrors = React.useMemo(() => validateSignup(values), [values]);

  const errorFor = (field: SignupField): string | undefined =>
    serverErrors[field] ??
    (submitAttempted || touched[field] ? clientErrors[field] : undefined);

  // Focus after the commit so the field's aria-describedby already points at
  // its new error message when assistive tech announces it.
  React.useEffect(() => {
    if (!focusTarget) return;
    document.getElementById(ids[focusTarget])?.focus();
    setFocusTarget(null);
  }, [focusTarget, ids]);

  const setField = <K extends SignupField>(field: K, value: SignupValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setServerErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleBlur = (field: TextField) => () => {
    if (values[field] === "") return;
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  };

  const textFieldProps = (field: TextField) => {
    const error = errorFor(field);
    const validationTone: "none" | "destructive" = error ? "destructive" : "none";
    return {
      id: ids[field],
      name: field,
      required: true,
      value: values[field],
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => setField(field, event.target.value),
      onBlur: handleBlur(field),
      validationTone,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId(field) : undefined,
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    setSubmitAttempted(true);
    setServerErrors({});
    setFormError(null);

    const firstInvalid = FIELD_ORDER.find((field) => clientErrors[field]);
    if (firstInvalid) {
      setFocusTarget(firstInvalid);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const result = await onSubmit({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        acceptedTerms: values.acceptedTerms,
      });
      if (result) {
        const fieldErrors = result.fieldErrors ?? {};
        setServerErrors(fieldErrors);
        setFormError(result.formError ?? null);
        const firstServerInvalid = FIELD_ORDER.find((field) => fieldErrors[field]);
        if (firstServerInvalid) setFocusTarget(firstServerInvalid);
      }
    } catch {
      setFormError(GENERIC_SUBMIT_ERROR);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const nameError = errorFor("name");
  const emailError = errorFor("email");
  const passwordError = errorFor("password");
  const termsError = errorFor("acceptedTerms");
  const termsDescribedBy = termsError
    ? `${ids.termsDescription} ${errorId("acceptedTerms")}`
    : ids.termsDescription;

  return (
    <form noValidate onSubmit={handleSubmit} aria-labelledby={ids.heading} style={formStyle}>
      <Card>
        <CardHeader>
          <Typography variant="heading" as="h1" id={ids.heading}>
            Create your account
          </Typography>
          <CardDescription>Enter your details to get started.</CardDescription>
        </CardHeader>

        <CardContent>
          <div style={stackStyle}>
            {formError && (
              <Banner
                variant="destructive"
                role="alert"
                icon={<CircleAlert size={16} aria-hidden="true" />}
              >
                {formError}
              </Banner>
            )}

            <div style={fieldStyle}>
              <FormLabel htmlFor={ids.name}>Name</FormLabel>
              <Input {...textFieldProps("name")} autoComplete="name" />
              <FieldError id={errorId("name")} message={nameError} />
            </div>

            <div style={fieldStyle}>
              <FormLabel htmlFor={ids.email}>Email</FormLabel>
              <EmailInput
                {...textFieldProps("email")}
                autoComplete="email"
                placeholder="you@example.com"
              />
              <FieldError id={errorId("email")} message={emailError} />
            </div>

            <div style={fieldStyle}>
              <FormLabel htmlFor={ids.password}>Password</FormLabel>
              <PasswordInput
                {...textFieldProps("password")}
                autoComplete="new-password"
                showStrengthIndicator
                strengthRequirements={PASSWORD_REQUIREMENTS}
              />
              <FieldError id={errorId("password")} message={passwordError} />
            </div>

            <div style={checkboxRowStyle}>
              <div style={checkboxOffsetStyle}>
                <Checkbox
                  id={ids.acceptedTerms}
                  name="terms"
                  required
                  checked={values.acceptedTerms}
                  onCheckedChange={(checked) => setField("acceptedTerms", checked === true)}
                  aria-invalid={termsError ? true : undefined}
                  aria-describedby={termsDescribedBy}
                />
              </div>
              <div style={checkboxTextStyle}>
                <FormLabel htmlFor={ids.acceptedTerms}>I agree to the terms</FormLabel>
                <Typography variant="caption" tone="muted" as="p" id={ids.termsDescription}>
                  Read the <ExternalTextLink href={termsHref}>Terms of Service</ExternalTextLink> and{" "}
                  <ExternalTextLink href={privacyHref}>Privacy Policy</ExternalTextLink>.
                </Typography>
                <FieldError id={errorId("acceptedTerms")} message={termsError} />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? (
              <>
                <Spinner size="sm" />
                <span>Creating account…</span>
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
