import { Fragment, useRef, useState, type ComponentProps, type FormEvent, type ReactNode } from "react";
import {
  Badge,
  Banner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  EmailInput,
  Fieldset,
  FieldsetLegend,
  FormDescription,
  FormMessage,
  Input,
  Label,
  Separator,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Typography,
} from "@eluan/core";
import { Download } from "lucide-react";
// `toast()` comes from sonner, not @eluan/core. It needs `sonner` as a direct dependency
// (same range as @eluan/core's copy) and a single <Toast /> mounted next to EluanProvider
// at the app root. Don't mount another <Toast /> on this page or every toast shows twice.
import { toast } from "sonner";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export type Profile = {
  fullName: string;
  email: string;
  bio: string;
};

export type NotificationKey = "mentions" | "weeklyDigest" | "productUpdates" | "marketing";
export type NotificationPreferences = Record<NotificationKey, boolean>;

export type PlanStatus = "active" | "trialing" | "past_due" | "canceled";
export type InvoiceStatus = "paid" | "open" | "failed" | "void";

export type Invoice = {
  id: string;
  number: string;
  /** ISO calendar date, e.g. "2026-10-01". */
  issuedOn: string;
  /** Amount in the currency's minor unit (cents for USD). */
  amount: number;
  /** ISO 4217 code, e.g. "USD". */
  currency: string;
  status: InvoiceStatus;
  downloadHref: string;
};

export type Billing = {
  plan: {
    name: string;
    status: PlanStatus;
    /** Price per interval in the currency's minor unit. */
    amount: number;
    currency: string;
    interval: "month" | "year";
    /** ISO calendar date the current period ends, or null if there isn't one. */
    currentPeriodEnd: string | null;
  };
  paymentMethod: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  } | null;
  invoices: Invoice[];
  changePlanHref: string;
  paymentMethodHref: string;
};

export type AccountSettingsPageProps = {
  profile: Profile;
  notifications: NotificationPreferences;
  billing: Billing;
  /** Persist the profile. Reject to show the inline error. */
  onSaveProfile: (profile: Profile) => Promise<void>;
  /** Persist one notification preference. Reject to revert the switch and show the inline error. */
  onUpdateNotification: (key: NotificationKey, enabled: boolean) => Promise<void>;
};

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>["variant"]>;

/* -------------------------------------------------------------------------------------------------
 * Constants and helpers
 * -----------------------------------------------------------------------------------------------*/

const column = (gap: string) => ({ display: "flex", flexDirection: "column", gap }) as const;

const fieldStack = column("var(--spacing-sm)");
const settingCopy = column("var(--spacing-xxs)");
const settingRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--spacing-lg)",
} as const;
const iconSize = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BIO_MAX_LENGTH = 160;

const NOTIFICATION_SETTINGS: ReadonlyArray<{ key: NotificationKey; label: string; description: string }> = [
  {
    key: "mentions",
    label: "Comments and mentions",
    description: "Get an email when someone replies to you or mentions you.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly digest",
    description: "Get a summary of your workspace’s activity every Monday.",
  },
  {
    key: "productUpdates",
    label: "Product updates",
    description: "Hear about new features and improvements.",
  },
  {
    key: "marketing",
    label: "Tips and offers",
    description: "Receive occasional guides and promotions.",
  },
];

const PLAN_STATUS: Record<PlanStatus, { label: string; variant: BadgeVariant; periodEnd: string }> = {
  active: { label: "Active", variant: "positive", periodEnd: "renews on" },
  trialing: { label: "Trial", variant: "informative", periodEnd: "trial ends on" },
  past_due: { label: "Past due", variant: "destructive", periodEnd: "payment was due on" },
  canceled: { label: "Canceled", variant: "secondary", periodEnd: "ends on" },
};

const INVOICE_STATUS: Record<InvoiceStatus, { label: string; variant: BadgeVariant }> = {
  paid: { label: "Paid", variant: "positive" },
  open: { label: "Due", variant: "caution" },
  failed: { label: "Failed", variant: "destructive" },
  void: { label: "Void", variant: "secondary" },
};

