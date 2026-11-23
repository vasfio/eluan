import * as React from "react";
import { CircleAlert } from "lucide-react";
import { Banner, Button, EmailInput, Label, PasswordInput } from "@eluan/core";

export interface SignupValues {
  email: string;
  password: string;
}

/**
 * Thrown when the server answered the signup request but refused it.
 * `message` is written for the person filling in the form.
 */
export class SignupRejectedError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "SignupRejectedError";
    this.status = status;
  }
}

const REJECTED_FALLBACK =
  "We couldn't create your account. Check your details and try again.";
const SERVER_FAILURE =
  "Something went wrong on our end. Please try again in a moment.";
const UNEXPECTED_FAILURE =
  "We couldn't complete your signup. Check your connection and try again.";

/** Pulls a `message` (or `error`) string out of a JSON error body, if there is one. */
async function readServerMessage(response: Response): Promise<string | null> {
  try {
    const body: unknown = await response.json();
    if (body !== null && typeof body === "object") {
      const { message, error } = body as { message?: unknown; error?: unknown };
      const text =
        typeof message === "string" ? message : typeof error === "string" ? error : "";
      return text.trim() || null;
    }
  } catch {
    // Not JSON — fall through to the generic copy.
  }
  return null;
}

/** Default transport: POST the form to the signup endpoint. */
export async function requestSignup(values: SignupValues): Promise<void> {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (response.ok) return;

  // A 4xx describes what was wrong with the request ("email already
  // registered"), so its message is shown as-is. A 5xx body can carry
  // internals, so the user gets generic copy instead.
  const message =
    response.status < 500
      ? ((await readServerMessage(response)) ?? REJECTED_FALLBACK)
      : SERVER_FAILURE;

  throw new SignupRejectedError(message, response.status);
}

function toFormError(error: unknown): string {
  if (error instanceof SignupRejectedError) return error.message;
  // fetch rejects (TypeError) when the request never reaches the server.
  return UNEXPECTED_FAILURE;
}

export interface SignupFormProps {
  /**
   * Submits the signup. Resolve on success; reject with a
   * `SignupRejectedError` to show the server's reason above the form.
   * Defaults to `requestSignup` (POST /api/signup).
   */
  onSignup?: (values: SignupValues) => Promise<void>;
  /** Called once the server has accepted the signup. */
  onSuccess?: (values: SignupValues) => void;
}

// Eluan components take no className/style, so layout lives on plain
// wrappers and reads the semantic spacing tokens (they follow data-spacing).
const formLayout: React.CSSProperties = {
  display: "grid",
  gap: "var(--spacing-lg)",
};

const fieldLayout: React.CSSProperties = {
  display: "grid",
  gap: "var(--spacing-xs)",
};

export default function SignupForm({
  onSignup = requestSignup,
  onSuccess,
}: SignupFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  // A ref, not state, so a fast double click can't slip a second request in
  // before the re-render lands.
  const inFlight = React.useRef(false);

  const id = React.useId();
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    inFlight.current = true;
    setSubmitting(true);
    // Clearing first unmounts the banner, so a repeat of the same error is
    // re-inserted and announced again.
    setFormError(null);

    const values: SignupValues = { email: email.trim(), password };

    try {
      await onSignup(values);
    } catch (error) {
      setFormError(toFormError(error));
      return;
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }

    onSuccess?.(values);
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting} style={formLayout}>
      {formError && (
        <Banner
          variant="destructive"
          role="alert"
          icon={<CircleAlert size={16} aria-hidden="true" />}
        >
          {formError}
        </Banner>
      )}

      <div style={fieldLayout}>
        <Label htmlFor={emailId} required>
          Email
        </Label>
        <EmailInput
          id={emailId}
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div style={fieldLayout}>
        <Label htmlFor={passwordId} required>
          Password
        </Label>
        <PasswordInput
          id={passwordId}
          name="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {/* aria-disabled rather than disabled: disabling the focused submit
          button would drop keyboard focus to <body> mid-request. */}
      <Button type="submit" fullWidth aria-disabled={submitting || undefined}>
        {submitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
