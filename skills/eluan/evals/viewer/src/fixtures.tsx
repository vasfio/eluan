import * as React from "react";
import type { ComponentProps, ComponentType, JSXElementConstructor, ReactNode } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerLayout,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Switch,
  Typography,
} from "@eluan/core";
import { SignupRejectedError } from "../../runs/2026-10-30/t05-a";
import type T01a from "../../runs/2026-10-30/t01-a";
import type T01b from "../../runs/2026-10-30/t01-b";
import type T02a from "../../runs/2026-10-30/t02-a";
import type T03b from "../../runs/2026-10-30/t03-b";
import type T04a from "../../runs/2026-10-30/t04-a";
import type T05b from "../../runs/2026-10-30/t05-b";
import type T10a from "../../runs/2026-10-30/t10-a";

// Sample props and wrappers so each run renders on its own. Callbacks resolve
// after a short wait so busy states show. t05 rejects on purpose: the task is
// the form-level error.

const wait = (ms = 900) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const noop = () => {};

type Props<C extends JSXElementConstructor<any>> = ComponentProps<C>;

// Not typed against t03-a: importing its types would pull in its own type
// error (the invented `validationTone` prop), which is one of the eval findings.
const t03a = {
  profile: { name: "Ada Lovelace", email: "ada@example.com", bio: "Analyst and writer." },
  notifications: { commentsAndMentions: true, productUpdates: false, weeklyDigest: true },
  billing: {
    subscription: { planName: "Pro", amount: 2400, currency: "USD", interval: "month" as const, status: "active" as const, currentPeriodEnd: "2026-11-30", cancelAtPeriodEnd: false },
    paymentMethod: { brand: "visa", last4: "4242", expMonth: 8, expYear: 2028 },
    invoices: [
      { id: "in_2", number: "INV-0042", issuedAt: "2026-10-01", amount: 2400, currency: "USD", status: "paid" as const, pdfUrl: "#" },
      { id: "in_1", number: "INV-0031", issuedAt: "2026-09-01", amount: 2400, currency: "USD", status: "paid" as const, pdfUrl: "#" },
    ],
  },
  onSaveProfile: () => wait(),
  onUpdateNotification: () => wait(),
  onManagePlan: noop,
  onUpdatePaymentMethod: noop,
  onCancelSubscription: () => wait(),
};

const t03b: Props<typeof T03b> = {
  profile: { fullName: "Ada Lovelace", email: "ada@example.com", bio: "Analyst and writer." },
  notifications: { mentions: true, weeklyDigest: true, productUpdates: false, marketing: false },
  billing: {
    plan: { name: "Pro", status: "active", amount: 2400, currency: "USD", interval: "month", currentPeriodEnd: "2026-11-30" },
    paymentMethod: { brand: "Visa", last4: "4242", expMonth: 8, expYear: 2028 },
    invoices: [
      { id: "in_2", number: "INV-0042", issuedOn: "2026-10-01", amount: 2400, currency: "USD", status: "paid", downloadHref: "#" },
      { id: "in_1", number: "INV-0031", issuedOn: "2026-09-01", amount: 2400, currency: "USD", status: "paid", downloadHref: "#" },
    ],
    changePlanHref: "#",
    paymentMethodHref: "#",
  },
  onSaveProfile: () => wait(),
  onUpdateNotification: () => wait(),
};

const t04a: Props<typeof T04a> = {
  initialSettings: { displayName: "Ada Lovelace", emailNotifications: true },
  onSave: () => wait(),
};

const t05b: Props<typeof T05b> = {
  signUp: async () => {
    await wait();
    return { ok: false, message: "An account with this email already exists." };
  },
};

const t10a: Props<typeof T10a> = {
  logo: <Typography variant="lead" weight="semibold">Northwind</Typography>,
  items: [
    { label: "Projects", href: "#", active: true },
    { label: "Team", href: "#" },
    { label: "Billing", href: "#" },
  ],
  onSearch: noop,
};

const fields = (
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      <Label htmlFor="display-name">Display name</Label>
      <Input id="display-name" name="displayName" defaultValue="Ada Lovelace" />
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-lg)" }}>
      <Label htmlFor="digest">Weekly digest</Label>
      <Switch id="digest" name="digest" defaultChecked />
    </div>
  </div>
);