// Dates arrive as calendar dates; format them in UTC so they don't shift a day in the viewer's zone.
const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeZone: "UTC" });

function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

function formatMoney(minorUnits: number, currency: string): string {
  const formatter = new Intl.NumberFormat(undefined, { style: "currency", currency });
  const { maximumFractionDigits = 2 } = formatter.resolvedOptions();
  return formatter.format(minorUnits / 10 ** maximumFractionDigits);
}

function describedBy(...ids: Array<string | false | undefined>): string | undefined {
  return ids.filter(Boolean).join(" ") || undefined;
}

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export default function AccountSettingsPage({
  profile,
  notifications,
  billing,
  onSaveProfile,
  onUpdateNotification,
}: AccountSettingsPageProps) {
  return (
    <main style={{ ...column("var(--spacing-3xl)"), padding: "var(--spacing-xl)" }}>
      <header style={column("var(--spacing-xs)")}>
        <Typography variant="title" as="h1">
          Account settings
        </Typography>
        <Typography variant="lead" tone="muted">
          Manage your profile, notifications and billing.
        </Typography>
      </header>

      <SettingsSection id="profile" title="Profile" description="How you appear to people in your workspace.">
        <ProfileForm initialProfile={profile} onSave={onSaveProfile} />
      </SettingsSection>

      <Separator />

      <SettingsSection
        id="notifications"
        title="Notifications"
        description="Changes save as soon as you make them."
      >
        <NotificationSettings initialPreferences={notifications} onUpdate={onUpdateNotification} />
      </SettingsSection>

      <Separator />

      <SettingsSection id="billing" title="Billing" description="Your plan, payment method and invoices.">
        <BillingOverview billing={billing} />
      </SettingsSection>
    </main>
  );
}

function SettingsSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId} style={column("var(--spacing-md)")}>
      <div style={column("var(--spacing-xs)")}>
        <Typography id={headingId} variant="heading" as="h2">
          {title}
        </Typography>
        <Typography tone="muted">{description}</Typography>
      </div>
      <div style={column("var(--spacing-lg)")}>{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Profile
 * -----------------------------------------------------------------------------------------------*/

type ProfileField = "fullName" | "email";
type ProfileErrors = Partial<Record<ProfileField, string>>;

function validateProfileField(field: ProfileField, value: string): string | undefined {
  const trimmed = value.trim();
  if (field === "fullName") return trimmed ? undefined : "Enter your full name";
  if (!trimmed) return "Enter your email address";
  return EMAIL_PATTERN.test(trimmed) ? undefined : "Enter an email like name@company.com";
}

function ProfileForm({
  initialProfile,
  onSave,
}: {
  initialProfile: Profile;
  onSave: (profile: Profile) => Promise<void>;
}) {
  const [values, setValues] = useState<Profile>(initialProfile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function handleChange(field: keyof Profile, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Once a field shows an error, re-check it while the user types so it clears as soon as it's fixed.
    if (field !== "bio" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateProfileField(field, value) }));
    }
  }

  function handleBlur(field: ProfileField, value: string) {
    setErrors((current) => ({ ...current, [field]: validateProfileField(field, value) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: ProfileErrors = {
      fullName: validateProfileField("fullName", values.fullName),
      email: validateProfileField("email", values.email),
    };
    setErrors(nextErrors);
    if (nextErrors.fullName) {
      fullNameRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }

    const profile: Profile = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      bio: values.bio.trim(),
    };

    setSaving(true);
    setSaveFailed(false);
    try {
      await onSave(profile);
      setValues(profile);
      toast("Profile saved");
    } catch {
      setSaveFailed(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={column("var(--spacing-lg)")}>
      {saveFailed && (
        <Banner variant="destructive" position="inline" role="alert">
          We couldn’t save your profile. Check your connection and try again.
        </Banner>
      )}

      <Fieldset role="group" aria-labelledby="profile-details-legend">
        <FieldsetLegend id="profile-details-legend">Personal details</FieldsetLegend>

        <div style={fieldStack}>
          <Label htmlFor="profile-full-name" required>
            Full name
          </Label>
          <Input
            ref={fullNameRef}
            id="profile-full-name"
            name="fullName"
            autoComplete="name"
            placeholder="Jane Cooper"
            required
            value={values.fullName}
            onChange={(event) => handleChange("fullName", event.target.value)}
            onBlur={(event) => handleBlur("fullName", event.target.value)}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={describedBy(errors.fullName && "profile-full-name-error")}
          />
          {errors.fullName && <FormMessage id="profile-full-name-error">{errors.fullName}</FormMessage>}
        </div>

        <div style={fieldStack}>
          <Label htmlFor="profile-email" required>
            Email
          </Label>
          <EmailInput
            ref={emailRef}
            id="profile-email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={(event) => handleBlur("email", event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("profile-email-hint", errors.email && "profile-email-error")}
          />
          <FormDescription id="profile-email-hint">
            You sign in with this address and get account emails here.
          </FormDescription>
          {errors.email && <FormMessage id="profile-email-error">{errors.email}</FormMessage>}
        </div>

        <div style={fieldStack}>
          <Label htmlFor="profile-bio">Bio</Label>
          <Textarea
            id="profile-bio"
            name="bio"
            rows={3}
            maxLength={BIO_MAX_LENGTH}
            value={values.bio}
            onChange={(event) => handleChange("bio", event.target.value)}
            aria-describedby="profile-bio-hint"
          />
          <FormDescription id="profile-bio-hint">
            Up to {BIO_MAX_LENGTH} characters, shown on your profile.
          </FormDescription>
        </div>
      </Fieldset>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" disabled={saving} aria-busy={saving}>
          {saving && <Spinner size="sm" aria-hidden="true" />}
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Notifications
 * -----------------------------------------------------------------------------------------------*/

const switchId = (key: NotificationKey) => `notification-${key}`;

function NotificationSettings({
  initialPreferences,
  onUpdate,
}: {
  initialPreferences: NotificationPreferences;
  onUpdate: (key: NotificationKey, enabled: boolean) => Promise<void>;
}) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(initialPreferences);
  const [saving, setSaving] = useState<Partial<Record<NotificationKey, boolean>>>({});
  const [failedKey, setFailedKey] = useState<NotificationKey | null>(null);

  const failedSetting = NOTIFICATION_SETTINGS.find((setting) => setting.key === failedKey);

  // Switches apply immediately: keep the new position while saving, revert if the save fails.
  async function handleCheckedChange(key: NotificationKey, enabled: boolean) {
    setPreferences((current) => ({ ...current, [key]: enabled }));
    setSaving((current) => ({ ...current, [key]: true }));
    setFailedKey(null);
    try {
      await onUpdate(key, enabled);
    } catch {
      setPreferences((current) => ({ ...current, [key]: !enabled }));
      setFailedKey(key);
    } finally {
      setSaving((current) => ({ ...current, [key]: false }));
    }
  }

  function handleDismissError() {
    const key = failedKey;
    setFailedKey(null);
    // The focused dismiss button unmounts with the Banner; return focus to the setting that failed.
    if (key) document.getElementById(switchId(key))?.focus();
  }

  return (
    <>
      {failedSetting && (
        <Banner variant="destructive" position="inline" role="alert" dismissible onDismiss={handleDismissError}>
          {`We couldn’t update “${failedSetting.label}”. Check your connection and try again.`}
        </Banner>
      )}

      <Card elevation="none">
        <CardHeader>
          <CardTitle role="heading" aria-level={3}>
            Email
          </CardTitle>
          <CardDescription>Choose which emails you get from us.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={column("var(--spacing-md)")}>
            {NOTIFICATION_SETTINGS.map((setting, index) => {
              const id = switchId(setting.key);
              const descriptionId = `${id}-description`;
              const isSaving = saving[setting.key] === true;

              return (
                <Fragment key={setting.key}>
                  {index > 0 && <Separator />}
                  <div style={settingRow}>
                    <div style={settingCopy}>
                      <Label htmlFor={id}>{setting.label}</Label>
                      <FormDescription id={descriptionId}>{setting.description}</FormDescription>
                    </div>
                    <Switch
                      id={id}
                      checked={preferences[setting.key]}
                      onCheckedChange={(enabled) => handleCheckedChange(setting.key, enabled)}
                      disabled={isSaving}
                      aria-busy={isSaving || undefined}
                      aria-describedby={descriptionId}
                    />
                  </div>
                </Fragment>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Billing
 * -----------------------------------------------------------------------------------------------*/

function BillingOverview({ billing }: { billing: Billing }) {
  const { plan, paymentMethod, invoices } = billing;
  const status = PLAN_STATUS[plan.status];
  const price = formatMoney(plan.amount, plan.currency);
  const planSummary = plan.currentPeriodEnd
    ? `${price} per ${plan.interval}, ${status.periodEnd} ${formatDate(plan.currentPeriodEnd)}.`
    : `${price} per ${plan.interval}.`;

  return (
    <>
      {plan.status === "past_due" && (
        <Banner
          variant="destructive"
          position="inline"
          role="alert"
          action={
            <Button asChild size="sm" variant="outline">
              <a href={billing.paymentMethodHref}>Update payment method</a>
            </Button>
          }
        >
          Your last payment failed. Update your payment method to keep your plan active.
        </Banner>
      )}

      <Card elevation="none">
        <CardHeader>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-sm)" }}>
            <CardTitle role="heading" aria-level={3}>
              {plan.name} plan
            </CardTitle>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <CardDescription>{planSummary}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline">
            <a href={billing.changePlanHref}>Change plan</a>
          </Button>
        </CardFooter>
      </Card>

      <Card elevation="none">
        <CardHeader>
          <CardTitle role="heading" aria-level={3}>
            Payment method
          </CardTitle>
          <CardDescription>
            {paymentMethod
              ? `${paymentMethod.brand} ending in ${paymentMethod.last4}, expires ${String(paymentMethod.expMonth).padStart(2, "0")}/${paymentMethod.expYear}.`
              : "No payment method on file."}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline">
            <a href={billing.paymentMethodHref}>{paymentMethod ? "Update payment method" : "Add payment method"}</a>
          </Button>
        </CardFooter>
      </Card>

      <div style={column("var(--spacing-md)")}>
        <Typography id="billing-history-heading" variant="subheading" as="h3">
          Billing history
        </Typography>
        {invoices.length > 0 ? <InvoiceTable invoices={invoices} /> : <NoInvoices />}
      </div>
    </>
  );
}

function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <Table aria-labelledby="billing-history-heading">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>
            <div style={{ textAlign: "end" }}>Amount</div>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead aria-label="Actions" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          const status = INVOICE_STATUS[invoice.status];

          return (
            <TableRow key={invoice.id}>
              <TableCell weight="medium">{invoice.number}</TableCell>
              <TableCell>{formatDate(invoice.issuedOn)}</TableCell>
              <TableCell>
                <div style={{ textAlign: "end" }}>{formatMoney(invoice.amount, invoice.currency)}</div>
              </TableCell>
              <TableCell>
                <Badge variant={status.variant}>{status.label}</Badge>
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button asChild variant="ghost" size="sm">
                    <a href={invoice.downloadHref} aria-label={`Download invoice ${invoice.number}`}>
                      <Download aria-hidden="true" style={iconSize} />
                      Download
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// eluan: composed, no component for empty state
function NoInvoices() {
  return (
    <div
      style={{
        ...column("var(--spacing-sm)"),
        alignItems: "center",
        textAlign: "center",
        padding: "var(--spacing-3xl)",
      }}
    >
      <Typography variant="subheading" as="h4">
        No invoices yet
      </Typography>
      <Typography variant="body" tone="muted">
        Invoices appear here after your first payment.
      </Typography>
    </div>
  );
}
