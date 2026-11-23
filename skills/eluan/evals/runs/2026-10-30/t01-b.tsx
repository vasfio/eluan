import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Banner,
  Button,
  Checkbox,
  EmailInput,
  FormMessage,
  Input,
  Label,
  PasswordInput,
  Spinner,
} from "@eluan/core";

export interface SignupValues {
  name: string;
  email: string;
  password: string;
  acceptedTerms: true;
}

export interface SignupFormProps {
  /**
   * Creates the account. Resolve with a user-facing message to show it above
   * the fields (for example "An account with this email already exists."),
   * or with nothing when sign-up succeeded. A rejection shows a generic error.
   */
  onSubmit: (values: SignupValues) => Promise<string | null | void>;
}

type Field = "name" | "email" | "password" | "terms";
type FieldErrors = Partial<Record<Field, string>>;

// Order the user meets the fields in; the first invalid one gets focus.
const FIELD_ORDER: readonly Field[] = ["name", "email", "password", "terms"];

// Drives both the strength checklist and submit validation, so the two can't drift.
const PASSWORD_POLICY = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

const MESSAGES = {
  nameRequired: "Enter your name",
  emailRequired: "Enter your email address",
  emailFormat: "Enter an email like name@company.com",
  passwordRequired: "Enter a password",
  passwordPolicy: `Use at least ${PASSWORD_POLICY.minLength} characters with an uppercase letter, a lowercase letter and a number`,
  termsRequired: "Accept the Terms of Service to create an account",
  submitFailed: "We couldn't create your account. Check your connection and try again.",
} as const;

function getNameError(name: string): string | undefined {
  return name.trim() ? undefined : MESSAGES.nameRequired;
}

// `formatValid` comes from EmailInput's own pattern check, so the field's
// check/alert icon and this message always agree.
function getEmailError(email: string, formatValid: boolean): string | undefined {
  if (!email.trim()) return MESSAGES.emailRequired;
  return formatValid ? undefined : MESSAGES.emailFormat;
}

function meetsPasswordPolicy(password: string): boolean {
  return (
    password.length >= PASSWORD_POLICY.minLength &&
    (!PASSWORD_POLICY.requireUppercase || /[A-Z]/.test(password)) &&
    (!PASSWORD_POLICY.requireLowercase || /[a-z]/.test(password)) &&
    (!PASSWORD_POLICY.requireNumbers || /[0-9]/.test(password))
  );
}

function getPasswordError(password: string): string | undefined {
  if (!password) return MESSAGES.passwordRequired;
  return meetsPasswordPolicy(password) ? undefined : MESSAGES.passwordPolicy;
}

function getTermsError(accepted: boolean): string | undefined {
  return accepted ? undefined : MESSAGES.termsRequired;
}

