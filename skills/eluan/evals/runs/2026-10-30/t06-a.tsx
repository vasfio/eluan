import { useId, type CSSProperties } from "react";
import { Check } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Typography,
} from "@eluan/core";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface PricingPlan {
  /** Stable key for the plan. */
  id: string;
  name: string;
  description: string;
  /** Monthly price in USD. */
  price: number;
  features: readonly string[];
  cta: {
    label: string;
    href: string;
  };
  /** Highlights the plan as the one we steer people towards. */
  recommended?: boolean;
}

export interface PricingTableProps {
  plans?: readonly PricingPlan[];
}

// ─── Data ──────────────────────────────────────────────────────────────────

const DEFAULT_PLANS: readonly PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals trying things out.",
    price: 0,
    features: [
      "1 project",
      "Up to 1,000 monthly events",
      "7-day data retention",
      "Community support",
    ],
    cta: { label: "Get started", href: "/signup?plan=starter" },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals shipping real work.",
    price: 24,
    features: [
      "Unlimited projects",
      "Up to 100,000 monthly events",
      "90-day data retention",
      "Custom domains",
      "Email support",
    ],
    cta: { label: "Start free trial", href: "/signup?plan=pro" },
    recommended: true,
  },
  {
    id: "business",
    name: "Business",
    description: "For teams that need scale and control.",
    price: 79,
    features: [
      "Everything in Pro",
      "Up to 1,000,000 monthly events",
      "1-year data retention",
      "SSO and audit logs",
      "Priority support",
    ],
    cta: { label: "Contact sales", href: "/contact?plan=business" },
  },
];

// ─── Formatting ────────────────────────────────────────────────────────────

const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const withCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatPrice(amount: number): string {
  return Number.isInteger(amount)
    ? wholeDollars.format(amount)
    : withCents.format(amount);
}

// ─── Layout ────────────────────────────────────────────────────────────────
// Eluan components are closed to className/style, so all layout lives on
// plain wrapper elements and reads Eluan's semantic tokens.

const styles = {
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3xl)",
    maxWidth: "72rem",
    marginInline: "auto",
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
    maxWidth: "40rem",
    marginInline: "auto",
  },
  // "Switcher" layout: the three plans sit in one row when there is room for
  // all of them and stack into one column when there isn't, never breaking
  // into an awkward 2 + 1 arrangement. Below the threshold the flex-basis is
  // huge (one plan per row); above it, it's negative and clamps to 0, so the
  // plans share the row equally.
  plans: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-2xl)",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  plan: {
    flexGrow: 1,
    flexBasis: "calc((52rem - 100%) * 999)",
    // A grid container stretches its only child, so every Card fills the
    // full height of the row and the cards line up.
    display: "grid",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "var(--spacing-sm)",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xl)",
  },
  price: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
    margin: 0,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--spacing-sm)",
  },
  // One line box tall, so the check centres on the first line of text even
  // when a feature wraps.
  featureIcon: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: "1lh",
    color: "var(--container-fg-alt)",
  },
} satisfies Record<string, CSSProperties>;

// ─── Components ────────────────────────────────────────────────────────────

function PlanCard({ plan }: { plan: PricingPlan }) {
  const titleId = useId();
  const recommended = plan.recommended ?? false;

  return (
    <li style={styles.plan}>
      <Card elevation={recommended ? "lg" : "sm"}>
        <CardHeader>
          <div style={styles.titleRow}>
            <CardTitle id={titleId}>{plan.name}</CardTitle>
            {recommended && <Badge>Recommended</Badge>}
          </div>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div style={styles.body}>
            <p style={styles.price}>
              <Typography variant="title" as="span">
                {formatPrice(plan.price)}
              </Typography>
              <Typography variant="label" tone="muted">
                per month
              </Typography>
            </p>

            {/* The CTA sits under the price rather than in a CardFooter so it
                lines up across cards regardless of feature-list length. */}
            <Button
              asChild
              fullWidth
              variant={recommended ? "default" : "outline"}
            >
              <a href={plan.cta.href} aria-describedby={titleId}>
                {plan.cta.label}
              </a>
            </Button>

            <Separator />

            {/* role="list" keeps list semantics in Safari once list-style is removed. */}
            <ul
              role="list"
              aria-label={`${plan.name} features`}
              style={styles.features}
            >
              {plan.features.map((feature) => (
                <Typography key={feature} variant="body" asChild>
                  <li style={styles.feature}>
                    <span aria-hidden="true" style={styles.featureIcon}>
                      <Check size="1em" />
                    </span>
                    {feature}
                  </li>
                </Typography>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

export default function PricingTable({
  plans = DEFAULT_PLANS,
}: PricingTableProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} style={styles.section}>
      <div style={styles.intro}>
        <Typography id={headingId} variant="title" as="h2" align="center">
          Simple, transparent pricing
        </Typography>
        <Typography variant="lead" tone="muted" align="center">
          Start free and upgrade when you need more. Cancel anytime.
        </Typography>
      </div>

      {/* role="list" keeps list semantics in Safari once list-style is removed. */}
      <ul role="list" style={styles.plans}>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </ul>
    </section>
  );
}
