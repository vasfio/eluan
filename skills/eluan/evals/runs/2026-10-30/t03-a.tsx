"use client";

import * as React from "react";
import { Check, CreditCard, Download, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Banner,
  Button,
  Card,
  CardContent,
  CardFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmailInput,
  Input,
  Label,
  Separator,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Typography,
} from "@eluan/core";

/* ────────────────────────────────────────────────────────────────────────────
 * Public types
 * ──────────────────────────────────────────────────────────────────────────── */

export interface ProfileValues {
  name: string;
  email: string;
  bio: string;
}

/** Optional email notifications. Security alerts are always on and not stored here. */
export type NotificationKey = "commentsAndMentions" | "productUpdates" | "weeklyDigest";
export type NotificationPreferences = Record<NotificationKey, boolean>;

export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";

export interface Subscription {
  planName: string;
  /** Price in the currency's minor unit (cents for USD, yen for JPY). */
  amount: number;
  /** ISO 4217 currency code, e.g. "USD". */
  currency: string;
  interval: "month" | "year";
  status: SubscriptionStatus;
  /** ISO 8601 date: next renewal, trial end, or access end. */
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

export type InvoiceStatus = "paid" | "open" | "void" | "uncollectible";

export interface Invoice {
  id: string;
  number: string;
  /** ISO 8601 date. */
  issuedAt: string;
  /** Total in the currency's minor unit. */
  amount: number;
  currency: string;
  status: InvoiceStatus;
  pdfUrl?: string;
}

export interface BillingDetails {
  subscription: Subscription | null;
  paymentMethod: PaymentMethod | null;
  invoices: readonly Invoice[];
}

export interface AccountSettingsPageProps {
  /** Initial profile values. Remount the page (change its `key`) to reset local edits. */
  profile: ProfileValues;
  avatarUrl?: string;
  /** Initial notification preferences. */
  notifications: NotificationPreferences;
  billing: BillingDetails;
  /** BCP 47 locale for dates and money. Pass it explicitly when server-rendering. */
  locale?: string;
  /** Persist the profile. Reject to show an error; resolve once saved. */
  onSaveProfile: (values: ProfileValues) => Promise<void>;
  /** Persist one notification toggle. Reject to roll the switch back. */
  onUpdateNotification: (key: NotificationKey, enabled: boolean) => Promise<void>;
  /** Open plan selection (e.g. a billing portal or pricing route). */
  onManagePlan: () => void;
  /** Open the payment provider's hosted flow. Card details never touch this page. */
  onUpdatePaymentMethod: () => void;
  /** Cancel at period end. The parent should then refresh `billing`. */
  onCancelSubscription: () => Promise<void>;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────────── */

export default function AccountSettingsPage({
  profile,
  avatarUrl,
  notifications,
  billing,
  locale,
  onSaveProfile,
  onUpdateNotification,
  onManagePlan,
  onUpdatePaymentMethod,
  onCancelSubscription,
}: AccountSettingsPageProps) {
  const formatters = useFormatters(locale);

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <Typography variant="title" as="h1">
          Account settings
        </Typography>
        <Typography variant="lead" tone="muted">
          Manage your profile, notifications, and billing.
        </Typography>
      </div>

      <SettingsSection title="Profile" description="Your name and contact details.">
        <ProfileForm initialValues={profile} avatarUrl={avatarUrl} onSave={onSaveProfile} />
      </SettingsSection>

      <Separator />

      <SettingsSection
        title="Notifications"
        description="Choose which emails we send you. Changes save automatically."
      >
        <NotificationSettings initialPreferences={notifications} onUpdate={onUpdateNotification} />
      </SettingsSection>

      <Separator />

      <SettingsSection title="Billing" description="Your plan, payment method, and invoices.">
        <BillingOverview
          billing={billing}
          formatters={formatters}
          onManagePlan={onManagePlan}
          onUpdatePaymentMethod={onUpdatePaymentMethod}
          onCancelSubscription={onCancelSubscription}
        />
      </SettingsSection>
    </div>
  );
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const headingId = React.useId();
  return (
    <section aria-labelledby={headingId} style={styles.section}>
      <div style={styles.sectionIntro}>
        <Typography variant="heading" as="h2" id={headingId}>
          {title}
        </Typography>
        <Typography tone="muted">{description}</Typography>
      </div>
      <div style={styles.sectionBody}>{children}</div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Profile
 * ──────────────────────────────────────────────────────────────────────────── */

type ProfileField = keyof ProfileValues;
type ProfileErrors = Partial<Record<ProfileField, string>>;
type SaveState =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved" }
  | { kind: "error"; message: string };

const PROFILE_FIELDS: readonly ProfileField[] = ["name", "email", "bio"];
const NAME_MAX = 80;
const BIO_MAX = 160;
// Deliberately loose: the server is the authority on deliverability.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeProfile(values: ProfileValues): ProfileValues {
  return { name: values.name.trim(), email: values.email.trim(), bio: values.bio.trim() };
}

function profilesEqual(a: ProfileValues, b: ProfileValues): boolean {
  return a.name === b.name && a.email === b.email && a.bio === b.bio;
}

function validateProfile(values: ProfileValues): ProfileErrors {
  const errors: ProfileErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > NAME_MAX) errors.name = `Name must be ${NAME_MAX} characters or fewer.`;

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter an email address in the format name@example.com.";
  }

