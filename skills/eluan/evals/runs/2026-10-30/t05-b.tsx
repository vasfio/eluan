import { useId, useRef, useState, type FormEvent } from "react";
import { CircleAlert } from "lucide-react";
import {
  Banner,
  Button,
  EmailInput,
  FormDescription,
  FormMessage,
  Label,
  PasswordInput,
  Spinner,
} from "@eluan/core";

export interface SignupValues {
  email: string;
  password: string;
}

/**
 * What the server said about a signup attempt.
 * `message` is shown to the user as is, so it must be user-facing copy
 * ("An account with this email already exists."), never a status code.
 */
export type SignupResult = { ok: true } | { ok: false; message?: string };

export interface SignupFormProps {
  /**
   * Sends the signup to the server. Resolve `{ ok: false }` when the server
   * rejects it; throw only for network or other unexpected failures.
   */
  signUp: (values: SignupValues) => Promise<SignupResult>;
}

type Field = keyof SignupValues;
type FieldErrors = Partial<Record<Field, string>>;

const PASSWORD_MIN_LENGTH = 8;
// A format check only; the server decides whether the address is acceptable.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REJECTED_FALLBACK = "We couldn't create your account. Check your details and try again.";
const UNREACHABLE = "We couldn't reach the server. Check your connection and try again.";

const validators: Record<Field, (value: string) => string | undefined> = {
  email(value) {
    if (!value.trim()) return "Enter your email address";
    if (!EMAIL_PATTERN.test(value.trim())) return "Enter an email like name@company.com";
    return undefined;
  },
  password(value) {
    if (!value) return "Enter a password";
    // The FormDescription under the field already states the rule.
    if (value.length < PASSWORD_MIN_LENGTH) return "This password is too short";
    return undefined;
  },
};

const formStyle = { display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" } as const;
const fieldStyle = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;
const actionsStyle = { display: "flex", justifyContent: "flex-end" } as const;
const bannerIconStyle = { width: "var(--size-xxs)", height: "var(--size-xxs)" } as const;

function describedBy(...ids: Array<string | false | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export default function SignupForm({ signUp }: SignupFormProps) {
  const id = useId();
  const ids = {
    email: `${id}-email`,
    emailError: `${id}-email-error`,
    password: `${id}-password`,
    passwordHint: `${id}-password-hint`,
    passwordError: `${id}-password-error`,
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const inputRefs = { email: emailRef, password: passwordRef };

  const [values, setValues] = useState<SignupValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Keep a field error until the value is fixed, but don't raise new ones while typing.
    if (errors[field] && !validators[field](value)) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: Field) {
    // Skip empty fields the user only tabbed through; submit catches those.
    if (values[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](values[field]) }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    // Unmount the previous banner so it never goes stale, and so a repeated
    // rejection is re-inserted and announced again by the alert role.
    setServerError(null);

    const nextErrors: FieldErrors = {
      email: validators.email(values.email),
      password: validators.password(values.password),
    };
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as Field[]).find((field) => nextErrors[field]);
    if (firstInvalid) {
      inputRefs[firstInvalid].current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const result = await signUp({ email: values.email.trim(), password: values.password });
      if (!result.ok) {
        setServerError(result.message?.trim() || REJECTED_FALLBACK);
      }
    } catch {
      setServerError(UNREACHABLE);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={formStyle}>
      {serverError && (
        <Banner
          variant="destructive"
          position="inline"
          role="alert"
          icon={<CircleAlert aria-hidden="true" style={bannerIconStyle} />}
        >
          {serverError}
        </Banner>
      )}

      <div style={fieldStyle}>
        <Label htmlFor={ids.email} required>
          Email
        </Label>
        <EmailInput
          ref={emailRef}
          id={ids.email}
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy(errors.email && ids.emailError)}
        />
        {errors.email && <FormMessage id={ids.emailError}>{errors.email}</FormMessage>}
      </div>

      <div style={fieldStyle}>
        <Label htmlFor={ids.password} required>
          Password
        </Label>
        <PasswordInput
          ref={passwordRef}
          id={ids.password}
          name="password"
          autoComplete="new-password"
          required
          value={values.password}
          onChange={(event) => handleChange("password", event.target.value)}
          onBlur={() => handleBlur("password")}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={describedBy(ids.passwordHint, errors.password && ids.passwordError)}
        />
        <FormDescription id={ids.passwordHint}>
          Use at least {PASSWORD_MIN_LENGTH} characters.
        </FormDescription>
        {errors.password && <FormMessage id={ids.passwordError}>{errors.password}</FormMessage>}
      </div>

      <div style={actionsStyle}>
        <Button type="submit" disabled={submitting} aria-busy={submitting}>
          {submitting && <Spinner size="sm" aria-hidden="true" />}
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </div>
    </form>
  );
}