// Layout only; the components draw their own chrome. Gaps follow patterns/forms.md.
const formStyle = { display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" } as const;
const fieldStyle = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;
const checkboxRowStyle = { display: "flex", alignItems: "flex-start", gap: "var(--spacing-sm)" } as const;
// Keeps the one-line label centred on the box while the error wraps under the label text.
const checkboxLabelLineStyle = { display: "flex", alignItems: "center", minHeight: "var(--size-xxs)" } as const;
const actionsStyle = { display: "flex", justifyContent: "flex-end" } as const;

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const baseId = useId();
  const fieldId = (field: Field) => `${baseId}-${field}`;
  const errorId = (field: Field) => `${baseId}-${field}-error`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailFormatValid, setEmailFormatValid] = useState(false);
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // A fresh object per failed submit, so focusing re-runs even for the same field.
  const [focusRequest, setFocusRequest] = useState<{ field: Field } | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLButtonElement>(null);

  // Focus after the render that applies aria-invalid and aria-describedby,
  // so assistive tech reads the error along with the field.
  useEffect(() => {
    if (!focusRequest) return;
    const refs = { name: nameRef, email: emailRef, password: passwordRef, terms: termsRef };
    refs[focusRequest.field].current?.focus();
  }, [focusRequest]);

  const setFieldError = useCallback((field: Field, message: string | undefined) => {
    setErrors((previous) => {
      if (previous[field] === message) return previous;
      const next = { ...previous };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }, []);

  // Validate on blur once there's something to check, or to refresh an error
  // that's already showing. Empty required fields are reported on submit, so
  // tabbing through the form doesn't light it up.
  function validateOnBlur(field: Field, value: string, message: string | undefined) {
    if (value || errors[field]) setFieldError(field, message);
  }

  // While typing, only clear an error once the value is fixed; never add one.
  function clearErrorIfFixed(field: Field, message: string | undefined) {
    if (errors[field] && !message) setFieldError(field, undefined);
  }

  const handleEmailValidation = useCallback(
    (isValid: boolean) => {
      setEmailFormatValid(isValid);
      if (isValid) setFieldError("email", undefined);
    },
    [setFieldError],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setFormError(null);

    const results: Record<Field, string | undefined> = {
      name: getNameError(name),
      email: getEmailError(email, emailFormatValid),
      password: getPasswordError(password),
      terms: getTermsError(acceptedTerms),
    };
    const nextErrors: FieldErrors = {};
    for (const field of FIELD_ORDER) {
      const message = results[field];
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);

    if (firstInvalid) {
      setFocusRequest({ field: firstInvalid });
      return;
    }

    setSubmitting(true);
    try {
      const message = await onSubmit({
        name: name.trim(),
        email: email.trim(),
        password,
        acceptedTerms: true,
      });
      if (message) setFormError(message);
    } catch {
      setFormError(MESSAGES.submitFailed);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={formStyle}>
      {formError && (
        <Banner variant="destructive" position="inline" role="alert">
          {formError}
        </Banner>
      )}

      <div style={fieldStyle}>
        <Label htmlFor={fieldId("name")} required>
          Name
        </Label>
        <Input
          ref={nameRef}
          id={fieldId("name")}
          name="name"
          autoComplete="name"
          placeholder="Jane Cooper"
          required
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearErrorIfFixed("name", getNameError(event.target.value));
          }}
          onBlur={(event) => validateOnBlur("name", event.target.value, getNameError(event.target.value))}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? errorId("name") : undefined}
        />
        {errors.name && <FormMessage id={errorId("name")}>{errors.name}</FormMessage>}
      </div>

      <div style={fieldStyle}>
        <Label htmlFor={fieldId("email")} required>
          Email
        </Label>
        <EmailInput
          ref={emailRef}
          id={fieldId("email")}
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          spellCheck={false}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          showValidation
          onValidationChange={handleEmailValidation}
          onBlur={(event) =>
            validateOnBlur("email", event.target.value, getEmailError(event.target.value, emailFormatValid))
          }
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errorId("email") : undefined}
        />
        {errors.email && <FormMessage id={errorId("email")}>{errors.email}</FormMessage>}
      </div>

      <div style={fieldStyle}>
        <Label htmlFor={fieldId("password")} required>
          Password
        </Label>
        <PasswordInput
          ref={passwordRef}
          id={fieldId("password")}
          name="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            clearErrorIfFixed("password", getPasswordError(event.target.value));
          }}
          onBlur={(event) =>
            validateOnBlur("password", event.target.value, getPasswordError(event.target.value))
          }
          showStrengthIndicator
          strengthRequirements={PASSWORD_POLICY}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? errorId("password") : undefined}
        />
        {errors.password && <FormMessage id={errorId("password")}>{errors.password}</FormMessage>}
      </div>

      <div style={checkboxRowStyle}>
        <Checkbox
          ref={termsRef}
          id={fieldId("terms")}
          name="acceptTerms"
          required
          checked={acceptedTerms}
          onCheckedChange={(checked) => {
            const accepted = checked === true;
            setAcceptedTerms(accepted);
            if (accepted) setFieldError("terms", undefined);
          }}
          aria-invalid={errors.terms ? true : undefined}
          aria-describedby={errors.terms ? errorId("terms") : undefined}
        />
        <div style={fieldStyle}>
          {/* A div, not a span: Label renders its own block-level div row. */}
          <div style={checkboxLabelLineStyle}>
            <Label htmlFor={fieldId("terms")} required>
              I agree to the Terms of Service
            </Label>
          </div>
          {errors.terms && <FormMessage id={errorId("terms")}>{errors.terms}</FormMessage>}
        </div>
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
