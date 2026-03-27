import { jsx as a, jsxs as p, Fragment as le } from "react/jsx-runtime";
import * as s from "react";
import * as de from "@radix-ui/react-accordion";
import { ChevronDown as be, X as G, MoreHorizontal as $e, ChevronRight as ae, Check as W, ChevronUp as jt, ChevronLeft as Ge, ArrowRight as Gt, ArrowLeft as Vt, Copy as Kt, Search as he, Circle as nt, Lock as Ve, Calendar as Le, CreditCard as st, Clock as Ke, Mail as ot, CheckCircle2 as qt, AlertCircle as Yt, Upload as Je, File as qe, Archive as Wt, Music as Xt, Film as Zt, FileText as Jt, Image as Qt, EyeOff as it, Eye as lt, Link as ea, Phone as dt, Dot as ct, ExternalLink as ta, Loader2 as De, Pause as aa, Play as ra, VolumeX as na, Volume2 as sa, Maximize as oa, Menu as ia, Minus as ut, Plus as la, Star as Qe, GripVertical as da, Bold as ca, Italic as ua, Strikethrough as ma, Code as fa, Heading1 as pa, Heading2 as ga, Heading3 as ba, List as ha, ListOrdered as va, Quote as xa, Undo as Na, Redo as ya, PanelLeft as wa, FolderOpen as Ra, Folder as Sa } from "lucide-react";
import { clsx as Ea } from "clsx";
import { twMerge as ka } from "tailwind-merge";
import * as V from "@radix-ui/react-alert-dialog";
import { Slot as Pe } from "@radix-ui/react-slot";
import { cva as $ } from "class-variance-authority";
import * as Ia from "@radix-ui/react-aspect-ratio";
import * as ve from "@radix-ui/react-avatar";
import * as Re from "@radix-ui/react-popover";
import { DayPicker as Ta } from "react-day-picker";
import * as B from "@radix-ui/react-select";
import Ca from "embla-carousel-react";
import * as Ue from "@radix-ui/react-checkbox";
import et from "prismjs";
import * as pe from "@radix-ui/react-collapsible";
import { Command as K } from "cmdk";
import * as P from "@radix-ui/react-dialog";
import * as _ from "@radix-ui/react-context-menu";
import { format as we } from "date-fns";
import * as O from "@radix-ui/react-dropdown-menu";
import * as Me from "@radix-ui/react-hover-card";
import * as D from "@radix-ui/react-menubar";
import * as q from "@radix-ui/react-navigation-menu";
import * as He from "@radix-ui/react-progress";
import * as Se from "@radix-ui/react-radio-group";
import { useEditor as Aa, EditorContent as Da } from "@tiptap/react";
import La from "@tiptap/starter-kit";
import Pa from "@tiptap/extension-placeholder";
import * as mt from "@radix-ui/react-toggle";
import * as ft from "@radix-ui/react-separator";
import * as oe from "@radix-ui/react-scroll-area";
import * as ye from "@radix-ui/react-slider";
import { Toaster as Ma } from "sonner";
import * as je from "@radix-ui/react-switch";
import * as ce from "@radix-ui/react-tabs";
import * as _e from "@radix-ui/react-toggle-group";
import * as Ee from "@radix-ui/react-tooltip";
function o(...e) {
  return ka(Ea(e));
}
const Si = de.Root, _a = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  de.Item,
  {
    ref: r,
    className: o("border-b border-[var(--container-border-alt)]", e),
    ...t
  }
));
_a.displayName = "AccordionItem";
const Oa = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ a(de.Header, { className: "flex", children: /* @__PURE__ */ p(
  de.Trigger,
  {
    ref: n,
    className: o(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium text-[var(--container-fg)] transition-all hover:text-[var(--action-primary-bg)] [&[data-state=open]>svg]:rotate-180",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ a(be, { className: "h-4 w-4 shrink-0 text-[var(--container-fg-alt)] transition-transform duration-200" })
    ]
  }
) }));
Oa.displayName = de.Trigger.displayName;
const Fa = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ a(
  de.Content,
  {
    ref: n,
    className: "overflow-hidden text-sm text-[var(--container-fg-alt)] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...r,
    children: /* @__PURE__ */ a("div", { className: o("pb-4 pt-0 leading-relaxed", e), children: t })
  }
));
Fa.displayName = de.Content.displayName;
const ie = $(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] hover:bg-[var(--action-primary-bg-hover)] active:bg-[var(--action-primary-bg-active)] shadow-sm hover:shadow-md",
        destructive: "bg-[var(--destructive-bg)] text-[var(--destructive-fg)] hover:bg-[var(--destructive-bg-hover)] active:bg-[var(--destructive-bg-active)]",
        outline: "border border-[var(--action-secondary-border)] bg-transparent text-[var(--action-secondary-fg)] hover:bg-[var(--action-secondary-bg-hover)] active:bg-[var(--action-secondary-bg-active)] active:text-[var(--action-secondary-fg-active)]",
        secondary: "bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-primary)] hover:bg-[var(--backgrounds-quaternary)]",
        ghost: "bg-transparent text-[var(--foregrounds-secondary)] hover:bg-[var(--backgrounds-tertiary)] hover:text-[var(--foregrounds-primary)]",
        link: "text-[var(--action-primary-bg)] underline-offset-4 hover:underline p-0 h-auto shadow-none"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ee = s.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...i }, u) => /* @__PURE__ */ a(
    n ? Pe : "button",
    {
      className: o(ie({ variant: t, size: r, className: e })),
      ref: u,
      ...i
    }
  )
);
ee.displayName = "Button";
const Ei = V.Root, ki = V.Trigger, za = V.Portal, pt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  V.Overlay,
  {
    className: o(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: r
  }
));
pt.displayName = V.Overlay.displayName;
const Ba = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(za, { children: [
  /* @__PURE__ */ a(pt, {}),
  /* @__PURE__ */ a(
    V.Content,
    {
      ref: r,
      className: o(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...t
    }
  )
] }));
Ba.displayName = V.Content.displayName;
const $a = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o(
      "flex flex-col space-y-2 text-center sm:text-left",
      e
    ),
    ...t
  }
);
$a.displayName = "AlertDialogHeader";
const Ua = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
Ua.displayName = "AlertDialogFooter";
const Ha = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  V.Title,
  {
    ref: r,
    className: o("font-heading text-lg font-semibold", e),
    ...t
  }
));
Ha.displayName = V.Title.displayName;
const ja = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  V.Description,
  {
    ref: r,
    className: o("text-sm text-muted-foreground", e),
    ...t
  }
));
ja.displayName = V.Description.displayName;
const Ga = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  V.Action,
  {
    ref: r,
    className: o(ie(), e),
    ...t
  }
));
Ga.displayName = V.Action.displayName;
const Va = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  V.Cancel,
  {
    ref: r,
    className: o(
      ie({ variant: "outline" }),
      "mt-2 sm:mt-0",
      e
    ),
    ...t
  }
));
Va.displayName = V.Cancel.displayName;
const Ii = Ia.Root, Ka = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ve.Root,
  {
    ref: r,
    className: o(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      e
    ),
    ...t
  }
));
Ka.displayName = ve.Root.displayName;
const qa = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ve.Image,
  {
    ref: r,
    className: o("aspect-square h-full w-full", e),
    ...t
  }
));
qa.displayName = ve.Image.displayName;
const Ya = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ve.Fallback,
  {
    ref: r,
    className: o(
      "flex h-full w-full items-center justify-center rounded-full bg-[var(--backgrounds-tertiary)] text-xs font-medium text-[var(--foregrounds-secondary)]",
      e
    ),
    ...t
  }
));
Ya.displayName = ve.Fallback.displayName;
const Wa = s.forwardRef(
  ({ className: e, position: t = "bottom-right", ...r }, n) => /* @__PURE__ */ a(
    "span",
    {
      ref: n,
      className: o(
        "absolute flex h-3 w-3 items-center justify-center rounded-full ring-2 ring-[var(--backgrounds-primary)]",
        {
          "top-right": "top-0 right-0",
          "bottom-right": "bottom-0 right-0",
          "top-left": "top-0 left-0",
          "bottom-left": "bottom-0 left-0"
        }[t],
        e
      ),
      ...r
    }
  )
);
Wa.displayName = "AvatarBadge";
const Xa = {
  online: "bg-[var(--positive-bg)]",
  offline: "bg-[var(--backgrounds-quaternary)]",
  busy: "bg-[var(--destructive-bg)]",
  away: "bg-[var(--cautionary-bg)]"
}, Za = ({ status: e, position: t = "bottom-right", className: r }) => {
  const n = {
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-left": "bottom-0 left-0"
  };
  return /* @__PURE__ */ a(
    "span",
    {
      className: o(
        "absolute h-2.5 w-2.5 rounded-full ring-2 ring-[var(--backgrounds-primary)]",
        Xa[e],
        n[t],
        r
      ),
      "aria-label": e
    }
  );
};
Za.displayName = "AvatarStatus";
const Ja = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("relative inline-flex", e), ...t }));
Ja.displayName = "AvatarWithStatus";
const Qa = $(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
        secondary: "border-transparent bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-secondary)]",
        destructive: "border-transparent bg-[var(--destructive-bg-alt)] text-[var(--destructive-fg)]",
        outline: "border-[var(--container-border)] text-[var(--foregrounds-primary)] bg-transparent",
        positive: "border-transparent bg-[var(--positive-bg)] text-[var(--positive-fg)]",
        cautionary: "border-transparent bg-[var(--cautionary-bg)] text-[var(--cautionary-fg)]",
        informative: "border-transparent bg-[var(--informative-bg)] text-[var(--informative-fg)]",
        important: "border-transparent bg-[var(--important-bg)] text-[var(--important-fg)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function tt({ className: e, variant: t, onRemove: r, removable: n, children: i, ...u }) {
  return /* @__PURE__ */ p("span", { className: o(Qa({ variant: t }), e), ...u, children: [
    i,
    (n || r) && /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: (c) => {
          c.stopPropagation(), r == null || r();
        },
        className: "ml-0.5 -mr-0.5 rounded-full opacity-60 hover:opacity-100 transition-opacity focus:outline-none",
        "aria-label": "Remove",
        children: /* @__PURE__ */ a(G, { className: "h-3 w-3" })
      }
    )
  ] });
}
const er = $(
  "relative flex items-center gap-3 w-full px-4 py-3 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)]",
        destructive: "bg-[var(--destructive-bg-alt)] text-[var(--destructive-fg)] border border-[var(--destructive-border)]",
        warning: "bg-[var(--cautionary-bg)] text-[var(--cautionary-fg)] border border-[var(--cautionary-border)]",
        success: "bg-[var(--positive-bg)] text-[var(--positive-fg)] border border-[var(--positive-border)]",
        info: "bg-[var(--informative-bg)] text-[var(--informative-fg)] border border-[var(--informative-border)]",
        neutral: "bg-[var(--backgrounds-secondary)] text-[var(--foregrounds-primary)] border border-[var(--container-border-alt)]"
      },
      position: {
        top: "fixed top-0 left-0 right-0 z-50",
        bottom: "fixed bottom-0 left-0 right-0 z-50",
        inline: "relative rounded-md"
      }
    },
    defaultVariants: {
      variant: "info",
      position: "inline"
    }
  }
), tr = s.forwardRef(
  ({ className: e, variant: t, position: r, icon: n, action: i, dismissible: u = !1, onDismiss: c, children: f, ...m }, d) => /* @__PURE__ */ p(
    "div",
    {
      ref: d,
      role: "banner",
      className: o(er({ variant: t, position: r }), e),
      ...m,
      children: [
        n && /* @__PURE__ */ a("span", { className: "shrink-0 opacity-80", children: n }),
        /* @__PURE__ */ a("div", { className: "flex-1", children: f }),
        i && /* @__PURE__ */ a("div", { className: "shrink-0", children: i }),
        u && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: c,
            className: "shrink-0 rounded opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-1 focus:ring-current",
            "aria-label": "Dismiss",
            children: /* @__PURE__ */ a(G, { className: "h-4 w-4" })
          }
        )
      ]
    }
  )
);
tr.displayName = "Banner";
const ke = Re.Root, Ie = Re.Trigger, xe = s.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, i) => /* @__PURE__ */ a(Re.Portal, { children: /* @__PURE__ */ a(
  Re.Content,
  {
    ref: i,
    align: t,
    sideOffset: r,
    className: o(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
xe.displayName = Re.Content.displayName;
const ar = s.forwardRef(({ ...e }, t) => /* @__PURE__ */ a("nav", { ref: t, "aria-label": "breadcrumb", ...e }));
ar.displayName = "Breadcrumb";
const rr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "ol",
  {
    ref: r,
    className: o(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      e
    ),
    ...t
  }
));
rr.displayName = "BreadcrumbList";
const nr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "li",
  {
    ref: r,
    className: o("inline-flex items-center gap-1.5", e),
    ...t
  }
));
nr.displayName = "BreadcrumbItem";
const sr = s.forwardRef(({ asChild: e, className: t, ...r }, n) => /* @__PURE__ */ a(
  e ? Pe : "a",
  {
    ref: n,
    className: o("transition-colors hover:text-foreground", t),
    ...r
  }
));
sr.displayName = "BreadcrumbLink";
const or = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "span",
  {
    ref: r,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: o("font-normal text-foreground", e),
    ...t
  }
));
or.displayName = "BreadcrumbPage";
const ir = ({
  children: e,
  className: t,
  ...r
}) => /* @__PURE__ */ a(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: o("[&>svg]:h-3.5 [&>svg]:w-3.5", t),
    ...r,
    children: e ?? /* @__PURE__ */ a(ae, {})
  }
);
ir.displayName = "BreadcrumbSeparator";
const lr = ({
  className: e,
  items: t,
  ...r
}) => t && t.length > 0 ? /* @__PURE__ */ p(ke, { children: [
  /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ a(
    "button",
    {
      className: o(
        "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
        "hover:bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-tertiary)] hover:text-[var(--foregrounds-primary)]",
        e
      ),
      "aria-label": "Show more breadcrumbs",
      children: /* @__PURE__ */ a($e, { className: "h-4 w-4" })
    }
  ) }),
  /* @__PURE__ */ a(xe, { className: "w-auto min-w-[120px] p-1", align: "start", sideOffset: 6, children: /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: t.map(
    (n, i) => n.href ? /* @__PURE__ */ a(
      "a",
      {
        href: n.href,
        className: "flex items-center rounded-sm px-3 py-1.5 text-sm text-[var(--foregrounds-secondary)] hover:bg-[var(--backgrounds-tertiary)] hover:text-[var(--foregrounds-primary)] transition-colors",
        children: n.label
      },
      i
    ) : /* @__PURE__ */ a(
      "span",
      {
        className: "flex items-center rounded-sm px-3 py-1.5 text-sm text-[var(--foregrounds-tertiary)]",
        children: n.label
      },
      i
    )
  ) }) })
] }) : /* @__PURE__ */ p(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: o("flex h-7 w-7 items-center justify-center text-[var(--foregrounds-tertiary)]", e),
    ...r,
    children: [
      /* @__PURE__ */ a($e, { className: "h-4 w-4" }),
      /* @__PURE__ */ a("span", { className: "sr-only", children: "More" })
    ]
  }
);
lr.displayName = "BreadcrumbEllipsis";
const me = B.Root, Ti = B.Group, fe = B.Value, ne = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  B.Trigger,
  {
    ref: n,
    className: o(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ a(B.Icon, { asChild: !0, children: /* @__PURE__ */ a(be, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
ne.displayName = B.Trigger.displayName;
const gt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  B.ScrollUpButton,
  {
    ref: r,
    className: o(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ a(jt, { className: "h-4 w-4" })
  }
));
gt.displayName = B.ScrollUpButton.displayName;
const bt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  B.ScrollDownButton,
  {
    ref: r,
    className: o(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ a(be, { className: "h-4 w-4" })
  }
));
bt.displayName = B.ScrollDownButton.displayName;
const se = s.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, i) => /* @__PURE__ */ a(B.Portal, { children: /* @__PURE__ */ p(
  B.Content,
  {
    ref: i,
    className: o(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ a(gt, {}),
      /* @__PURE__ */ a(
        B.Viewport,
        {
          className: o(
            "p-1",
            r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ a(bt, {})
    ]
  }
) }));
se.displayName = B.Content.displayName;
const dr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  B.Label,
  {
    ref: r,
    className: o("py-1.5 pl-8 pr-2 text-sm font-semibold", e),
    ...t
  }
));
dr.displayName = B.Label.displayName;
const te = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  B.Item,
  {
    ref: n,
    className: o(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(B.ItemIndicator, { children: /* @__PURE__ */ a(W, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ a(B.ItemText, { children: t })
    ]
  }
));
te.displayName = B.Item.displayName;
const cr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  B.Separator,
  {
    ref: r,
    className: o("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
cr.displayName = B.Separator.displayName;
function Oe({
  className: e,
  classNames: t,
  showOutsideDays: r = !0,
  ...n
}) {
  const [i, u] = s.useState(
    n.defaultMonth ?? n.month ?? /* @__PURE__ */ new Date()
  ), c = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ], f = Array.from({ length: 10 }, (m, d) => (/* @__PURE__ */ new Date()).getFullYear() - 5 + d);
  return /* @__PURE__ */ a(
    Ta,
    {
      showOutsideDays: r,
      month: i,
      onMonthChange: u,
      className: o("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center pt-1 relative items-center gap-2",
        caption_label: "hidden",
        nav: "flex items-center gap-1",
        button_previous: o(
          ie({ variant: "ghost" }),
          "absolute left-1 h-7 w-7 p-0 opacity-50 hover:opacity-100"
        ),
        button_next: o(
          ie({ variant: "ghost" }),
          "absolute right-1 h-7 w-7 p-0 opacity-50 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-[var(--foregrounds-quinary)] rounded-md w-9 font-normal text-[0.75rem] text-center",
        week: "flex w-full mt-1",
        day: o(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-lg",
          "[&:has([aria-selected].day-outside)]:bg-[var(--backgrounds-tertiary)]/50",
          "first:[&:has([aria-selected])]:rounded-l-lg",
          "last:[&:has([aria-selected])]:rounded-r-lg",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: o(
          ie({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal rounded-lg aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected: o(
          "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)] rounded-lg",
          "hover:bg-[var(--interactive-bg-active)]/80 focus:bg-[var(--interactive-bg-active)]"
        ),
        today: "bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-primary)] font-semibold rounded-lg",
        outside: "day-outside text-[var(--foregrounds-quinary)] opacity-50 aria-selected:bg-[var(--backgrounds-tertiary)]/50 aria-selected:text-[var(--foregrounds-tertiary)]",
        disabled: "text-[var(--foregrounds-quinary)] opacity-30",
        range_middle: "aria-selected:bg-[var(--backgrounds-tertiary)] aria-selected:text-[var(--foregrounds-primary)] rounded-none",
        hidden: "invisible",
        ...t
      },
      components: {
        Chevron: ({ orientation: m }) => m === "left" ? /* @__PURE__ */ a(Ge, { className: "h-4 w-4" }) : /* @__PURE__ */ a(ae, { className: "h-4 w-4" }),
        MonthCaption: ({ calendarMonth: m }) => /* @__PURE__ */ p("div", { className: "flex items-center gap-1.5 px-8", children: [
          /* @__PURE__ */ p(
            me,
            {
              value: String(m.date.getMonth()),
              onValueChange: (d) => {
                const l = new Date(i);
                l.setMonth(Number(d)), u(l);
              },
              children: [
                /* @__PURE__ */ a(ne, { className: "h-7 w-[110px] text-xs border-none shadow-none px-2 focus:ring-0", children: /* @__PURE__ */ a(fe, {}) }),
                /* @__PURE__ */ a(se, { children: c.map((d, l) => /* @__PURE__ */ a(te, { value: String(l), className: "text-xs", children: d }, l)) })
              ]
            }
          ),
          /* @__PURE__ */ p(
            me,
            {
              value: String(m.date.getFullYear()),
              onValueChange: (d) => {
                const l = new Date(i);
                l.setFullYear(Number(d)), u(l);
              },
              children: [
                /* @__PURE__ */ a(ne, { className: "h-7 w-[70px] text-xs border-none shadow-none px-2 focus:ring-0", children: /* @__PURE__ */ a(fe, {}) }),
                /* @__PURE__ */ a(se, { children: f.map((d) => /* @__PURE__ */ a(te, { value: String(d), className: "text-xs", children: d }, d)) })
              ]
            }
          )
        ] })
      },
      ...n
    }
  );
}
Oe.displayName = "Calendar";
const ur = {
  none: "",
  sm: "shadow-[0_1px_3px_0_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06)]",
  md: "shadow-[0_4px_12px_0_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.06)]",
  lg: "shadow-[0_12px_32px_0_rgba(0,0,0,0.14),0_4px_8px_-4px_rgba(0,0,0,0.08)]"
}, mr = s.forwardRef(
  ({ className: e, clickable: t, elevation: r = "sm", ...n }, i) => /* @__PURE__ */ a(
    "div",
    {
      ref: i,
      className: o(
        "rounded-lg border border-[var(--container-border)] bg-[var(--container-bg)] text-[var(--container-fg)]",
        ur[r],
        t && [
          "cursor-pointer transition-all duration-200",
          "hover:border-[var(--container-border-alt)] hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-px",
          "active:translate-y-0 active:shadow-[0_2px_6px_0_rgba(0,0,0,0.08)]"
        ],
        e
      ),
      ...n
    }
  )
);
mr.displayName = "Card";
const fr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("flex flex-col space-y-1.5 p-6", e), ...t }));
fr.displayName = "CardHeader";
const pr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("font-heading text-xl font-semibold leading-snug tracking-tight", e),
    ...t
  }
));
pr.displayName = "CardTitle";
const gr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("text-sm text-[var(--foregrounds-tertiary)] leading-relaxed", e), ...t }));
gr.displayName = "CardDescription";
const br = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("p-6 pt-0", e), ...t }));
br.displayName = "CardContent";
const hr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("flex items-center p-6 pt-0", e), ...t }));
hr.displayName = "CardFooter";
const ht = s.createContext(null);
function Fe() {
  const e = s.useContext(ht);
  if (!e)
    throw new Error("useCarousel must be used within a <Carousel />");
  return e;
}
const vr = s.forwardRef(
  ({
    orientation: e = "horizontal",
    opts: t,
    setApi: r,
    plugins: n,
    className: i,
    children: u,
    ...c
  }, f) => {
    const [m, d] = Ca(
      {
        ...t,
        axis: e === "horizontal" ? "x" : "y"
      },
      n
    ), [l, g] = s.useState(!1), [h, x] = s.useState(!1), E = s.useCallback((v) => {
      v && (g(v.canScrollPrev()), x(v.canScrollNext()));
    }, []), R = s.useCallback(() => {
      d == null || d.scrollPrev();
    }, [d]), S = s.useCallback(() => {
      d == null || d.scrollNext();
    }, [d]), N = s.useCallback(
      (v) => {
        v.key === "ArrowLeft" ? (v.preventDefault(), R()) : v.key === "ArrowRight" && (v.preventDefault(), S());
      },
      [R, S]
    );
    return s.useEffect(() => {
      !d || !r || r(d);
    }, [d, r]), s.useEffect(() => {
      if (d)
        return E(d), d.on("reInit", E), d.on("select", E), () => {
          d == null || d.off("select", E);
        };
    }, [d, E]), /* @__PURE__ */ a(
      ht.Provider,
      {
        value: {
          carouselRef: m,
          api: d,
          opts: t,
          orientation: e || ((t == null ? void 0 : t.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev: R,
          scrollNext: S,
          canScrollPrev: l,
          canScrollNext: h
        },
        children: /* @__PURE__ */ a(
          "div",
          {
            ref: f,
            onKeyDownCapture: N,
            className: o("relative", i),
            role: "region",
            "aria-roledescription": "carousel",
            ...c,
            children: u
          }
        )
      }
    );
  }
);
vr.displayName = "Carousel";
const xr = s.forwardRef(({ className: e, ...t }, r) => {
  const { carouselRef: n, orientation: i } = Fe();
  return /* @__PURE__ */ a("div", { ref: n, className: "overflow-hidden", children: /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      className: o(
        "flex",
        i === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        e
      ),
      ...t
    }
  ) });
});
xr.displayName = "CarouselContent";
const Nr = s.forwardRef(({ className: e, ...t }, r) => {
  const { orientation: n } = Fe();
  return /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      role: "group",
      "aria-roledescription": "slide",
      className: o(
        "min-w-0 shrink-0 grow-0 basis-full",
        n === "horizontal" ? "pl-4" : "pt-4",
        e
      ),
      ...t
    }
  );
});
Nr.displayName = "CarouselItem";
const yr = s.forwardRef(({ className: e, variant: t = "outline", size: r = "icon", ...n }, i) => {
  const { orientation: u, scrollPrev: c, canScrollPrev: f } = Fe();
  return /* @__PURE__ */ p(
    ee,
    {
      ref: i,
      variant: t,
      size: r,
      className: o(
        "absolute  h-8 w-8 rounded-full",
        u === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        e
      ),
      disabled: !f,
      onClick: c,
      ...n,
      children: [
        /* @__PURE__ */ a(Vt, { className: "h-4 w-4" }),
        /* @__PURE__ */ a("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
yr.displayName = "CarouselPrevious";
const wr = s.forwardRef(({ className: e, variant: t = "outline", size: r = "icon", ...n }, i) => {
  const { orientation: u, scrollNext: c, canScrollNext: f } = Fe();
  return /* @__PURE__ */ p(
    ee,
    {
      ref: i,
      variant: t,
      size: r,
      className: o(
        "absolute h-8 w-8 rounded-full",
        u === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        e
      ),
      disabled: !f,
      onClick: c,
      ...n,
      children: [
        /* @__PURE__ */ a(Gt, { className: "h-4 w-4" }),
        /* @__PURE__ */ a("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
wr.displayName = "CarouselNext";
const Rr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  Ue.Root,
  {
    ref: r,
    className: o(
      // Fixed size with min-w to prevent layout shift on check
      "peer h-4 w-4 min-w-4 shrink-0 rounded-sm border border-[var(--interactive-border-alt)]",
      "ring-offset-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-fg)] focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[var(--interactive-bg-active)] data-[state=checked]:border-[var(--interactive-bg-active)] data-[state=checked]:text-[var(--interactive-fg-active)]",
      "hover:border-[var(--interactive-fg-alt)]",
      e
    ),
    ...t,
    children: /* @__PURE__ */ a(
      Ue.Indicator,
      {
        className: "flex items-center justify-center text-current",
        children: /* @__PURE__ */ a(W, { className: "h-3 w-3", strokeWidth: 2.5 })
      }
    )
  }
));
Rr.displayName = Ue.Root.displayName;
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: !0
    }
  ],
  keyword: [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: !0
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0
    }
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      /(^|[^\w$])/.source + "(?:" + // constant
      (/NaN|Infinity/.source + "|" + // binary integer
      /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
      /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
      /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
      /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
      /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
    ),
    lookbehind: !0
  },
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
      // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
      // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
      // with the only syntax, so we have to define 2 different regex patterns.
      /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
      /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
      /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: !0,
    greedy: !0,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: !0,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  parameter: [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: !0,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: !0,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: !0,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: !0,
      inside: Prism.languages.javascript
    }
  ],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
  hashbang: {
    pattern: /^#!.*/,
    greedy: !0,
    alias: "comment"
  },
  "template-string": {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: !0,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      interpolation: {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: !0,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  },
  "string-property": {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: !0,
    greedy: !0,
    alias: "property"
  }
});
Prism.languages.insertBefore("javascript", "operator", {
  "literal-property": {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: !0,
    alias: "property"
  }
});
Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute(
  /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
  "javascript"
));
Prism.languages.js = Prism.languages.javascript;
(function(e) {
  e.languages.typescript = e.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: !0,
      greedy: !0,
      inside: null
      // see below
    },
    builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  }), e.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[\{*]|$))/
  ), delete e.languages.typescript.parameter, delete e.languages.typescript["literal-property"];
  var t = e.languages.extend("typescript", {});
  delete t["class-name"], e.languages.typescript["class-name"].inside = t, e.languages.insertBefore("typescript", "function", {
    decorator: {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        at: {
          pattern: /^@/,
          alias: "operator"
        },
        function: /^[\s\S]+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: !0,
      inside: {
        function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        generic: {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: "class-name",
          inside: t
        }
      }
    }
  }), e.languages.ts = e.languages.typescript;
})(Prism);
(function(e) {
  var t = e.util.clone(e.languages.javascript), r = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source, n = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source, i = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
  function u(m, d) {
    return m = m.replace(/<S>/g, function() {
      return r;
    }).replace(/<BRACES>/g, function() {
      return n;
    }).replace(/<SPREAD>/g, function() {
      return i;
    }), RegExp(m, d);
  }
  i = u(i).source, e.languages.jsx = e.languages.extend("markup", t), e.languages.jsx.tag.pattern = u(
    /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
  ), e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/, e.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/, e.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, e.languages.jsx.tag.inside.comment = t.comment, e.languages.insertBefore("inside", "attr-name", {
    spread: {
      pattern: u(/<SPREAD>/.source),
      inside: e.languages.jsx
    }
  }, e.languages.jsx.tag), e.languages.insertBefore("inside", "special-attr", {
    script: {
      // Allow for two levels of nesting
      pattern: u(/=<BRACES>/.source),
      alias: "language-javascript",
      inside: {
        "script-punctuation": {
          pattern: /^=(?=\{)/,
          alias: "punctuation"
        },
        rest: e.languages.jsx
      }
    }
  }, e.languages.jsx.tag);
  var c = function(m) {
    return m ? typeof m == "string" ? m : typeof m.content == "string" ? m.content : m.content.map(c).join("") : "";
  }, f = function(m) {
    for (var d = [], l = 0; l < m.length; l++) {
      var g = m[l], h = !1;
      if (typeof g != "string" && (g.type === "tag" && g.content[0] && g.content[0].type === "tag" ? g.content[0].content[0].content === "</" ? d.length > 0 && d[d.length - 1].tagName === c(g.content[0].content[1]) && d.pop() : g.content[g.content.length - 1].content === "/>" || d.push({
        tagName: c(g.content[0].content[1]),
        openedBraces: 0
      }) : d.length > 0 && g.type === "punctuation" && g.content === "{" ? d[d.length - 1].openedBraces++ : d.length > 0 && d[d.length - 1].openedBraces > 0 && g.type === "punctuation" && g.content === "}" ? d[d.length - 1].openedBraces-- : h = !0), (h || typeof g == "string") && d.length > 0 && d[d.length - 1].openedBraces === 0) {
        var x = c(g);
        l < m.length - 1 && (typeof m[l + 1] == "string" || m[l + 1].type === "plain-text") && (x += c(m[l + 1]), m.splice(l + 1, 1)), l > 0 && (typeof m[l - 1] == "string" || m[l - 1].type === "plain-text") && (x = c(m[l - 1]) + x, m.splice(l - 1, 1), l--), m[l] = new e.Token("plain-text", x, null, x);
      }
      g.content && typeof g.content != "string" && f(g.content);
    }
  };
  e.hooks.add("after-tokenize", function(m) {
    m.language !== "jsx" && m.language !== "tsx" || f(m.tokens);
  });
})(Prism);
(function(e) {
  var t = e.util.clone(e.languages.typescript);
  e.languages.tsx = e.languages.extend("jsx", t), delete e.languages.tsx.parameter, delete e.languages.tsx["literal-property"];
  var r = e.languages.tsx.tag;
  r.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + "(?:" + r.pattern.source + ")", r.pattern.flags), r.lookbehind = !0;
})(Prism);
(function(e) {
  var t = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  e.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + t.source + ")*?" + /(?:;|(?=\s*\{))/.source),
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector"
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0
        }
        // See rest below
      }
    },
    url: {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp("^" + t.source + "$"),
          alias: "url"
        }
      }
    },
    selector: {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + t.source + ")*(?=\\s*\\{)"),
      lookbehind: !0
    },
    string: {
      pattern: t,
      greedy: !0
    },
    property: {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0
    },
    important: /!important\b/i,
    function: {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: !0
    },
    punctuation: /[(){};:,]/
  }, e.languages.css.atrule.inside.rest = e.languages.css;
  var r = e.languages.markup;
  r && (r.tag.addInlined("style", "css"), r.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: "keyword"
  }
};
Prism.languages.webmanifest = Prism.languages.json;
(function(e) {
  var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b", r = {
    pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
    lookbehind: !0,
    alias: "punctuation",
    // this looks reasonably well in all themes
    inside: null
    // see below
  }, n = {
    bash: r,
    environment: {
      pattern: RegExp("\\$" + t),
      alias: "constant"
    },
    variable: [
      // [0]: Arithmetic Environment
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: !0,
        inside: {
          // If there is a $ sign at the beginning highlight $(( and )) as variable
          variable: [
            {
              pattern: /(^\$\(\([\s\S]+)\)\)/,
              lookbehind: !0
            },
            /^\$\(\(/
          ],
          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
          operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
          // If there is no $ sign at the beginning highlight (( and )) as punctuation
          punctuation: /\(\(?|\)\)?|,|;/
        }
      },
      // [1]: Command Substitution
      {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: !0,
        inside: {
          variable: /^\$\(|^`|\)$|`$/
        }
      },
      // [2]: Brace expansion
      {
        pattern: /\$\{[^}]+\}/,
        greedy: !0,
        inside: {
          operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          punctuation: /[\[\]]/,
          environment: {
            pattern: RegExp("(\\{)" + t),
            lookbehind: !0,
            alias: "constant"
          }
        }
      },
      /\$(?:\w+|[#?*!@$])/
    ],
    // Escape sequences from echo and printf's manuals, and escaped quotes.
    entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
  };
  e.languages.bash = {
    shebang: {
      pattern: /^#!\s*\/.*/,
      alias: "important"
    },
    comment: {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: !0
    },
    "function-name": [
      // a) function foo {
      // b) foo() {
      // c) function foo() {
      // but not “foo {”
      {
        // a) and c)
        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: "function"
      },
      {
        // b)
        pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
        alias: "function"
      }
    ],
    // Highlight variable names as variables in for and select beginnings.
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: !0
    },
    // Highlight variable names as variables in the left-hand part
    // of assignments (“=” and “+=”).
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
      inside: {
        environment: {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
          lookbehind: !0,
          alias: "constant"
        }
      },
      alias: "variable",
      lookbehind: !0
    },
    // Highlight parameter names as variables
    parameter: {
      pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
      alias: "variable",
      lookbehind: !0
    },
    string: [
      // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: n
      },
      // Here-document with quotes around the tag
      // → No expansion (so no “inside”).
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          bash: r
        }
      },
      // “Normal” string
      {
        // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
        lookbehind: !0,
        greedy: !0,
        inside: n
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
        pattern: /(^|[^$\\])'[^']*'/,
        lookbehind: !0,
        greedy: !0
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
        pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
        greedy: !0,
        inside: {
          entity: n.entity
        }
      }
    ],
    environment: {
      pattern: RegExp("\\$?" + t),
      alias: "constant"
    },
    variable: n.variable,
    function: {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    keyword: {
      pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
    builtin: {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
      lookbehind: !0,
      // Alias added to make those easier to distinguish from strings.
      alias: "class-name"
    },
    boolean: {
      pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    "file-descriptor": {
      pattern: /\B&\d\b/,
      alias: "important"
    },
    operator: {
      // Lots of redirections here, but not just that.
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: {
        "file-descriptor": {
          pattern: /^\d/,
          alias: "important"
        }
      }
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: !0
    }
  }, r.inside = e.languages.bash;
  for (var i = [
    "comment",
    "function-name",
    "for-or-select",
    "assign-left",
    "parameter",
    "string",
    "environment",
    "function",
    "keyword",
    "builtin",
    "boolean",
    "file-descriptor",
    "operator",
    "punctuation",
    "number"
  ], u = n.variable[1].inside, c = 0; c < i.length; c++)
    u[i[c]] = e.languages.bash[i[c]];
  e.languages.sh = e.languages.bash, e.languages.shell = e.languages.bash;
})(Prism);
Prism.languages.python = {
  comment: {
    pattern: /(^|[^\\])#.*/,
    lookbehind: !0,
    greedy: !0
  },
  "string-interpolation": {
    pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
        pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: !0,
        inside: {
          "format-spec": {
            pattern: /(:)[^:(){}]+(?=\}$)/,
            lookbehind: !0
          },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation"
          },
          rest: null
        }
      },
      string: /[\s\S]+/
    }
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: "string"
  },
  string: {
    pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0
  },
  "class-name": {
    pattern: /(\bclass\s+)\w+/i,
    lookbehind: !0
  },
  decorator: {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: {
      punctuation: /\./
    }
  },
  keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:False|None|True)\b/,
  number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python;