const panels = {
  overview: <Typography>Overview panel.</Typography>,
  activity: <Typography>Activity panel.</Typography>,
  settings: <Typography>Settings panel.</Typography>,
};

/** What a brand theme should restyle: the primary action, inputs, cards and corners. */
export function BrandPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand preview</CardTitle>
        <CardDescription>Buttons, inputs and corners under the theme.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm)" }}>
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Badge variant="informative">Badge</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <Label htmlFor="brand-email">Email</Label>
            <Input id="brand-email" placeholder="name@company.com" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
            <Switch id="brand-switch" defaultChecked />
            <Label htmlFor="brand-switch">Email updates</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClosablePanel({ children }: { children: (close: () => void) => ReactNode }) {
  const [open, setOpen] = React.useState(true);
  if (!open) return <Button variant="outline" onClick={() => setOpen(true)}>Open filters</Button>;
  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-sm)" }}>
          <CardTitle>Filters</CardTitle>
          {children(() => setOpen(false))}
        </div>
      </CardHeader>
      <CardContent>
        <Typography tone="muted">Panel content.</Typography>
      </CardContent>
    </Card>
  );
}

function SidePanel({ children }: { children: ReactNode }) {
  return (
    <Drawer defaultOpen>
      <DrawerLayout>
        <main>
          <DrawerTrigger asChild>
            <Button variant="outline">Open filters</Button>
          </DrawerTrigger>
        </main>
        <DrawerContent side="right">
          <DrawerHeader>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-sm)" }}>
              <DrawerTitle>Filters</DrawerTitle>
              {children}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </DrawerLayout>
    </Drawer>
  );
}

// Runs whose default export is an app-root provider; the frame renders them
// in place of its own EluanProvider.
export const PROVIDER_RUNS = new Set(["t11-a", "t11-b"]);

export type Mode = "light" | "dim" | "dark";
type Render = (Run: ComponentType<any>, mode: Mode) => ReactNode;

export const FIXTURES: Record<string, Render> = {
  "t01-a": (Run) => <Run {...({ onSubmit: () => wait() } satisfies Props<typeof T01a>)} />,
  "t01-b": (Run) => <Run {...({ onSubmit: async () => { await wait(); return null; } } satisfies Props<typeof T01b>)} />,
  "t02-a": (Run) => <Run {...({ projectName: "Atlas", onDelete: () => wait(1200) } satisfies Props<typeof T02a>)} />,
  "t02-b": (Run) => <Run projectName="Atlas" onDelete={() => wait(1200)} />,
  "t03-a": (Run) => <Run {...t03a} />,
  "t03-b": (Run) => <Run {...t03b} />,
  "t04-a": (Run) => <Run {...t04a} />,
  "t04-b": (Run) => <Run onSave={() => wait()}>{fields}</Run>,
  "t05-a": (Run) => (
    <Run
      onSignup={async () => {
        await wait();
        throw new SignupRejectedError("An account with this email already exists.", 409);
      }}
    />
  ),
  "t05-b": (Run) => <Run {...t05b} />,
  "t06-b": (Run) => <Run onSelectPlan={noop} />,
  "t07-a": (Run) => <Run onCreateProject={noop} learnMoreHref="#" />,
  "t07-b": (Run) => <Run onCreateProject={noop} />,
  "t08-b": (Run) => <Run {...panels} />,
  "t10-a": (Run) => <Run {...t10a} />,
  "t10-b": (Run) => <Run currentPath="/projects" onSearch={noop} />,
  "t11-a": (Run, mode) => (
    <Run defaultMode={mode} persist={false} followSystemMode={false}>
      <BrandPreview />
    </Run>
  ),
  "t11-b": (Run) => <Run><BrandPreview /></Run>,
  "t13-a": (Run) => <ClosablePanel>{(close) => <Run onClose={close} />}</ClosablePanel>,
  "t13-b": (Run) => <SidePanel><Run /></SidePanel>,
};

export const render = (run: string, Run: ComponentType<any>, mode: Mode) =>
  (FIXTURES[run] ?? ((R: ComponentType<any>) => <R />))(Run, mode);