  if (values.bio.length > BIO_MAX) errors.bio = `Bio must be ${BIO_MAX} characters or fewer.`;

  return errors;
}

function ProfileForm({
  initialValues,
  avatarUrl,
  onSave,
}: {
  initialValues: ProfileValues;
  avatarUrl?: string;
  onSave: (values: ProfileValues) => Promise<void>;
}) {
  const baseId = React.useId();
  const ids = {
    name: `${baseId}-name`,
    nameError: `${baseId}-name-error`,
    email: `${baseId}-email`,
    emailHint: `${baseId}-email-hint`,
    emailError: `${baseId}-email-error`,
    bio: `${baseId}-bio`,
    bioHint: `${baseId}-bio-hint`,
    bioError: `${baseId}-bio-error`,
  };

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const bioRef = React.useRef<HTMLTextAreaElement>(null);
  const fieldRefs = { name: nameRef, email: emailRef, bio: bioRef };

  const [saved, setSaved] = React.useState<ProfileValues>(() => normalizeProfile(initialValues));
  const [values, setValues] = React.useState<ProfileValues>(initialValues);
  const [touched, setTouched] = React.useState<Partial<Record<ProfileField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [saveState, setSaveState] = React.useState<SaveState>({ kind: "idle" });

  const errors = validateProfile(values);
  const isDirty = !profilesEqual(normalizeProfile(values), saved);
  const isSaving = saveState.kind === "saving";

  const visibleError = (field: ProfileField): string | undefined =>
    submitAttempted || touched[field] ? errors[field] : undefined;
  const nameError = visibleError("name");
  const emailError = visibleError("email");
  const bioError = visibleError("bio");

  const handleChange =
    (field: ProfileField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [field]: value }));
      setSaveState((current) => (current.kind === "saving" ? current : { kind: "idle" }));
    };

  const handleBlur = (field: ProfileField) => () => {
    setTouched((current) => (current[field] ? current : { ...current, [field]: true }));
  };

  const handleDiscard = () => {
    setValues(saved);
    setTouched({});
    setSubmitAttempted(false);
    setSaveState({ kind: "idle" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    setSubmitAttempted(true);
    const firstInvalid = PROFILE_FIELDS.find((field) => errors[field] !== undefined);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }
    if (!isDirty) return;

    const next = normalizeProfile(values);
    setSaveState({ kind: "saving" });
    try {
      await onSave(next);
      setSaved(next);
      // Keep anything typed while the request was in flight.
      setValues((current) => (profilesEqual(normalizeProfile(current), next) ? next : current));
      setTouched({});
      setSubmitAttempted(false);
      setSaveState({ kind: "saved" });
    } catch {
      setSaveState({
        kind: "error",
        message: "We couldn't save your profile. Check your connection and try again.",
      });
    }
  };

  const bioRemaining = BIO_MAX - values.bio.length;
  const initials = getInitials(saved.name);

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={isSaving}>
      <Card>
        <CardContent>
          <div style={styles.stack}>
            <div style={styles.identity}>
              <div style={styles.avatar} aria-hidden="true">
                <Avatar>
                  {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
                  <AvatarFallback>{initials || <User size={20} />}</AvatarFallback>
                </Avatar>
              </div>
              <div style={styles.details}>
                <Typography variant="label" truncate>
                  {saved.name || "Unnamed account"}
                </Typography>
                <Typography variant="caption" tone="muted" truncate>
                  {saved.email}
                </Typography>
              </div>
            </div>

            <Separator />

            <div style={styles.field}>
              <Label htmlFor={ids.name} required>
                Full name
              </Label>
              <Input
                ref={nameRef}
                id={ids.name}
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                validationTone={nameError ? "destructive" : "none"}
                aria-required="true"
                aria-invalid={nameError ? true : undefined}
                aria-describedby={joinIds(nameError && ids.nameError)}
              />
              {nameError ? <FieldError id={ids.nameError}>{nameError}</FieldError> : null}
            </div>

            <div style={styles.field}>
              <Label htmlFor={ids.email} required>
                Email
              </Label>
              <EmailInput
                ref={emailRef}
                id={ids.email}
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                validationTone={emailError ? "destructive" : "none"}
                aria-required="true"
                aria-invalid={emailError ? true : undefined}
                aria-describedby={joinIds(ids.emailHint, emailError && ids.emailError)}
              />
              <Typography variant="caption" tone="muted" as="p" id={ids.emailHint}>
                Used to sign in and for account emails.
              </Typography>
              {emailError ? <FieldError id={ids.emailError}>{emailError}</FieldError> : null}
            </div>

            <div style={styles.field}>
              <Label htmlFor={ids.bio} optional>
                Bio
              </Label>
              <Textarea
                ref={bioRef}
                id={ids.bio}
                name="bio"
                rows={4}
                value={values.bio}
                onChange={handleChange("bio")}
                onBlur={handleBlur("bio")}
                aria-invalid={bioError ? true : undefined}
                aria-describedby={joinIds(ids.bioHint, bioError && ids.bioError)}
              />
              <div style={styles.fieldMeta} id={ids.bioHint}>
                <Typography variant="caption" tone="muted">
                  Shown on your public profile.
                </Typography>
                <Typography variant="caption" tone="muted">
                  {bioRemaining >= 0
                    ? `${pluralize(bioRemaining, "character")} left`
                    : `${pluralize(-bioRemaining, "character")} over the limit`}
                </Typography>
              </div>
              {bioError ? <FieldError id={ids.bioError}>{bioError}</FieldError> : null}
            </div>

            {saveState.kind === "error" ? (
              <Banner variant="destructive" role="alert">
                {saveState.message}
              </Banner>
            ) : null}
          </div>
        </CardContent>

        <CardFooter>
          <div style={styles.footer}>
            <div role="status" aria-live="polite" style={styles.successMessage}>
              {saveState.kind === "saved" ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  Profile saved
                </>
              ) : null}
            </div>
            <div style={styles.actions}>
              <Button
                type="button"
                variant="ghost"
                onClick={handleDiscard}
                disabled={!isDirty || isSaving}
              >
                Discard changes
              </Button>
              <Button type="submit" disabled={!isDirty || isSaving}>
                {isSaving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} style={styles.errorText}>
      {children}
    </p>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Notifications
 * ──────────────────────────────────────────────────────────────────────────── */

const NOTIFICATION_OPTIONS: ReadonlyArray<{
  key: NotificationKey;
  label: string;
  description: string;
}> = [
  {
    key: "commentsAndMentions",
    label: "Comments and mentions",
    description: "When someone replies to you or mentions you.",
  },
  {
    key: "productUpdates",
    label: "Product updates",
    description: "New features and improvements, about once a month.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly digest",
    description: "A summary of activity in your account, once a week.",
  },
];

function NotificationSettings({
  initialPreferences,
  onUpdate,
}: {
  initialPreferences: NotificationPreferences;
  onUpdate: (key: NotificationKey, enabled: boolean) => Promise<void>;
}) {
  const baseId = React.useId();
  const [preferences, setPreferences] = React.useState(initialPreferences);
  const [error, setError] = React.useState<string | null>(null);
  // A ref, not state: the guard must see in-flight requests before the next render.
  // Switches stay enabled while saving so keyboard focus is never dropped.
  const pendingRef = React.useRef(new Set<NotificationKey>());

  const handleToggle = async (key: NotificationKey, label: string, enabled: boolean) => {
    if (pendingRef.current.has(key)) return;
    pendingRef.current.add(key);
    setError(null);
    setPreferences((current) => ({ ...current, [key]: enabled }));
    try {
      await onUpdate(key, enabled);
    } catch {
      setPreferences((current) => ({ ...current, [key]: !enabled }));
      setError(`We couldn't update “${label}”. Your previous setting has been restored.`);
    } finally {
      pendingRef.current.delete(key);
    }
  };

  return (
    <Card>
      <CardContent>
        <div style={styles.stack}>
          {error ? (
            <Banner variant="destructive" role="alert" dismissible onDismiss={() => setError(null)}>
              {error}
            </Banner>
          ) : null}

          <ul role="list" style={styles.settingList}>
            <li style={styles.settingRow}>
              <div style={styles.details}>
                <Typography variant="label">Security alerts</Typography>
                <Typography variant="caption" tone="muted" as="p">
                  Sign-ins from new devices and changes to your password or email. These can't be
                  turned off.
                </Typography>
              </div>
              <Badge variant="secondary">Always on</Badge>
            </li>

            {NOTIFICATION_OPTIONS.map((option) => {
              const switchId = `${baseId}-${option.key}`;
              const descriptionId = `${switchId}-description`;
              return (
                <li key={option.key} style={styles.settingRow}>
                  <div style={styles.details}>
                    <Label htmlFor={switchId}>{option.label}</Label>
                    <Typography variant="caption" tone="muted" as="p" id={descriptionId}>
                      {option.description}
                    </Typography>
                  </div>
                  <Switch
                    id={switchId}
                    checked={preferences[option.key]}
                    onCheckedChange={(checked) => {
                      void handleToggle(option.key, option.label, checked);
                    }}
                    aria-describedby={descriptionId}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Billing
 * ──────────────────────────────────────────────────────────────────────────── */

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

const SUBSCRIPTION_STATUS: Record<SubscriptionStatus, { label: string; variant: BadgeVariant }> = {
  active: { label: "Active", variant: "positive" },
  trialing: { label: "Trial", variant: "informative" },
  past_due: { label: "Past due", variant: "destructive" },
  canceled: { label: "Canceled", variant: "secondary" },
};

const INVOICE_STATUS: Record<InvoiceStatus, { label: string; variant: BadgeVariant }> = {
  paid: { label: "Paid", variant: "positive" },
  open: { label: "Due", variant: "caution" },
  void: { label: "Void", variant: "secondary" },
  uncollectible: { label: "Uncollectible", variant: "destructive" },
};

const CARD_BRANDS: Record<string, string> = {
  amex: "American Express",
  diners: "Diners Club",
  discover: "Discover",
  jcb: "JCB",
  mastercard: "Mastercard",
  unionpay: "UnionPay",
  visa: "Visa",
};

function BillingOverview({
  billing,
  formatters,
  onManagePlan,
  onUpdatePaymentMethod,
  onCancelSubscription,
}: {
  billing: BillingDetails;
  formatters: Formatters;
  onManagePlan: () => void;
  onUpdatePaymentMethod: () => void;
  onCancelSubscription: () => Promise<void>;
}) {
  const { subscription, paymentMethod, invoices } = billing;

  const sortedInvoices = React.useMemo(
    () => [...invoices].sort((a, b) => parseDate(b.issuedAt).getTime() - parseDate(a.issuedAt).getTime()),
    [invoices],
  );

  const periodEnd = subscription?.currentPeriodEnd
    ? formatters.date(subscription.currentPeriodEnd)
    : null;
  const activeSubscription =
    subscription !== null && subscription.status !== "canceled" ? subscription : null;
  const cancellableSubscription =
    activeSubscription && !activeSubscription.cancelAtPeriodEnd ? activeSubscription : null;

  return (
    <Card>
      <CardContent>
        <div style={styles.stackLoose}>
          {subscription?.status === "past_due" ? (
            <Banner
              variant="destructive"
              action={
                <Button size="sm" variant="outline" onClick={onUpdatePaymentMethod}>
                  Update payment method
                </Button>
              }
            >
              Your last payment didn't go through. Update your payment method to keep your
              subscription active.
            </Banner>
          ) : null}

          {activeSubscription?.cancelAtPeriodEnd ? (
            <Banner variant="caution">
              {periodEnd
                ? `Your subscription is set to cancel on ${periodEnd}. You'll keep access until then.`
                : "Your subscription is set to cancel at the end of the current billing period."}
            </Banner>
          ) : null}

          {/* Plan */}
          <div style={styles.billingBlock}>
            <Typography variant="subheading" as="h3">
              Plan
            </Typography>
            <div style={styles.billingRow}>
              <div style={styles.details}>
                {subscription ? (
                  <>
                    <div style={styles.inlineRow}>
                      <Typography variant="label">{subscription.planName}</Typography>
                      <Badge variant={SUBSCRIPTION_STATUS[subscription.status].variant}>
                        {SUBSCRIPTION_STATUS[subscription.status].label}
                      </Badge>
                    </div>
                    <Typography>
                      {formatters.money(subscription.amount, subscription.currency)} per{" "}
                      {subscription.interval}
                    </Typography>
                    {periodEnd ? (
                      <Typography variant="caption" tone="muted">
                        {describePeriod(subscription, periodEnd)}
                      </Typography>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Typography variant="label">No active plan</Typography>
                    <Typography variant="caption" tone="muted">
                      Choose a plan to unlock paid features.
                    </Typography>
                  </>
                )}
              </div>
              <div style={styles.actions}>
                <Button variant={subscription ? "outline" : "default"} onClick={onManagePlan}>
                  {subscription ? "Change plan" : "Choose a plan"}
                </Button>
                {cancellableSubscription ? (
                  <CancelSubscriptionDialog
                    planName={cancellableSubscription.planName}
                    accessEndsOn={periodEnd}
                    onConfirm={onCancelSubscription}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment method */}
          <div style={styles.billingBlock}>
            <Typography variant="subheading" as="h3">
              Payment method
            </Typography>
            <div style={styles.billingRow}>
              {paymentMethod ? (
                <div style={styles.inlineRow}>
                  <CreditCard size={20} aria-hidden="true" />
                  <div style={styles.details}>
                    <Typography variant="label">
                      {formatCardBrand(paymentMethod.brand)} ending in {paymentMethod.last4}
                    </Typography>
                    <div style={styles.inlineRow}>
                      <Typography variant="caption" tone="muted">
                        Expires {String(paymentMethod.expMonth).padStart(2, "0")}/
                        {paymentMethod.expYear}
                      </Typography>
                      {isCardExpired(paymentMethod) ? <Badge variant="caution">Expired</Badge> : null}
                    </div>
                  </div>
                </div>
              ) : (
                <Typography tone="muted">No payment method on file.</Typography>
              )}
              <Button variant="outline" onClick={onUpdatePaymentMethod}>
                {paymentMethod ? "Update card" : "Add payment method"}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Invoices */}
          <div style={styles.billingBlock}>
            <Typography variant="subheading" as="h3">
              Invoices
            </Typography>
            {sortedInvoices.length === 0 ? (
              <Typography tone="muted">No invoices yet.</Typography>
            ) : (
              <Table>
                <TableCaption>Billing history, most recent first.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span style={styles.numeric}>Amount</span>
                    </TableHead>
                    <TableHead>
                      <span style={styles.visuallyHidden}>Download</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{formatters.date(invoice.issuedAt)}</TableCell>
                      <TableCell>{invoice.number}</TableCell>
                      <TableCell>
                        <Badge variant={INVOICE_STATUS[invoice.status].variant}>
                          {INVOICE_STATUS[invoice.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span style={styles.numeric}>
                          {formatters.money(invoice.amount, invoice.currency)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {invoice.pdfUrl ? (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <Download size={16} aria-hidden="true" />
                              Download
                              <span style={styles.visuallyHidden}>
                                {" "}
                                invoice {invoice.number} (opens in a new tab)
                              </span>
                            </a>
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CancelSubscriptionDialog({
  planName,
  accessEndsOn,
  onConfirm,
}: {
  planName: string;
  accessEndsOn: string | null;
  onConfirm: () => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const [isCanceling, setIsCanceling] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    // Don't let Escape or an outside click abandon an in-flight request.
    if (isCanceling) return;
    setOpen(next);
    if (!next) setError(null);
  };

  const handleConfirm = async () => {
    setIsCanceling(true);
    setError(null);
    try {
      await onConfirm();
      setOpen(false);
    } catch {
      setError(
        "We couldn't cancel your subscription. Try again, or contact support if this keeps happening.",
      );
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="dangerGhost">Cancel subscription</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel your {planName} subscription?</DialogTitle>
          <DialogDescription>
            {accessEndsOn
              ? `You'll keep access until ${accessEndsOn}. After that, paid features will no longer be available.`
              : "Paid features will no longer be available once the current billing period ends."}
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <Banner variant="destructive" role="alert">
            {error}
          </Banner>
        ) : null}
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isCanceling}>
            Keep subscription
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isCanceling}>
            {isCanceling ? "Canceling…" : "Cancel subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────────────────── */

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** Date-only strings parse as UTC midnight; read them as local dates so they don't shift a day. */
function parseDate(value: string): Date {
  return new Date(DATE_ONLY.test(value) ? `${value}T00:00:00` : value);
}

function useFormatters(locale?: string) {
  return React.useMemo(() => {
    const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
    const moneyFormats = new Map<string, Intl.NumberFormat>();

    return {
      date(value: string): string {
        const date = parseDate(value);
        return Number.isNaN(date.getTime()) ? value : dateFormat.format(date);
      },
      money(amountMinor: number, currency: string): string {
        let format = moneyFormats.get(currency);
        if (!format) {
          try {
            format = new Intl.NumberFormat(locale, { style: "currency", currency });
          } catch {
            // Unknown currency code: show something legible rather than crash the page.
            return `${(amountMinor / 100).toFixed(2)} ${currency}`;
          }
          moneyFormats.set(currency, format);
        }
        // Minor-unit exponent comes from the currency itself (USD 2, JPY 0, KWD 3).
        const fractionDigits = format.resolvedOptions().maximumFractionDigits ?? 2;
        return format.format(amountMinor / 10 ** fractionDigits);
      },
    };
  }, [locale]);
}

type Formatters = ReturnType<typeof useFormatters>;

function describePeriod(subscription: Subscription, periodEnd: string): string {
  if (subscription.status === "canceled") return `Ended on ${periodEnd}`;
  if (subscription.cancelAtPeriodEnd) return `Access ends on ${periodEnd}`;
  if (subscription.status === "trialing") return `Trial ends on ${periodEnd}`;
  return `Renews on ${periodEnd}`;
}

function isCardExpired({ expMonth, expYear }: PaymentMethod, now: Date = new Date()): boolean {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return expYear < year || (expYear === year && expMonth < month);
}

function formatCardBrand(brand: string): string {
  const known = CARD_BRANDS[brand.toLowerCase()];
  if (known) return known;
  return brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : "Card";
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1] ?? "") : "";
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

function pluralize(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function joinIds(...ids: Array<string | false | undefined>): string | undefined {
  const joined = ids.filter(Boolean).join(" ");
  return joined || undefined;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Layout styles
 *
 * Eluan components are closed to className/style, so these only style wrapper
 * elements this file owns. Every value is an Eluan token, so density, curves,
 * mode and theme changes flow through. Layout wraps with flex-basis instead of
 * media queries, which inline styles can't express.
 * ──────────────────────────────────────────────────────────────────────────── */

const styles = {
  page: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "64rem",
    marginInline: "auto",
    paddingBlock: "var(--spacing-3xl)",
    paddingInline: "var(--spacing-lg)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3xl)",
  },
  pageHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  section: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "var(--spacing-2xl)",
  },
  sectionIntro: {
    flex: "1 1 14rem",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  sectionBody: {
    flex: "999 1 28rem",
    minWidth: 0,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-lg)",
  },
  stackLoose: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2xl)",
  },
  identity: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-md)",
    minWidth: 0,
  },
  avatar: {
    width: "3.5rem",
    height: "3.5rem",
    flexShrink: 0,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xxs)",
    minWidth: 0,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  fieldMeta: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "var(--spacing-md)",
  },
  errorText: {
    margin: 0,
    fontSize: "var(--font-size-sm)",
    color: "var(--destructive-fg)",
  },
  footer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-md)",
    width: "100%",
  },
  successMessage: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    fontSize: "var(--font-size-sm)",
    color: "var(--positive-fg)",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-sm)",
    marginInlineStart: "auto",
  },
  settingList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-lg)",
  },
  settingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-lg)",
  },
  billingBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
  },
  billingRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-md)",
  },
  inlineRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },
  numeric: {
    display: "block",
    textAlign: "end",
    fontVariantNumeric: "tabular-nums",
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
} satisfies Record<string, React.CSSProperties>;