Prism.languages.py = Prism.languages.python;
(function(e) {
  var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/, r = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source, n = {
    pattern: RegExp(/(^|[^\w.])/.source + r + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
    lookbehind: !0,
    inside: {
      namespace: {
        pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
        inside: {
          punctuation: /\./
        }
      },
      punctuation: /\./
    }
  };
  e.languages.java = e.languages.extend("clike", {
    string: {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
      lookbehind: !0,
      greedy: !0
    },
    "class-name": [
      n,
      {
        // variables, parameters, and constructor references
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(/(^|[^\w.])/.source + r + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),
        lookbehind: !0,
        inside: n.inside
      },
      {
        // class names based on keyword
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + r + /[A-Z]\w*\b/.source),
        lookbehind: !0,
        inside: n.inside
      }
    ],
    keyword: t,
    function: [
      e.languages.clike.function,
      {
        pattern: /(::\s*)[a-z_]\w*/,
        lookbehind: !0
      }
    ],
    number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: !0
    },
    constant: /\b[A-Z][A-Z_\d]+\b/
  }), e.languages.insertBefore("java", "string", {
    "triple-quoted-string": {
      // http://openjdk.java.net/jeps/355#Description
      pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
      greedy: !0,
      alias: "string"
    },
    char: {
      pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
      greedy: !0
    }
  }), e.languages.insertBefore("java", "class-name", {
    annotation: {
      pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
      lookbehind: !0,
      alias: "punctuation"
    },
    generics: {
      pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
      inside: {
        "class-name": n,
        keyword: t,
        punctuation: /[<>(),.:]/,
        operator: /[?&|]/
      }
    },
    import: [
      {
        pattern: RegExp(/(\bimport\s+)/.source + r + /(?:[A-Z]\w*|\*)(?=\s*;)/.source),
        lookbehind: !0,
        inside: {
          namespace: n.inside.namespace,
          punctuation: /\./,
          operator: /\*/,
          "class-name": /\w+/
        }
      },
      {
        pattern: RegExp(/(\bimport\s+static\s+)/.source + r + /(?:\w+|\*)(?=\s*;)/.source),
        lookbehind: !0,
        alias: "static",
        inside: {
          namespace: n.inside.namespace,
          static: /\b\w+$/,
          punctuation: /\./,
          operator: /\*/,
          "class-name": /\w+/
        }
      }
    ],
    namespace: {
      pattern: RegExp(
        /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, function() {
          return t.source;
        })
      ),
      lookbehind: !0,
      inside: {
        punctuation: /\./
      }
    }
  });
})(Prism);
Prism.languages.go = Prism.languages.extend("clike", {
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
    lookbehind: !0,
    greedy: !0
  },
  keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  boolean: /\b(?:_|false|iota|nil|true)\b/,
  number: [
    // binary and octal integers
    /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
    // hexadecimal integers and floats
    /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
    // decimal integers and floats
    /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
  ],
  operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
});
Prism.languages.insertBefore("go", "string", {
  char: {
    pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
    greedy: !0
  }
});
delete Prism.languages.go["class-name"];
(function(e) {
  for (var t = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source, r = 0; r < 2; r++)
    t = t.replace(/<self>/g, function() {
      return t;
    });
  t = t.replace(/<self>/g, function() {
    return /[^\s\S]/.source;
  }), e.languages.rust = {
    comment: [
      {
        pattern: RegExp(/(^|[^\\])/.source + t),
        lookbehind: !0,
        greedy: !0
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
      }
    ],
    string: {
      pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
      greedy: !0
    },
    char: {
      pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
      greedy: !0
    },
    attribute: {
      pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
      greedy: !0,
      alias: "attr-name",
      inside: {
        string: null
        // see below
      }
    },
    // Closure params should not be confused with bitwise OR |
    "closure-params": {
      pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        "closure-punctuation": {
          pattern: /^\||\|$/,
          alias: "punctuation"
        },
        rest: null
        // see below
      }
    },
    "lifetime-annotation": {
      pattern: /'\w+/,
      alias: "symbol"
    },
    "fragment-specifier": {
      pattern: /(\$\w+:)[a-z]+/,
      lookbehind: !0,
      alias: "punctuation"
    },
    variable: /\$\w+/,
    "function-definition": {
      pattern: /(\bfn\s+)\w+/,
      lookbehind: !0,
      alias: "function"
    },
    "type-definition": {
      pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
      lookbehind: !0,
      alias: "class-name"
    },
    "module-declaration": [
      {
        pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
        lookbehind: !0,
        alias: "namespace"
      },
      {
        pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
        lookbehind: !0,
        alias: "namespace",
        inside: {
          punctuation: /::/
        }
      }
    ],
    keyword: [
      // https://github.com/rust-lang/reference/blob/master/src/keywords.md
      /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
      // primitives and str
      // https://doc.rust-lang.org/stable/rust-by-example/primitives.html
      /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
    ],
    // functions can technically start with an upper-case letter, but this will introduce a lot of false positives
    // and Rust's naming conventions recommend snake_case anyway.
    // https://doc.rust-lang.org/1.0.0/style/style/naming/README.html
    function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
    macro: {
      pattern: /\b\w+!/,
      alias: "property"
    },
    constant: /\b[A-Z_][A-Z_\d]+\b/,
    "class-name": /\b[A-Z]\w*\b/,
    namespace: {
      pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
      inside: {
        punctuation: /::/
      }
    },
    // Hex, oct, bin, dec numbers with visual separators and type suffix
    number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
    boolean: /\b(?:false|true)\b/,
    punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
  }, e.languages.rust["closure-params"].inside.rest = e.languages.rust, e.languages.rust.attribute.inside.string = e.languages.rust.string;
})(Prism);
Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0
  },
  variable: [
    {
      pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
      greedy: !0
    },
    /@[\w.$]+/
  ],
  string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: !0,
    lookbehind: !0
  },
  identifier: {
    pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
    greedy: !0,
    lookbehind: !0,
    inside: {
      punctuation: /^`|`$/
    }
  },
  function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  // Should we highlight user defined functions too?
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
  number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/
};
(function(e) {
  var t = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  function r(l) {
    return l = l.replace(/<inner>/g, function() {
      return t;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + l + ")");
  }
  var n = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, i = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
    return n;
  }), u = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
  e.languages.markdown = e.languages.extend("markup", {}), e.languages.insertBefore("markdown", "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        punctuation: /^---|---$/,
        "front-matter": {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ["yaml", "language-yaml"],
          inside: e.languages.yaml
        }
      }
    },
    blockquote: {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: "punctuation"
    },
    table: {
      pattern: RegExp("^" + i + u + "(?:" + i + ")*", "m"),
      inside: {
        "table-data-rows": {
          pattern: RegExp("^(" + i + u + ")(?:" + i + ")*$"),
          lookbehind: !0,
          inside: {
            "table-data": {
              pattern: RegExp(n),
              inside: e.languages.markdown
            },
            punctuation: /\|/
          }
        },
        "table-line": {
          pattern: RegExp("^(" + i + ")" + u + "$"),
          lookbehind: !0,
          inside: {
            punctuation: /\||:?-{3,}:?/
          }
        },
        "table-header-row": {
          pattern: RegExp("^" + i + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(n),
              alias: "important",
              inside: e.languages.markdown
            },
            punctuation: /\|/
          }
        }
      }
    },
    code: [
      {
        // Prefixed by 4 spaces or 1 tab and preceded by an empty line
        pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
        lookbehind: !0,
        alias: "keyword"
      },
      {
        // ```optional language
        // code block
        // ```
        pattern: /^```[\s\S]*?^```$/m,
        greedy: !0,
        inside: {
          "code-block": {
            pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
            lookbehind: !0
          },
          "code-language": {
            pattern: /^(```).+/,
            lookbehind: !0
          },
          punctuation: /```/
        }
      }
    ],
    title: [
      {
        // title 1
        // =======
        // title 2
        // -------
        pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
        alias: "important",
        inside: {
          punctuation: /==+$|--+$/
        }
      },
      {
        // # title 1
        // ###### title 6
        pattern: /(^\s*)#.+/m,
        lookbehind: !0,
        alias: "important",
        inside: {
          punctuation: /^#+|#+$/
        }
      }
    ],
    hr: {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    list: {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    "url-reference": {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: !0
        },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/
      },
      alias: "url"
    },
    bold: {
      // **strong**
      // __strong__
      // allow one nested instance of italic text using the same delimiter
      pattern: r(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /\*\*|__/
      }
    },
    italic: {
      // *em*
      // _em_
      // allow one nested instance of bold text using the same delimiter
      pattern: r(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /[*_]/
      }
    },
    strike: {
      // ~~strike through~~
      // ~strike~
      // eslint-disable-next-line regexp/strict
      pattern: r(/(~~?)(?:(?!~)<inner>)+\2/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /~~?/
      }
    },
    "code-snippet": {
      // `code`
      // ``code``
      pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: !0,
      greedy: !0,
      alias: ["code", "keyword"]
    },
    url: {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: r(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        operator: /^!/,
        content: {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        variable: {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: !0
        },
        url: {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: !0
        },
        string: {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: !0
        }
      }
    }
  }), ["url", "bold", "italic", "strike"].forEach(function(l) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(g) {
      l !== g && (e.languages.markdown[l].inside.content.inside[g] = e.languages.markdown[g]);
    });
  }), e.hooks.add("after-tokenize", function(l) {
    if (l.language !== "markdown" && l.language !== "md")
      return;
    function g(h) {
      if (!(!h || typeof h == "string"))
        for (var x = 0, E = h.length; x < E; x++) {
          var R = h[x];
          if (R.type !== "code") {
            g(R.content);
            continue;
          }
          var S = R.content[1], N = R.content[3];
          if (S && N && S.type === "code-language" && N.type === "code-block" && typeof S.content == "string") {
            var v = S.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            v = (/[a-z][\w-]*/i.exec(v) || [""])[0].toLowerCase();
            var w = "language-" + v;
            N.alias ? typeof N.alias == "string" ? N.alias = [N.alias, w] : N.alias.push(w) : N.alias = [w];
          }
        }
    }
    g(l.tokens);
  }), e.hooks.add("wrap", function(l) {
    if (l.type === "code-block") {
      for (var g = "", h = 0, x = l.classes.length; h < x; h++) {
        var E = l.classes[h], R = /language-(.+)/.exec(E);
        if (R) {
          g = R[1];
          break;
        }
      }
      var S = e.languages[g];
      if (S)
        l.content = e.highlight(d(l.content), S, g);
      else if (g && g !== "none" && e.plugins.autoloader) {
        var N = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
        l.attributes.id = N, e.plugins.autoloader.loadLanguages(g, function() {
          var v = document.getElementById(N);
          v && (v.innerHTML = e.highlight(v.textContent, e.languages[g], g));
        });
      }
    }
  });
  var c = RegExp(e.languages.markup.tag.pattern.source, "gi"), f = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  }, m = String.fromCodePoint || String.fromCharCode;
  function d(l) {
    var g = l.replace(c, "");
    return g = g.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(h, x) {
      if (x = x.toLowerCase(), x[0] === "#") {
        var E;
        return x[1] === "x" ? E = parseInt(x.slice(2), 16) : E = Number(x.slice(1)), m(E);
      } else {
        var R = f[x];
        return R || h;
      }
    }), g;
  }
  e.languages.md = e.languages.markdown;
})(Prism);
(function(e) {
  var t = /[*&][^\s[\]{},]+/, r = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/, n = "(?:" + r.source + "(?:[ 	]+" + t.source + ")?|" + t.source + "(?:[ 	]+" + r.source + ")?)", i = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function() {
    return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
  }), u = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
  function c(f, m) {
    m = (m || "").replace(/m/g, "") + "m";
    var d = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
      return n;
    }).replace(/<<value>>/g, function() {
      return f;
    });
    return RegExp(d, m);
  }
  e.languages.yaml = {
    scalar: {
      pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function() {
        return n;
      })),
      lookbehind: !0,
      alias: "string"
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
        return n;
      }).replace(/<<key>>/g, function() {
        return "(?:" + i + "|" + u + ")";
      })),
      lookbehind: !0,
      greedy: !0,
      alias: "atrule"
    },
    directive: {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: !0,
      alias: "important"
    },
    datetime: {
      pattern: c(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
      lookbehind: !0,
      alias: "number"
    },
    boolean: {
      pattern: c(/false|true/.source, "i"),
      lookbehind: !0,
      alias: "important"
    },
    null: {
      pattern: c(/null|~/.source, "i"),
      lookbehind: !0,
      alias: "important"
    },
    string: {
      pattern: c(u),
      lookbehind: !0,
      greedy: !0
    },
    number: {
      pattern: c(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "i"),
      lookbehind: !0
    },
    tag: r,
    important: t,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
  }, e.languages.yml = e.languages.yaml;
})(Prism);
const Sr = s.forwardRef(
  ({
    className: e,
    code: t,
    language: r = "text",
    showLineNumbers: n = !1,
    showCopyButton: i = !0,
    filename: u,
    highlightLines: c = [],
    ...f
  }, m) => {
    const [d, l] = s.useState(!1), [g, h] = s.useState("");
    s.useEffect(() => {
      if (r !== "text") {
        const R = et.languages[r];
        h(R ? et.highlight(t, R, r) : t);
      } else
        h(t);
    }, [t, r]);
    const x = async () => {
      await navigator.clipboard.writeText(t), l(!0), setTimeout(() => l(!1), 2e3);
    }, E = g.split(`
`);
    return /* @__PURE__ */ p(
      "div",
      {
        ref: m,
        className: o(
          "relative rounded-lg border bg-muted/50 text-sm",
          e
        ),
        ...f,
        children: [
          (u || i) && /* @__PURE__ */ p("div", { className: "flex items-center justify-between border-b px-4 py-2", children: [
            u && /* @__PURE__ */ a("span", { className: "text-xs text-muted-foreground", children: u }),
            i && /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: x,
                className: "ml-auto flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground",
                children: d ? /* @__PURE__ */ p(le, { children: [
                  /* @__PURE__ */ a(W, { className: "h-3 w-3" }),
                  "Copied"
                ] }) : /* @__PURE__ */ p(le, { children: [
                  /* @__PURE__ */ a(Kt, { className: "h-3 w-3" }),
                  "Copy"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: "overflow-x-auto p-4", children: /* @__PURE__ */ a("pre", { className: "font-mono text-sm", children: /* @__PURE__ */ a("code", { children: E.map((R, S) => /* @__PURE__ */ p(
            "div",
            {
              className: o(
                "leading-6",
                c.includes(S + 1) && "bg-yellow-500/20 -mx-4 px-4"
              ),
              children: [
                n && /* @__PURE__ */ a("span", { className: "mr-4 inline-block w-8 select-none text-right text-muted-foreground", children: S + 1 }),
                /* @__PURE__ */ a("span", { dangerouslySetInnerHTML: { __html: R || " " } })
              ]
            },
            S
          )) }) }) })
        ]
      }
    );
  }
);
Sr.displayName = "CodeBlock";
const Ci = pe.Root, Ai = pe.CollapsibleTrigger, Di = pe.CollapsibleContent, Er = P.Root, Li = P.Trigger, kr = P.Portal, Pi = P.Close, vt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  P.Overlay,
  {
    ref: r,
    className: o(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
vt.displayName = P.Overlay.displayName;
const xt = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(kr, { children: [
  /* @__PURE__ */ a(vt, {}),
  /* @__PURE__ */ p(
    P.Content,
    {
      ref: n,
      className: o(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ p(P.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ a(G, { className: "h-4 w-4" }),
          /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
xt.displayName = P.Content.displayName;
const Ir = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
Ir.displayName = "DialogHeader";
const Tr = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
Tr.displayName = "DialogFooter";
const Cr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  P.Title,
  {
    ref: r,
    className: o(
      "font-heading text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
Cr.displayName = P.Title.displayName;
const Ar = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  P.Description,
  {
    ref: r,
    className: o("text-sm text-muted-foreground", e),
    ...t
  }
));
Ar.displayName = P.Description.displayName;
const Ye = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  K,
  {
    ref: r,
    className: o(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...t
  }
));
Ye.displayName = K.displayName;
const Mi = ({ children: e, ...t }) => /* @__PURE__ */ a(Er, { ...t, children: /* @__PURE__ */ a(xt, { className: "overflow-hidden p-0 shadow-lg", children: /* @__PURE__ */ a(Ye, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), Nt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ a(he, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ a(
    K.Input,
    {
      ref: r,
      className: o(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Nt.displayName = K.Input.displayName;
const yt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  K.List,
  {
    ref: r,
    className: o("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
    ...t
  }
));
yt.displayName = K.List.displayName;
const wt = s.forwardRef((e, t) => /* @__PURE__ */ a(
  K.Empty,
  {
    ref: t,
    className: "py-6 text-center text-sm",
    ...e
  }
));
wt.displayName = K.Empty.displayName;
const Rt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  K.Group,
  {
    ref: r,
    className: o(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    ...t
  }
));
Rt.displayName = K.Group.displayName;
const Dr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  K.Separator,
  {
    ref: r,
    className: o("-mx-1 h-px bg-border", e),
    ...t
  }
));
Dr.displayName = K.Separator.displayName;
const St = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  K.Item,
  {
    ref: r,
    className: o(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      e
    ),
    ...t
  }
));
St.displayName = K.Item.displayName;
const Lr = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "span",
  {
    className: o(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...t
  }
);
Lr.displayName = "CommandShortcut";
const _i = _.Root, Oi = _.Trigger, Fi = _.Group, zi = _.Portal, Bi = _.Sub, $i = _.RadioGroup, Pr = s.forwardRef(({ className: e, inset: t, children: r, ...n }, i) => /* @__PURE__ */ p(
  _.SubTrigger,
  {
    ref: i,
    className: o(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      t && "pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ a(ae, { className: "ml-auto h-4 w-4" })
    ]
  }
));
Pr.displayName = _.SubTrigger.displayName;
const Mr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  _.SubContent,
  {
    ref: r,
    className: o(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Mr.displayName = _.SubContent.displayName;
const _r = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(_.Portal, { children: /* @__PURE__ */ a(
  _.Content,
  {
    ref: r,
    className: o(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
_r.displayName = _.Content.displayName;
const Or = s.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ a(
  _.Item,
  {
    ref: n,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t && "pl-8",
      e
    ),
    ...r
  }
));
Or.displayName = _.Item.displayName;
const Fr = s.forwardRef(({ className: e, children: t, checked: r, ...n }, i) => /* @__PURE__ */ p(
  _.CheckboxItem,
  {
    ref: i,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(_.ItemIndicator, { children: /* @__PURE__ */ a(W, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
Fr.displayName = _.CheckboxItem.displayName;
const zr = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  _.RadioItem,
  {
    ref: n,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(_.ItemIndicator, { children: /* @__PURE__ */ a(nt, { className: "h-2 w-2 fill-current" }) }) }),
      t
    ]
  }
));
zr.displayName = _.RadioItem.displayName;
const Br = s.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ a(
  _.Label,
  {
    ref: n,
    className: o(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      t && "pl-8",
      e
    ),
    ...r
  }
));
Br.displayName = _.Label.displayName;
const $r = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  _.Separator,
  {
    ref: r,
    className: o("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
$r.displayName = _.Separator.displayName;
const Ur = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "span",
  {
    className: o(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...t
  }
);
Ur.displayName = "ContextMenuShortcut";
const Hr = [
  {
    type: "visa",
    name: "Visa",
    pattern: /^4/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 18, 19]
  },
  {
    type: "mastercard",
    name: "Mastercard",
    pattern: /^(5[1-5]|2[2-7])/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16]
  },
  {
    type: "amex",
    name: "American Express",
    pattern: /^3[47]/,
    cvvLength: 4,
    gaps: [4, 10],
    lengths: [15]
  },
  {
    type: "discover",
    name: "Discover",
    pattern: /^(6011|65|64[4-9])/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 19]
  },
  {
    type: "diners",
    name: "Diners Club",
    pattern: /^(36|38|30[0-5])/,
    cvvLength: 3,
    gaps: [4, 10],
    lengths: [14, 16, 19]
  },
  {
    type: "jcb",
    name: "JCB",
    pattern: /^35/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19]
  },
  {
    type: "unionpay",
    name: "UnionPay",
    pattern: /^62/,
    cvvLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19]
  }
];
function Et(e) {
  const t = e.replace(/\s/g, "");
  return Hr.find((r) => r.pattern.test(t));
}
function jr(e, t = [4, 8, 12]) {
  const r = e.replace(/\D/g, "");
  let n = "", i = 0;
  for (let u = 0; u < r.length; u++)
    i < t.length && u === t[i] && (n += " ", i++), n += r[u];
  return n;
}
function Gr(e) {
  const t = e.replace(/\D/g, "");
  return t.length >= 2 ? `${t.slice(0, 2)}/${t.slice(2, 4)}` : t;
}
const Vr = () => /* @__PURE__ */ a("svg", { viewBox: "0 0 48 16", width: "38", height: "12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("text", { x: "0", y: "13", fontFamily: "Arial", fontWeight: "800", fontSize: "14", fill: "#1A1F71", letterSpacing: "-0.5", children: "VISA" }) }), Kr = () => /* @__PURE__ */ p("svg", { viewBox: "0 0 36 24", width: "36", height: "24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ a("circle", { cx: "13", cy: "12", r: "10", fill: "#EB001B" }),
  /* @__PURE__ */ a("circle", { cx: "23", cy: "12", r: "10", fill: "#F79E1B" }),
  /* @__PURE__ */ a("path", { d: "M18 4.8A10 10 0 0 1 22.2 12 10 10 0 0 1 18 19.2 10 10 0 0 1 13.8 12 10 10 0 0 1 18 4.8z", fill: "#FF5F00" })
] }), qr = () => /* @__PURE__ */ a("svg", { viewBox: "0 0 50 16", width: "40", height: "13", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("text", { x: "0", y: "12", fontFamily: "Arial", fontWeight: "700", fontSize: "11", fill: "#2E77BC", letterSpacing: "0.5", children: "AMEX" }) }), Yr = () => /* @__PURE__ */ a("svg", { viewBox: "0 0 64 16", width: "52", height: "13", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("text", { x: "0", y: "12", fontFamily: "Arial", fontWeight: "700", fontSize: "10", fill: "#F76F20", letterSpacing: "0.2", children: "DISCOVER" }) }), Wr = ({ type: e }) => {
  switch (e) {
    case "visa":
      return /* @__PURE__ */ a(Vr, {});
    case "mastercard":
      return /* @__PURE__ */ a(Kr, {});
    case "amex":
      return /* @__PURE__ */ a(qr, {});
    case "discover":
      return /* @__PURE__ */ a(Yr, {});
    default:
      return /* @__PURE__ */ a(st, { className: "h-5 w-5 text-[var(--foregrounds-quinary)]" });
  }
}, kt = s.forwardRef(
  ({ className: e, onChange: t, ...r }, n) => {
    const [i, u] = s.useState(""), [c, f] = s.useState("unknown"), m = (d) => {
      const l = d.target.value.replace(/\D/g, ""), g = Et(l), h = (g == null ? void 0 : g.lengths[g.lengths.length - 1]) || 19;
      if (l.length <= h) {
        const x = jr(l, g == null ? void 0 : g.gaps);
        u(x);
        const E = (g == null ? void 0 : g.type) || "unknown";
        f(E), t == null || t(l, E);
      }
    };
    return /* @__PURE__ */ p("div", { className: "relative", children: [
      /* @__PURE__ */ a(st, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          autoComplete: "cc-number",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-12 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            e
          ),
          ref: n,
          value: i,
          onChange: m,
          placeholder: "1234 5678 9012 3456",
          ...r
        }
      ),
      /* @__PURE__ */ a("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ a(Wr, { type: c }) })
    ] });
  }
);
kt.displayName = "CreditCardNumberInput";
const It = s.forwardRef(
  ({ className: e, onChange: t, ...r }, n) => {
    const [i, u] = s.useState(""), c = (f) => {
      const m = f.target.value.replace(/\D/g, "");
      if (m.length <= 4) {
        const d = Gr(m);
        u(d), t == null || t(m);
      }
    };
    return /* @__PURE__ */ p("div", { className: "relative", children: [
      /* @__PURE__ */ a(Le, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          autoComplete: "cc-exp",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            e
          ),
          ref: n,
          value: i,
          onChange: c,
          placeholder: "MM/YY",
          ...r
        }
      )
    ] });
  }
);
It.displayName = "CreditCardExpiryInput";
const Tt = s.forwardRef(
  ({ className: e, cardType: t = "unknown", onChange: r, ...n }, i) => {
    const [u, c] = s.useState(""), f = t === "amex" ? 4 : 3, m = (d) => {
      const l = d.target.value.replace(/\D/g, "");
      l.length <= f && (c(l), r == null || r(l));
    };
    return /* @__PURE__ */ p("div", { className: "relative", children: [
      /* @__PURE__ */ a(Ve, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          autoComplete: "cc-csc",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            e
          ),
          ref: i,
          value: u,
          onChange: m,
          placeholder: t === "amex" ? "1234" : "123",
          maxLength: f,
          ...n
        }
      )
    ] });
  }
);
Tt.displayName = "CreditCardCVVInput";
const Xr = s.forwardRef(
  ({ className: e, onCardChange: t, disabled: r }, n) => {
    const [i, u] = s.useState(""), [c, f] = s.useState(""), [m, d] = s.useState(""), [l, g] = s.useState("unknown");
    return s.useEffect(() => {
      const h = Et(i), x = h ? h.lengths.includes(i.length) : i.length >= 13 && i.length <= 19, E = c.length === 4, R = l === "amex" ? m.length === 4 : m.length === 3;
      t == null || t({
        number: i,
        expiry: c,
        cvv: m,
        cardType: l,
        isValid: x && E && R
      });
    }, [i, c, m, l, t]), /* @__PURE__ */ p("div", { ref: n, className: o("space-y-3", e), children: [
      /* @__PURE__ */ a(
        kt,
        {
          onChange: (h, x) => {
            u(h), g(x);
          },
          disabled: r
        }
      ),
      /* @__PURE__ */ p("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ a(
          It,
          {
            onChange: f,
            disabled: r
          }
        ),
        /* @__PURE__ */ a(
          Tt,
          {
            cardType: l,
            onChange: d,
            disabled: r
          }
        )
      ] })
    ] });
  }
);
Xr.displayName = "CreditCardInput";
const Zr = s.forwardRef(
  ({
    value: e,
    onChange: t,
    placeholder: r = "Pick a date",
    disabled: n = !1,
    className: i,
    dateFormat: u = "PPP"
  }, c) => {
    const [f, m] = s.useState(!1);
    return /* @__PURE__ */ p(ke, { open: f, onOpenChange: m, children: [
      /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ p(
        ee,
        {
          ref: c,
          variant: "outline",
          disabled: n,
          className: o(
            "w-full justify-start text-left font-normal",
            !e && "text-muted-foreground",
            i
          ),
          children: [
            /* @__PURE__ */ a(Le, { className: "mr-2 h-4 w-4" }),
            e ? we(e, u) : /* @__PURE__ */ a("span", { children: r })
          ]
        }
      ) }),
      /* @__PURE__ */ a(xe, { className: "w-[var(--radix-popover-trigger-width)] p-0", align: "start", children: /* @__PURE__ */ a(
        Oe,
        {
          mode: "single",
          selected: e,
          onSelect: (d) => {
            t == null || t(d), m(!1);
          },
          initialFocus: !0
        }
      ) })
    ] });
  }
);
Zr.displayName = "DatePicker";
const Jr = s.forwardRef(
  ({
    value: e,
    onChange: t,
    placeholder: r = "Pick a date range",
    disabled: n = !1,
    className: i,
    dateFormat: u = "LLL dd, y"
  }, c) => {
    const [f, m] = s.useState(!1);
    return /* @__PURE__ */ p(ke, { open: f, onOpenChange: m, children: [
      /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ p(
        ee,
        {
          ref: c,
          variant: "outline",
          disabled: n,
          className: o(
            "w-full justify-start text-left font-normal",
            !(e != null && e.from) && "text-muted-foreground",
            i
          ),
          children: [
            /* @__PURE__ */ a(Le, { className: "mr-2 h-4 w-4" }),
            e != null && e.from ? e.to ? /* @__PURE__ */ p(le, { children: [
              we(e.from, u),
              " -",
              " ",
              we(e.to, u)
            ] }) : we(e.from, u) : /* @__PURE__ */ a("span", { children: r })
          ]
        }
      ) }),
      /* @__PURE__ */ a(xe, { className: "w-[var(--radix-popover-trigger-width)] p-0", align: "start", children: /* @__PURE__ */ a(
        Oe,
        {
          mode: "range",
          defaultMonth: e == null ? void 0 : e.from,
          selected: e,
          onSelect: (d) => {
            t == null || t(d);
          },
          numberOfMonths: 2,
          initialFocus: !0
        }
      ) })
    ] });
  }
);
Jr.displayName = "DateRangePicker";
const Qr = s.forwardRef(
  ({
    value: e,
    onChange: t,
    placeholder: r = "Pick date and time",
    disabled: n = !1,
    className: i,
    showSeconds: u = !1,
    use24Hour: c = !1
  }, f) => {
    const [m, d] = s.useState(!1), [l, g] = s.useState(e);
    s.useEffect(() => {
      g(e);
    }, [e]);
    const h = c ? Array.from({ length: 24 }, (y, b) => b) : Array.from({ length: 12 }, (y, b) => b + 1), x = Array.from({ length: 60 }, (y, b) => b), E = Array.from({ length: 60 }, (y, b) => b), R = (y) => {
      if (y) {
        const b = new Date(y);
        l && (b.setHours(l.getHours()), b.setMinutes(l.getMinutes()), b.setSeconds(l.getSeconds())), g(b), t == null || t(b);
      }
    }, S = (y, b) => {
      const k = l ? new Date(l) : /* @__PURE__ */ new Date();
      if (y === "hour") {
        let I = parseInt(b);
        if (!c) {
          const A = k.getHours() >= 12;
          A && I !== 12 && (I += 12), !A && I === 12 && (I = 0);
        }
        k.setHours(I);
      } else if (y === "minute")
        k.setMinutes(parseInt(b));
      else if (y === "second")
        k.setSeconds(parseInt(b));
      else if (y === "ampm") {
        const I = k.getHours();
        b === "PM" && I < 12 ? k.setHours(I + 12) : b === "AM" && I >= 12 && k.setHours(I - 12);
      }
      g(k), t == null || t(k);
    }, N = () => {
      if (!l) return "";
      const y = l.getHours();
      return c ? y.toString() : (y % 12 || 12).toString();
    }, v = () => l && l.getHours() >= 12 ? "PM" : "AM", w = u ? c ? "PPP HH:mm:ss" : "PPP hh:mm:ss a" : c ? "PPP HH:mm" : "PPP hh:mm a";
    return /* @__PURE__ */ p(ke, { open: m, onOpenChange: d, children: [
      /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ p(
        ee,
        {
          ref: f,
          variant: "outline",
          disabled: n,
          className: o(
            "w-full justify-start text-left font-normal",
            !l && "text-muted-foreground",
            i
          ),
          children: [
            /* @__PURE__ */ a(Le, { className: "mr-2 h-4 w-4" }),
            l ? we(l, w) : /* @__PURE__ */ a("span", { children: r })
          ]
        }
      ) }),
      /* @__PURE__ */ p(xe, { className: "w-auto p-0", align: "start", children: [
        /* @__PURE__ */ a(
          Oe,
          {
            mode: "single",
            selected: l,
            onSelect: R,
            initialFocus: !0
          }
        ),
        /* @__PURE__ */ a("div", { className: "border-t p-3", children: /* @__PURE__ */ p("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ a(Ke, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ p(
            me,
            {
              value: N(),
              onValueChange: (y) => S("hour", y),
              children: [
                /* @__PURE__ */ a(ne, { className: "w-[70px]", children: /* @__PURE__ */ a(fe, { placeholder: "HH" }) }),
                /* @__PURE__ */ a(se, { children: h.map((y) => /* @__PURE__ */ a(te, { value: y.toString(), children: y.toString().padStart(2, "0") }, y)) })
              ]
            }
          ),
          /* @__PURE__ */ a("span", { className: "text-muted-foreground", children: ":" }),
          /* @__PURE__ */ p(
            me,
            {
              value: (l == null ? void 0 : l.getMinutes().toString()) ?? "",
              onValueChange: (y) => S("minute", y),
              children: [
                /* @__PURE__ */ a(ne, { className: "w-[70px]", children: /* @__PURE__ */ a(fe, { placeholder: "MM" }) }),
                /* @__PURE__ */ a(se, { children: x.map((y) => /* @__PURE__ */ a(te, { value: y.toString(), children: y.toString().padStart(2, "0") }, y)) })
              ]
            }
          ),
          u && /* @__PURE__ */ p(le, { children: [
            /* @__PURE__ */ a("span", { className: "text-muted-foreground", children: ":" }),
            /* @__PURE__ */ p(
              me,
              {
                value: (l == null ? void 0 : l.getSeconds().toString()) ?? "",
                onValueChange: (y) => S("second", y),
                children: [
                  /* @__PURE__ */ a(ne, { className: "w-[70px]", children: /* @__PURE__ */ a(fe, { placeholder: "SS" }) }),
                  /* @__PURE__ */ a(se, { children: E.map((y) => /* @__PURE__ */ a(te, { value: y.toString(), children: y.toString().padStart(2, "0") }, y)) })
                ]
              }
            )
          ] }),
          !c && /* @__PURE__ */ p(
            me,
            {
              value: v(),
              onValueChange: (y) => S("ampm", y),
              children: [
                /* @__PURE__ */ a(ne, { className: "w-[70px]", children: /* @__PURE__ */ a(fe, {}) }),
                /* @__PURE__ */ p(se, { children: [
                  /* @__PURE__ */ a(te, { value: "AM", children: "AM" }),
                  /* @__PURE__ */ a(te, { value: "PM", children: "PM" })
                ] })
              ]
            }
          )
        ] }) })
      ] })
    ] });
  }
);
Qr.displayName = "DateTimePicker";
const en = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", decimals: 2 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", decimals: 2 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", decimals: 2 },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", decimals: 0 },
  CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan", decimals: 2 },
  KRW: { code: "KRW", symbol: "₩", name: "South Korean Won", decimals: 0 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", decimals: 2 },
  BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real", decimals: 2 },
  CAD: { code: "CAD", symbol: "CA$", name: "Canadian Dollar", decimals: 2 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", decimals: 2 },
  CHF: { code: "CHF", symbol: "Fr.", name: "Swiss Franc", decimals: 2 }
};
function at(e, t, r, n) {
  const i = e.toFixed(t).split(".");
  return i[0] = i[0].replace(/\B(?=(\d{3})+(?!\d))/g, r), i.join(n);
}
function tn(e, t, r) {
  if (!e) return;
  const n = e.replace(new RegExp(`\\${t}`, "g"), "").replace(r, "."), i = parseFloat(n);
  return isNaN(i) ? void 0 : i;
}
const ze = s.forwardRef(
  ({
    className: e,
    value: t,
    onChange: r,
    decimals: n = 2,
    min: i,
    max: u,
    prefix: c,
    suffix: f,
    currency: m,
    unit: d,
    unitPosition: l = "prefix",
    thousandsSeparator: g = ",",
    decimalSeparator: h = ".",
    allowNegative: x = !1,
    disabled: E,
    ...R
  }, S) => {
    const N = m ? en[m] : void 0, v = (N == null ? void 0 : N.decimals) ?? n, w = c ?? ((N == null ? void 0 : N.symbol) && N.symbol), y = f ?? (d && l === "suffix" ? d : void 0), b = d && l === "prefix" ? d : void 0, [k, I] = s.useState(""), [A, F] = s.useState(!1);
    s.useEffect(() => {
      t !== void 0 && !A && I(at(t, v, g, h));
    }, [t, v, g, h, A]);
    const Z = (U) => {
      let z = U.target.value;
      const J = x ? new RegExp(`[^0-9\\${h}-]`, "g") : new RegExp(`[^0-9\\${h}]`, "g");
      z = z.replace(J, "");
      const X = z.split(h);
      if (X.length > 2 && (z = X[0] + h + X.slice(1).join("")), x) {
        const H = z.startsWith("-");
        z = z.replace(/-/g, ""), H && (z = "-" + z);
      }
      X.length === 2 && X[1].length > v && (z = X[0] + h + X[1].slice(0, v)), I(z);
      const Q = tn(z, g, h);
      if (Q !== void 0) {
        let H = Q;
        i !== void 0 && H < i && (H = i), u !== void 0 && H > u && (H = u), r == null || r(H);
      } else
        r == null || r(void 0);
    }, C = () => {
      F(!0), t !== void 0 && I(t.toString().replace(".", h));
    }, M = () => {
      F(!1), t !== void 0 && I(at(t, v, g, h));
    };
    return /* @__PURE__ */ p("div", { className: "relative flex items-center", children: [
      (w || b) && /* @__PURE__ */ p("span", { className: "absolute left-3 text-muted-foreground text-sm", children: [
        w,
        b
      ] }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "text",
          inputMode: "decimal",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm text-right ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            (w || b) && "pl-10",
            y && "pr-12",
            !w && !b && "px-3",
            !y && "pr-3",
            e
          ),
          ref: S,
          value: k,
          onChange: Z,
          onFocus: C,
          onBlur: M,
          disabled: E,
          ...R
        }
      ),
      y && /* @__PURE__ */ a("span", { className: "absolute right-3 text-muted-foreground text-sm", children: y })
    ] });
  }
);
ze.displayName = "DecimalInput";
const an = s.forwardRef(
  ({ currency: e, ...t }, r) => /* @__PURE__ */ a(ze, { ref: r, currency: e, ...t })
);
an.displayName = "CurrencyInput";
const rn = s.forwardRef(
  ({ min: e = 0, max: t = 100, decimals: r = 1, ...n }, i) => /* @__PURE__ */ a(
    ze,
    {
      ref: i,
      suffix: "%",
      min: e,
      max: t,
      decimals: r,
      ...n
    }
  )
);
rn.displayName = "PercentageInput";
const nn = s.forwardRef(
  ({ unit: e, unitPosition: t = "suffix", ...r }, n) => /* @__PURE__ */ a(
    ze,
    {
      ref: n,
      unit: e,
      unitPosition: t,
      ...r
    }
  )
);
nn.displayName = "UnitInput";
const sn = $(
  "fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
        right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
        top: "inset-x-0 top-0 h-auto max-h-[80vh] border-b data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
        bottom: "inset-x-0 bottom-0 h-auto max-h-[80vh] border-t data-[state=closed]:translate-y-full data-[state=open]:translate-y-0"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), Ct = s.createContext(
  void 0
);
function Ne() {
  const e = s.useContext(Ct);
  if (!e)
    throw new Error("Drawer components must be used within a Drawer");
  return e;
}
function Ui({
  children: e,
  open: t,
  defaultOpen: r = !1,
  onOpenChange: n
}) {
  const [i, u] = s.useState(r), c = t ?? i, f = n ?? u;
  return /* @__PURE__ */ a(Ct.Provider, { value: { open: c, onOpenChange: f }, children: e });
}
const on = s.forwardRef(({ onClick: e, ...t }, r) => {
  const { onOpenChange: n } = Ne();
  return /* @__PURE__ */ a(
    "button",
    {
      ref: r,
      onClick: (i) => {
        n(!0), e == null || e(i);
      },
      ...t
    }
  );
});
on.displayName = "DrawerTrigger";
const ln = s.forwardRef(({ onClick: e, ...t }, r) => {
  const { onOpenChange: n } = Ne();
  return /* @__PURE__ */ a(
    "button",
    {
      ref: r,
      onClick: (i) => {
        n(!1), e == null || e(i);
      },
      ...t
    }
  );
});
ln.displayName = "DrawerClose";
const dn = ({ children: e }) => {
  const { open: t } = Ne();
  return t ? /* @__PURE__ */ a(le, { children: e }) : null;
}, At = s.forwardRef(({ className: e, onClick: t, ...r }, n) => {
  const { open: i, onOpenChange: u } = Ne();
  return /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: o(
        "fixed inset-0 z-50 bg-black/80 transition-opacity duration-300",
        i ? "opacity-100" : "pointer-events-none opacity-0",
        e
      ),
      onClick: (c) => {
        c.target === c.currentTarget && u(!1), t == null || t(c);
      },
      ...r
    }
  );
});
At.displayName = "DrawerOverlay";
const cn = s.forwardRef(
  ({ className: e, side: t, children: r, ...n }, i) => {
    const { open: u, onOpenChange: c } = Ne();
    return s.useEffect(() => {
      const f = (m) => {
        m.key === "Escape" && c(!1);
      };
      return u && (document.addEventListener("keydown", f), document.body.style.overflow = "hidden"), () => {
        document.removeEventListener("keydown", f), document.body.style.overflow = "";
      };
    }, [u, c]), /* @__PURE__ */ p(dn, { children: [
      /* @__PURE__ */ a(At, {}),
      /* @__PURE__ */ a(
        "div",
        {
          ref: i,
          "data-state": u ? "open" : "closed",
          className: o(sn({ side: t }), e),
          ...n,
          children: r
        }
      )
    ] });
  }
);
cn.displayName = "DrawerContent";
const un = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o("flex flex-col space-y-2 p-4", e),
    ...t
  }
);
un.displayName = "DrawerHeader";
const mn = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o("mt-auto flex flex-col gap-2 p-4", e),
    ...t
  }
);
mn.displayName = "DrawerFooter";
const fn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "h2",
  {
    ref: r,
    className: o("font-heading text-lg font-semibold text-foreground", e),
    ...t
  }
));
fn.displayName = "DrawerTitle";
const pn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "p",
  {
    ref: r,
    className: o("text-sm text-muted-foreground", e),
    ...t
  }
));
pn.displayName = "DrawerDescription";
const gn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o(
      "mx-auto mt-4 h-1.5 w-12 rounded-full bg-muted",
      e
    ),
    ...t
  }
));
gn.displayName = "DrawerHandle";
const bn = ({ children: e, side: t = "left", width: r = "280px", className: n }) => {
  const { open: i } = Ne();
  return /* @__PURE__ */ a(
    "div",
    {
      className: o("transition-all duration-300 ease-in-out", n),
      style: {
        marginLeft: t === "left" && i ? r : void 0,
        marginRight: t === "right" && i ? r : void 0
      },
      children: e
    }
  );
};
bn.displayName = "DrawerPushLayout";
const Hi = O.Root, ji = O.Trigger, Gi = O.Group, Vi = O.Portal, Ki = O.Sub, qi = O.RadioGroup, hn = s.forwardRef(({ className: e, inset: t, children: r, ...n }, i) => /* @__PURE__ */ p(
  O.SubTrigger,
  {
    ref: i,
    className: o(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ a(ae, { className: "ml-auto" })
    ]
  }
));
hn.displayName = O.SubTrigger.displayName;
const vn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  O.SubContent,
  {
    ref: r,
    className: o(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
vn.displayName = O.SubContent.displayName;
const xn = s.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ a(O.Portal, { children: /* @__PURE__ */ a(
  O.Content,
  {
    ref: n,
    sideOffset: t,
    className: o(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
xn.displayName = O.Content.displayName;
const Nn = s.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ a(
  O.Item,
  {
    ref: n,
    className: o(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...r
  }
));
Nn.displayName = O.Item.displayName;
const yn = s.forwardRef(({ className: e, children: t, checked: r, ...n }, i) => /* @__PURE__ */ p(
  O.CheckboxItem,
  {
    ref: i,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "hover:bg-[var(--backgrounds-tertiary)] focus:bg-[var(--backgrounds-tertiary)]",
      "data-[state=checked]:text-[var(--foregrounds-primary)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--interactive-border-alt)] data-[state=checked]:bg-[var(--interactive-bg-active)] data-[state=checked]:border-[var(--interactive-bg-active)]", children: /* @__PURE__ */ a(O.ItemIndicator, { children: /* @__PURE__ */ a(W, { className: "h-3 w-3 text-[var(--interactive-fg-active)]" }) }) }),
      t
    ]
  }
));
yn.displayName = O.CheckboxItem.displayName;
const wn = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  O.RadioItem,
  {
    ref: n,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "hover:bg-[var(--backgrounds-tertiary)] focus:bg-[var(--backgrounds-tertiary)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--interactive-border-alt)] data-[state=checked]:bg-[var(--interactive-bg-active)] data-[state=checked]:border-[var(--interactive-bg-active)]", children: /* @__PURE__ */ a(O.ItemIndicator, { children: /* @__PURE__ */ a("div", { className: "h-1.5 w-1.5 rounded-full bg-[var(--interactive-fg-active)]" }) }) }),
      t
    ]
  }
));
wn.displayName = O.RadioItem.displayName;
const Rn = s.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ a(
  O.Label,
  {
    ref: n,
    className: o(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...r
  }
));
Rn.displayName = O.Label.displayName;
const Sn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  O.Separator,
  {
    ref: r,
    className: o("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
Sn.displayName = O.Separator.displayName;
const En = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "span",
  {
    className: o("ml-auto text-xs tracking-widest opacity-60", e),
    ...t
  }
);
En.displayName = "DropdownMenuShortcut";
const kn = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, In = s.forwardRef(
  ({ className: e, showValidation: t = !1, onValidationChange: r, onChange: n, ...i }, u) => {
    const [c, f] = s.useState(null), [m, d] = s.useState(!1), l = (x) => {
      const E = x.target.value;
      if (E) {
        const R = kn.test(E);
        f(R), r == null || r(R);
      } else
        f(null), r == null || r(!1);
      n == null || n(x);
    }, g = (x) => {
      var E;
      d(!0), (E = i.onBlur) == null || E.call(i, x);
    }, h = t && m && c !== null;
    return /* @__PURE__ */ p("div", { className: "relative", children: [
      /* @__PURE__ */ a(ot, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "email",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            h && c && "border-green-500 focus-visible:ring-green-500",
            h && !c && "border-destructive focus-visible:ring-destructive",
            e
          ),
          ref: u,
          onChange: l,
          onBlur: g,
          ...i
        }
      ),
      h && /* @__PURE__ */ a("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: c ? /* @__PURE__ */ a(qt, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ a(Yt, { className: "h-4 w-4 text-destructive" }) })
    ] });
  }
);
In.displayName = "EmailInput";
const Tn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("space-y-4 rounded-lg border border-[var(--container-border-alt)] p-4", e),
    ...t
  }
));
Tn.displayName = "Fieldset";
const Cn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("mb-4 text-sm font-medium text-[var(--foregrounds-primary)] leading-none", e),
    ...t
  }
));
Cn.displayName = "FieldsetLegend";
const An = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "p",
  {
    ref: r,
    className: o("text-sm text-[var(--foregrounds-tertiary)]", e),
    ...t
  }
));
An.displayName = "FieldsetDescription";
function Dn(e) {
  const t = e.type.toLowerCase();
  return t.startsWith("image/") ? "image" : t.startsWith("video/") ? "video" : t.startsWith("audio/") ? "audio" : t.includes("pdf") || t.includes("document") || t.includes("text") || t.includes("spreadsheet") || t.includes("presentation") ? "document" : t.includes("zip") || t.includes("rar") || t.includes("tar") || t.includes("gzip") || t.includes("7z") ? "archive" : "other";
}
function Be(e) {
  if (e === 0) return "0 B";
  const t = 1024, r = ["B", "KB", "MB", "GB"], n = Math.floor(Math.log(e) / Math.log(t));
  return `${parseFloat((e / Math.pow(t, n)).toFixed(1))} ${r[n]}`;
}
const Ln = ({ type: e }) => {
  const t = "h-8 w-8";
  switch (e) {
    case "image":
      return /* @__PURE__ */ a(Qt, { className: o(t, "text-green-500") });
    case "document":
      return /* @__PURE__ */ a(Jt, { className: o(t, "text-blue-500") });
    case "video":
      return /* @__PURE__ */ a(Zt, { className: o(t, "text-purple-500") });
    case "audio":
      return /* @__PURE__ */ a(Xt, { className: o(t, "text-pink-500") });
    case "archive":
      return /* @__PURE__ */ a(Wt, { className: o(t, "text-yellow-500") });
    default:
      return /* @__PURE__ */ a(qe, { className: o(t, "text-gray-500") });
  }
}, We = s.forwardRef(
  ({
    className: e,
    value: t = [],
    onChange: r,
    maxFiles: n = 1,
    maxSize: i,
    accept: u,
    showPreview: c = !0,
    variant: f = "default",
    dragActiveText: m = "Drop files here",
    dragInactiveText: d = "Drag & drop files here, or click to select",
    disabled: l,
    ...g
  }, h) => {
    const [x, E] = s.useState([]), [R, S] = s.useState(!1), [N, v] = s.useState(null), w = s.useRef(null);
    s.useEffect(() => {
      const C = t.map((M) => ({
        file: M,
        type: Dn(M),
        preview: M.type.startsWith("image/") ? URL.createObjectURL(M) : void 0
      }));
      return E(C), () => {
        C.forEach((M) => {
          M.preview && URL.revokeObjectURL(M.preview);
        });
      };
    }, [t]);
    const y = (C) => {
      if (!C) return;
      v(null);
      const M = Array.from(C), U = [];
      for (const J of M) {
        if (i && J.size > i) {
          v(`File "${J.name}" exceeds maximum size of ${Be(i)}`);
          continue;
        }
        U.push(J);
      }
      const z = n === 1 ? U.slice(0, 1) : [...t, ...U].slice(0, n);
      r == null || r(z);
    }, b = (C) => {
      y(C.target.files), w.current && (w.current.value = "");
    }, k = (C) => {
      C.preventDefault(), S(!0);
    }, I = (C) => {
      C.preventDefault(), S(!1);
    }, A = (C) => {
      C.preventDefault(), S(!1), l || y(C.dataTransfer.files);
    }, F = (C) => {
      const M = [...t];
      M.splice(C, 1), r == null || r(M);
    }, Z = (C) => {
      w.current = C, typeof h == "function" ? h(C) : h && (h.current = C);
    };
    return f === "dropzone" ? /* @__PURE__ */ p("div", { className: o("space-y-3", e), children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: o(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            R && "border-primary bg-primary/5",
            !R && "border-muted-foreground/25 hover:border-primary/50",
            l && "cursor-not-allowed opacity-50"
          ),
          onDragOver: k,
          onDragLeave: I,
          onDrop: A,
          onClick: () => {
            var C;
            return !l && ((C = w.current) == null ? void 0 : C.click());
          },
          children: [
            /* @__PURE__ */ a(
              "input",
              {
                type: "file",
                ref: Z,
                className: "sr-only",
                accept: u,
                multiple: n > 1,
                onChange: b,
                disabled: l,
                ...g
              }
            ),
            /* @__PURE__ */ a(Je, { className: o("h-10 w-10 mb-3", R ? "text-primary" : "text-muted-foreground") }),
            /* @__PURE__ */ a("p", { className: "text-sm text-center", children: R ? m : d }),
            i && /* @__PURE__ */ p("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Max file size: ",
              Be(i)
            ] }),
            n > 1 && /* @__PURE__ */ p("p", { className: "text-xs text-muted-foreground", children: [
              "Max ",
              n,
              " files"
            ] })
          ]
        }
      ),
      N && /* @__PURE__ */ a("p", { className: "text-sm text-destructive", children: N }),
      c && x.length > 0 && /* @__PURE__ */ a("div", { className: "space-y-2", children: x.map((C, M) => /* @__PURE__ */ p(
        "div",
        {
          className: "flex items-center gap-3 p-3 rounded-lg border bg-muted/50",
          children: [
            C.preview ? /* @__PURE__ */ a(
              "img",
              {
                src: C.preview,
                alt: C.file.name,
                className: "h-12 w-12 rounded object-cover"
              }
            ) : /* @__PURE__ */ a(Ln, { type: C.type }),
            /* @__PURE__ */ p("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ a("p", { className: "text-sm font-medium truncate", children: C.file.name }),
              /* @__PURE__ */ a("p", { className: "text-xs text-muted-foreground", children: Be(C.file.size) })
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "p-1 hover:bg-background rounded",
                onClick: (U) => {
                  U.stopPropagation(), F(M);
                },
                children: /* @__PURE__ */ a(G, { className: "h-4 w-4" })
              }
            )
          ]
        },
        M
      )) })
    ] }) : /* @__PURE__ */ p("div", { className: o("space-y-2", e), children: [
      /* @__PURE__ */ p("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ a(
          "input",
          {
            type: "file",
            ref: Z,
            className: "sr-only",
            accept: u,
            multiple: n > 1,
            onChange: b,
            disabled: l,
            ...g
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: o(
              "flex h-10 items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background hover:bg-accent",
              l && "cursor-not-allowed opacity-50"
            ),
            onClick: () => {
              var C;
              return !l && ((C = w.current) == null ? void 0 : C.click());
            },
            disabled: l,
            children: [
              /* @__PURE__ */ a(Je, { className: "h-4 w-4" }),
              "Choose ",
              n > 1 ? "files" : "file"
            ]
          }
        ),
        x.length > 0 && !c && /* @__PURE__ */ p("span", { className: "flex items-center text-sm text-muted-foreground", children: [
          x.length,
          " file",
          x.length > 1 ? "s" : "",
          " selected"
        ] })
      ] }),
      N && /* @__PURE__ */ a("p", { className: "text-sm text-destructive", children: N }),
      c && x.length > 0 && /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-2", children: x.map((C, M) => /* @__PURE__ */ p(
        "div",
        {
          className: "flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/50 text-sm",
          children: [
            C.preview ? /* @__PURE__ */ a(
              "img",
              {
                src: C.preview,
                alt: C.file.name,
                className: "h-5 w-5 rounded object-cover"
              }
            ) : /* @__PURE__ */ a(qe, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ a("span", { className: "max-w-[150px] truncate", children: C.file.name }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: "p-0.5 hover:bg-background rounded-full",
                onClick: () => F(M),
                children: /* @__PURE__ */ a(G, { className: "h-3 w-3" })
              }
            )
          ]
        },
        M
      )) })
    ] });
  }
);
We.displayName = "FileInput";
const Pn = s.forwardRef(
  ({ acceptedFormats: e = ["image/jpeg", "image/png", "image/gif", "image/webp"], ...t }, r) => /* @__PURE__ */ a(
    We,
    {
      ref: r,
      accept: e.join(","),
      ...t
    }
  )
);
Pn.displayName = "ImageInput";
const Mn = s.forwardRef(
  ({
    acceptedFormats: e = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain"
    ],
    ...t
  }, r) => /* @__PURE__ */ a(
    We,
    {
      ref: r,
      accept: e.join(","),
      ...t
    }
  )
);
Mn.displayName = "DocumentInput";
const _n = $(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      required: {
        true: "after:ml-0.5 after:text-destructive after:content-['*']",
        false: ""
      }
    },
    defaultVariants: {
      required: !1
    }
  }
), On = s.forwardRef(
  ({ className: e, required: t, optional: r, hint: n, children: i, ...u }, c) => /* @__PURE__ */ p("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ a(
      "label",
      {
        ref: c,
        className: o(_n({ required: t }), e),
        ...u,
        children: i
      }
    ),
    r && /* @__PURE__ */ a("span", { className: "text-xs text-muted-foreground", children: "(optional)" }),
    n && /* @__PURE__ */ a("span", { className: "text-xs text-muted-foreground", children: n })
  ] })
);
On.displayName = "FormLabel";
const Fn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "p",
  {
    ref: r,
    className: o("text-sm text-muted-foreground", e),
    ...t
  }
));
Fn.displayName = "FormDescription";
const zn = s.forwardRef(({ className: e, error: t = !0, ...r }, n) => /* @__PURE__ */ a(
  "p",
  {
    ref: n,
    className: o(
      "text-sm",
      t ? "text-destructive" : "text-muted-foreground",
      e
    ),
    ...r
  }
));
zn.displayName = "FormMessage";
const Yi = Me.Root, Wi = Me.Trigger, Bn = s.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, i) => /* @__PURE__ */ a(
  Me.Content,
  {
    ref: i,
    align: t,
    sideOffset: r,
    className: o(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
Bn.displayName = Me.Content.displayName;
const $n = {
  search: he,
  email: ot,
  password: Ve,
  tel: dt,
  url: ea
}, Un = s.forwardRef(
  ({ className: e, type: t, icon: r, trailing: n, ...i }, u) => {
    const [c, f] = s.useState(!1), m = t === "password", d = m ? c ? "text" : "password" : t, l = t ? $n[t] : void 0, g = r ?? (l ? /* @__PURE__ */ a(l, { className: "h-4 w-4" }) : null), h = !!g, x = !!n || m;
    return /* @__PURE__ */ p("div", { className: o("relative flex w-full items-center", e), children: [
      h && /* @__PURE__ */ a("span", { className: "pointer-events-none absolute left-3 flex items-center text-[var(--foregrounds-quinary)]", children: g }),
      /* @__PURE__ */ a(
        "input",
        {
          type: d,
          className: o(
            "flex h-10 w-full rounded-md border border-[var(--interactive-border)] bg-[var(--interactive-bg)] text-sm text-[var(--interactive-fg)]",
            "ring-offset-background",
            "placeholder:text-[var(--foregrounds-quinary)]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-fg)] focus-visible:border-[var(--interactive-fg)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--foregrounds-primary)]",
            h ? "pl-9" : "px-3",
            x ? "pr-9" : "pr-3",
            "py-2"
          ),
          ref: u,
          ...i
        }
      ),
      m && /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          tabIndex: -1,
          onClick: () => f((E) => !E),
          className: "absolute right-3 flex items-center text-[var(--foregrounds-quinary)] hover:text-[var(--foregrounds-secondary)] transition-colors",
          "aria-label": c ? "Hide password" : "Show password",
          children: c ? /* @__PURE__ */ a(it, { className: "h-4 w-4" }) : /* @__PURE__ */ a(lt, { className: "h-4 w-4" })
        }
      ),
      !m && n && /* @__PURE__ */ a("span", { className: "absolute right-3 flex items-center", children: n })
    ] });
  }
);
Un.displayName = "Input";
const Hn = s.forwardRef(
  ({
    className: e,
    length: t = 6,
    onChange: r,
    onComplete: n,
    mask: i = !1,
    autoFocus: u = !0,
    disabled: c,
    ...f
  }, m) => {
    const [d, l] = s.useState(
      Array(t).fill("")
    ), g = s.useRef([]), h = (S) => {
      var N;
      S >= 0 && S < t && ((N = g.current[S]) == null || N.focus());
    }, x = (S, N) => {
      const v = N.slice(-1);
      if (v && !/^\d$/.test(v)) return;
      const w = [...d];
      w[S] = v, l(w);
      const y = w.join("");
      r == null || r(y), v && S < t - 1 && h(S + 1), w.every((b) => b !== "") && y.length === t && (n == null || n(y));
    }, E = (S, N) => {
      if (N.key === "Backspace") {
        N.preventDefault();
        const v = [...d];
        d[S] ? (v[S] = "", l(v), r == null || r(v.join(""))) : S > 0 && (v[S - 1] = "", l(v), r == null || r(v.join("")), h(S - 1));
      } else N.key === "ArrowLeft" ? (N.preventDefault(), h(S - 1)) : N.key === "ArrowRight" && (N.preventDefault(), h(S + 1));
    }, R = (S) => {
      S.preventDefault();
      const v = S.clipboardData.getData("text/plain").slice(0, t).replace(/\D/g, "").split("");
      if (v.length === 0) return;
      const w = [...d];
      v.forEach((b, k) => {
        k < t && (w[k] = b);
      }), l(w), r == null || r(w.join(""));
      const y = Math.min(v.length, t - 1);
      h(y), w.every((b) => b !== "") && w.join("").length === t && (n == null || n(w.join("")));
    };
    return s.useEffect(() => {
      u && h(0);
    }, [u]), /* @__PURE__ */ a(
      "div",
      {
        ref: m,
        className: o("flex items-center gap-2", e),
        ...f,
        children: d.map((S, N) => /* @__PURE__ */ p(s.Fragment, { children: [
          /* @__PURE__ */ a(
            "input",
            {
              ref: (v) => {
                g.current[N] = v;
              },
              type: i ? "password" : "text",
              inputMode: "numeric",
              autoComplete: "one-time-code",
              pattern: "\\d{1}",
              maxLength: 1,
              value: S,
              onChange: (v) => x(N, v.target.value),
              onKeyDown: (v) => E(N, v),
              onPaste: R,
              onFocus: (v) => v.target.select(),
              disabled: c,
              className: o(
                "h-11 w-11 rounded-lg border border-[var(--interactive-border)] bg-[var(--interactive-bg)] text-center text-base font-semibold tracking-widest shadow-sm transition-all",
                "focus:outline-none focus:ring-2 focus:ring-[var(--interactive-fg)] focus:border-[var(--interactive-fg)] focus:ring-offset-0",
                "disabled:cursor-not-allowed disabled:opacity-50",
                S && "border-[var(--interactive-bg-active)] bg-[var(--interactive-bg-alt2)]"
              )
            }
          ),
          N === Math.floor(t / 2) - 1 && t > 3 && /* @__PURE__ */ a("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ a(ct, { className: "h-4 w-4 text-[var(--foregrounds-quinary)]" }) })
        ] }, N))
      }
    );
  }
);
Hn.displayName = "InputOTP";
const jn = s.forwardRef(({ className: e, index: t, char: r, hasFakeCaret: n, isActive: i, ...u }, c) => /* @__PURE__ */ p(
  "div",
  {
    className: o(
      "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
      i && "z-10 ring-2 ring-ring ring-offset-background",
      e
    ),
    children: [
      /* @__PURE__ */ a(
        "input",
        {
          ref: c,
          className: "absolute inset-0 h-full w-full bg-transparent text-center outline-none",
          ...u
        }
      ),
      r,
      n && /* @__PURE__ */ a("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ a("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
    ]
  }
));
jn.displayName = "InputOTPSlot";
const Gn = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("flex items-center", e), ...t }));
Gn.displayName = "InputOTPGroup";
const Vn = s.forwardRef(({ ...e }, t) => /* @__PURE__ */ a("div", { ref: t, role: "separator", ...e, children: /* @__PURE__ */ a(ct, { className: "h-4 w-4 text-[var(--foregrounds-quinary)]" }) }));
Vn.displayName = "InputOTPSeparator";
const Kn = $(
  "inline-flex items-center justify-center rounded border font-mono text-sm font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground shadow-[0_2px_0_0] shadow-border",
        outline: "border-border bg-background text-foreground",
        ghost: "border-transparent bg-transparent text-muted-foreground"
      },
      size: {
        sm: "h-5 min-w-5 px-1 text-xs",
        default: "h-6 min-w-6 px-1.5",
        lg: "h-7 min-w-7 px-2 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), qn = {
  // Modifiers
  cmd: "⌘",
  command: "⌘",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  opt: "⌥",
  shift: "⇧",
  meta: "⌘",
  super: "⌘",
  win: "⊞",
  windows: "⊞",
  // Navigation
  enter: "↵",
  return: "↵",
  tab: "⇥",
  escape: "⎋",
  esc: "⎋",
  backspace: "⌫",
  delete: "⌦",
  del: "⌦",
  space: "␣",
  spacebar: "␣",
  // Arrows
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  arrowup: "↑",
  arrowdown: "↓",
  arrowleft: "←",
  arrowright: "→",
  // Other
  capslock: "⇪",
  caps: "⇪",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘",
  insert: "⎀"
};
function Yn(e) {
  const t = e.toLowerCase().trim();
  return qn[t] || e.toUpperCase();
}
const Dt = s.forwardRef(
  ({ className: e, variant: t, size: r, keys: n, children: i, ...u }, c) => {
    let f = i;
    return n && (f = (Array.isArray(n) ? n : n.split("+")).map((d, l) => /* @__PURE__ */ p(s.Fragment, { children: [
      l > 0 && /* @__PURE__ */ a("span", { className: "mx-0.5 text-muted-foreground/50", children: "+" }),
      /* @__PURE__ */ a("span", { children: Yn(d) })
    ] }, l))), /* @__PURE__ */ a(
      "kbd",
      {
        ref: c,
        className: o(Kn({ variant: t, size: r }), e),
        ...u,
        children: f
      }
    );
  }
);
Dt.displayName = "Kbd";
const Wn = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      className: o("inline-flex items-center gap-1", e),
      ...t
    }
  )
);
Wn.displayName = "KbdGroup";
const Xn = {
  copy: ["cmd", "c"],
  paste: ["cmd", "v"],
  cut: ["cmd", "x"],
  undo: ["cmd", "z"],
  redo: ["cmd", "shift", "z"],
  save: ["cmd", "s"],
  selectAll: ["cmd", "a"],
  find: ["cmd", "f"],
  new: ["cmd", "n"],
  open: ["cmd", "o"],
  close: ["cmd", "w"],
  refresh: ["cmd", "r"],
  print: ["cmd", "p"],
  bold: ["cmd", "b"],
  italic: ["cmd", "i"],
  underline: ["cmd", "u"]
}, Zn = s.forwardRef(
  ({ shortcut: e, forceCtrl: t, variant: r, size: n, className: i, ...u }, c) => {
    const f = Xn[e], m = typeof navigator < "u" ? navigator.platform.toLowerCase().includes("mac") : !0, d = f.map((l) => (l === "cmd" || l === "command" || l === "meta") && !m || t && (l === "cmd" || l === "command" || l === "meta") ? "ctrl" : l);
    return /* @__PURE__ */ a(
      Dt,
      {
        ref: c,
        keys: d,
        variant: r,
        size: n,
        className: i,
        ...u
      }
    );
  }
);
Zn.displayName = "Shortcut";
const Jn = $(
  "inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        muted: "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
        nav: "text-foreground/60 hover:text-foreground",
        destructive: "text-destructive underline-offset-4 hover:underline",
        unstyled: ""
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Qn = s.forwardRef(
  ({
    className: e,
    variant: t,
    size: r,
    asChild: n = !1,
    external: i = !1,
    showExternalIcon: u = !0,
    children: c,
    ...f
  }, m) => {
    const d = n ? Pe : "a", l = i ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return /* @__PURE__ */ p(
      d,
      {
        ref: m,
        className: o(Jn({ variant: t, size: r }), e),
        ...l,
        ...f,
        children: [
          c,
          i && u && /* @__PURE__ */ a(ta, { className: "h-3 w-3 shrink-0" })
        ]
      }
    );
  }
);
Qn.displayName = "Link";
const Ce = $("relative overflow-hidden", {
  variants: {
    ratio: {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      wide: "aspect-[21/9]"
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full"
    }
  },
  defaultVariants: {
    ratio: "auto",
    rounded: "md"
  }
}), es = s.forwardRef(
  ({ className: e, ratio: t, rounded: r, fallback: n, alt: i, ...u }, c) => {
    const [f, m] = s.useState(!1), [d, l] = s.useState(!0);
    return f && n ? /* @__PURE__ */ a(
      "div",
      {
        className: o(
          Ce({ ratio: t, rounded: r }),
          "flex items-center justify-center bg-muted",
          e
        ),
        children: n
      }
    ) : /* @__PURE__ */ p("div", { className: o(Ce({ ratio: t, rounded: r }), e), children: [
      d && /* @__PURE__ */ a("div", { className: "absolute inset-0 flex items-center justify-center bg-muted", children: /* @__PURE__ */ a(De, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }),
      /* @__PURE__ */ a(
        "img",
        {
          ref: c,
          alt: i,
          className: o("h-full w-full object-cover", r && Ce({ rounded: r })),
          onError: () => m(!0),
          onLoad: () => l(!1),
          ...u
        }
      )
    ] });
  }
);
es.displayName = "Image";
const ts = s.forwardRef(
  ({ className: e, ratio: t = "video", rounded: r, showControls: n = !0, ...i }, u) => {
    const c = s.useRef(null), [f, m] = s.useState(!1), [d, l] = s.useState(!1), [g, h] = s.useState(0);
    s.useImperativeHandle(u, () => c.current);
    const x = () => {
      c.current && (f ? c.current.pause() : c.current.play(), m(!f));
    }, E = () => {
      c.current && (c.current.muted = !d, l(!d));
    }, R = () => {
      if (c.current) {
        const N = c.current.currentTime / c.current.duration * 100;
        h(N);
      }
    }, S = () => {
      c.current && (document.fullscreenElement ? document.exitFullscreen() : c.current.requestFullscreen());
    };
    return /* @__PURE__ */ p("div", { className: o(Ce({ ratio: t, rounded: r }), "group", e), children: [
      /* @__PURE__ */ a(
        "video",
        {
          ref: c,
          className: "h-full w-full object-cover",
          onTimeUpdate: R,
          onPlay: () => m(!0),
          onPause: () => m(!1),
          ...i
        }
      ),
      n && /* @__PURE__ */ p("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100", children: [
        /* @__PURE__ */ a("div", { className: "mb-2 h-1 w-full overflow-hidden rounded-full bg-white/30", children: /* @__PURE__ */ a(
          "div",
          {
            className: "h-full bg-white transition-all",
            style: { width: `${g}%` }
          }
        ) }),
        /* @__PURE__ */ p("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: x,
              className: "rounded-full p-1 text-white hover:bg-white/20",
              children: f ? /* @__PURE__ */ a(aa, { className: "h-5 w-5" }) : /* @__PURE__ */ a(ra, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: E,
              className: "rounded-full p-1 text-white hover:bg-white/20",
              children: d ? /* @__PURE__ */ a(na, { className: "h-5 w-5" }) : /* @__PURE__ */ a(sa, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ a("div", { className: "flex-1" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: S,
              className: "rounded-full p-1 text-white hover:bg-white/20",
              children: /* @__PURE__ */ a(oa, { className: "h-5 w-5" })
            }
          )
        ] })
      ] })
    ] });
  }
);
ts.displayName = "Video";
const Xi = D.Menu, Zi = D.Group, Ji = D.Portal, Qi = D.Sub, el = D.RadioGroup, as = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  D.Root,
  {
    ref: r,
    className: o(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      e
    ),
    ...t
  }
));
as.displayName = D.Root.displayName;
const rs = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  D.Trigger,
  {
    ref: r,
    className: o(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      e
    ),
    ...t
  }
));
rs.displayName = D.Trigger.displayName;
const ns = s.forwardRef(({ className: e, inset: t, children: r, ...n }, i) => /* @__PURE__ */ p(
  D.SubTrigger,
  {
    ref: i,
    className: o(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      t && "pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ a(ae, { className: "ml-auto h-4 w-4" })
    ]
  }
));
ns.displayName = D.SubTrigger.displayName;
const ss = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  D.SubContent,
  {
    ref: r,
    className: o(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
ss.displayName = D.SubContent.displayName;
const os = s.forwardRef(
  ({ className: e, align: t = "start", alignOffset: r = -4, sideOffset: n = 8, ...i }, u) => /* @__PURE__ */ a(D.Portal, { children: /* @__PURE__ */ a(
    D.Content,
    {
      ref: u,
      align: t,
      alignOffset: r,
      sideOffset: n,
      className: o(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...i
    }
  ) })
);
os.displayName = D.Content.displayName;
const is = s.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ a(
  D.Item,
  {
    ref: n,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t && "pl-8",
      e
    ),
    ...r
  }
));
is.displayName = D.Item.displayName;
const ls = s.forwardRef(({ className: e, children: t, checked: r, ...n }, i) => /* @__PURE__ */ p(
  D.CheckboxItem,
  {
    ref: i,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(D.ItemIndicator, { children: /* @__PURE__ */ a(W, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
ls.displayName = D.CheckboxItem.displayName;
const ds = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  D.RadioItem,
  {
    ref: n,
    className: o(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(D.ItemIndicator, { children: /* @__PURE__ */ a(nt, { className: "h-2 w-2 fill-current" }) }) }),
      t
    ]
  }
));
ds.displayName = D.RadioItem.displayName;
const cs = s.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ a(
  D.Label,
  {
    ref: n,
    className: o(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...r
  }
));
cs.displayName = D.Label.displayName;
const us = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  D.Separator,
  {
    ref: r,
    className: o("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
us.displayName = D.Separator.displayName;
const ms = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "span",
  {
    className: o(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...t
  }
);
ms.displayName = "MenubarShortcut";
const fs = s.forwardRef(
  ({
    options: e,
    value: t = [],
    onChange: r,
    placeholder: n = "Select items…",
    searchPlaceholder: i = "Search…",
    emptyMessage: u = "No items found.",
    disabled: c = !1,
    className: f,
    maxDisplayedItems: m = 4
  }, d) => {
    const [l, g] = s.useState(!1), h = (v) => {
      const w = t.includes(v) ? t.filter((y) => y !== v) : [...t, v];
      r == null || r(w);
    }, x = (v, w) => {
      w.stopPropagation(), r == null || r(t.filter((y) => y !== v));
    }, E = e.filter((v) => t.includes(v.value)), R = E.slice(0, m), S = E.length - m, N = [
      ...e.filter((v) => t.includes(v.value)),
      ...e.filter((v) => !t.includes(v.value))
    ];
    return /* @__PURE__ */ p(ke, { open: l, onOpenChange: g, children: [
      /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ p(
        "button",
        {
          ref: d,
          type: "button",
          role: "combobox",
          "aria-expanded": l,
          disabled: c,
          className: o(
            "flex min-h-10 w-full items-center justify-between rounded-md border border-[var(--interactive-border)] bg-[var(--interactive-bg)] px-3 py-2 text-sm",
            "ring-offset-background focus:outline-none focus:ring-1 focus:ring-[var(--interactive-fg)] focus:border-[var(--interactive-fg)]",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            f
          ),
          children: [
            /* @__PURE__ */ a("div", { className: "flex flex-1 flex-wrap gap-1", children: E.length === 0 ? /* @__PURE__ */ a("span", { className: "text-[var(--foregrounds-quinary)]", children: n }) : /* @__PURE__ */ p(le, { children: [
              R.map((v) => /* @__PURE__ */ p(
                tt,
                {
                  variant: "secondary",
                  className: "gap-1 pr-1 text-xs",
                  children: [
                    v.label,
                    /* @__PURE__ */ a(
                      "button",
                      {
                        type: "button",
                        className: "rounded-full opacity-60 hover:opacity-100 transition-opacity outline-none",
                        onMouseDown: (w) => w.preventDefault(),
                        onClick: (w) => x(v.value, w),
                        "aria-label": `Remove ${v.label}`,
                        children: /* @__PURE__ */ a(G, { className: "h-3 w-3" })
                      }
                    )
                  ]
                },
                v.value
              )),
              S > 0 && /* @__PURE__ */ p(tt, { variant: "secondary", className: "text-xs", children: [
                "+",
                S
              ] })
            ] }) }),
            /* @__PURE__ */ a(be, { className: o("ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform", l && "rotate-180") })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        xe,
        {
          className: "p-0 w-[var(--radix-popover-trigger-width)]",
          align: "start",
          sideOffset: 4,
          children: /* @__PURE__ */ p(Ye, { children: [
            /* @__PURE__ */ a(Nt, { placeholder: i, className: "h-9" }),
            /* @__PURE__ */ p(yt, { children: [
              /* @__PURE__ */ a(wt, { className: "py-3 text-center text-sm text-[var(--foregrounds-tertiary)]", children: u }),
              /* @__PURE__ */ a(Rt, { children: N.map((v) => {
                const w = t.includes(v.value);
                return /* @__PURE__ */ p(
                  St,
                  {
                    value: v.value,
                    disabled: v.disabled,
                    onSelect: () => h(v.value),
                    className: o(
                      "flex items-center justify-between gap-2 cursor-pointer",
                      w && "text-[var(--foregrounds-primary)] font-medium"
                    ),
                    children: [
                      /* @__PURE__ */ a("span", { children: v.label }),
                      w && /* @__PURE__ */ a(
                        G,
                        {
                          className: "h-3.5 w-3.5 shrink-0 text-[var(--foregrounds-tertiary)]",
                          onClick: (y) => {
                            y.stopPropagation(), h(v.value);
                          }
                        }
                      )
                    ]
                  },
                  v.value
                );
              }) })
            ] })
          ] })
        }
      )
    ] });
  }
);
fs.displayName = "MultiSelect";
const ps = P.Root, gs = P.Trigger, tl = P.Close, bs = P.Portal, Lt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  P.Overlay,
  {
    className: o(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: r
  }
));
Lt.displayName = P.Overlay.displayName;
const hs = $(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), Pt = s.forwardRef(({ side: e = "right", className: t, children: r, ...n }, i) => /* @__PURE__ */ p(bs, { children: [
  /* @__PURE__ */ a(Lt, {}),
  /* @__PURE__ */ p(
    P.Content,
    {
      ref: i,
      className: o(hs({ side: e }), t),
      ...n,
      children: [
        /* @__PURE__ */ p(P.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ a(G, { className: "h-4 w-4" }),
          /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
        ] }),
        r
      ]
    }
  )
] }));
Pt.displayName = P.Content.displayName;
const vs = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o(
      "flex flex-col space-y-2 text-center sm:text-left",
      e
    ),
    ...t
  }
);
vs.displayName = "SheetHeader";
const xs = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "div",
  {
    className: o(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
xs.displayName = "SheetFooter";
const Ns = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  P.Title,
  {
    ref: r,
    className: o("font-heading text-lg font-semibold text-foreground", e),
    ...t
  }
));
Ns.displayName = P.Title.displayName;
const ys = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  P.Description,
  {
    ref: r,
    className: o("text-sm text-muted-foreground", e),
    ...t
  }
));
ys.displayName = P.Description.displayName;
const Mt = s.createContext({
  collapsed: !1,
  setCollapsed: () => {
  },
  isMobile: !1
}), Te = () => {
  const e = s.useContext(Mt);
  if (!e)
    throw new Error(
      "useNavigationDrawer must be used within a NavigationDrawerProvider"
    );
  return e;
}, al = ({
  children: e,
  defaultCollapsed: t = !1
}) => {
  const [r, n] = s.useState(t), [i, u] = s.useState(!1);
  return s.useEffect(() => {
    const c = () => u(window.innerWidth < 768);
    return c(), window.addEventListener("resize", c), () => window.removeEventListener("resize", c);
  }, []), /* @__PURE__ */ a(
    Mt.Provider,
    {
      value: { collapsed: r, setCollapsed: n, isMobile: i },
      children: e
    }
  );
}, ws = s.forwardRef(({ className: e, children: t, ...r }, n) => {
  const { collapsed: i, isMobile: u } = Te();
  return u ? /* @__PURE__ */ p(ps, { children: [
    /* @__PURE__ */ a(gs, { asChild: !0, children: /* @__PURE__ */ a(ee, { variant: "ghost", size: "icon", className: "md:hidden", children: /* @__PURE__ */ a(ia, { className: "h-5 w-5" }) }) }),
    /* @__PURE__ */ a(Pt, { side: "left", className: "w-64 p-0", children: /* @__PURE__ */ a("div", { className: "flex h-full flex-col", children: t }) })
  ] }) : /* @__PURE__ */ a(
    "aside",
    {
      ref: n,
      "data-collapsed": i,
      className: o(
        "flex h-full flex-col border-r border-[var(--container-border)] bg-[var(--container-bg)] transition-all duration-300",
        i ? "w-16" : "w-64",
        e
      ),
      ...r,
      children: t
    }
  );
});
ws.displayName = "NavigationDrawer";
const Rs = s.forwardRef(({ className: e, children: t, ...r }, n) => {
  const { collapsed: i } = Te();
  return /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: o(
        "flex h-14 items-center border-b border-[var(--container-border)] px-4",
        i && "justify-center px-2",
        e
      ),
      ...r,
      children: t
    }
  );
});
Rs.displayName = "NavigationDrawerHeader";
const Ss = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("flex-1 overflow-y-auto p-2", e),
    ...t
  }
));
Ss.displayName = "NavigationDrawerContent";
const Es = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("border-t border-[var(--container-border)] p-2", e),
    ...t
  }
));
Es.displayName = "NavigationDrawerFooter";
const ks = s.forwardRef(({ className: e, ...t }, r) => {
  const { collapsed: n, setCollapsed: i, isMobile: u } = Te();
  return u ? null : /* @__PURE__ */ a(
    ee,
    {
      ref: r,
      variant: "ghost",
      size: "icon",
      className: o("h-8 w-8", e),
      onClick: () => i(!n),
      ...t,
      children: n ? /* @__PURE__ */ a(ae, { className: "h-4 w-4" }) : /* @__PURE__ */ a(Ge, { className: "h-4 w-4" })
    }
  );
});
ks.displayName = "NavigationDrawerToggle";
const Is = $(
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--backgrounds-tertiary)] hover:text-[var(--foregrounds-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-fg)]",
  {
    variants: {
      active: {
        true: "bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)]",
        false: "text-[var(--foregrounds-secondary)]"
      }
    },
    defaultVariants: {
      active: !1
    }
  }
), Ts = s.forwardRef(({ className: e, icon: t, active: r, asChild: n, children: i, ...u }, c) => {
  const { collapsed: f } = Te();
  return /* @__PURE__ */ p(
    n ? Pe : "a",
    {
      ref: c,
      className: o(
        Is({ active: r }),
        f && "justify-center px-2",
        e
      ),
      ...u,
      children: [
        t && /* @__PURE__ */ a("span", { className: "shrink-0", children: t }),
        !f && /* @__PURE__ */ a("span", { className: "truncate", children: i })
      ]
    }
  );
});
Ts.displayName = "NavigationDrawerItem";
const Cs = s.forwardRef(({ className: e, label: t, children: r, ...n }, i) => {
  const { collapsed: u } = Te();
  return /* @__PURE__ */ p("div", { ref: i, className: o("py-2", e), ...n, children: [
    t && !u && /* @__PURE__ */ a("h4", { className: "mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: t }),
    /* @__PURE__ */ a("div", { className: "space-y-1", children: r })
  ] });
});
Cs.displayName = "NavigationDrawerGroup";
const As = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  q.Root,
  {
    ref: n,
    className: o(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ a(_t, {})
    ]
  }
));
As.displayName = q.Root.displayName;
const Ds = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  q.List,
  {
    ref: r,
    className: o(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      e
    ),
    ...t
  }
));
Ds.displayName = q.List.displayName;
const rl = q.Item, Ls = $(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
), Ps = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  q.Trigger,
  {
    ref: n,
    className: o(Ls(), "group", e),
    ...r,
    children: [
      t,
      " ",
      /* @__PURE__ */ a(
        be,
        {
          className: "relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180",
          "aria-hidden": "true"
        }
      )
    ]
  }
));
Ps.displayName = q.Trigger.displayName;
const Ms = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  q.Content,
  {
    ref: r,
    className: o(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      e
    ),
    ...t
  }
));
Ms.displayName = q.Content.displayName;
const nl = q.Link, _t = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { className: o("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ a(
  q.Viewport,
  {
    className: o(
      "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
      e
    ),
    ref: r,
    ...t
  }
) }));
_t.displayName = q.Viewport.displayName;
const _s = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  q.Indicator,
  {
    ref: r,
    className: o(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      e
    ),
    ...t,
    children: /* @__PURE__ */ a("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
  }
));
_s.displayName = q.Indicator.displayName;
const Os = s.forwardRef(
  ({
    className: e,
    value: t,
    onChange: r,
    min: n,
    max: i,
    step: u = 1,
    showControls: c = !0,
    allowNegative: f = !0,
    clampOnBlur: m = !0,
    disabled: d,
    ...l
  }, g) => {
    const [h, x] = s.useState(
      t !== void 0 ? t.toString() : ""
    );
    s.useEffect(() => {
      t !== void 0 && x(t.toString());
    }, [t]);
    const E = (I) => {
      let A = I;
      return n !== void 0 && A < n && (A = n), i !== void 0 && A > i && (A = i), A;
    }, R = (I) => {
      if (I === "" || I === "-") return;
      const A = parseFloat(I);
      return isNaN(A) ? void 0 : A;
    }, S = (I) => {
      let A = I.target.value;
      if (f || (A = A.replace(/-/g, "")), !/^-?\d*\.?\d*$/.test(A))
        return;
      x(A);
      const F = R(A);
      r == null || r(F);
    }, N = () => {
      const I = R(h);
      if (I !== void 0 && m) {
        const A = E(I);
        x(A.toString()), r == null || r(A);
      }
    }, v = () => {
      const I = R(h) ?? 0, A = E(I + u);
      x(A.toString()), r == null || r(A);
    }, w = () => {
      const I = R(h) ?? 0, A = E(I - u);
      x(A.toString()), r == null || r(A);
    }, y = (I) => {
      I.key === "ArrowUp" ? (I.preventDefault(), v()) : I.key === "ArrowDown" && (I.preventDefault(), w());
    }, b = () => {
      const I = R(h) ?? 0;
      return n === void 0 || I > n;
    }, k = () => {
      const I = R(h) ?? 0;
      return i === void 0 || I < i;
    };
    return c ? /* @__PURE__ */ p("div", { className: "flex", children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: o(
            "flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-background hover:bg-accent",
            (!b() || d) && "opacity-50 cursor-not-allowed hover:bg-background"
          ),
          onClick: w,
          disabled: !b() || d,
          tabIndex: -1,
          children: /* @__PURE__ */ a(ut, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ a(
        "input",
        {
          type: "text",
          inputMode: "decimal",
          className: o(
            "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            e
          ),
          ref: g,
          value: h,
          onChange: S,
          onBlur: N,
          onKeyDown: y,
          disabled: d,
          ...l
        }
      ),
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: o(
            "flex h-10 w-10 items-center justify-center rounded-r-md border border-l-0 border-input bg-background hover:bg-accent",
            (!k() || d) && "opacity-50 cursor-not-allowed hover:bg-background"
          ),
          onClick: v,
          disabled: !k() || d,
          tabIndex: -1,
          children: /* @__PURE__ */ a(la, { className: "h-4 w-4" })
        }
      )
    ] }) : /* @__PURE__ */ a(
      "input",
      {
        type: "text",
        inputMode: "decimal",
        className: o(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
          e
        ),
        ref: g,
        value: h,
        onChange: S,
        onBlur: N,
        onKeyDown: y,
        disabled: d,
        ...l
      }
    );
  }
);
Os.displayName = "NumberInput";
const Fs = ({ className: e, ...t }) => /* @__PURE__ */ a(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: o("mx-auto flex w-full justify-center", e),
    ...t
  }
);
Fs.displayName = "Pagination";
const zs = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "ul",
  {
    ref: r,
    className: o("flex flex-row items-center gap-1", e),
    ...t
  }
));
zs.displayName = "PaginationContent";
const Bs = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("li", { ref: r, className: o("", e), ...t }));
Bs.displayName = "PaginationItem";
const Xe = ({
  className: e,
  isActive: t,
  size: r = "icon",
  ...n
}) => /* @__PURE__ */ a(
  "a",
  {
    "aria-current": t ? "page" : void 0,
    className: o(
      ie({
        variant: t ? "outline" : "ghost",
        size: r
      }),
      e
    ),
    ...n
  }
);
Xe.displayName = "PaginationLink";
const $s = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p(
  Xe,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: o("gap-1 pl-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ a(Ge, { className: "h-4 w-4" }),
      /* @__PURE__ */ a("span", { children: "Previous" })
    ]
  }
);
$s.displayName = "PaginationPrevious";
const Us = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p(
  Xe,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: o("gap-1 pr-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ a("span", { children: "Next" }),
      /* @__PURE__ */ a(ae, { className: "h-4 w-4" })
    ]
  }
);
Us.displayName = "PaginationNext";
const Hs = ({
  className: e,
  ...t
}) => /* @__PURE__ */ p(
  "span",
  {
    "aria-hidden": !0,
    className: o("flex h-9 w-9 items-center justify-center", e),
    ...t,
    children: [
      /* @__PURE__ */ a($e, { className: "h-4 w-4" }),
      /* @__PURE__ */ a("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
Hs.displayName = "PaginationEllipsis";
function js(e, t = {}) {
  const {
    minLength: r = 8,
    requireUppercase: n = !0,
    requireLowercase: i = !0,
    requireNumbers: u = !0,
    requireSpecialChars: c = !0
  } = t, f = {
    length: e.length >= r,
    uppercase: !n || /[A-Z]/.test(e),
    lowercase: !i || /[a-z]/.test(e),
    numbers: !u || /[0-9]/.test(e),
    specialChars: !c || /[!@#$%^&*(),.?":{}|<>]/.test(e)
  }, m = Object.values(f).filter(Boolean).length, d = Object.keys(f).length;
  return {
    score: m / d,
    checks: f
  };
}
const Gs = s.forwardRef(
  ({
    className: e,
    showStrengthIndicator: t = !1,
    strengthRequirements: r = {},
    onStrengthChange: n,
    onChange: i,
    ...u
  }, c) => {
    const [f, m] = s.useState(!1), [d, l] = s.useState(null), {
      minLength: g = 8,
      requireUppercase: h = !0,
      requireLowercase: x = !0,
      requireNumbers: E = !0,
      requireSpecialChars: R = !0
    } = r, S = (w) => {
      const y = w.target.value;
      if (t && y) {
        const b = js(y, r);
        l(b), b.score < 0.4 ? n == null || n("weak") : b.score < 0.8 ? n == null || n("medium") : n == null || n("strong");
      } else
        l(null);
      i == null || i(w);
    }, N = () => d ? d.score < 0.4 ? "bg-red-500" : d.score < 0.8 ? "bg-yellow-500" : "bg-green-500" : "bg-muted", v = () => d ? d.score < 0.4 ? "Weak" : d.score < 0.8 ? "Medium" : "Strong" : "";
    return /* @__PURE__ */ p("div", { className: "space-y-2", children: [
      /* @__PURE__ */ p("div", { className: "relative", children: [
        /* @__PURE__ */ a(Ve, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ a(
          "input",
          {
            type: f ? "text" : "password",
            className: o(
              "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              e
            ),
            ref: c,
            onChange: S,
            ...u
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            onClick: () => m(!f),
            tabIndex: -1,
            children: f ? /* @__PURE__ */ a(it, { className: "h-4 w-4" }) : /* @__PURE__ */ a(lt, { className: "h-4 w-4" })
          }
        )
      ] }),
      t && d && /* @__PURE__ */ p("div", { className: "space-y-2", children: [
        /* @__PURE__ */ p("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ a("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ a(
            "div",
            {
              className: o("h-full transition-all duration-300", N()),
              style: { width: `${d.score * 100}%` }
            }
          ) }),
          /* @__PURE__ */ a("span", { className: "text-xs text-muted-foreground min-w-[50px]", children: v() })
        ] }),
        /* @__PURE__ */ p("ul", { className: "grid grid-cols-2 gap-1 text-xs", children: [
          /* @__PURE__ */ p("li", { className: "flex items-center gap-1", children: [
            d.checks.length ? /* @__PURE__ */ a(W, { className: "h-3 w-3 text-green-500" }) : /* @__PURE__ */ a(G, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ p("span", { className: d.checks.length ? "text-green-600" : "text-muted-foreground", children: [
              g,
              "+ characters"
            ] })
          ] }),
          h && /* @__PURE__ */ p("li", { className: "flex items-center gap-1", children: [
            d.checks.uppercase ? /* @__PURE__ */ a(W, { className: "h-3 w-3 text-green-500" }) : /* @__PURE__ */ a(G, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ a("span", { className: d.checks.uppercase ? "text-green-600" : "text-muted-foreground", children: "Uppercase letter" })
          ] }),
          x && /* @__PURE__ */ p("li", { className: "flex items-center gap-1", children: [
            d.checks.lowercase ? /* @__PURE__ */ a(W, { className: "h-3 w-3 text-green-500" }) : /* @__PURE__ */ a(G, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ a("span", { className: d.checks.lowercase ? "text-green-600" : "text-muted-foreground", children: "Lowercase letter" })
          ] }),
          E && /* @__PURE__ */ p("li", { className: "flex items-center gap-1", children: [
            d.checks.numbers ? /* @__PURE__ */ a(W, { className: "h-3 w-3 text-green-500" }) : /* @__PURE__ */ a(G, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ a("span", { className: d.checks.numbers ? "text-green-600" : "text-muted-foreground", children: "Number" })
          ] }),
          R && /* @__PURE__ */ p("li", { className: "flex items-center gap-1", children: [
            d.checks.specialChars ? /* @__PURE__ */ a(W, { className: "h-3 w-3 text-green-500" }) : /* @__PURE__ */ a(G, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ a("span", { className: d.checks.specialChars ? "text-green-600" : "text-muted-foreground", children: "Special character" })
          ] })
        ] })
      ] })
    ] });
  }
);
Gs.displayName = "PasswordInput";
const Vs = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "PE", name: "Peru", dialCode: "+51", flag: "🇵🇪" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "UA", name: "Ukraine", dialCode: "+380", flag: "🇺🇦" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" }
], Ks = s.forwardRef(
  ({
    className: e,
    countries: t = Vs,
    defaultCountry: r = "US",
    value: n,
    onChange: i,
    onCountryChange: u,
    ...c
  }, f) => {
    const [m, d] = s.useState(!1), [l, g] = s.useState(
      t.find((b) => b.code === r) || t[0]
    ), [h, x] = s.useState(n || ""), [E, R] = s.useState(""), S = s.useRef(null), N = s.useRef(null);
    s.useEffect(() => {
      n !== void 0 && x(n);
    }, [n]), s.useEffect(() => {
      const b = (k) => {
        S.current && !S.current.contains(k.target) && (d(!1), R(""));
      };
      return document.addEventListener("mousedown", b), () => document.removeEventListener("mousedown", b);
    }, []);
    const v = t.filter(
      (b) => b.name.toLowerCase().includes(E.toLowerCase()) || b.dialCode.includes(E) || b.code.toLowerCase().includes(E.toLowerCase())
    ), w = (b) => {
      var k;
      g(b), d(!1), R(""), u == null || u(b), i == null || i(h, b), (k = N.current) == null || k.focus();
    }, y = (b) => {
      const k = b.target.value.replace(/[^\d\s\-()]/g, "");
      x(k), i == null || i(k, l);
    };
    return /* @__PURE__ */ p("div", { className: "relative", ref: S, children: [
      /* @__PURE__ */ p("div", { className: "flex", children: [
        /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: o(
              "flex items-center gap-1 h-10 px-3 rounded-l-md border border-r-0 border-input bg-background text-sm hover:bg-accent",
              m && "ring-2 ring-ring ring-offset-2"
            ),
            onClick: () => d(!m),
            children: [
              /* @__PURE__ */ a("span", { className: "text-base", children: l.flag }),
              /* @__PURE__ */ a("span", { className: "text-muted-foreground", children: l.dialCode }),
              /* @__PURE__ */ a(be, { className: "h-3 w-3 text-muted-foreground" })
            ]
          }
        ),
        /* @__PURE__ */ p("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ a(dt, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ a(
            "input",
            {
              type: "tel",
              ref: (b) => {
                N.current = b, typeof f == "function" ? f(b) : f && (f.current = b);
              },
              className: o(
                "flex h-10 w-full rounded-r-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                e
              ),
              value: h,
              onChange: y,
              ...c
            }
          )
        ] })
      ] }),
      m && /* @__PURE__ */ p("div", { className: "absolute z-50 mt-1 w-full min-w-[280px] rounded-md border bg-popover p-1 shadow-md", children: [
        /* @__PURE__ */ a(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 text-sm border-b bg-transparent outline-none placeholder:text-muted-foreground",
            placeholder: "Search countries...",
            value: E,
            onChange: (b) => R(b.target.value),
            autoFocus: !0
          }
        ),
        /* @__PURE__ */ a("div", { className: "max-h-[200px] overflow-y-auto mt-1", children: v.length === 0 ? /* @__PURE__ */ a("div", { className: "px-3 py-2 text-sm text-muted-foreground", children: "No countries found" }) : v.map((b) => /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: o(
              "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent",
              l.code === b.code && "bg-accent"
            ),
            onClick: () => w(b),
            children: [
              /* @__PURE__ */ a("span", { className: "text-base", children: b.flag }),
              /* @__PURE__ */ a("span", { className: "flex-1 text-left", children: b.name }),
              /* @__PURE__ */ a("span", { className: "text-muted-foreground", children: b.dialCode }),
              l.code === b.code && /* @__PURE__ */ a(W, { className: "h-4 w-4" })
            ]
          },
          b.code
        )) })
      ] })
    ] });
  }
);
Ks.displayName = "PhoneInput";
const qs = s.forwardRef(({ className: e, value: t, ...r }, n) => /* @__PURE__ */ a(
  He.Root,
  {
    ref: n,
    className: o(
      "relative h-2 w-full overflow-hidden rounded-full bg-[var(--backgrounds-tertiary)]",
      e
    ),
    ...r,
    children: /* @__PURE__ */ a(
      He.Indicator,
      {
        className: "h-full w-full flex-1 bg-[var(--interactive-bg-active)] transition-all duration-300 ease-out",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
qs.displayName = He.Root.displayName;
const Ys = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  Se.Root,
  {
    className: o("grid gap-2", e),
    ...t,
    ref: r
  }
));
Ys.displayName = Se.Root.displayName;
const Ws = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  Se.Item,
  {
    ref: r,
    className: o(
      "aspect-square h-4 w-4 rounded-full border border-[var(--interactive-border-alt)]",
      "ring-offset-background transition-colors",
      "hover:border-[var(--interactive-fg-alt)]",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-fg)] focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-[var(--interactive-bg-active)] data-[state=checked]:bg-[var(--interactive-bg-active)]",
      e
    ),
    ...t,
    children: /* @__PURE__ */ a(Se.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ a("div", { className: "h-1.5 w-1.5 rounded-full bg-[var(--interactive-fg-active)]" }) })
  }
));
Ws.displayName = Se.Item.displayName;
const Xs = s.forwardRef(
  ({
    className: e,
    value: t = 0,
    max: r = 5,
    onChange: n,
    readonly: i = !1,
    size: u = "default",
    showValue: c = !1,
    precision: f = 1,
    ...m
  }, d) => {
    const [l, g] = s.useState(null), h = {
      sm: "h-4 w-4",
      default: "h-5 w-5",
      lg: "h-6 w-6"
    }, x = (N, v) => {
      if (i) return;
      const w = N.currentTarget.getBoundingClientRect(), b = (N.clientX - w.left) / w.width;
      g(f === 0.5 ? v + (b < 0.5 ? 0.5 : 1) : v + 1);
    }, E = (N) => {
      i || !n || n(l ?? N + 1);
    }, R = l ?? t, S = (N) => {
      const v = R >= N + 1, w = R >= N + 0.5 && R < N + 1;
      return /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          disabled: i,
          className: o(
            "relative p-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-default",
            !i && "cursor-pointer hover:scale-110"
          ),
          onMouseMove: (y) => x(y, N),
          onMouseLeave: () => g(null),
          onClick: () => E(N),
          "aria-label": `Rate ${N + 1} out of ${r}`,
          children: [
            /* @__PURE__ */ a(
              Qe,
              {
                className: o(
                  h[u],
                  "text-[var(--backgrounds-quaternary)] fill-[var(--backgrounds-quaternary)]"
                )
              }
            ),
            /* @__PURE__ */ a(
              Qe,
              {
                className: o(
                  h[u],
                  "absolute inset-0.5 fill-[var(--cautionary-main)] text-[var(--cautionary-main)] transition-all",
                  v || w ? "opacity-100" : "opacity-0"
                ),
                style: w ? {
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                } : void 0
              }
            )
          ]
        },
        N
      );
    };
    return /* @__PURE__ */ p(
      "div",
      {
        ref: d,
        className: o("flex items-center gap-0.5", e),
        role: "radiogroup",
        "aria-label": "Rating",
        ...m,
        children: [
          Array.from({ length: r }, (N, v) => S(v)),
          c && /* @__PURE__ */ p("span", { className: "ml-2 text-sm text-[var(--foregrounds-tertiary)]", children: [
            R.toFixed(f === 0.5 ? 1 : 0),
            " / ",
            r
          ] })
        ]
      }
    );
  }
);
Xs.displayName = "Rating";
const Ze = s.createContext({
  direction: "horizontal",
  registerPanel: () => {
  },
  unregisterPanel: () => {
  },
  getPanelSize: () => 50,
  startResize: () => {
  },
  isResizing: !1
}), Zs = s.forwardRef(
  ({
    className: e,
    direction: t = "horizontal",
    autoSaveId: r,
    onLayout: n,
    children: i,
    ...u
  }, c) => {
    const [f, m] = s.useState(/* @__PURE__ */ new Map()), [d, l] = s.useState(!1), g = s.useRef(null), h = s.useRef(-1), x = s.useRef([]), E = s.useMemo(() => {
      const w = [];
      return s.Children.forEach(i, (y) => {
        s.isValidElement(y) && y.type === Ot && w.push(y.props.id || `panel-${w.length}`);
      }), w;
    }, [i]), R = s.useCallback(
      (w, y = 10, b = 100, k = 50) => {
        m((I) => {
          const A = new Map(I);
          return A.has(w) || A.set(w, { minSize: y, maxSize: b, size: k }), A;
        });
      },
      []
    ), S = s.useCallback((w) => {
      m((y) => {
        const b = new Map(y);
        return b.delete(w), b;
      });
    }, []), N = s.useCallback(
      (w) => {
        var y;
        return ((y = f.get(w)) == null ? void 0 : y.size) ?? 50;
      },
      [f]
    ), v = s.useCallback(
      (w) => {
        l(!0), h.current = w, x.current = E.map((y) => N(y));
      },
      [E, N]
    );
    return s.useEffect(() => {
      if (!d) return;
      const w = (b) => {
        if (!g.current || h.current < 0) return;
        const k = g.current.getBoundingClientRect(), I = t === "horizontal" ? k.width : k.height, F = (t === "horizontal" ? b.clientX - k.left : b.clientY - k.top) / I * 100, Z = h.current, C = E[Z], M = E[Z + 1], U = f.get(C), z = f.get(M);
        if (!U || !z) return;
        let J = 0;
        for (let re = 0; re < Z; re++)
          J += N(E[re]);
        const X = U.size + z.size;
        let Q = F - J;
        Q = Math.max(U.minSize, Math.min(U.maxSize, Q));
        let H = X - Q;
        H = Math.max(z.minSize, Math.min(z.maxSize, H)), Q = X - H, m((re) => {
          const T = new Map(re);
          return T.set(C, { ...U, size: Q }), T.set(M, { ...z, size: H }), T;
        });
      }, y = () => {
        l(!1), h.current = -1, n == null || n(E.map((b) => N(b)));
      };
      return document.addEventListener("mousemove", w), document.addEventListener("mouseup", y), () => {
        document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", y);
      };
    }, [d, t, f, E, N, n]), s.useEffect(() => {
      if (!r) return;
      const w = localStorage.getItem(`resizable-${r}`);
      if (w)
        try {
          const y = JSON.parse(w);
          m((b) => {
            const k = new Map(b);
            for (const [I, A] of Object.entries(y)) {
              const F = k.get(I);
              F && k.set(I, { ...F, size: A });
            }
            return k;
          });
        } catch {
        }
    }, [r]), s.useEffect(() => {
      if (!r || d) return;
      const w = {};
      f.forEach((y, b) => {
        w[b] = y.size;
      }), localStorage.setItem(`resizable-${r}`, JSON.stringify(w));
    }, [r, f, d]), /* @__PURE__ */ a(
      Ze.Provider,
      {
        value: {
          direction: t,
          registerPanel: R,
          unregisterPanel: S,
          getPanelSize: N,
          startResize: v,
          isResizing: d
        },
        children: /* @__PURE__ */ a(
          "div",
          {
            ref: (w) => {
              g.current = w, typeof c == "function" ? c(w) : c && (c.current = w);
            },
            className: o(
              "flex h-full w-full",
              t === "vertical" && "flex-col",
              e
            ),
            ...u,
            children: i
          }
        )
      }
    );
  }
);
Zs.displayName = "ResizablePanelGroup";
const Ot = s.forwardRef(
  ({
    className: e,
    id: t,
    defaultSize: r = 50,
    minSize: n = 10,
    maxSize: i = 100,
    children: u,
    ...c
  }, f) => {
    const m = s.useId(), d = t || m, { direction: l, registerPanel: g, unregisterPanel: h, getPanelSize: x } = s.useContext(Ze);
    s.useEffect(() => (g(d, n, i, r), () => h(d)), [d, n, i, r, g, h]);
    const E = x(d);
    return /* @__PURE__ */ a(
      "div",
      {
        ref: f,
        className: o("overflow-hidden", e),
        style: {
          [l === "horizontal" ? "width" : "height"]: `${E}%`,
          flexShrink: 0
        },
        ...c,
        children: u
      }
    );
  }
);
Ot.displayName = "ResizablePanel";
const Js = s.forwardRef(
  ({ className: e, withHandle: t = !1, index: r = 0, ...n }, i) => {
    const { direction: u, startResize: c, isResizing: f } = s.useContext(
      Ze
    ), m = s.useRef(null), d = (l) => {
      l.preventDefault();
      const g = m.current;
      if (g) {
        const h = g.parentElement;
        if (h) {
          const E = Array.from(h.querySelectorAll("[data-resizable-handle]")).indexOf(g);
          c(E >= 0 ? E : r);
          return;
        }
      }
      c(r);
    };
    return /* @__PURE__ */ a(
      "div",
      {
        ref: (l) => {
          m.current = l, typeof i == "function" ? i(l) : i && (i.current = l);
        },
        "data-resizable-handle": !0,
        className: o(
          "relative flex items-center justify-center bg-border",
          u === "horizontal" ? "w-px cursor-col-resize" : "h-px cursor-row-resize",
          "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
          f && "bg-[var(--interactive-bg-active)]",
          e
        ),
        onMouseDown: d,
        ...n,
        children: t && /* @__PURE__ */ a(
          "div",
          {
            className: o(
              "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border",
              u === "vertical" && "h-3 w-4 rotate-90"
            ),
            children: /* @__PURE__ */ a(da, { className: "h-2.5 w-2.5" })
          }
        )
      }
    );
  }
);
Js.displayName = "ResizableHandle";
const Ft = $(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), zt = s.forwardRef(({ className: e, variant: t, size: r, ...n }, i) => /* @__PURE__ */ a(
  mt.Root,
  {
    ref: i,
    className: o(Ft({ variant: t, size: r, className: e })),
    ...n
  }
));
zt.displayName = mt.Root.displayName;
const Ae = s.forwardRef(
  ({ className: e, orientation: t = "horizontal", decorative: r = !0, ...n }, i) => /* @__PURE__ */ a(
    ft.Root,
    {
      ref: i,
      decorative: r,
      orientation: t,
      className: o(
        "shrink-0 bg-border",
        t === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        e
      ),
      ...n
    }
  )
);
Ae.displayName = ft.Root.displayName;
const Y = ({
  pressed: e,
  onPressedChange: t,
  disabled: r,
  children: n,
  tooltip: i
}) => /* @__PURE__ */ a(
  zt,
  {
    size: "sm",
    pressed: e,
    onPressedChange: t,
    disabled: r,
    "aria-label": i,
    className: "h-8 w-8 p-0",
    children: n
  }
), Qs = ({ editor: e }) => e ? /* @__PURE__ */ p("div", { className: "flex flex-wrap items-center gap-1 border-b p-1", children: [
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("bold"),
      onPressedChange: () => e.chain().focus().toggleBold().run(),
      disabled: !e.can().chain().focus().toggleBold().run(),
      tooltip: "Bold",
      children: /* @__PURE__ */ a(ca, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("italic"),
      onPressedChange: () => e.chain().focus().toggleItalic().run(),
      disabled: !e.can().chain().focus().toggleItalic().run(),
      tooltip: "Italic",
      children: /* @__PURE__ */ a(ua, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("strike"),
      onPressedChange: () => e.chain().focus().toggleStrike().run(),
      disabled: !e.can().chain().focus().toggleStrike().run(),
      tooltip: "Strikethrough",
      children: /* @__PURE__ */ a(ma, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("code"),
      onPressedChange: () => e.chain().focus().toggleCode().run(),
      disabled: !e.can().chain().focus().toggleCode().run(),
      tooltip: "Code",
      children: /* @__PURE__ */ a(fa, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(Ae, { orientation: "vertical", className: "mx-1 h-6" }),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("heading", { level: 1 }),
      onPressedChange: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
      tooltip: "Heading 1",
      children: /* @__PURE__ */ a(pa, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("heading", { level: 2 }),
      onPressedChange: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
      tooltip: "Heading 2",
      children: /* @__PURE__ */ a(ga, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("heading", { level: 3 }),
      onPressedChange: () => e.chain().focus().toggleHeading({ level: 3 }).run(),
      tooltip: "Heading 3",
      children: /* @__PURE__ */ a(ba, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(Ae, { orientation: "vertical", className: "mx-1 h-6" }),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("bulletList"),
      onPressedChange: () => e.chain().focus().toggleBulletList().run(),
      tooltip: "Bullet List",
      children: /* @__PURE__ */ a(ha, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("orderedList"),
      onPressedChange: () => e.chain().focus().toggleOrderedList().run(),
      tooltip: "Ordered List",
      children: /* @__PURE__ */ a(va, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: e.isActive("blockquote"),
      onPressedChange: () => e.chain().focus().toggleBlockquote().run(),
      tooltip: "Quote",
      children: /* @__PURE__ */ a(xa, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: !1,
      onPressedChange: () => e.chain().focus().setHorizontalRule().run(),
      tooltip: "Horizontal Rule",
      children: /* @__PURE__ */ a(ut, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(Ae, { orientation: "vertical", className: "mx-1 h-6" }),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: !1,
      onPressedChange: () => e.chain().focus().undo().run(),
      disabled: !e.can().chain().focus().undo().run(),
      tooltip: "Undo",
      children: /* @__PURE__ */ a(Na, { className: "h-4 w-4" })
    }
  ),
  /* @__PURE__ */ a(
    Y,
    {
      pressed: !1,
      onPressedChange: () => e.chain().focus().redo().run(),
      disabled: !e.can().chain().focus().redo().run(),
      tooltip: "Redo",
      children: /* @__PURE__ */ a(ya, { className: "h-4 w-4" })
    }
  )
] }) : null, eo = s.forwardRef(
  ({
    value: e,
    onChange: t,
    placeholder: r = "Start typing...",
    disabled: n = !1,
    className: i,
    minHeight: u = "150px"
  }, c) => {
    const f = Aa({
      extensions: [
        La.configure({
          heading: {
            levels: [1, 2, 3]
          }
        }),
        Pa.configure({
          placeholder: r
        })
      ],
      content: e,
      editable: !n,
      onUpdate: ({ editor: m }) => {
        t == null || t(m.getHTML());
      }
    });
    return s.useEffect(() => {
      f && e !== f.getHTML() && f.commands.setContent(e ?? "");
    }, [e, f]), s.useEffect(() => {
      f && f.setEditable(!n);
    }, [n, f]), /* @__PURE__ */ p(
      "div",
      {
        ref: c,
        className: o(
          "rounded-md border bg-background",
          n && "opacity-50",
          i
        ),
        children: [
          /* @__PURE__ */ a(Qs, { editor: f }),
          /* @__PURE__ */ a(
            Da,
            {
              editor: f,
              className: o(
                "prose prose-sm dark:prose-invert max-w-none p-3 focus-within:outline-none [&_.ProseMirror]:min-h-[var(--min-height)] [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
              ),
              style: { "--min-height": u }
            }
          )
        ]
      }
    );
  }
);
eo.displayName = "RichText";
const to = s.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ p(
  oe.Root,
  {
    ref: n,
    className: o("relative overflow-hidden", e),
    ...r,
    children: [
      /* @__PURE__ */ a(oe.Viewport, { className: "h-full w-full rounded-[inherit]", children: t }),
      /* @__PURE__ */ a(Bt, {}),
      /* @__PURE__ */ a(oe.Corner, {})
    ]
  }
));
to.displayName = oe.Root.displayName;
const Bt = s.forwardRef(({ className: e, orientation: t = "vertical", ...r }, n) => /* @__PURE__ */ a(
  oe.ScrollAreaScrollbar,
  {
    ref: n,
    orientation: t,
    className: o(
      "flex touch-none select-none transition-colors",
      t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      e
    ),
    ...r,
    children: /* @__PURE__ */ a(oe.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
Bt.displayName = oe.ScrollAreaScrollbar.displayName;
const ao = s.forwardRef(
  ({
    className: e,
    value: t,
    onChange: r,
    onSearch: n,
    onClear: i,
    loading: u = !1,
    showClearButton: c = !0,
    searchOnEnter: f = !0,
    debounceMs: m,
    disabled: d,
    ...l
  }, g) => {
    const [h, x] = s.useState(t || ""), E = s.useRef(null);
    s.useEffect(() => {
      t !== void 0 && x(t);
    }, [t]);
    const R = (w) => {
      const y = w.target.value;
      x(y), r == null || r(y), m && n && (E.current && clearTimeout(E.current), E.current = setTimeout(() => {
        n(y);
      }, m));
    }, S = (w) => {
      w.key === "Enter" && f && n && (w.preventDefault(), E.current && clearTimeout(E.current), n(h)), w.key === "Escape" && h && N();
    }, N = () => {
      x(""), r == null || r(""), i == null || i(), E.current && clearTimeout(E.current);
    };
    s.useEffect(() => () => {
      E.current && clearTimeout(E.current);
    }, []);
    const v = c && h && !u;
    return /* @__PURE__ */ p("div", { className: "relative", children: [
      /* @__PURE__ */ a(he, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "search",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
            e
          ),
          ref: g,
          value: h,
          onChange: R,
          onKeyDown: S,
          disabled: d || u,
          ...l
        }
      ),
      /* @__PURE__ */ a("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: u ? /* @__PURE__ */ a(De, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : v ? /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: "p-0.5 hover:bg-accent rounded",
          onClick: N,
          tabIndex: -1,
          children: /* @__PURE__ */ a(G, { className: "h-4 w-4 text-muted-foreground" })
        }
      ) : null })
    ] });
  }
);
ao.displayName = "SearchInput";
const ro = s.forwardRef(
  ({ shortcutKey: e = "K", showShortcut: t = !0, className: r, ...n }, i) => {
    const u = s.useRef(null);
    s.useEffect(() => {
      const f = (m) => {
        var d;
        (m.metaKey || m.ctrlKey) && m.key.toLowerCase() === e.toLowerCase() && (m.preventDefault(), (d = u.current) == null || d.focus());
      };
      return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
    }, [e]);
    const c = (f) => {
      u.current = f, typeof i == "function" ? i(f) : i && (i.current = f);
    };
    return /* @__PURE__ */ p("div", { className: "relative", children: [
      /* @__PURE__ */ a(he, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "search",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
            t ? "pr-16" : "pr-10",
            r
          ),
          ref: c,
          ...n
        }
      ),
      t && /* @__PURE__ */ a("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: /* @__PURE__ */ p("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground inline-flex", children: [
        /* @__PURE__ */ a("span", { className: "text-xs", children: "⌘" }),
        e
      ] }) })
    ] });
  }
);
ro.displayName = "CommandSearch";
const no = s.forwardRef(
  ({
    collapsedWidth: e = "40px",
    expandedWidth: t = "250px",
    className: r,
    placeholder: n = "Search...",
    ...i
  }, u) => {
    const [c, f] = s.useState(!1), [m, d] = s.useState(i.value || ""), l = s.useRef(null), g = () => f(!0), h = () => {
      m || f(!1);
    }, x = (S) => {
      var N;
      d(S.target.value), (N = i.onChange) == null || N.call(i, S.target.value);
    }, E = () => {
      f(!0), setTimeout(() => {
        var S;
        return (S = l.current) == null ? void 0 : S.focus();
      }, 100);
    }, R = (S) => {
      l.current = S, typeof u == "function" ? u(S) : u && (u.current = S);
    };
    return /* @__PURE__ */ p(
      "div",
      {
        className: o(
          "relative flex items-center transition-all duration-200 ease-in-out",
          r
        ),
        style: { width: c ? t : e },
        children: [
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: o(
                "absolute left-0 flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent transition-colors",
                c && "border-transparent hover:bg-transparent"
              ),
              onClick: E,
              tabIndex: c ? -1 : 0,
              children: /* @__PURE__ */ a(he, { className: "h-4 w-4 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ a(
            "input",
            {
              type: "search",
              className: o(
                "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
                !c && "opacity-0 pointer-events-none"
              ),
              ref: R,
              value: m,
              onChange: x,
              onFocus: g,
              onBlur: h,
              placeholder: n,
              ...i
            }
          )
        ]
      }
    );
  }
);
no.displayName = "ExpandableSearch";
const so = (e, t) => {
  var n;
  const r = t.toLowerCase();
  return e.label.toLowerCase().includes(r) || e.value.toLowerCase().includes(r) || (((n = e.description) == null ? void 0 : n.toLowerCase().includes(r)) ?? !1);
}, oo = s.forwardRef(
  ({
    className: e,
    value: t,
    onChange: r,
    options: n,
    onSelect: i,
    loading: u = !1,
    emptyMessage: c = "No results found",
    filterFn: f = so,
    minChars: m = 0,
    maxResults: d = 10,
    showAllOnFocus: l = !0,
    groupBy: g,
    disabled: h,
    placeholder: x = "Search...",
    ...E
  }, R) => {
    const [S, N] = s.useState(!1), [v, w] = s.useState(t || ""), [y, b] = s.useState(-1), k = s.useRef(null), I = s.useRef(null), A = s.useRef(null);
    s.useEffect(() => {
      t !== void 0 && w(t);
    }, [t]), s.useEffect(() => {
      const T = (L) => {
        k.current && !k.current.contains(L.target) && (N(!1), b(-1));
      };
      return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
    }, []);
    const F = s.useMemo(() => v.length < m && !l ? [] : (v.length >= m ? n.filter((L) => f(L, v)) : n).slice(0, d), [n, v, f, m, d, l]), Z = s.useMemo(() => {
      if (!g) return null;
      const T = {};
      return F.forEach((L) => {
        const j = g(L);
        T[j] || (T[j] = []), T[j].push(L);
      }), T;
    }, [F, g]), C = (T) => {
      const L = T.target.value;
      w(L), r == null || r(L), N(!0), b(-1);
    }, M = () => {
      (l || v.length >= m) && N(!0);
    }, U = (T) => {
      var L;
      T.disabled || (w(T.label), r == null || r(T.label), i == null || i(T), N(!1), b(-1), (L = I.current) == null || L.focus());
    }, z = (T) => {
      if (!S && (T.key === "ArrowDown" || T.key === "ArrowUp")) {
        N(!0);
        return;
      }
      switch (T.key) {
        case "ArrowDown":
          T.preventDefault(), b((L) => {
            const j = L < F.length - 1 ? L + 1 : 0;
            return J(j), j;
          });
          break;
        case "ArrowUp":
          T.preventDefault(), b((L) => {
            const j = L > 0 ? L - 1 : F.length - 1;
            return J(j), j;
          });
          break;
        case "Enter":
          T.preventDefault(), y >= 0 && F[y] && U(F[y]);
          break;
        case "Escape":
          N(!1), b(-1);
          break;
        case "Tab":
          N(!1), b(-1);
          break;
      }
    }, J = (T) => {
      if (A.current) {
        const j = A.current.querySelectorAll("[data-option]")[T];
        j && j.scrollIntoView({ block: "nearest" });
      }
    }, X = () => {
      var T;
      w(""), r == null || r(""), N(!1), (T = I.current) == null || T.focus();
    }, Q = (T) => {
      I.current = T, typeof R == "function" ? R(T) : R && (R.current = T);
    }, H = (T, L) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "data-option": !0,
        className: o(
          "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-left",
          y === L && "bg-accent",
          T.disabled && "opacity-50 cursor-not-allowed",
          !T.disabled && "hover:bg-accent cursor-pointer"
        ),
        onClick: () => U(T),
        onMouseEnter: () => !T.disabled && b(L),
        disabled: T.disabled,
        children: [
          T.icon && /* @__PURE__ */ a("span", { className: "flex-shrink-0", children: T.icon }),
          /* @__PURE__ */ p("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ a("div", { className: "truncate font-medium", children: T.label }),
            T.description && /* @__PURE__ */ a("div", { className: "truncate text-xs text-muted-foreground", children: T.description })
          ] })
        ]
      },
      T.value
    ), re = S && (F.length > 0 || u || v.length >= m);
    return /* @__PURE__ */ p("div", { ref: k, className: o("relative", e), children: [
      /* @__PURE__ */ a(he, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "text",
          role: "combobox",
          "aria-expanded": S,
          "aria-autocomplete": "list",
          "aria-controls": "autocomplete-list",
          autoComplete: "off",
          className: o(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ),
          ref: Q,
          value: v,
          onChange: C,
          onFocus: M,
          onKeyDown: z,
          disabled: h,
          placeholder: x,
          ...E
        }
      ),
      /* @__PURE__ */ a("div", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: u ? /* @__PURE__ */ a(De, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : v ? /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: "p-0.5 hover:bg-accent rounded",
          onClick: X,
          tabIndex: -1,
          children: /* @__PURE__ */ a(G, { className: "h-4 w-4 text-muted-foreground" })
        }
      ) : null }),
      re && /* @__PURE__ */ a(
        "div",
        {
          id: "autocomplete-list",
          ref: A,
          className: "absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md max-h-[300px] overflow-y-auto",
          children: u ? /* @__PURE__ */ a("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ a(De, { className: "h-5 w-5 animate-spin text-muted-foreground" }) }) : F.length === 0 ? /* @__PURE__ */ a("div", { className: "px-3 py-4 text-sm text-center text-muted-foreground", children: c }) : Z ? /* @__PURE__ */ a("div", { className: "p-1", children: Object.entries(Z).map(([T, L]) => /* @__PURE__ */ p("div", { children: [
            /* @__PURE__ */ a("div", { className: "px-3 py-1.5 text-xs font-semibold text-muted-foreground", children: T }),
            L.map((j) => {
              const Ht = F.indexOf(j);
              return H(j, Ht);
            })
          ] }, T)) }) : /* @__PURE__ */ a("div", { className: "p-1", children: F.map((T, L) => H(T, L)) })
        }
      )
    ] });
  }
);
oo.displayName = "AutocompleteSearch";
const $t = s.createContext(
  void 0
);
function ge() {
  const e = s.useContext($t);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return e;
}
function sl({
  children: e,
  defaultOpen: t = !0,
  defaultCollapsed: r = !1,
  onOpenChange: n,
  onCollapsedChange: i
}) {
  const [u, c] = s.useState(t), [f, m] = s.useState(r), [d, l] = s.useState(!1);
  s.useEffect(() => {
    const x = () => {
      l(window.innerWidth < 768);
    };
    return x(), window.addEventListener("resize", x), () => window.removeEventListener("resize", x);
  }, []);
  const g = s.useCallback(
    (x) => {
      c(x), n == null || n(x);
    },
    [n]
  ), h = s.useCallback(
    (x) => {
      m(x), i == null || i(x);
    },
    [i]
  );
  return /* @__PURE__ */ a(
    $t.Provider,
    {
      value: { open: u, setOpen: g, collapsed: f, setCollapsed: h, isMobile: d },
      children: e
    }
  );
}
const io = $(
  "flex h-full flex-col border-r bg-background transition-all duration-300",
  {
    variants: {
      variant: {
        default: "",
        inset: "rounded-lg border shadow-sm",
        floating: "m-2 rounded-lg border shadow-lg"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), lo = s.forwardRef(
  ({
    className: e,
    variant: t,
    width: r = 256,
    collapsedWidth: n = 64,
    children: i,
    ...u
  }, c) => {
    const { open: f, collapsed: m, isMobile: d } = ge(), l = d ? f ? r : 0 : m ? n : r;
    return /* @__PURE__ */ p(le, { children: [
      d && f && /* @__PURE__ */ a(
        "div",
        {
          className: "fixed inset-0 z-40 bg-black/50",
          onClick: () => ge().setOpen(!1)
        }
      ),
      /* @__PURE__ */ a(
        "aside",
        {
          ref: c,
          "data-collapsed": m,
          "data-mobile": d,
          className: o(
            io({ variant: t }),
            d && "fixed inset-y-0 left-0 z-50",
            e
          ),
          style: {
            width: l,
            minWidth: l,
            overflow: "hidden"
          },
          ...u,
          children: /* @__PURE__ */ a(
            "div",
            {
              className: "flex h-full flex-col",
              style: { width: r, minWidth: r },
              children: i
            }
          )
        }
      )
    ] });
  }
);
lo.displayName = "Sidebar";
const co = s.forwardRef(
  ({ className: e, ...t }, r) => {
    const { open: n, setOpen: i, collapsed: u, setCollapsed: c, isMobile: f } = ge(), m = () => {
      f ? i(!n) : c(!u);
    };
    return /* @__PURE__ */ p(
      ee,
      {
        ref: r,
        variant: "ghost",
        size: "icon",
        className: o("h-9 w-9", e),
        onClick: m,
        ...t,
        children: [
          /* @__PURE__ */ a(wa, { className: "h-4 w-4" }),
          /* @__PURE__ */ a("span", { className: "sr-only", children: "Toggle sidebar" })
        ]
      }
    );
  }
);
co.displayName = "SidebarTrigger";
const uo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("flex h-14 items-center border-b px-4", e),
    ...t
  }
));
uo.displayName = "SidebarHeader";
const mo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("flex-1 overflow-auto py-2", e),
    ...t
  }
));
mo.displayName = "SidebarContent";
const fo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("mt-auto border-t p-4", e),
    ...t
  }
));
fo.displayName = "SidebarFooter";
const po = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("px-2 py-2", e), ...t }));
po.displayName = "SidebarGroup";
const go = s.forwardRef(({ className: e, ...t }, r) => {
  const { collapsed: n } = ge();
  return n ? null : /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      className: o(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        e
      ),
      ...t
    }
  );
});
go.displayName = "SidebarGroupLabel";
const bo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("space-y-1", e), ...t }));
bo.displayName = "SidebarGroupContent";
const ho = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("ul", { ref: r, className: o("space-y-1", e), ...t }));
ho.displayName = "SidebarMenu";
const vo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("li", { ref: r, className: o("", e), ...t }));
vo.displayName = "SidebarMenuItem";
const xo = s.forwardRef(({ className: e, isActive: t, tooltip: r, children: n, ...i }, u) => {
  const { collapsed: c } = ge(), f = /* @__PURE__ */ a(
    "button",
    {
      ref: u,
      className: o(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        t && "bg-accent text-accent-foreground",
        c && "justify-center px-2",
        e
      ),
      ...i,
      children: n
    }
  );
  return c && r ? /* @__PURE__ */ p("div", { className: "relative group", children: [
    f,
    /* @__PURE__ */ a("div", { className: "absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100", children: r })
  ] }) : f;
});
xo.displayName = "SidebarMenuButton";
const No = s.forwardRef(({ className: e, ...t }, r) => {
  const { collapsed: n } = ge();
  return n ? null : /* @__PURE__ */ a(
    "ul",
    {
      ref: r,
      className: o("ml-4 space-y-1 border-l pl-4", e),
      ...t
    }
  );
});
No.displayName = "SidebarMenuSub";
const yo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("li", { ref: r, className: o("", e), ...t }));
yo.displayName = "SidebarMenuSubItem";
const wo = s.forwardRef(({ className: e, isActive: t, ...r }, n) => /* @__PURE__ */ a(
  "button",
  {
    ref: n,
    className: o(
      "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      t && "bg-accent text-accent-foreground",
      e
    ),
    ...r
  }
));
wo.displayName = "SidebarMenuSubButton";
const Ro = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("mx-2 my-2 h-px bg-border", e),
    ...t
  }
));
Ro.displayName = "SidebarSeparator";
function ol({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: o("animate-pulse rounded-md bg-muted", e),
      ...t
    }
  );
}
const So = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  ye.Root,
  {
    ref: r,
    className: o(
      "relative flex w-full touch-none select-none items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ a(ye.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--backgrounds-tertiary)]", children: /* @__PURE__ */ a(ye.Range, { className: "absolute h-full bg-[var(--interactive-bg-active)]" }) }),
      (Array.isArray(t.value) ? t.value : t.defaultValue ?? [0]).map((n, i) => /* @__PURE__ */ a(
        ye.Thumb,
        {
          className: "block h-4 w-4 rounded-full border border-[var(--interactive-bg-active)] bg-[var(--backgrounds-primary)] shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-fg)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        },
        i
      ))
    ]
  }
));
So.displayName = ye.Root.displayName;
const il = ({ ...e }) => /* @__PURE__ */ a(
  Ma,
  {
    theme: "system",
    className: "toaster group",
    toastOptions: {
      classNames: {
        toast: "group toast group-[.toaster]:bg-[var(--backgrounds-secondary)] group-[.toaster]:text-[var(--foregrounds-primary)] group-[.toaster]:border-[var(--container-border-alt)] group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-[var(--foregrounds-tertiary)] group-[.toast]:text-sm",
        actionButton: "group-[.toast]:bg-[var(--interactive-bg-active)] group-[.toast]:text-[var(--interactive-fg-active)] group-[.toast]:font-medium",
        cancelButton: "group-[.toast]:bg-[var(--backgrounds-tertiary)] group-[.toast]:text-[var(--foregrounds-secondary)]",
        error: "group-[.toaster]:bg-[var(--destructive-bg-alt)] group-[.toaster]:text-[var(--destructive-fg)] group-[.toaster]:border-[var(--destructive-border)]",
        success: "group-[.toaster]:bg-[var(--positive-bg)] group-[.toaster]:text-[var(--positive-fg)] group-[.toaster]:border-[var(--positive-border)]",
        warning: "group-[.toaster]:bg-[var(--cautionary-bg)] group-[.toaster]:text-[var(--cautionary-fg)] group-[.toaster]:border-[var(--cautionary-border)]",
        info: "group-[.toaster]:bg-[var(--informative-bg)] group-[.toaster]:text-[var(--informative-fg)] group-[.toaster]:border-[var(--informative-border)]"
      }
    },
    ...e
  }
), Eo = $(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
        xl: "h-8 w-8"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
), ko = s.forwardRef(
  ({ className: e, size: t, ...r }, n) => /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: o(Eo({ size: t }), e),
      role: "status",
      "aria-label": "Loading",
      ...r,
      children: /* @__PURE__ */ a("span", { className: "sr-only", children: "Loading..." })
    }
  )
);
ko.displayName = "Spinner";
const Io = s.forwardRef(
  ({
    className: e,
    steps: t,
    currentStep: r,
    orientation: n = "horizontal",
    onStepClick: i,
    allowClickOnCompleted: u = !0,
    ...c
  }, f) => {
    const m = n === "vertical";
    return /* @__PURE__ */ a(
      "div",
      {
        ref: f,
        className: o(
          "flex",
          m ? "flex-col" : "flex-row items-center",
          e
        ),
        ...c,
        children: t.map((d, l) => {
          const g = l < r, h = l === r, x = i && (u ? g : !1);
          return /* @__PURE__ */ p(s.Fragment, { children: [
            /* @__PURE__ */ p(
              "div",
              {
                className: o(
                  "flex",
                  m ? "flex-row items-start gap-3" : "flex-col items-center gap-2"
                ),
                children: [
                  /* @__PURE__ */ a(
                    "button",
                    {
                      type: "button",
                      disabled: !x,
                      onClick: () => x && (i == null ? void 0 : i(l)),
                      className: o(
                        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                        g ? "border-[var(--interactive-bg-active)] bg-[var(--interactive-bg-active)] text-[var(--interactive-fg-active)]" : h ? "border-[var(--interactive-bg-active)] bg-[var(--backgrounds-primary)] text-[var(--interactive-bg-active)]" : "border-[var(--backgrounds-quaternary)] bg-[var(--backgrounds-primary)] text-[var(--foregrounds-quinary)]",
                        x && "cursor-pointer hover:border-[var(--interactive-bg-active)] hover:text-[var(--interactive-bg-active)]"
                      ),
                      children: g ? /* @__PURE__ */ a(W, { className: "h-5 w-5" }) : d.icon ?? l + 1
                    }
                  ),
                  /* @__PURE__ */ p(
                    "div",
                    {
                      className: o(
                        m ? "pb-8" : "text-center",
                        m && l === t.length - 1 && "pb-0"
                      ),
                      children: [
                        /* @__PURE__ */ a(
                          "p",
                          {
                            className: o(
                              "text-sm font-medium",
                              h || g ? "text-[var(--foregrounds-primary)]" : "text-[var(--foregrounds-tertiary)]"
                            ),
                            children: d.title
                          }
                        ),
                        d.description && /* @__PURE__ */ a("p", { className: "mt-0.5 text-xs text-[var(--foregrounds-tertiary)]", children: d.description })
                      ]
                    }
                  )
                ]
              }
            ),
            l < t.length - 1 && /* @__PURE__ */ a(
              "div",
              {
                className: o(
                  "transition-colors",
                  m ? "ml-5 h-full min-h-[24px] w-0.5 -translate-x-1/2" : "mx-2 h-0.5 flex-1 min-w-[24px]",
                  l < r ? "bg-[var(--interactive-bg-active)]" : "bg-[var(--backgrounds-quaternary)]"
                )
              }
            )
          ] }, d.id);
        })
      }
    );
  }
);
Io.displayName = "Stepper";
const To = s.forwardRef(
  ({ className: e, step: t, currentStep: r, children: n, ...i }, u) => t !== r ? null : /* @__PURE__ */ a("div", { ref: u, className: o("mt-4", e), ...i, children: n })
);
To.displayName = "StepperContent";
const Co = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  je.Root,
  {
    className: o(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[var(--interactive-bg-active)] data-[state=unchecked]:bg-[var(--backgrounds-quaternary)]",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ a(
      je.Thumb,
      {
        className: o(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Co.displayName = je.Root.displayName;
const Ao = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ a(
  "table",
  {
    ref: r,
    className: o("w-full caption-bottom text-sm", e),
    ...t
  }
) }));
Ao.displayName = "Table";
const Do = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("thead", { ref: r, className: o("[&_tr]:border-b", e), ...t }));
Do.displayName = "TableHeader";
const Lo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "tbody",
  {
    ref: r,
    className: o("[&_tr:last-child]:border-0", e),
    ...t
  }
));
Lo.displayName = "TableBody";
const Po = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "tfoot",
  {
    ref: r,
    className: o(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...t
  }
));
Po.displayName = "TableFooter";
const Mo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "tr",
  {
    ref: r,
    className: o(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    ...t
  }
));
Mo.displayName = "TableRow";
const _o = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "th",
  {
    ref: r,
    className: o(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      e
    ),
    ...t
  }
));
_o.displayName = "TableHead";
const Oo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "td",
  {
    ref: r,
    className: o("p-4 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
Oo.displayName = "TableCell";
const Fo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "caption",
  {
    ref: r,
    className: o("mt-4 text-sm text-muted-foreground", e),
    ...t
  }
));
Fo.displayName = "TableCaption";
const ll = ce.Root, zo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ce.List,
  {
    ref: r,
    className: o(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
zo.displayName = ce.List.displayName;
const Bo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ce.Trigger,
  {
    ref: r,
    className: o(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      e
    ),
    ...t
  }
));
Bo.displayName = ce.Trigger.displayName;
const $o = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ce.Content,
  {
    ref: r,
    className: o(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
$o.displayName = ce.Content.displayName;
const Uo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "textarea",
  {
    className: o(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      e
    ),
    ref: r,
    ...t
  }
));
Uo.displayName = "Textarea";
function ue(e) {
  return String(e).padStart(2, "0");
}
function rt(e, t) {
  if (!e) return { h: t === "12" ? 12 : 0, m: 0, period: "AM" };
  const r = e.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i), n = e.match(/^(\d{1,2}):(\d{2})$/);
  if (r) return { h: parseInt(r[1]), m: parseInt(r[2]), period: r[3].toUpperCase() };
  if (n) {
    const i = parseInt(n[1]), u = parseInt(n[2]);
    if (t === "12") {
      const c = i >= 12 ? "PM" : "AM";
      return { h: i === 0 ? 12 : i > 12 ? i - 12 : i, m: u, period: c };
    }
    return { h: i, m: u, period: "AM" };
  }
  return { h: t === "12" ? 12 : 0, m: 0, period: "AM" };
}
function dl({ value: e = "", onChange: t, format: r = "24", disabled: n, className: i }) {
  const u = rt(e, r), [c, f] = s.useState(u.h), [m, d] = s.useState(u.m), [l, g] = s.useState(u.period);
  s.useEffect(() => {
    const b = rt(e, r);
    f(b.h), d(b.m), g(b.period);
  }, [e]);
  const h = (b, k, I) => {
    r === "24" ? t == null || t(`${ue(b)}:${ue(k)}`) : t == null || t(`${ue(b)}:${ue(k)} ${I}`);
  }, x = r === "12" ? 12 : 23, E = r === "12" ? 1 : 0, R = (b) => {
    let k = c + b;
    k > x && (k = E), k < E && (k = x), f(k), h(k, m, l);
  }, S = (b) => {
    let k = m + b;
    k > 59 && (k = 0), k < 0 && (k = 59), d(k), h(c, k, l);
  }, N = () => {
    const b = l === "AM" ? "PM" : "AM";
    g(b), h(c, m, b);
  }, v = "flex flex-col items-center", w = "flex h-6 w-6 items-center justify-center rounded opacity-50 hover:opacity-100 hover:bg-[var(--backgrounds-tertiary)] transition-opacity disabled:pointer-events-none", y = "w-9 text-center text-lg font-mono font-medium leading-none py-1 tabular-nums";
  return /* @__PURE__ */ p(
    "div",
    {
      className: o(
        "inline-flex items-center gap-1 rounded-lg border border-[var(--interactive-border)] bg-[var(--interactive-bg)] px-3 py-2",
        n && "opacity-50 pointer-events-none",
        i
      ),
      children: [
        /* @__PURE__ */ a(Ke, { className: "h-4 w-4 text-[var(--foregrounds-quinary)] mr-1 shrink-0" }),
        /* @__PURE__ */ p("div", { className: v, children: [
          /* @__PURE__ */ a("button", { type: "button", className: w, onClick: () => R(1), disabled: n, children: /* @__PURE__ */ a("span", { className: "text-xs", children: "▲" }) }),
          /* @__PURE__ */ a(
            "input",
            {
              className: o(y, "bg-transparent outline-none focus:bg-[var(--backgrounds-tertiary)] rounded"),
              value: ue(c),
              onChange: (b) => {
                const k = parseInt(b.target.value);
                !isNaN(k) && k >= E && k <= x && (f(k), h(k, m, l));
              },
              onBlur: (b) => {
                const k = parseInt(b.target.value);
                (isNaN(k) || k < E || k > x) && f(E);
              },
              disabled: n,
              maxLength: 2
            }
          ),
          /* @__PURE__ */ a("button", { type: "button", className: w, onClick: () => R(-1), disabled: n, children: /* @__PURE__ */ a("span", { className: "text-xs", children: "▼" }) })
        ] }),
        /* @__PURE__ */ a("span", { className: "text-[var(--foregrounds-quinary)] text-lg font-mono font-bold leading-none pb-px", children: ":" }),
        /* @__PURE__ */ p("div", { className: v, children: [
          /* @__PURE__ */ a("button", { type: "button", className: w, onClick: () => S(1), disabled: n, children: /* @__PURE__ */ a("span", { className: "text-xs", children: "▲" }) }),
          /* @__PURE__ */ a(
            "input",
            {
              className: o(y, "bg-transparent outline-none focus:bg-[var(--backgrounds-tertiary)] rounded"),
              value: ue(m),
              onChange: (b) => {
                const k = parseInt(b.target.value);
                !isNaN(k) && k >= 0 && k <= 59 && (d(k), h(c, k, l));
              },
              onBlur: (b) => {
                const k = parseInt(b.target.value);
                (isNaN(k) || k < 0 || k > 59) && d(0);
              },
              disabled: n,
              maxLength: 2
            }
          ),
          /* @__PURE__ */ a("button", { type: "button", className: w, onClick: () => S(-1), disabled: n, children: /* @__PURE__ */ a("span", { className: "text-xs", children: "▼" }) })
        ] }),
        r === "12" && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: N,
            disabled: n,
            className: "ml-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors bg-[var(--backgrounds-tertiary)] hover:bg-[var(--backgrounds-quaternary)] text-[var(--foregrounds-primary)]",
            children: l
          }
        )
      ]
    }
  );
}
const Ho = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { className: o("relative flex w-full items-center", e), children: [
    /* @__PURE__ */ a(Ke, { className: "pointer-events-none absolute left-3 h-4 w-4 text-[var(--foregrounds-quinary)]" }),
    /* @__PURE__ */ a(
      "input",
      {
        type: "time",
        ref: r,
        className: o(
          "flex h-10 w-full rounded-md border border-[var(--interactive-border)] bg-[var(--interactive-bg)]",
          "pl-9 pr-3 py-2 text-sm text-[var(--foregrounds-primary)]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--interactive-fg)] focus-visible:border-[var(--interactive-fg)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-calendar-picker-indicator]:opacity-0"
        ),
        ...t
      }
    )
  ] })
);
Ho.displayName = "TimeInput";
const jo = $("relative", {
  variants: {
    variant: {
      default: "",
      alternating: ""
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Go = s.forwardRef(
  ({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: o(jo({ variant: t }), e),
      ...r
    }
  )
);
Go.displayName = "Timeline";
const Vo = $("relative pb-8 pl-8 last:pb-0", {
  variants: {
    variant: {
      default: "",
      success: "[--timeline-dot-color:theme(colors.green.500)]",
      warning: "[--timeline-dot-color:theme(colors.yellow.500)]",
      error: "[--timeline-dot-color:theme(colors.red.500)]",
      info: "[--timeline-dot-color:theme(colors.blue.500)]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Ko = s.forwardRef(
  ({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: o(Vo({ variant: t }), e),
      ...r
    }
  )
);
Ko.displayName = "TimelineItem";
const qo = $(
  "absolute left-[11px] top-[26px] h-[calc(100%-26px)] w-px",
  {
    variants: {
      variant: {
        default: "bg-[var(--container-border-alt)]",
        dashed: "border-l border-dashed border-[var(--container-border-alt)] bg-transparent",
        dotted: "border-l border-dotted border-[var(--container-border-alt)] bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Yo = s.forwardRef(
  ({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: o(qo({ variant: t }), e),
      ...r
    }
  )
);
Yo.displayName = "TimelineLine";
const Wo = $(
  "absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background",
  {
    variants: {
      variant: {
        default: "bg-muted",
        filled: "bg-primary text-primary-foreground",
        outline: "border-2 border-primary bg-background",
        icon: "bg-primary text-primary-foreground"
      },
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Xo = s.forwardRef(
  ({ className: e, variant: t, size: r, icon: n, children: i, ...u }, c) => /* @__PURE__ */ a(
    "div",
    {
      ref: c,
      className: o(
        Wo({ variant: t, size: r }),
        "bg-[var(--timeline-dot-color,theme(colors.muted.DEFAULT))]",
        e
      ),
      ...u,
      children: n || i
    }
  )
);
Xo.displayName = "TimelineDot";
const Zo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: o("pt-0.5", e), ...t }));
Zo.displayName = "TimelineContent";
const Jo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("flex items-center gap-2", e),
    ...t
  }
));
Jo.displayName = "TimelineHeader";
const Qo = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "h3",
  {
    ref: r,
    className: o("font-heading font-semibold leading-none tracking-tight", e),
    ...t
  }
));
Qo.displayName = "TimelineTitle";
const ei = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "time",
  {
    ref: r,
    className: o("text-sm text-[var(--foregrounds-tertiary)]", e),
    ...t
  }
));
ei.displayName = "TimelineTime";
const ti = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "p",
  {
    ref: r,
    className: o("mt-2 text-sm text-[var(--foregrounds-tertiary)]", e),
    ...t
  }
));
ti.displayName = "TimelineDescription";
const ai = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("relative flex items-start gap-4", e),
    ...t
  }
));
ai.displayName = "TimelineHorizontal";
const ri = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o("relative flex flex-col items-center", e),
    ...t
  }
));
ri.displayName = "TimelineHorizontalItem";
const ni = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: o(
      "absolute left-[calc(50%+12px)] top-3 h-px w-[calc(100%-24px)] bg-[var(--container-border-alt)]",
      e
    ),
    ...t
  }
));
ni.displayName = "TimelineHorizontalLine";
const Ut = s.createContext({
  size: "default",
  variant: "default"
}), si = s.forwardRef(({ className: e, variant: t, size: r, children: n, ...i }, u) => /* @__PURE__ */ a(
  _e.Root,
  {
    ref: u,
    className: o("flex items-center justify-center gap-1", e),
    ...i,
    children: /* @__PURE__ */ a(Ut.Provider, { value: { variant: t, size: r }, children: n })
  }
));
si.displayName = _e.Root.displayName;
const oi = s.forwardRef(({ className: e, children: t, variant: r, size: n, ...i }, u) => {
  const c = s.useContext(Ut);
  return /* @__PURE__ */ a(
    _e.Item,
    {
      ref: u,
      className: o(
        Ft({
          variant: c.variant || r,
          size: c.size || n
        }),
        e
      ),
      ...i,
      children: t
    }
  );
});
oi.displayName = _e.Item.displayName;
const cl = Ee.Provider, ul = Ee.Root, ml = Ee.Trigger, ii = s.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ a(
  Ee.Content,
  {
    ref: n,
    sideOffset: t,
    className: o(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...r
  }
));
ii.displayName = Ee.Content.displayName;
const li = s.forwardRef(
  ({
    className: e,
    data: t,
    selectedId: r,
    onSelect: n,
    expandedIds: i,
    onExpandChange: u,
    showIcons: c = !0,
    indentSize: f = 20,
    ...m
  }, d) => {
    const [l, g] = s.useState([]), h = i ?? l, x = (R) => {
      const S = h.includes(R) ? h.filter((N) => N !== R) : [...h, R];
      u ? u(S) : g(S);
    }, E = (R, S = 0) => {
      var y;
      const N = R.children && R.children.length > 0, v = h.includes(R.id), w = r === R.id;
      return N ? /* @__PURE__ */ p(
        pe.Root,
        {
          open: v,
          onOpenChange: () => x(R.id),
          children: [
            /* @__PURE__ */ a(pe.Trigger, { asChild: !0, children: /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                onClick: () => n == null ? void 0 : n(R),
                className: o(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  w && "bg-accent"
                ),
                style: { paddingLeft: `${S * f + 8}px` },
                children: [
                  /* @__PURE__ */ a(
                    ae,
                    {
                      className: o(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                        v && "rotate-90"
                      )
                    }
                  ),
                  c && /* @__PURE__ */ a("span", { className: "shrink-0 text-muted-foreground", children: R.icon ?? (v ? /* @__PURE__ */ a(Ra, { className: "h-4 w-4" }) : /* @__PURE__ */ a(Sa, { className: "h-4 w-4" })) }),
                  /* @__PURE__ */ a("span", { className: "truncate", children: R.name })
                ]
              }
            ) }),
            /* @__PURE__ */ a(pe.Content, { className: "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", children: (y = R.children) == null ? void 0 : y.map((b) => E(b, S + 1)) })
          ]
        },
        R.id
      ) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => n == null ? void 0 : n(R),
          className: o(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            w && "bg-accent"
          ),
          style: { paddingLeft: `${S * f + 8}px` },
          children: [
            c && /* @__PURE__ */ a("span", { className: "shrink-0 text-muted-foreground", children: R.icon ?? /* @__PURE__ */ a(qe, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ a("span", { className: "truncate", children: R.name })
          ]
        },
        R.id
      );
    };
    return /* @__PURE__ */ a("div", { ref: d, className: o("space-y-1", e), ...m, children: t.map((R) => E(R)) });
  }
);
li.displayName = "TreeView";
export {
  Si as Accordion,
  Fa as AccordionContent,
  _a as AccordionItem,
  Oa as AccordionTrigger,
  Ei as AlertDialog,
  Ga as AlertDialogAction,
  Va as AlertDialogCancel,
  Ba as AlertDialogContent,
  ja as AlertDialogDescription,
  Ua as AlertDialogFooter,
  $a as AlertDialogHeader,
  pt as AlertDialogOverlay,
  za as AlertDialogPortal,
  Ha as AlertDialogTitle,
  ki as AlertDialogTrigger,
  Ii as AspectRatio,
  oo as AutocompleteSearch,
  Ka as Avatar,
  Wa as AvatarBadge,
  Ya as AvatarFallback,
  qa as AvatarImage,
  Za as AvatarStatus,
  Ja as AvatarWithStatus,
  tt as Badge,
  tr as Banner,
  ar as Breadcrumb,
  lr as BreadcrumbEllipsis,
  nr as BreadcrumbItem,
  sr as BreadcrumbLink,
  rr as BreadcrumbList,
  or as BreadcrumbPage,
  ir as BreadcrumbSeparator,
  ee as Button,
  Oe as Calendar,
  mr as Card,
  br as CardContent,
  gr as CardDescription,
  hr as CardFooter,
  fr as CardHeader,
  pr as CardTitle,
  vr as Carousel,
  xr as CarouselContent,
  Nr as CarouselItem,
  wr as CarouselNext,
  yr as CarouselPrevious,
  Rr as Checkbox,
  Sr as CodeBlock,
  Ci as Collapsible,
  Di as CollapsibleContent,
  Ai as CollapsibleTrigger,
  Ye as Command,
  Mi as CommandDialog,
  wt as CommandEmpty,
  Rt as CommandGroup,
  Nt as CommandInput,
  St as CommandItem,
  yt as CommandList,
  ro as CommandSearch,
  Dr as CommandSeparator,
  Lr as CommandShortcut,
  _i as ContextMenu,
  Fr as ContextMenuCheckboxItem,
  _r as ContextMenuContent,
  Fi as ContextMenuGroup,
  Or as ContextMenuItem,
  Br as ContextMenuLabel,
  zi as ContextMenuPortal,
  $i as ContextMenuRadioGroup,
  zr as ContextMenuRadioItem,
  $r as ContextMenuSeparator,
  Ur as ContextMenuShortcut,
  Bi as ContextMenuSub,
  Mr as ContextMenuSubContent,
  Pr as ContextMenuSubTrigger,
  Oi as ContextMenuTrigger,
  Tt as CreditCardCVVInput,
  It as CreditCardExpiryInput,
  Xr as CreditCardInput,
  kt as CreditCardNumberInput,
  an as CurrencyInput,
  Zr as DatePicker,
  Jr as DateRangePicker,
  Qr as DateTimePicker,
  ze as DecimalInput,
  Er as Dialog,
  Pi as DialogClose,
  xt as DialogContent,
  Ar as DialogDescription,
  Tr as DialogFooter,
  Ir as DialogHeader,
  vt as DialogOverlay,
  kr as DialogPortal,
  Cr as DialogTitle,
  Li as DialogTrigger,
  Mn as DocumentInput,
  Ui as Drawer,
  ln as DrawerClose,
  cn as DrawerContent,
  pn as DrawerDescription,
  mn as DrawerFooter,
  gn as DrawerHandle,
  un as DrawerHeader,
  At as DrawerOverlay,
  dn as DrawerPortal,
  bn as DrawerPushLayout,
  fn as DrawerTitle,
  on as DrawerTrigger,
  Hi as DropdownMenu,
  yn as DropdownMenuCheckboxItem,
  xn as DropdownMenuContent,
  Gi as DropdownMenuGroup,
  Nn as DropdownMenuItem,
  Rn as DropdownMenuLabel,
  Vi as DropdownMenuPortal,
  qi as DropdownMenuRadioGroup,
  wn as DropdownMenuRadioItem,
  Sn as DropdownMenuSeparator,
  En as DropdownMenuShortcut,
  Ki as DropdownMenuSub,
  vn as DropdownMenuSubContent,
  hn as DropdownMenuSubTrigger,
  ji as DropdownMenuTrigger,
  In as EmailInput,
  no as ExpandableSearch,
  Tn as Fieldset,
  An as FieldsetDescription,
  Cn as FieldsetLegend,
  We as FileInput,
  Fn as FormDescription,
  On as FormLabel,
  zn as FormMessage,
  Yi as HoverCard,
  Bn as HoverCardContent,
  Wi as HoverCardTrigger,
  es as Image,
  Pn as ImageInput,
  Un as Input,
  Hn as InputOTP,
  Gn as InputOTPGroup,
  Vn as InputOTPSeparator,
  jn as InputOTPSlot,
  qn as KEY_SYMBOLS,
  Dt as Kbd,
  Wn as KbdGroup,
  Qn as Link,
  as as Menubar,
  ls as MenubarCheckboxItem,
  os as MenubarContent,
  Zi as MenubarGroup,
  is as MenubarItem,
  cs as MenubarLabel,
  Xi as MenubarMenu,
  Ji as MenubarPortal,
  el as MenubarRadioGroup,
  ds as MenubarRadioItem,
  us as MenubarSeparator,
  ms as MenubarShortcut,
  Qi as MenubarSub,
  ss as MenubarSubContent,
  ns as MenubarSubTrigger,
  rs as MenubarTrigger,
  fs as MultiSelect,
  ws as NavigationDrawer,
  Ss as NavigationDrawerContent,
  Es as NavigationDrawerFooter,
  Cs as NavigationDrawerGroup,
  Rs as NavigationDrawerHeader,
  Ts as NavigationDrawerItem,
  al as NavigationDrawerProvider,
  ks as NavigationDrawerToggle,
  As as NavigationMenu,
  Ms as NavigationMenuContent,
  _s as NavigationMenuIndicator,
  rl as NavigationMenuItem,
  nl as NavigationMenuLink,
  Ds as NavigationMenuList,
  Ps as NavigationMenuTrigger,
  _t as NavigationMenuViewport,
  Os as NumberInput,
  Fs as Pagination,
  zs as PaginationContent,
  Hs as PaginationEllipsis,
  Bs as PaginationItem,
  Xe as PaginationLink,
  Us as PaginationNext,
  $s as PaginationPrevious,
  Gs as PasswordInput,
  rn as PercentageInput,
  Ks as PhoneInput,
  ke as Popover,
  xe as PopoverContent,
  Ie as PopoverTrigger,
  qs as Progress,
  Ys as RadioGroup,
  Ws as RadioGroupItem,
  Xs as Rating,
  Js as ResizableHandle,
  Ot as ResizablePanel,
  Zs as ResizablePanelGroup,
  eo as RichText,
  Qs as RichTextToolbar,
  to as ScrollArea,
  Bt as ScrollBar,
  ao as SearchInput,
  me as Select,
  se as SelectContent,
  Ti as SelectGroup,
  te as SelectItem,
  dr as SelectLabel,
  bt as SelectScrollDownButton,
  gt as SelectScrollUpButton,
  cr as SelectSeparator,
  ne as SelectTrigger,
  fe as SelectValue,
  Ae as Separator,
  ps as Sheet,
  tl as SheetClose,
  Pt as SheetContent,
  ys as SheetDescription,
  xs as SheetFooter,
  vs as SheetHeader,
  Lt as SheetOverlay,
  bs as SheetPortal,
  Ns as SheetTitle,
  gs as SheetTrigger,
  Zn as Shortcut,
  lo as Sidebar,
  mo as SidebarContent,
  fo as SidebarFooter,
  po as SidebarGroup,
  bo as SidebarGroupContent,
  go as SidebarGroupLabel,
  uo as SidebarHeader,
  ho as SidebarMenu,
  xo as SidebarMenuButton,
  vo as SidebarMenuItem,
  No as SidebarMenuSub,
  wo as SidebarMenuSubButton,
  yo as SidebarMenuSubItem,
  sl as SidebarProvider,
  Ro as SidebarSeparator,
  co as SidebarTrigger,
  ol as Skeleton,
  So as Slider,
  ko as Spinner,
  Io as Stepper,
  To as StepperContent,
  Co as Switch,
  Ao as Table,
  Lo as TableBody,
  Fo as TableCaption,
  Oo as TableCell,
  Po as TableFooter,
  _o as TableHead,
  Do as TableHeader,
  Mo as TableRow,
  ll as Tabs,
  $o as TabsContent,
  zo as TabsList,
  Bo as TabsTrigger,
  Uo as Textarea,
  Ho as TimeInput,
  dl as TimePicker,
  Go as Timeline,
  Zo as TimelineContent,
  ti as TimelineDescription,
  Xo as TimelineDot,
  Jo as TimelineHeader,
  ai as TimelineHorizontal,
  ri as TimelineHorizontalItem,
  ni as TimelineHorizontalLine,
  Ko as TimelineItem,
  Yo as TimelineLine,
  ei as TimelineTime,
  Qo as TimelineTitle,
  il as Toaster,
  zt as Toggle,
  si as ToggleGroup,
  oi as ToggleGroupItem,
  ul as Tooltip,
  ii as TooltipContent,
  cl as TooltipProvider,
  ml as TooltipTrigger,
  li as TreeView,
  nn as UnitInput,
  ts as Video,
  Qa as badgeVariants,
  er as bannerVariants,
  ie as buttonVariants,
  o as cn,
  en as currencies,
  Vs as defaultCountries,
  _n as formLabelVariants,
  Be as formatFileSize,
  Yn as formatKey,
  Dn as getFileType,
  Kn as kbdVariants,
  Jn as linkVariants,
  Ce as mediaVariants,
  Ls as navigationMenuTriggerStyle,
  Eo as spinnerVariants,
  Ft as toggleVariants,
  Te as useNavigationDrawer,
  ge as useSidebar
};
