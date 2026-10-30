import { useId, type CSSProperties } from "react";
import { Check } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@eluan/core";

export type PricingPlan = {
  id: string;
  name: string;
  /** One sentence on who the plan is for. */
  description: string;
  /** Display price, already formatted, e.g. "$24". */
  price: string;
  /** Billing unit shown after the price, e.g. "per user per month". */
  billingPeriod: string;
  features: readonly string[];
};

export type PricingTableProps = {
  plans?: readonly PricingPlan[];
  /** The single plan to highlight. Only this plan gets the primary action. */
  recommendedPlanId?: string;
  onSelectPlan?: (planId: string) => void;
};

const DEFAULT_PLANS: readonly PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals trying things out.",
    price: "$0",
    billingPeriod: "per month",
    features: ["1 project", "Up to 3 collaborators", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For small teams shipping every week.",
    price: "$24",
    billingPeriod: "per user per month",
    features: ["Unlimited projects", "Unlimited collaborators", "Email support", "Audit log"],
  },
  {
    id: "business",
    name: "Business",
    description: "For teams with security and compliance reviews.",
    price: "$79",
    billingPeriod: "per user per month",
    features: ["Everything in Pro", "SAML single sign-on", "Priority support", "99.9% uptime SLA"],
  },
];

const styles = {
  section: { display: "flex", flexDirection: "column", gap: "var(--spacing-md)" },
  intro: { display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" },
  grid: {
    display: "grid",
    // Three equal columns where they fit, wrapping down to one on narrow containers.
    // Eluan has no width or breakpoint tokens, so the track minimum is built from a
    // size token and scales with density.
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, calc(var(--size-4xl) * 2)), 1fr))",
    gap: "var(--spacing-lg)",
    alignItems: "stretch",
  },
  // Card takes no style, so this column inside it pins CardFooter to the bottom and
  // keeps the plan buttons aligned when feature lists differ in length.
  cardLayout: { display: "flex", flexDirection: "column", height: "100%" },
  cardBody: { flexGrow: 1 },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-sm)",
  },
  content: { display: "flex", flexDirection: "column", gap: "var(--spacing-xl)" },
  price: {
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: "var(--spacing-xs)",
  },
  features: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  feature: { display: "flex", alignItems: "baseline", gap: "var(--spacing-sm)" },
  featureIcon: { width: "var(--size-xxs)", height: "var(--size-xxs)", flexShrink: 0 },
} satisfies Record<string, CSSProperties>;

type PlanCardProps = {
  plan: PricingPlan;
  recommended: boolean;
  onSelect?: (planId: string) => void;
};

function PlanCard({ plan, recommended, onSelect }: PlanCardProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const badgeId = `${id}-badge`;

  return (
    <Card
      role="article"
      aria-labelledby={recommended ? `${titleId} ${badgeId}` : titleId}
      elevation={recommended ? "md" : "none"}
    >
      <div style={styles.cardLayout}>
        <CardHeader>
          <div style={styles.titleRow}>
            <CardTitle id={titleId} role="heading" aria-level={3}>
              {plan.name}
            </CardTitle>
            {recommended && (
              <Badge id={badgeId} variant="important">
                Recommended
              </Badge>
            )}
          </div>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>

        <div style={styles.cardBody}>
          <CardContent>
            <div style={styles.content}>
              <p style={styles.price}>
                <Typography as="span" variant="body" step="4" weight="semibold">
                  {plan.price}
                </Typography>
                <Typography as="span" variant="caption" tone="muted">
                  {plan.billingPeriod}
                </Typography>
              </p>

              {/* role="list" keeps list semantics in Safari once list-style is removed. */}
              <ul role="list" style={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature} style={styles.feature}>
                    <Check aria-hidden="true" style={styles.featureIcon} />
                    <Typography as="span" variant="body">
                      {feature}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>

        <CardFooter>
          <Button
            type="button"
            variant={recommended ? "default" : "outline"}
            fullWidth
            onClick={() => onSelect?.(plan.id)}
          >
            Choose {plan.name}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

// eluan: composed, no component for a pricing table (plan Cards in a grid, per patterns/page-layout.md)
export default function PricingTable({
  plans = DEFAULT_PLANS,
  recommendedPlanId = "pro",
  onSelectPlan,
}: PricingTableProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} style={styles.section}>
      <div style={styles.intro}>
        <Typography id={headingId} variant="heading" as="h2">
          Choose a plan
        </Typography>
        <Typography variant="body" tone="muted">
          Start free and upgrade as your team grows.
        </Typography>
      </div>

      <div style={styles.grid}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            recommended={plan.id === recommendedPlanId}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </section>
  );
}
