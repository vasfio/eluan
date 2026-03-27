import { jsxs as m, jsx as t, Fragment as Ce } from "react/jsx-runtime";
import * as o from "react";
import { cva as y } from "class-variance-authority";
import { clsx as qe } from "clsx";
import { twMerge as Ge } from "tailwind-merge";
import { Quote as Re, Star as $e, Menu as Qe, Check as ke, X as Ue } from "lucide-react";
import { Avatar as We, AvatarImage as Oe, AvatarFallback as Xe, Input as Ye, Button as de, Sheet as Je, SheetTrigger as Ke, SheetContent as Ze, Table as er, TableHeader as rr, TableRow as ye, TableHead as Ne, TableBody as ar, TableCell as be } from "@ragnar/core";
function s(...r) {
  return Ge(qe(r));
}
const tr = y(
  "relative flex flex-col items-center justify-center overflow-hidden",
  {
    variants: {
      size: {
        sm: "min-h-[40vh] py-16",
        default: "min-h-[60vh] py-20",
        lg: "min-h-[80vh] py-24",
        full: "min-h-screen py-24"
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right"
      }
    },
    defaultVariants: {
      size: "default",
      align: "center"
    }
  }
), or = o.forwardRef(
  ({
    className: r,
    size: e,
    align: a,
    backgroundImage: n,
    backgroundOverlay: i = !0,
    overlayOpacity: l = 0.5,
    children: c,
    style: d,
    ...f
  }, p) => /* @__PURE__ */ m(
    "section",
    {
      ref: p,
      className: s(tr({ size: e, align: a }), r),
      style: {
        ...d,
        backgroundImage: n ? `url(${n})` : void 0,
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      ...f,
      children: [
        n && i && /* @__PURE__ */ t(
          "div",
          {
            className: "absolute inset-0 bg-background",
            style: { opacity: l }
          }
        ),
        /* @__PURE__ */ t("div", { className: s(
          "container relative z-10 mx-auto px-4",
          a === "center" && "flex flex-col items-center"
        ), children: c })
      ]
    }
  )
);
or.displayName = "Hero";
const sr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s(
      "mb-4 inline-flex items-center rounded-full border bg-muted px-4 py-1.5 text-sm font-medium text-[var(--foregrounds-tertiary)]",
      r
    ),
    ...e
  }
));
sr.displayName = "HeroBadge";
const nr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h1",
  {
    ref: a,
    className: s(
      "max-w-4xl w-full font-heading text-4xl font-semibold tracking-tight text-[var(--foregrounds-primary)] sm:text-5xl md:text-6xl lg:text-7xl",
      r
    ),
    ...e
  }
));
nr.displayName = "HeroTitle";
const ir = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s(
      "mt-6 max-w-2xl w-full text-lg text-[var(--foregrounds-tertiary)] sm:text-xl",
      r
    ),
    ...e
  }
));
ir.displayName = "HeroSubtitle";
const lr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mt-8 flex flex-wrap items-center justify-center gap-4",
      r
    ),
    ...e
  }
));
lr.displayName = "HeroActions";
const dr = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ t(
  "div",
  {
    ref: n,
    className: s(
      "mt-12 w-full max-w-5xl",
      r
    ),
    ...a,
    children: e
  }
));
dr.displayName = "HeroImage";
const cr = y(
  "flex flex-col gap-6 py-12 md:py-16 lg:py-20",
  {
    variants: {
      layout: {
        default: "items-center text-center",
        left: "items-start text-left",
        right: "items-end text-right"
      },
      size: {
        sm: "max-w-xl",
        default: "max-w-2xl",
        lg: "max-w-3xl",
        xl: "max-w-4xl",
        full: "max-w-full"
      }
    },
    defaultVariants: {
      layout: "default",
      size: "default"
    }
  }
), mr = o.forwardRef(
  ({ className: r, layout: e, size: a, container: n = !0, children: i, ...l }, c) => /* @__PURE__ */ t(
    "section",
    {
      ref: c,
      className: s(
        n && "container mx-auto px-4",
        r
      ),
      ...l,
      children: /* @__PURE__ */ t("div", { className: s(cr({ layout: e, size: a }), e === "default" && "mx-auto"), children: i })
    }
  )
);
mr.displayName = "ContentSpot";
const fr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s(
      "text-xs font-medium uppercase tracking-widest text-[var(--action-primary-bg)]",
      r
    ),
    ...e
  }
));
fr.displayName = "ContentSpotEyebrow";
const ur = o.forwardRef(({ className: r, as: e = "h2", ...a }, n) => /* @__PURE__ */ t(
  e,
  {
    ref: n,
    className: s(
      "font-heading text-3xl font-semibold tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl lg:text-5xl",
      r
    ),
    ...a
  }
));
ur.displayName = "ContentSpotTitle";
const pr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s(
      "text-lg text-[var(--foregrounds-tertiary)] sm:text-xl",
      r
    ),
    ...e
  }
));
pr.displayName = "ContentSpotDescription";
const gr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "flex flex-wrap items-center gap-4",
      r
    ),
    ...e
  }
));
gr.displayName = "ContentSpotActions";
const vr = y(
  "py-12 md:py-16 lg:py-20",
  {
    variants: {
      layout: {
        grid: "",
        imageLeft: "",
        imageRight: ""
      }
    },
    defaultVariants: {
      layout: "grid"
    }
  }
), xr = o.forwardRef(
  ({ className: r, layout: e, container: a = !0, children: n, ...i }, l) => /* @__PURE__ */ t(
    "section",
    {
      ref: l,
      className: s(
        vr({ layout: e }),
        a && "container mx-auto px-4",
        r
      ),
      ...i,
      children: n
    }
  )
);
xr.displayName = "FeatureSpot";
const hr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s(
      "mb-3 inline-block text-xs font-medium uppercase tracking-widest text-[var(--action-primary-bg)]",
      r
    ),
    ...e
  }
));
hr.displayName = "FeatureSpotEyebrow";
const yr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mx-auto mb-12 max-w-2xl text-center",
      r
    ),
    ...e
  }
));
yr.displayName = "FeatureSpotHeader";
const Nr = o.forwardRef(({ className: r, as: e = "h2", ...a }, n) => /* @__PURE__ */ t(
  e,
  {
    ref: n,
    className: s(
      "font-heading text-3xl font-semibold tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl",
      r
    ),
    ...a
  }
));
Nr.displayName = "FeatureSpotTitle";
const br = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s(
      "mt-4 text-lg text-[var(--foregrounds-tertiary)]",
      r
    ),
    ...e
  }
));
br.displayName = "FeatureSpotDescription";
const wr = o.forwardRef(
  ({ className: r, columns: e = 3, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s("grid gap-8", {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      }[e], r),
      ...a
    }
  )
);
wr.displayName = "FeatureSpotGrid";
const Cr = o.forwardRef(
  ({ className: r, icon: e, children: a, ...n }, i) => /* @__PURE__ */ m(
    "div",
    {
      ref: i,
      className: s(
        "flex flex-col gap-4 rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-6",
        r
      ),
      ...n,
      children: [
        e && /* @__PURE__ */ t("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-secondary)]", children: e }),
        a
      ]
    }
  )
);
Cr.displayName = "FeatureSpotItem";
const Rr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h3",
  {
    ref: a,
    className: s("font-heading text-lg font-semibold text-[var(--foregrounds-primary)]", r),
    ...e
  }
));
Rr.displayName = "FeatureSpotItemTitle";
const kr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
kr.displayName = "FeatureSpotItemDescription";
const Sr = o.forwardRef(
  ({ className: r, reverse: e = !1, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s(
        "grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20",
        e && "md:[&>*:first-child]:order-2",
        r
      ),
      ...a
    }
  )
);
Sr.displayName = "FeatureSpotSplit";
const Tr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex flex-col gap-6", r),
    ...e
  }
));
Tr.displayName = "FeatureSpotContent";
const Ar = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("relative overflow-hidden rounded-xl", r),
    ...e
  }
));
Ar.displayName = "FeatureSpotMedia";
const Br = y("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      primary: "bg-primary text-primary-foreground",
      gradient: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
      dark: "bg-zinc-900 text-white",
      bordered: "border-y bg-background"
    },
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), Fr = o.forwardRef(
  ({ className: r, variant: e, size: a, children: n, ...i }, l) => /* @__PURE__ */ t(
    "section",
    {
      ref: l,
      className: s(Br({ variant: e, size: a }), r),
      ...i,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: n })
    }
  )
);
Fr.displayName = "CTASection";
const Lr = y("mx-auto", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      split: "flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left"
    },
    maxWidth: {
      sm: "max-w-xl",
      md: "max-w-2xl",
      lg: "max-w-4xl",
      full: "max-w-none"
    }
  },
  defaultVariants: {
    align: "center",
    maxWidth: "lg"
  }
}), Mr = o.forwardRef(
  ({ className: r, align: e, maxWidth: a, ...n }, i) => /* @__PURE__ */ t(
    "div",
    {
      ref: i,
      className: s(Lr({ align: e, maxWidth: a }), r),
      ...n
    }
  )
);
Mr.displayName = "CTAContent";
const Ir = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-3xl font-bold tracking-tight sm:text-4xl",
      r
    ),
    ...e
  }
));
Ir.displayName = "CTATitle";
const Vr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mt-4 text-lg opacity-90", r),
    ...e
  }
));
Vr.displayName = "CTADescription";
const zr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mt-8 flex flex-wrap items-center gap-4",
      r
    ),
    ...e
  }
));
zr.displayName = "CTAActions";
const Er = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ t(
  "div",
  {
    ref: n,
    className: s(
      "rounded-2xl bg-[var(--container-bg)] p-8 md:p-12 border border-[var(--container-border-alt)]",
      r
    ),
    ...a,
    children: e
  }
));
Er.displayName = "CTACard";
const Pr = y("w-full", {
  variants: {
    variant: {
      default: "bg-[var(--container-bg)]",
      muted: "bg-[var(--backgrounds-secondary)]",
      primary: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
      dark: "bg-[var(--backgrounds-primary)] text-[var(--foregrounds-primary)]"
    },
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), _r = o.forwardRef(
  ({ className: r, variant: e, size: a, children: n, ...i }, l) => /* @__PURE__ */ t(
    "section",
    {
      ref: l,
      className: s(Pr({ variant: e, size: a }), r),
      ...i,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: n })
    }
  )
);
_r.displayName = "StatsSection";
const Dr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mb-12 text-center", r),
    ...e
  }
));
Dr.displayName = "StatsHeader";
const jr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-3xl font-semibold tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl",
      r
    ),
    ...e
  }
));
jr.displayName = "StatsTitle";
const Hr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mx-auto mt-4 max-w-2xl text-lg text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
Hr.displayName = "StatsDescription";
const qr = y("grid gap-8", {
  variants: {
    columns: {
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4"
    }
  },
  defaultVariants: {
    columns: 4
  }
}), Gr = o.forwardRef(
  ({ className: r, columns: e, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s(qr({ columns: e }), r),
      ...a
    }
  )
);
Gr.displayName = "StatsGrid";
const $r = y("text-center", {
  variants: {
    variant: {
      default: "",
      bordered: "border-l border-[var(--container-border)] first:border-l-0 pl-8 first:pl-0",
      card: "rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-6"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Qr = o.forwardRef(
  ({ className: r, variant: e, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s($r({ variant: e }), r),
      ...a
    }
  )
);
Qr.displayName = "StatItem";
const Ur = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("font-heading text-4xl font-semibold tracking-tight text-[var(--foregrounds-primary)] lg:text-5xl", r),
    ...e
  }
));
Ur.displayName = "StatValue";
const Wr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mt-2 text-sm text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
Wr.displayName = "StatLabel";
const Or = o.forwardRef(({ className: r, direction: e = "neutral", ...a }, n) => /* @__PURE__ */ t(
  "div",
  {
    ref: n,
    className: s(
      "mt-1 text-sm font-medium",
      e === "up" && "text-[var(--positive-fg)]",
      e === "down" && "text-[var(--negative-fg)]",
      e === "neutral" && "text-[var(--foregrounds-tertiary)]",
      r
    ),
    ...a
  }
));
Or.displayName = "StatTrend";
const Xr = y("w-full", {
  variants: {
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), Yr = o.forwardRef(
  ({ className: r, size: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "section",
    {
      ref: i,
      className: s(Xr({ size: e }), r),
      ...n,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: a })
    }
  )
);
Yr.displayName = "TeamSection";
const Jr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mb-12 text-center", r),
    ...e
  }
));
Jr.displayName = "TeamHeader";
const Kr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-3xl font-semibold tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl",
      r
    ),
    ...e
  }
));
Kr.displayName = "TeamTitle";
const Zr = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s(
      "mx-auto mt-4 max-w-2xl text-lg text-[var(--foregrounds-tertiary)]",
      r
    ),
    ...e
  }
));
Zr.displayName = "TeamDescription";
const ea = y("grid gap-8", {
  variants: {
    columns: {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4"
    }
  },
  defaultVariants: {
    columns: 4
  }
}), ra = o.forwardRef(
  ({ className: r, columns: e, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s(ea({ columns: e }), r),
      ...a
    }
  )
);
ra.displayName = "TeamGrid";
const aa = y("group text-center", {
  variants: {
    variant: {
      default: "",
      card: "rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-6"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ta = o.forwardRef(
  ({ className: r, variant: e, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s(aa({ variant: e }), r),
      ...a
    }
  )
);
ta.displayName = "TeamMember";
const oa = o.forwardRef(
  ({ className: r, alt: e, fallback: a, ...n }, i) => /* @__PURE__ */ t("div", { className: "relative mx-auto mb-4 aspect-square w-full max-w-[200px] overflow-hidden rounded-xl bg-[var(--backgrounds-tertiary)]", children: n.src ? /* @__PURE__ */ t(
    "img",
    {
      ref: i,
      alt: e,
      className: s(
        "h-full w-full object-cover",
        r
      ),
      ...n
    }
  ) : /* @__PURE__ */ t("div", { className: "flex h-full w-full items-center justify-center text-4xl font-medium text-[var(--foregrounds-tertiary)]", children: a || (e == null ? void 0 : e.charAt(0).toUpperCase()) }) })
);
oa.displayName = "TeamMemberImage";
const sa = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h3",
  {
    ref: a,
    className: s("font-medium text-[var(--foregrounds-primary)]", r),
    ...e
  }
));
sa.displayName = "TeamMemberName";
const na = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("text-sm text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
na.displayName = "TeamMemberRole";
const ia = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mt-2 text-sm text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
ia.displayName = "TeamMemberBio";
const la = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mt-4 flex justify-center gap-2", r),
    ...e
  }
));
la.displayName = "TeamMemberLinks";
const da = o.forwardRef(
  ({ className: r, label: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "a",
    {
      ref: i,
      "aria-label": e,
      className: s(
        "flex h-8 w-8 items-center justify-center rounded-lg text-[var(--foregrounds-tertiary)] transition-colors hover:bg-[var(--backgrounds-tertiary)] hover:text-[var(--foregrounds-primary)]",
        r
      ),
      ...n,
      children: a
    }
  )
);
da.displayName = "TeamMemberLink";
const ca = y("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      bordered: "border-y bg-background"
    },
    size: {
      sm: "py-8",
      default: "py-12",
      lg: "py-16"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), ma = o.forwardRef(
  ({ className: r, variant: e, size: a, title: n, layout: i = "flex", columns: l = 5, children: c, ...d }, f) => {
    const p = o.Children.toArray(c), g = {
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      6: "grid-cols-3 sm:grid-cols-6",
      8: "grid-cols-4 sm:grid-cols-8"
    };
    return /* @__PURE__ */ t(
      "section",
      {
        ref: f,
        className: s(ca({ variant: e, size: a }), r),
        ...d,
        children: /* @__PURE__ */ m("div", { className: "container mx-auto px-4 overflow-hidden", children: [
          n && /* @__PURE__ */ t("p", { className: "mb-8 text-center text-xs font-medium uppercase tracking-widest text-[var(--foregrounds-quinary)]", children: n }),
          i === "marquee" ? /* @__PURE__ */ m("div", { className: "relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", children: [
            /* @__PURE__ */ t("div", { className: "flex animate-[marquee_30s_linear_infinite] items-center gap-12", children: p }),
            /* @__PURE__ */ t("div", { className: "flex animate-[marquee_30s_linear_infinite] items-center gap-12", "aria-hidden": !0, children: p }),
            /* @__PURE__ */ t("style", { children: `
                @keyframes marquee {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }
              ` })
          ] }) : i === "grid" ? /* @__PURE__ */ t("div", { className: s("grid items-center gap-8", g[l] ?? g[5]), children: c }) : /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16", children: c })
        ] })
      }
    );
  }
);
ma.displayName = "LogoCloud";
const fa = y(
  "flex items-center justify-center transition-opacity",
  {
    variants: {
      grayscale: {
        true: "opacity-60 grayscale hover:opacity-100 hover:grayscale-0",
        false: "opacity-100"
      }
    },
    defaultVariants: {
      grayscale: !0
    }
  }
), ua = o.forwardRef(
  ({ className: r, grayscale: e, href: a, name: n, children: i, ...l }, c) => {
    const d = /* @__PURE__ */ t(
      "div",
      {
        ref: c,
        className: s(fa({ grayscale: e }), r),
        ...l,
        children: i
      }
    );
    return a ? /* @__PURE__ */ t(
      "a",
      {
        href: a,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": n,
        className: "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        children: d
      }
    ) : d;
  }
);
ua.displayName = "LogoCloudItem";
y(
  "",
  {
    variants: {
      variant: {
        default: "",
        card: "",
        minimal: "",
        featured: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Se = o.forwardRef(
  ({
    className: r,
    variant: e,
    author: a,
    rating: n,
    showQuoteIcon: i = !0,
    children: l,
    ...c
  }, d) => {
    const f = /* @__PURE__ */ m(Ce, { children: [
      i && e !== "minimal" && /* @__PURE__ */ t(Re, { className: "mb-4 h-6 w-6 text-[var(--backgrounds-quaternary)]" }),
      /* @__PURE__ */ t("div", { className: "mb-6 text-base font-normal text-[var(--foregrounds-secondary)]", children: l }),
      n !== void 0 && /* @__PURE__ */ t("div", { className: "mb-4 flex gap-1", children: Array.from({ length: 5 }).map((p, g) => /* @__PURE__ */ t(
        $e,
        {
          className: s(
            "h-4 w-4",
            g < n ? "fill-[var(--cautionary-main)] text-[var(--cautionary-main)]" : "text-[var(--backgrounds-quaternary)]"
          )
        },
        g
      )) }),
      /* @__PURE__ */ m("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ m(We, { className: "h-9 w-9", children: [
          a.avatar && /* @__PURE__ */ t(Oe, { src: a.avatar, alt: a.name }),
          /* @__PURE__ */ t(Xe, { className: "bg-[var(--backgrounds-tertiary)] text-xs text-[var(--foregrounds-tertiary)]", children: a.name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2) })
        ] }),
        /* @__PURE__ */ m("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ t("span", { className: "font-medium text-[var(--foregrounds-primary)]", children: a.name }),
          (a.title || a.company) && /* @__PURE__ */ m("span", { className: "text-sm text-[var(--foregrounds-tertiary)]", children: [
            a.title,
            a.title && a.company && " at ",
            a.company
          ] })
        ] })
      ] })
    ] });
    return e === "card" ? /* @__PURE__ */ t(
      "div",
      {
        ref: d,
        className: s(
          "rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-6",
          r
        ),
        ...c,
        children: f
      }
    ) : e === "featured" ? /* @__PURE__ */ t(
      "div",
      {
        ref: d,
        className: s(
          "rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-8 md:p-12",
          r
        ),
        ...c,
        children: f
      }
    ) : /* @__PURE__ */ t("div", { ref: d, className: s("", r), ...c, children: f });
  }
);
Se.displayName = "Testimonial";
const pa = o.forwardRef(
  ({ className: r, columns: e = 3, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s("grid gap-6", {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }[e], r),
      ...a
    }
  )
);
pa.displayName = "TestimonialGrid";
const ga = o.forwardRef(
  ({ className: r, testimonials: e, autoPlay: a = !0, interval: n = 5e3, ...i }, l) => {
    const [c, d] = o.useState(0);
    return o.useEffect(() => {
      if (!a) return;
      const f = setInterval(() => {
        d((p) => (p + 1) % e.length);
      }, n);
      return () => clearInterval(f);
    }, [a, n, e.length]), /* @__PURE__ */ m("div", { ref: l, className: s("relative overflow-hidden", r), ...i, children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "flex transition-transform duration-500 ease-out",
          style: { transform: `translateX(-${c * 100}%)` },
          children: e.map((f, p) => /* @__PURE__ */ t("div", { className: "w-full shrink-0 px-4", children: /* @__PURE__ */ t(
            Se,
            {
              author: f.author,
              rating: f.rating,
              variant: "featured",
              className: "mx-auto max-w-3xl",
              children: f.content
            }
          ) }, p))
        }
      ),
      /* @__PURE__ */ t("div", { className: "mt-6 flex justify-center gap-2", children: e.map((f, p) => /* @__PURE__ */ t(
        "button",
        {
          onClick: () => d(p),
          className: s(
            "h-2.5 w-2.5 rounded-full transition-colors",
            p === c ? "bg-[var(--action-primary-bg)]" : "bg-[var(--backgrounds-quaternary)] hover:bg-[var(--foregrounds-tertiary)]"
          ),
          "aria-label": `Go to testimonial ${p + 1}`
        },
        p
      )) })
    ] });
  }
);
ga.displayName = "TestimonialCarousel";
const va = y(
  "relative",
  {
    variants: {
      variant: {
        default: "border-l-4 border-primary pl-6",
        centered: "text-center",
        card: "rounded-lg border bg-card p-6 shadow-sm",
        minimal: ""
      },
      size: {
        sm: "",
        default: "",
        lg: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), xa = {
  sm: "text-base sm:text-lg",
  default: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl"
}, ha = o.forwardRef(
  ({ className: r, variant: e, size: a, showIcon: n = !1, children: i, ...l }, c) => /* @__PURE__ */ m(
    "blockquote",
    {
      ref: c,
      className: s(va({ variant: e, size: a }), r),
      ...l,
      children: [
        n && e === "centered" && /* @__PURE__ */ t(Re, { className: "mx-auto mb-4 h-8 w-8 text-[var(--foregrounds-tertiary)]/30" }),
        i
      ]
    }
  )
);
ha.displayName = "Quote";
const ya = o.forwardRef(({ className: r, size: e = "default", ...a }, n) => /* @__PURE__ */ t(
  "p",
  {
    ref: n,
    className: s(
      "font-normal text-[var(--foregrounds-secondary)] leading-relaxed",
      xa[e],
      r
    ),
    ...a
  }
));
ya.displayName = "QuoteText";
const Na = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "footer",
  {
    ref: a,
    className: s("mt-4 flex items-center gap-4", r),
    ...e
  }
));
Na.displayName = "QuoteAuthor";
const ba = o.forwardRef(({ className: r, src: e, alt: a, ...n }, i) => /* @__PURE__ */ t(
  "div",
  {
    ref: i,
    className: s(
      "h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted",
      r
    ),
    ...n,
    children: e && /* @__PURE__ */ t(
      "img",
      {
        src: e,
        alt: a ?? "",
        className: "h-full w-full object-cover"
      }
    )
  }
));
ba.displayName = "QuoteAuthorAvatar";
const wa = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex flex-col", r),
    ...e
  }
));
wa.displayName = "QuoteAuthorInfo";
const Ca = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s("font-medium text-[var(--foregrounds-primary)]", r),
    ...e
  }
));
Ca.displayName = "QuoteAuthorName";
const Ra = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s("text-sm text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
Ra.displayName = "QuoteAuthorTitle";
const ka = y("w-full", {
  variants: {
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), Sa = o.forwardRef(
  ({ className: r, size: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "section",
    {
      ref: i,
      className: s(ka({ size: e }), r),
      ...n,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: a })
    }
  )
);
Sa.displayName = "FAQSection";
const Ta = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mb-12 text-center", r),
    ...e
  }
));
Ta.displayName = "FAQHeader";
const Aa = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
      r
    ),
    ...e
  }
));
Aa.displayName = "FAQTitle";
const Ba = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s(
      "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
      r
    ),
    ...e
  }
));
Ba.displayName = "FAQDescription";
const Fa = y("mx-auto", {
  variants: {
    variant: {
      default: "divide-y divide-border",
      separated: "space-y-4",
      cards: "space-y-4"
    },
    maxWidth: {
      sm: "max-w-xl",
      md: "max-w-2xl",
      lg: "max-w-3xl",
      full: "max-w-none"
    }
  },
  defaultVariants: {
    variant: "default",
    maxWidth: "lg"
  }
}), La = o.forwardRef(
  ({ className: r, variant: e, maxWidth: a, ...n }, i) => /* @__PURE__ */ t(
    "div",
    {
      ref: i,
      className: s(Fa({ variant: e, maxWidth: a }), r),
      ...n
    }
  )
);
La.displayName = "FAQList";
const Ma = o.forwardRef(
  ({ className: r, defaultOpen: e = !1, children: a, ...n }, i) => {
    const [l, c] = o.useState(e);
    return /* @__PURE__ */ t(
      "div",
      {
        ref: i,
        className: s("py-4", r),
        ...n,
        children: o.Children.map(a, (d) => {
          if (o.isValidElement(d)) {
            if (d.type === ce)
              return o.cloneElement(d, {
                isOpen: l,
                onToggle: () => c(!l)
              });
            if (d.type === me)
              return o.cloneElement(d, {
                isOpen: l
              });
          }
          return d;
        })
      }
    );
  }
);
Ma.displayName = "FAQItem";
const Ia = o.forwardRef(
  ({ className: r, defaultOpen: e = !1, children: a, ...n }, i) => {
    const [l, c] = o.useState(e);
    return /* @__PURE__ */ t(
      "div",
      {
        ref: i,
        className: s(
          "rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm",
          r
        ),
        ...n,
        children: o.Children.map(a, (d) => {
          if (o.isValidElement(d)) {
            if (d.type === ce)
              return o.cloneElement(d, {
                isOpen: l,
                onToggle: () => c(!l)
              });
            if (d.type === me)
              return o.cloneElement(d, {
                isOpen: l
              });
          }
          return d;
        })
      }
    );
  }
);
Ia.displayName = "FAQItemCard";
const ce = o.forwardRef(
  ({ className: r, isOpen: e, onToggle: a, children: n, ...i }, l) => /* @__PURE__ */ m(
    "button",
    {
      ref: l,
      type: "button",
      onClick: a,
      className: s(
        "flex w-full items-center justify-between text-left font-medium text-foreground transition-colors hover:text-foreground/80",
        r
      ),
      "aria-expanded": e,
      ...i,
      children: [
        /* @__PURE__ */ t("span", { className: "pr-4", children: n }),
        /* @__PURE__ */ t(
          "svg",
          {
            className: s(
              "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
              e && "rotate-180"
            ),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" })
          }
        )
      ]
    }
  )
);
ce.displayName = "FAQQuestion";
const me = o.forwardRef(
  ({ className: r, isOpen: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "div",
    {
      ref: i,
      className: s(
        "grid transition-all duration-200",
        e ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      ),
      ...n,
      children: /* @__PURE__ */ t("div", { className: "overflow-hidden", children: /* @__PURE__ */ t("div", { className: s("pt-4 text-muted-foreground", r), children: a }) })
    }
  )
);
me.displayName = "FAQAnswer";
const Va = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mt-12 text-center",
      r
    ),
    ...e
  }
));
Va.displayName = "FAQContact";
const za = y("w-full", {
  variants: {
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), Ea = o.forwardRef(
  ({ className: r, size: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "section",
    {
      ref: i,
      className: s(za({ size: e }), r),
      ...n,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: a })
    }
  )
);
Ea.displayName = "ComparisonSection";
const Pa = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mb-12 text-center", r),
    ...e
  }
));
Pa.displayName = "ComparisonHeader";
const _a = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-3xl font-bold tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl",
      r
    ),
    ...e
  }
));
_a.displayName = "ComparisonTitle";
const Da = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s(
      "mx-auto mt-4 max-w-2xl text-lg text-[var(--foregrounds-tertiary)]",
      r
    ),
    ...e
  }
));
Da.displayName = "ComparisonDescription";
const ja = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("overflow-x-auto", r),
    ...e
  }
));
ja.displayName = "ComparisonTable";
const Ha = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "table",
  {
    ref: a,
    className: s("w-full border-collapse text-center", r),
    ...e
  }
));
Ha.displayName = "ComparisonTableInner";
const qa = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("thead", { ref: a, className: s("", r), ...e }));
qa.displayName = "ComparisonTableHead";
const Ga = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "tbody",
  {
    ref: a,
    className: s("[&>tr:nth-child(even)]:bg-[var(--backgrounds-secondary)]", r),
    ...e
  }
));
Ga.displayName = "ComparisonTableBody";
const $a = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("tr", { ref: a, className: s("", r), ...e }));
$a.displayName = "ComparisonTableRow";
const Qa = y(
  "px-4 py-4 text-sm font-medium text-center",
  {
    variants: {
      highlight: {
        true: "bg-[var(--interactive-bg-alt2)]/30",
        false: ""
      }
    },
    defaultVariants: {
      highlight: !1
    }
  }
), Ua = o.forwardRef(({ className: r, highlight: e, ...a }, n) => /* @__PURE__ */ t(
  "th",
  {
    ref: n,
    className: s(Qa({ highlight: e }), r),
    ...a
  }
));
Ua.displayName = "ComparisonHeaderCell";
const Wa = y("px-4 py-4 text-sm text-center", {
  variants: {
    highlight: {
      true: "bg-[var(--interactive-bg-alt2)]/30",
      false: ""
    }
  },
  defaultVariants: {
    highlight: !1
  }
}), Oa = o.forwardRef(({ className: r, highlight: e, ...a }, n) => /* @__PURE__ */ t(
  "td",
  {
    ref: n,
    className: s(Wa({ highlight: e }), r),
    ...a
  }
));
Oa.displayName = "ComparisonCell";
const Xa = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "td",
  {
    ref: a,
    className: s(
      "px-4 py-4 text-sm font-medium text-[var(--foregrounds-primary)] text-left",
      r
    ),
    ...e
  }
));
Xa.displayName = "ComparisonFeatureCell";
const Ya = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "svg",
  {
    ref: a,
    className: s("mx-auto h-5 w-5 text-green-500", r),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    ...e,
    children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
  }
));
Ya.displayName = "ComparisonCheck";
const Ja = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "svg",
  {
    ref: a,
    className: s("mx-auto h-5 w-5 text-[var(--foregrounds-tertiary)]/40", r),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    ...e,
    children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
  }
));
Ja.displayName = "ComparisonX";
const Ka = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "svg",
  {
    ref: a,
    className: s("mx-auto h-5 w-5 text-[var(--foregrounds-tertiary)]/40", r),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    ...e,
    children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 12H4" })
  }
));
Ka.displayName = "ComparisonMinus";
const Za = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("text-center", r),
    ...e
  }
));
Za.displayName = "ComparisonPlanHeader";
const et = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("font-heading font-semibold text-[var(--foregrounds-primary)]", r),
    ...e
  }
));
et.displayName = "ComparisonPlanName";
const rt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mt-1 font-heading text-2xl font-bold text-[var(--foregrounds-primary)]", r),
    ...e
  }
));
rt.displayName = "ComparisonPlanPrice";
const at = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ t("tr", { ref: n, className: s("bg-muted/50", r), ...a, children: /* @__PURE__ */ t("td", { colSpan: 100, className: "px-4 py-3 text-sm font-semibold text-[var(--foregrounds-primary)]", children: e }) }));
at.displayName = "ComparisonCategory";
const we = y(
  "flex w-full gap-2",
  {
    variants: {
      layout: {
        inline: "flex-row items-center",
        stacked: "flex-col"
      },
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        full: "max-w-full"
      }
    },
    defaultVariants: {
      layout: "inline",
      size: "default"
    }
  }
), tt = o.forwardRef(
  ({
    className: r,
    layout: e,
    size: a,
    onSubmit: n,
    placeholder: i = "Enter your email",
    buttonText: l = "Subscribe",
    loading: c = !1,
    disabled: d = !1,
    helperText: f,
    successMessage: p,
    errorMessage: g,
    ...h
  }, x) => {
    const [v, N] = o.useState(""), [w, C] = o.useState("idle"), R = async (A) => {
      if (A.preventDefault(), !(!v || !n)) {
        C("loading");
        try {
          await n(v), C("success"), N("");
        } catch {
          C("error");
        }
      }
    }, L = c || w === "loading", M = d || L;
    return /* @__PURE__ */ m("div", { className: s("w-full", a !== "full" && we({ size: a })), children: [
      /* @__PURE__ */ m(
        "form",
        {
          ref: x,
          onSubmit: R,
          className: s(we({ layout: e, size: "full" }), r),
          ...h,
          children: [
            /* @__PURE__ */ t(
              Ye,
              {
                type: "email",
                value: v,
                onChange: (A) => N(A.target.value),
                placeholder: i,
                disabled: M,
                required: !0,
                className: s(e === "inline" && "flex-1")
              }
            ),
            /* @__PURE__ */ t(
              de,
              {
                type: "submit",
                disabled: M,
                className: s(e === "stacked" && "w-full"),
                children: L ? /* @__PURE__ */ m("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ m(
                    "svg",
                    {
                      className: "h-4 w-4 animate-spin",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      children: [
                        /* @__PURE__ */ t(
                          "circle",
                          {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4"
                          }
                        ),
                        /* @__PURE__ */ t(
                          "path",
                          {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          }
                        )
                      ]
                    }
                  ),
                  "Loading..."
                ] }) : l
              }
            )
          ]
        }
      ),
      f && w === "idle" && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-[var(--foregrounds-tertiary)]", children: f }),
      w === "success" && p && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-[var(--positive-fg)]", children: p }),
      w === "error" && g && /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-destructive", children: g })
    ] });
  }
);
tt.displayName = "EmailForm";
const ot = y("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      primary: "bg-primary text-primary-foreground",
      gradient: "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)]",
      dark: "bg-zinc-900 text-white",
      card: "bg-background"
    },
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), st = o.forwardRef(
  ({ className: r, variant: e, size: a, children: n, ...i }, l) => {
    const c = e === "card";
    return /* @__PURE__ */ t(
      "section",
      {
        ref: l,
        className: s(ot({ variant: e, size: a }), r),
        ...i,
        children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: c ? /* @__PURE__ */ t("div", { className: "mx-auto max-w-2xl rounded-2xl border bg-card p-8 shadow-sm md:p-12", children: n }) : /* @__PURE__ */ t("div", { className: "mx-auto max-w-2xl text-center", children: n }) })
      }
    );
  }
);
st.displayName = "Newsletter";
const nt = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ t(
  "div",
  {
    ref: n,
    className: s(
      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary",
      r
    ),
    ...a,
    children: e || /* @__PURE__ */ t(
      "svg",
      {
        className: "h-6 w-6",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ t(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          }
        )
      }
    )
  }
));
nt.displayName = "NewsletterIcon";
const it = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-2xl font-bold tracking-tight sm:text-3xl",
      r
    ),
    ...e
  }
));
it.displayName = "NewsletterTitle";
const lt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mt-4 text-lg opacity-90", r),
    ...e
  }
));
lt.displayName = "NewsletterDescription";
const dt = o.forwardRef(
  ({ className: r, ...e }, a) => /* @__PURE__ */ t(
    "form",
    {
      ref: a,
      className: s(
        "mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4",
        r
      ),
      ...e
    }
  )
);
dt.displayName = "NewsletterForm";
const ct = o.forwardRef(
  ({ className: r, ...e }, a) => /* @__PURE__ */ t(
    "input",
    {
      ref: a,
      type: "email",
      className: s(
        "flex-1 h-10 rounded-lg border border-[var(--interactive-border)] bg-[var(--interactive-bg)] px-4 text-sm text-[var(--foregrounds-primary)] placeholder:text-[var(--foregrounds-quinary)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-fg)] focus:border-[var(--interactive-fg)]",
        r
      ),
      ...e
    }
  )
);
ct.displayName = "NewsletterInput";
const mt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mt-4 text-xs opacity-70", r),
    ...e
  }
));
mt.displayName = "NewsletterDisclaimer";
const ft = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mt-8 flex items-center justify-center gap-2 text-[var(--positive-fg)]",
      r
    ),
    ...e
  }
));
ft.displayName = "NewsletterSuccess";
const ut = y("w-full", {
  variants: {
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), pt = o.forwardRef(
  ({ className: r, size: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "section",
    {
      ref: i,
      className: s(ut({ size: e }), r),
      ...n,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: a })
    }
  )
);
pt.displayName = "ContactSection";
const gt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "grid gap-12 lg:grid-cols-2",
      r
    ),
    ...e
  }
));
gt.displayName = "ContactContent";
const vt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("flex flex-col justify-center space-y-8", r), ...e }));
vt.displayName = "ContactInfo";
const xt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("space-y-4", r), ...e }));
xt.displayName = "ContactHeader";
const ht = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-3xl font-semibold tracking-tight text-[var(--foregrounds-primary)] sm:text-4xl",
      r
    ),
    ...e
  }
));
ht.displayName = "ContactTitle";
const yt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("text-lg text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
yt.displayName = "ContactDescription";
const Nt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("space-y-4", r), ...e }));
Nt.displayName = "ContactDetails";
const bt = o.forwardRef(
  ({ className: r, icon: e, label: a, value: n, href: i, ...l }, c) => /* @__PURE__ */ m(
    "div",
    {
      ref: c,
      className: s("flex items-start gap-4", r),
      ...l,
      children: [
        e && /* @__PURE__ */ t("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-secondary)]", children: e }),
        /* @__PURE__ */ m("div", { children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-medium text-[var(--foregrounds-tertiary)]", children: a }),
          i ? /* @__PURE__ */ t(
            "a",
            {
              href: i,
              className: "text-[var(--foregrounds-primary)] hover:text-[var(--action-primary-bg)] hover:underline",
              children: n
            }
          ) : /* @__PURE__ */ t("p", { className: "text-[var(--foregrounds-primary)]", children: n })
        ] })
      ]
    }
  )
);
bt.displayName = "ContactDetailItem";
const wt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("flex gap-3", r), ...e }));
wt.displayName = "ContactSocials";
const Ct = o.forwardRef(
  ({ className: r, label: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "a",
    {
      ref: i,
      "aria-label": e,
      className: s(
        "flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-tertiary)] transition-colors hover:bg-[var(--action-primary-bg)] hover:text-[var(--action-primary-fg)]",
        r
      ),
      ...n,
      children: a
    }
  )
);
Ct.displayName = "ContactSocialLink";
const Rt = y("space-y-6", {
  variants: {
    variant: {
      default: "",
      card: "rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-6 md:p-8"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), kt = o.forwardRef(
  ({ className: r, variant: e, ...a }, n) => /* @__PURE__ */ t(
    "form",
    {
      ref: n,
      className: s(Rt({ variant: e }), r),
      ...a
    }
  )
);
kt.displayName = "ContactForm";
const St = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("grid gap-4 sm:grid-cols-2", r),
    ...e
  }
));
St.displayName = "ContactFormRow";
const Tt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("space-y-2", r), ...e }));
Tt.displayName = "ContactFormField";
const At = o.forwardRef(({ className: r, required: e, children: a, ...n }, i) => /* @__PURE__ */ m(
  "label",
  {
    ref: i,
    className: s("text-sm font-medium text-[var(--foregrounds-primary)]", r),
    ...n,
    children: [
      a,
      e && /* @__PURE__ */ t("span", { className: "ml-1 text-[var(--negative-fg)]", children: "*" })
    ]
  }
));
At.displayName = "ContactFormLabel";
const Bt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "input",
  {
    ref: a,
    className: s(
      "flex h-10 w-full rounded-lg border border-[var(--container-border)] bg-[var(--container-bg)] px-3 py-2 text-sm text-[var(--foregrounds-primary)] placeholder:text-[var(--foregrounds-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50",
      r
    ),
    ...e
  }
));
Bt.displayName = "ContactFormInput";
const Ft = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "textarea",
  {
    ref: a,
    className: s(
      "flex min-h-[120px] w-full rounded-lg border border-[var(--container-border)] bg-[var(--container-bg)] px-3 py-2 text-sm text-[var(--foregrounds-primary)] placeholder:text-[var(--foregrounds-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50",
      r
    ),
    ...e
  }
));
Ft.displayName = "ContactFormTextarea";
const Lt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "select",
  {
    ref: a,
    className: s(
      "flex h-10 w-full rounded-lg border border-[var(--container-border)] bg-[var(--container-bg)] px-3 py-2 text-sm text-[var(--foregrounds-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-50",
      r
    ),
    ...e
  }
));
Lt.displayName = "ContactFormSelect";
const Mt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("text-sm text-[var(--negative-fg)]", r),
    ...e
  }
));
Mt.displayName = "ContactFormError";
const It = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "flex items-center gap-2 rounded-lg bg-[var(--positive-bg)] p-4 text-[var(--positive-fg)]",
      r
    ),
    ...e
  }
));
It.displayName = "ContactFormSuccess";
const Vt = o.forwardRef(
  ({
    className: r,
    logo: e,
    items: a = [],
    actions: n,
    sticky: i = !1,
    transparent: l = !1,
    mobileBreakpoint: c = "md",
    ...d
  }, f) => {
    const [p, g] = o.useState(!1), h = {
      sm: {
        desktop: "hidden sm:flex",
        mobile: "sm:hidden"
      },
      md: {
        desktop: "hidden md:flex",
        mobile: "md:hidden"
      },
      lg: {
        desktop: "hidden lg:flex",
        mobile: "lg:hidden"
      }
    }, x = (v, N = !1) => {
      const w = N ? "block w-full px-4 py-2 text-base font-medium text-[var(--foregrounds-primary)] hover:bg-[var(--backgrounds-tertiary)] rounded-lg transition-colors" : "relative px-3 py-1.5 text-sm font-medium text-[var(--foregrounds-tertiary)] hover:text-[var(--foregrounds-primary)] transition-colors rounded-full", C = N ? "bg-[var(--backgrounds-tertiary)]" : "bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-primary)]";
      return v.href ? /* @__PURE__ */ t(
        "a",
        {
          href: v.href,
          className: s(
            w,
            v.active && C
          ),
          onClick: () => N && g(!1),
          children: v.label
        },
        v.label
      ) : /* @__PURE__ */ t(
        "button",
        {
          onClick: () => {
            var R;
            (R = v.onClick) == null || R.call(v), N && g(!1);
          },
          className: s(
            w,
            "cursor-pointer text-left",
            v.active && C
          ),
          children: v.label
        },
        v.label
      );
    };
    return /* @__PURE__ */ t(
      "header",
      {
        ref: f,
        className: s(
          "w-full border-b border-[var(--container-border)] bg-[var(--container-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--container-bg)]/60",
          i && "sticky top-0 z-50",
          l && "border-transparent bg-transparent",
          r
        ),
        ...d,
        children: /* @__PURE__ */ m("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center", children: e }),
          /* @__PURE__ */ t("nav", { className: s("items-center gap-1", h[c].desktop), children: a.map((v) => x(v)) }),
          /* @__PURE__ */ t("div", { className: s("items-center gap-4", h[c].desktop), children: n }),
          /* @__PURE__ */ t("div", { className: h[c].mobile, children: /* @__PURE__ */ m(Je, { open: p, onOpenChange: g, children: [
            /* @__PURE__ */ t(Ke, { asChild: !0, children: /* @__PURE__ */ m(de, { variant: "ghost", size: "icon", children: [
              /* @__PURE__ */ t(Qe, { className: "h-5 w-5" }),
              /* @__PURE__ */ t("span", { className: "sr-only", children: "Toggle menu" })
            ] }) }),
            /* @__PURE__ */ t(Ze, { side: "right", className: "w-[300px] border-l border-[var(--container-border)] bg-[var(--container-bg)] sm:w-[400px]", children: /* @__PURE__ */ m("div", { className: "flex flex-col gap-6 pt-6", children: [
              /* @__PURE__ */ t("nav", { className: "flex flex-col gap-1", children: a.map((v) => x(v, !0)) }),
              n && /* @__PURE__ */ t("div", { className: "flex flex-col gap-2 border-t border-[var(--container-border)] pt-6", children: n })
            ] }) })
          ] }) })
        ] })
      }
    );
  }
);
Vt.displayName = "HeaderNavigation";
const zt = y("w-full border-t bg-background", {
  variants: {
    size: {
      sm: "py-8",
      default: "py-12",
      lg: "py-16"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), Et = o.forwardRef(
  ({ className: r, size: e, children: a, ...n }, i) => /* @__PURE__ */ t(
    "footer",
    {
      ref: i,
      className: s(zt({ size: e }), r),
      ...n,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: a })
    }
  )
);
Et.displayName = "Footer";
const Pt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "grid gap-8 md:grid-cols-2 lg:grid-cols-4",
      r
    ),
    ...e
  }
));
Pt.displayName = "FooterContent";
const _t = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("space-y-4", r), ...e }));
_t.displayName = "FooterSection";
const Dt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h3",
  {
    ref: a,
    className: s("font-heading text-sm font-semibold uppercase tracking-wider text-foreground", r),
    ...e
  }
));
Dt.displayName = "FooterTitle";
const jt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("ul", { ref: a, className: s("space-y-2", r), ...e }));
jt.displayName = "FooterLinks";
const Ht = o.forwardRef(
  ({ className: r, ...e }, a) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
    "a",
    {
      ref: a,
      className: s(
        "text-sm text-muted-foreground transition-colors hover:text-foreground",
        r
      ),
      ...e
    }
  ) })
);
Ht.displayName = "FooterLink";
const qt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row",
      r
    ),
    ...e
  }
));
qt.displayName = "FooterBottom";
const Gt = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("text-sm text-muted-foreground", r),
    ...e
  }
));
Gt.displayName = "FooterCopyright";
const $t = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex items-center gap-4", r),
    ...e
  }
));
$t.displayName = "FooterSocial";
const Qt = o.forwardRef(({ className: r, label: e, children: a, ...n }, i) => /* @__PURE__ */ t(
  "a",
  {
    ref: i,
    "aria-label": e,
    className: s(
      "text-muted-foreground transition-colors hover:text-foreground",
      r
    ),
    ...n,
    children: a
  }
));
Qt.displayName = "FooterSocialLink";
const Ut = y(
  "relative w-full px-4 py-2 text-center text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-black",
        error: "bg-red-500 text-white",
        gradient: "bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white",
        dark: "bg-zinc-900 text-white"
      },
      size: {
        sm: "py-1.5 text-xs",
        default: "py-2 text-sm",
        lg: "py-3 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), fe = o.forwardRef(
  ({
    className: r,
    variant: e,
    size: a,
    dismissible: n = !0,
    onDismiss: i,
    isVisible: l = !0,
    href: c,
    icon: d,
    children: f,
    ...p
  }, g) => {
    const [h, x] = o.useState(l);
    if (o.useEffect(() => {
      x(l);
    }, [l]), !h) return null;
    const v = () => {
      x(!1), i == null || i();
    }, N = /* @__PURE__ */ m(Ce, { children: [
      d && /* @__PURE__ */ t("span", { className: "mr-2 inline-flex", children: d }),
      f
    ] });
    return /* @__PURE__ */ t(
      "div",
      {
        ref: g,
        className: s(Ut({ variant: e, size: a }), r),
        role: "banner",
        ...p,
        children: /* @__PURE__ */ m("div", { className: "container mx-auto flex items-center justify-center", children: [
          c ? /* @__PURE__ */ m(
            "a",
            {
              href: c,
              className: "flex items-center hover:underline",
              children: [
                N,
                /* @__PURE__ */ t(
                  "svg",
                  {
                    className: "ml-2 h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    children: /* @__PURE__ */ t(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M9 5l7 7-7 7"
                      }
                    )
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ t("span", { className: "flex items-center", children: N }),
          n && /* @__PURE__ */ t(
            "button",
            {
              onClick: v,
              className: "absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100",
              "aria-label": "Dismiss announcement",
              children: /* @__PURE__ */ t(
                "svg",
                {
                  className: "h-4 w-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  children: /* @__PURE__ */ t(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                }
              )
            }
          )
        ] })
      }
    );
  }
);
fe.displayName = "AnnouncementBar";
const Wt = o.forwardRef(
  ({
    messages: r,
    interval: e = 5e3,
    className: a,
    variant: n,
    size: i,
    dismissible: l,
    onDismiss: c,
    icon: d,
    ...f
  }, p) => {
    const [g, h] = o.useState(0);
    o.useEffect(() => {
      if (r.length <= 1) return;
      const v = setInterval(() => {
        h((N) => (N + 1) % r.length);
      }, e);
      return () => clearInterval(v);
    }, [r.length, e]);
    const x = r[g];
    return /* @__PURE__ */ t(
      fe,
      {
        ref: p,
        className: a,
        variant: n,
        size: i,
        dismissible: l,
        onDismiss: c,
        href: x == null ? void 0 : x.href,
        icon: d,
        ...f,
        children: /* @__PURE__ */ t("span", { className: "animate-fade-in", children: x == null ? void 0 : x.text })
      }
    );
  }
);
Wt.displayName = "RotatingAnnouncementBar";
const Ot = o.forwardRef(
  ({
    targetDate: r,
    prefix: e = "Sale ends in",
    suffix: a,
    onComplete: n,
    className: i,
    variant: l,
    size: c,
    dismissible: d,
    onDismiss: f,
    href: p,
    icon: g,
    ...h
  }, x) => {
    const [v, N] = o.useState("");
    return o.useEffect(() => {
      const w = () => {
        const R = r.getTime() - (/* @__PURE__ */ new Date()).getTime();
        if (R <= 0)
          return n == null || n(), "00:00:00";
        const L = Math.floor(R / (1e3 * 60 * 60)), M = Math.floor(R / (1e3 * 60) % 60), A = Math.floor(R / 1e3 % 60);
        return `${String(L).padStart(2, "0")}:${String(M).padStart(2, "0")}:${String(A).padStart(2, "0")}`;
      };
      N(w());
      const C = setInterval(() => {
        N(w());
      }, 1e3);
      return () => clearInterval(C);
    }, [r, n]), /* @__PURE__ */ m(
      fe,
      {
        ref: x,
        className: i,
        variant: l,
        size: c,
        dismissible: d,
        onDismiss: f,
        href: p,
        icon: g,
        ...h,
        children: [
          e,
          " ",
          /* @__PURE__ */ t("span", { className: "mx-2 font-mono font-bold", children: v }),
          a
        ]
      }
    );
  }
);
Ot.displayName = "CountdownAnnouncementBar";
const Xt = y(
  "grid gap-6",
  {
    variants: {
      columns: {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      }
    },
    defaultVariants: {
      columns: 3
    }
  }
), Yt = o.forwardRef(
  ({ className: r, columns: e, options: a, ...n }, i) => /* @__PURE__ */ t(
    "div",
    {
      ref: i,
      className: s(Xt({ columns: e }), r),
      ...n,
      children: a.map((l) => /* @__PURE__ */ t(Te, { option: l }, l.id))
    }
  )
);
Yt.displayName = "PricingOptions";
const Te = o.forwardRef(
  ({ option: r }, e) => /* @__PURE__ */ m(
    "div",
    {
      ref: e,
      className: s(
        "relative flex flex-col rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-6",
        r.highlighted && "border-[var(--action-primary-bg)] shadow-md"
      ),
      children: [
        r.highlighted && r.highlightLabel && /* @__PURE__ */ t("span", { className: "absolute -top-3 right-4 inline-flex items-center rounded-full bg-[var(--action-primary-bg)] px-3 py-1 text-xs font-medium text-[var(--action-primary-fg)]", children: r.highlightLabel }),
        /* @__PURE__ */ m("div", { className: "mb-6 text-center", children: [
          /* @__PURE__ */ t("h3", { className: "font-heading text-lg font-semibold text-[var(--foregrounds-primary)]", children: r.name }),
          r.description && /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-[var(--foregrounds-tertiary)]", children: r.description }),
          /* @__PURE__ */ m("div", { className: "mt-4", children: [
            r.originalPrice && /* @__PURE__ */ t("span", { className: "mr-2 text-lg text-[var(--foregrounds-tertiary)] line-through", children: typeof r.originalPrice == "number" ? `$${r.originalPrice}` : r.originalPrice }),
            /* @__PURE__ */ t("span", { className: "font-heading text-4xl font-semibold text-[var(--foregrounds-primary)]", children: typeof r.price == "number" ? `$${r.price}` : r.price }),
            r.period && /* @__PURE__ */ m("span", { className: "text-sm text-[var(--foregrounds-tertiary)]", children: [
              "/",
              r.period
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("ul", { className: "mb-6 flex-1 space-y-3", children: r.features.map((a, n) => /* @__PURE__ */ m("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ t(ke, { className: "h-4 w-4 shrink-0 text-[var(--positive-fg)]" }),
          /* @__PURE__ */ t("span", { className: "text-sm text-[var(--foregrounds-secondary)]", children: a })
        ] }, n)) }),
        /* @__PURE__ */ t(
          de,
          {
            className: "w-full",
            variant: r.buttonVariant ?? (r.highlighted ? "default" : "outline"),
            disabled: r.disabled,
            onClick: r.onSelect,
            style: r.highlighted ? { backgroundColor: "var(--action-primary-bg)", color: "var(--action-primary-fg)" } : void 0,
            children: r.buttonText ?? "Get Started"
          }
        )
      ]
    }
  )
);
Te.displayName = "PricingCard";
const Jt = o.forwardRef(
  ({ className: r, plans: e, features: a, featureGroupTitle: n = "Features", ...i }, l) => {
    const c = (d) => typeof d == "boolean" ? d ? /* @__PURE__ */ t(ke, { className: "mx-auto h-5 w-5 text-[var(--positive-fg)]" }) : /* @__PURE__ */ t(Ue, { className: "mx-auto h-5 w-5 text-[var(--foregrounds-tertiary)]/40" }) : /* @__PURE__ */ t("span", { className: "text-sm", children: d });
    return /* @__PURE__ */ t("div", { ref: l, className: s("w-full overflow-auto", r), ...i, children: /* @__PURE__ */ m(er, { children: [
      /* @__PURE__ */ t(rr, { children: /* @__PURE__ */ m(ye, { children: [
        /* @__PURE__ */ t(Ne, { className: "w-[200px]", children: n }),
        e.map((d) => /* @__PURE__ */ t(
          Ne,
          {
            className: s(
              "text-center",
              d.highlighted && "bg-[var(--interactive-bg-alt2)]/20"
            ),
            children: /* @__PURE__ */ m("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ t("div", { className: "h-5 flex items-center justify-center", children: d.highlighted && /* @__PURE__ */ t("span", { className: "text-[10px] font-medium text-[var(--action-primary-bg)] uppercase tracking-wider", children: "Most Popular" }) }),
              /* @__PURE__ */ t("span", { className: "font-heading text-base font-semibold text-[var(--foregrounds-primary)]", children: d.name }),
              /* @__PURE__ */ m("div", { className: "font-heading text-2xl font-semibold text-[var(--foregrounds-primary)]", children: [
                typeof d.price == "number" ? `$${d.price}` : d.price,
                d.period && /* @__PURE__ */ m("span", { className: "text-sm font-normal text-[var(--foregrounds-tertiary)]", children: [
                  "/",
                  d.period
                ] })
              ] }),
              d.description && /* @__PURE__ */ t("span", { className: "text-xs text-[var(--foregrounds-quinary)]", children: d.description })
            ] })
          },
          d.id
        ))
      ] }) }),
      /* @__PURE__ */ t(ar, { children: a.map((d, f) => /* @__PURE__ */ m(ye, { children: [
        /* @__PURE__ */ t(be, { className: "font-medium", children: d.name }),
        e.map((p) => /* @__PURE__ */ t(
          be,
          {
            className: s(
              "text-center",
              p.highlighted && "bg-[var(--interactive-bg-alt2)]/20"
            ),
            children: c(d.values[p.id] ?? !1)
          },
          p.id
        ))
      ] }, f)) })
    ] }) });
  }
);
Jt.displayName = "PricingTable";
const Kt = y("grid gap-8", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    }
  },
  defaultVariants: {
    columns: 3
  }
}), Zt = o.forwardRef(
  ({ className: r, columns: e, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s(Kt({ columns: e }), r),
      ...a
    }
  )
);
Zt.displayName = "BlogGrid";
const eo = y(
  "group flex flex-col overflow-hidden rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] transition-colors",
  {
    variants: {
      variant: {
        default: "",
        bordered: "hover:border-[var(--action-primary-bg)]",
        elevated: "shadow-sm hover:border-[var(--action-primary-bg)]",
        minimal: "border-transparent bg-transparent"
      }
    },
    defaultVariants: {
      variant: "bordered"
    }
  }
), ro = o.forwardRef(
  ({ className: r, variant: e, href: a, children: n, ...i }, l) => /* @__PURE__ */ t(
    a ? "a" : "article",
    {
      ref: l,
      href: a,
      className: s(eo({ variant: e }), r),
      ...i,
      children: n
    }
  )
);
ro.displayName = "BlogCard";
const ao = o.forwardRef(
  ({ className: r, aspectRatio: e = "video", alt: a, ...n }, i) => /* @__PURE__ */ t(
    "div",
    {
      ref: i,
      className: s(
        "relative overflow-hidden bg-[var(--backgrounds-tertiary)]",
        e === "video" && "aspect-[16/9]",
        e === "square" && "aspect-square",
        e === "wide" && "aspect-[2/1]",
        r
      ),
      children: n.src && /* @__PURE__ */ t(
        "img",
        {
          alt: a,
          className: "h-full w-full rounded-lg object-cover",
          ...n
        }
      )
    }
  )
);
ao.displayName = "BlogCardImage";
const to = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex flex-1 flex-col p-4 md:p-6", r),
    ...e
  }
));
to.displayName = "BlogCardContent";
const oo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--foregrounds-tertiary)]",
      r
    ),
    ...e
  }
));
oo.displayName = "BlogCardMeta";
const so = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s(
      "text-xs font-medium uppercase tracking-wider text-[var(--action-primary-bg)]",
      r
    ),
    ...e
  }
));
so.displayName = "BlogCardCategory";
const no = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("time", { ref: a, className: s("text-[var(--foregrounds-tertiary)]", r), ...e }));
no.displayName = "BlogCardDate";
const io = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("span", { ref: a, className: s("text-[var(--foregrounds-tertiary)]", r), ...e }));
io.displayName = "BlogCardReadTime";
const lo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h3",
  {
    ref: a,
    className: s(
      "font-heading text-lg font-semibold leading-tight text-[var(--foregrounds-primary)]",
      r
    ),
    ...e
  }
));
lo.displayName = "BlogCardTitle";
const co = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s(
      "mt-2 line-clamp-2 text-sm text-[var(--foregrounds-tertiary)]",
      r
    ),
    ...e
  }
));
co.displayName = "BlogCardExcerpt";
const mo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "mt-auto flex items-center gap-3 pt-4",
      r
    ),
    ...e
  }
));
mo.displayName = "BlogCardFooter";
const fo = o.forwardRef(
  ({ className: r, ...e }, a) => /* @__PURE__ */ t(
    "div",
    {
      ref: a,
      className: s("flex items-center gap-3", r),
      ...e
    }
  )
);
fo.displayName = "BlogCardAuthor";
const uo = o.forwardRef(({ className: r, alt: e, fallback: a, ...n }, i) => /* @__PURE__ */ t(
  "div",
  {
    ref: i,
    className: s(
      "h-8 w-8 overflow-hidden rounded-full bg-[var(--backgrounds-tertiary)]",
      r
    ),
    children: n.src ? /* @__PURE__ */ t("img", { alt: e, className: "h-full w-full object-cover", ...n }) : /* @__PURE__ */ t("div", { className: "flex h-full w-full items-center justify-center text-sm font-medium text-[var(--foregrounds-tertiary)]", children: a || (e == null ? void 0 : e.charAt(0).toUpperCase()) })
  }
));
uo.displayName = "BlogCardAuthorAvatar";
const po = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s("text-sm font-medium text-[var(--foregrounds-primary)]", r),
    ...e
  }
));
po.displayName = "BlogCardAuthorName";
const go = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ m(
  "span",
  {
    ref: n,
    className: s(
      "ml-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--action-primary-bg)]",
      r
    ),
    ...a,
    children: [
      e || "Read more",
      /* @__PURE__ */ t(
        "svg",
        {
          className: "h-4 w-4",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          strokeWidth: 2,
          children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })
        }
      )
    ]
  }
));
go.displayName = "BlogCardLink";
const vo = o.forwardRef(({ className: r, href: e, children: a, ...n }, i) => /* @__PURE__ */ t(
  e ? "a" : "article",
  {
    ref: i,
    href: e,
    className: s(
      "group grid overflow-hidden rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] md:grid-cols-2",
      r
    ),
    ...n,
    children: a
  }
));
vo.displayName = "BlogCardFeatured";
const xo = y("grid gap-4", {
  variants: {
    columns: {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      auto: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
  },
  defaultVariants: {
    columns: "auto"
  }
}), ho = o.forwardRef(
  ({ className: r, columns: e, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s(xo({ columns: e }), r),
      ...a
    }
  )
);
ho.displayName = "BentoGrid";
const yo = y(
  "group relative overflow-hidden rounded-xl border border-[var(--container-border)] bg-[var(--container-bg)] p-6",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-transparent bg-[var(--backgrounds-secondary)]",
        dotted: [
          "border-transparent bg-[var(--backgrounds-secondary)]",
          "[background-image:radial-gradient(var(--backgrounds-quaternary)_1px,transparent_1px)]",
          "[background-size:16px_16px]"
        ].join(" "),
        grid: [
          "",
          "[background-image:linear-gradient(var(--container-border)_1px,transparent_1px),linear-gradient(to_right,var(--container-border)_1px,transparent_1px)]",
          "[background-size:40px_40px]"
        ].join(" ")
      },
      size: {
        default: "",
        lg: "p-8"
      },
      span: {
        1: "col-span-1",
        2: "col-span-1 md:col-span-2",
        3: "col-span-1 md:col-span-2 lg:col-span-3",
        full: "col-span-full"
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-1 md:row-span-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      span: 1,
      rowSpan: 1
    }
  }
), No = o.forwardRef(
  ({ className: r, variant: e, size: a, span: n, rowSpan: i, href: l, children: c, ...d }, f) => {
    const p = /* @__PURE__ */ t(
      "div",
      {
        ref: f,
        className: s(yo({ variant: e, size: a, span: n, rowSpan: i }), r),
        ...d,
        children: c
      }
    );
    return l ? /* @__PURE__ */ t("a", { href: l, className: "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-primary-bg)]", children: p }) : p;
  }
);
No.displayName = "BentoCard";
const bo = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ t(
  "div",
  {
    ref: n,
    className: s(
      "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--backgrounds-tertiary)] text-[var(--foregrounds-secondary)]",
      r
    ),
    ...a,
    children: e
  }
));
bo.displayName = "BentoCardIcon";
const wo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h3",
  {
    ref: a,
    className: s(
      "font-heading text-lg font-semibold text-[var(--foregrounds-primary)]",
      r
    ),
    ...e
  }
));
wo.displayName = "BentoCardTitle";
const Co = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mt-2 text-sm text-[var(--foregrounds-tertiary)]", r),
    ...e
  }
));
Co.displayName = "BentoCardDescription";
const Ro = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("mt-4", r), ...e }));
Ro.displayName = "BentoCardContent";
const ko = o.forwardRef(({ className: r, src: e, alt: a, children: n, ...i }, l) => /* @__PURE__ */ t(
  "div",
  {
    ref: l,
    className: s(
      "absolute inset-0 -z-10 opacity-10",
      r
    ),
    ...i,
    children: e ? /* @__PURE__ */ t("img", { src: e, alt: a || "", className: "h-full w-full object-cover" }) : n
  }
));
ko.displayName = "BentoCardImage";
const So = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "span",
  {
    ref: a,
    className: s(
      "absolute right-4 top-4 inline-flex items-center rounded-full bg-[var(--action-primary-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--action-primary-fg)]",
      r
    ),
    ...e
  }
));
So.displayName = "BentoCardBadge";
const To = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ m(
  "div",
  {
    ref: n,
    className: s(
      "mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--action-primary-bg)]",
      r
    ),
    ...a,
    children: [
      e || "Learn more",
      /* @__PURE__ */ t(
        "svg",
        {
          className: "h-4 w-4",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          strokeWidth: 2,
          children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })
        }
      )
    ]
  }
));
To.displayName = "BentoCardLink";
const Ao = o.forwardRef(({ className: r, layout: e = "default", ...a }, n) => /* @__PURE__ */ t(
  "div",
  {
    ref: n,
    className: s("grid gap-4", {
      default: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      asymmetric: "grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
      featured: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(200px,1fr)]"
    }[e], r),
    ...a
  }
));
Ao.displayName = "BentoGridPreset";
const Bo = y("flex items-center gap-3", {
  variants: {
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), Fo = o.forwardRef(
  ({ className: r, size: e, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s(Bo({ size: e }), r),
      ...a
    }
  )
);
Fo.displayName = "SocialProof";
const Lo = o.forwardRef(
  ({ className: r, max: e = 5, total: a, size: n = "default", children: i, ...l }, c) => {
    const d = {
      sm: "h-6 w-6 -ml-2 first:ml-0",
      default: "h-8 w-8 -ml-3 first:ml-0",
      lg: "h-10 w-10 -ml-4 first:ml-0"
    }, f = o.Children.toArray(i), p = f.slice(0, e), g = a ? a - e : f.length - e;
    return /* @__PURE__ */ m(
      "div",
      {
        ref: c,
        className: s("flex items-center", r),
        ...l,
        children: [
          p.map((h, x) => /* @__PURE__ */ t(
            "div",
            {
              className: s(
                "relative inline-block overflow-hidden rounded-full border-2 border-[var(--container-bg)] bg-[var(--backgrounds-tertiary)]",
                d[n]
              ),
              style: { zIndex: e - x },
              children: h
            },
            x
          )),
          g > 0 && /* @__PURE__ */ m(
            "div",
            {
              className: s(
                "relative inline-flex items-center justify-center rounded-full border-2 border-[var(--container-bg)] bg-[var(--backgrounds-tertiary)] text-xs font-medium text-[var(--foregrounds-tertiary)]",
                d[n]
              ),
              children: [
                "+",
                g
              ]
            }
          )
        ]
      }
    );
  }
);
Lo.displayName = "AvatarStack";
const Mo = o.forwardRef(
  ({
    className: r,
    rating: e,
    reviewCount: a,
    size: n = "default",
    showValue: i = !0,
    ...l
  }, c) => {
    const d = {
      sm: "h-3 w-3",
      default: "h-4 w-4",
      lg: "h-5 w-5"
    }, f = Math.floor(e), p = e % 1 >= 0.5, g = 5 - f - (p ? 1 : 0);
    return /* @__PURE__ */ m(
      "div",
      {
        ref: c,
        className: s("flex items-center gap-1", r),
        ...l,
        children: [
          /* @__PURE__ */ m("div", { className: "flex gap-0.5", children: [
            Array.from({ length: f }).map((h, x) => /* @__PURE__ */ t(
              "svg",
              {
                className: s(d[n], "text-[var(--cautionary-main)]"),
                fill: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ t("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
              },
              `full-${x}`
            )),
            p && /* @__PURE__ */ m(
              "svg",
              {
                className: s(d[n], "text-[var(--cautionary-main)]"),
                fill: "currentColor",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ m("linearGradient", { id: "half-star", children: [
                    /* @__PURE__ */ t("stop", { offset: "50%", stopColor: "currentColor" }),
                    /* @__PURE__ */ t("stop", { offset: "50%", stopColor: "var(--backgrounds-tertiary)" })
                  ] }) }),
                  /* @__PURE__ */ t(
                    "path",
                    {
                      fill: "url(#half-star)",
                      d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    }
                  )
                ]
              }
            ),
            Array.from({ length: g }).map((h, x) => /* @__PURE__ */ t(
              "svg",
              {
                className: s(d[n], "text-[var(--backgrounds-quaternary)]"),
                fill: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ t("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
              },
              `empty-${x}`
            ))
          ] }),
          i && /* @__PURE__ */ t("span", { className: "font-medium text-[var(--foregrounds-primary)]", children: e.toFixed(1) }),
          a !== void 0 && /* @__PURE__ */ m("span", { className: "text-[var(--foregrounds-tertiary)]", children: [
            "(",
            a.toLocaleString(),
            " reviews)"
          ] })
        ]
      }
    );
  }
);
Mo.displayName = "StarRating";
const Io = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex flex-wrap items-center gap-4", r),
    ...e
  }
));
Io.displayName = "TrustBadges";
const Vo = o.forwardRef(
  ({ className: r, icon: e, label: a, ...n }, i) => /* @__PURE__ */ m(
    "div",
    {
      ref: i,
      className: s(
        "flex items-center gap-2 text-sm text-[var(--foregrounds-tertiary)]",
        r
      ),
      ...n,
      children: [
        e || /* @__PURE__ */ t(
          "svg",
          {
            className: "h-4 w-4 text-[var(--positive-fg)]",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: /* @__PURE__ */ t(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              }
            )
          }
        ),
        /* @__PURE__ */ t("span", { children: a })
      ]
    }
  )
);
Vo.displayName = "TrustBadge";
const zo = o.forwardRef(
  ({
    className: r,
    count: e,
    label: a = "happy customers",
    size: n = "default",
    ...i
  }, l) => /* @__PURE__ */ m(
    "div",
    {
      ref: l,
      className: s("flex items-center gap-2", {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg"
      }[n], r),
      ...i,
      children: [
        /* @__PURE__ */ m("span", { className: "font-semibold text-[var(--foregrounds-primary)]", children: [
          e.toLocaleString(),
          "+"
        ] }),
        /* @__PURE__ */ t("span", { className: "text-[var(--foregrounds-tertiary)]", children: a })
      ]
    }
  )
);
zo.displayName = "CustomerCount";
const Eo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "flex flex-wrap items-center justify-center gap-6 border-y border-[var(--container-border)] bg-[var(--backgrounds-secondary)] py-4 md:gap-12",
      r
    ),
    ...e
  }
));
Eo.displayName = "SocialProofBanner";
const Po = o.forwardRef(
  ({ className: r, title: e = "Featured in", children: a, ...n }, i) => /* @__PURE__ */ m(
    "div",
    {
      ref: i,
      className: s("text-center", r),
      ...n,
      children: [
        /* @__PURE__ */ t("p", { className: "mb-6 text-xs font-medium uppercase tracking-widest text-[var(--foregrounds-tertiary)]", children: e }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale", children: a })
      ]
    }
  )
);
Po.displayName = "FeaturedIn";
const ue = y(
  "relative overflow-hidden bg-black",
  {
    variants: {
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl"
      },
      aspectRatio: {
        video: "aspect-video",
        square: "aspect-square",
        "4/3": "aspect-[4/3]",
        "21/9": "aspect-[21/9]",
        auto: ""
      }
    },
    defaultVariants: {
      rounded: "lg",
      aspectRatio: "video"
    }
  }
), Ae = o.forwardRef(
  ({
    className: r,
    containerClassName: e,
    rounded: a,
    aspectRatio: n,
    src: i,
    poster: l,
    showControls: c = !0,
    showPlayButton: d = !0,
    autoPlay: f = !1,
    muted: p = !1,
    loop: g = !1,
    playsInline: h = !0,
    ...x
  }, v) => {
    const N = o.useRef(null), [w, C] = o.useState(f), [R, L] = o.useState(!f), M = o.useCallback(
      (F) => {
        N.current = F, typeof v == "function" ? v(F) : v && (v.current = F);
      },
      [v]
    ), A = () => {
      N.current && (N.current.play(), C(!0), L(!1));
    }, H = () => {
      N.current && (N.current.pause(), C(!1));
    }, B = () => {
      w ? H() : A();
    };
    return /* @__PURE__ */ m(
      "div",
      {
        className: s(
          ue({ rounded: a, aspectRatio: n }),
          e
        ),
        children: [
          /* @__PURE__ */ t(
            "video",
            {
              ref: M,
              src: i,
              poster: l,
              autoPlay: f,
              muted: p,
              loop: g,
              playsInline: h,
              controls: c && w,
              onClick: B,
              onEnded: () => C(!1),
              className: s("h-full w-full object-cover", r),
              ...x
            }
          ),
          d && R && /* @__PURE__ */ t(
            "button",
            {
              onClick: A,
              className: "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40",
              "aria-label": "Play video",
              children: /* @__PURE__ */ t("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform hover:scale-110 md:h-20 md:w-20", children: /* @__PURE__ */ t(
                "svg",
                {
                  className: "ml-1 h-8 w-8 md:h-10 md:w-10",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ t("path", { d: "M8 5v14l11-7z" })
                }
              ) })
            }
          )
        ]
      }
    );
  }
);
Ae.displayName = "VideoPlayer";
const _o = o.forwardRef(
  ({
    className: r,
    containerClassName: e,
    rounded: a,
    aspectRatio: n,
    videoId: i,
    autoPlay: l = !1,
    title: c = "YouTube video",
    ...d
  }, f) => {
    const [p, g] = o.useState(!1);
    return /* @__PURE__ */ m(
      "div",
      {
        className: s(
          ue({ rounded: a, aspectRatio: n }),
          e
        ),
        children: [
          !p && /* @__PURE__ */ t(
            "button",
            {
              onClick: () => g(!0),
              className: "absolute inset-0 flex items-center justify-center",
              style: {
                backgroundImage: `url(https://img.youtube.com/vi/${i}/maxresdefault.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              },
              "aria-label": "Play YouTube video",
              children: /* @__PURE__ */ t("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 md:h-20 md:w-20", children: /* @__PURE__ */ t(
                "svg",
                {
                  className: "ml-1 h-8 w-8 md:h-10 md:w-10",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ t("path", { d: "M8 5v14l11-7z" })
                }
              ) })
            }
          ),
          p && /* @__PURE__ */ t(
            "iframe",
            {
              ref: f,
              src: `https://www.youtube.com/embed/${i}?autoplay=${l ? 1 : 0}&rel=0`,
              title: c,
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              className: s("h-full w-full", r),
              ...d
            }
          )
        ]
      }
    );
  }
);
_o.displayName = "YouTubeEmbed";
const Do = o.forwardRef(
  ({
    className: r,
    containerClassName: e,
    rounded: a,
    aspectRatio: n,
    videoId: i,
    autoPlay: l = !1,
    title: c = "Vimeo video",
    ...d
  }, f) => /* @__PURE__ */ t(
    "div",
    {
      className: s(
        ue({ rounded: a, aspectRatio: n }),
        e
      ),
      children: /* @__PURE__ */ t(
        "iframe",
        {
          ref: f,
          src: `https://player.vimeo.com/video/${i}?autoplay=${l ? 1 : 0}`,
          title: c,
          allow: "autoplay; fullscreen; picture-in-picture",
          allowFullScreen: !0,
          className: s("h-full w-full", r),
          ...d
        }
      )
    }
  )
);
Do.displayName = "VimeoEmbed";
const jo = o.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ src: r, isOpen: e, onClose: a, title: n = "Video" }, i) => (o.useEffect(() => {
    const l = (c) => {
      c.key === "Escape" && a();
    };
    return e && (document.addEventListener("keydown", l), document.body.style.overflow = "hidden"), () => {
      document.removeEventListener("keydown", l), document.body.style.overflow = "";
    };
  }, [e, a]), e ? /* @__PURE__ */ t(
    "div",
    {
      ref: i,
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",
      onClick: a,
      children: /* @__PURE__ */ m(
        "div",
        {
          className: "relative w-full max-w-4xl",
          onClick: (l) => l.stopPropagation(),
          children: [
            /* @__PURE__ */ t(
              "button",
              {
                onClick: a,
                className: "absolute -top-12 right-0 text-white hover:text-gray-300",
                "aria-label": "Close video",
                children: /* @__PURE__ */ t(
                  "svg",
                  {
                    className: "h-8 w-8",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    children: /* @__PURE__ */ t(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ t(
              Ae,
              {
                src: r,
                autoPlay: !0,
                showPlayButton: !1,
                className: "w-full"
              }
            )
          ]
        }
      )
    }
  ) : null)
);
jo.displayName = "VideoModal";
const Be = y("relative overflow-hidden bg-muted", {
  variants: {
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl"
    },
    aspectRatio: {
      auto: "",
      video: "aspect-video",
      square: "aspect-square",
      "4/3": "aspect-[4/3]",
      "3/2": "aspect-[3/2]"
    }
  },
  defaultVariants: {
    rounded: "lg",
    aspectRatio: "video"
  }
}), Ho = o.forwardRef(
  ({
    className: r,
    containerClassName: e,
    rounded: a,
    aspectRatio: n,
    apiKey: i,
    query: l,
    zoom: c = 15,
    mapType: d = "roadmap",
    title: f = "Google Map",
    ...p
  }, g) => {
    const h = encodeURIComponent(l), x = i ? `https://www.google.com/maps/embed/v1/place?key=${i}&q=${h}&zoom=${c}&maptype=${d}` : `https://maps.google.com/maps?q=${h}&t=&z=${c}&ie=UTF8&iwloc=&output=embed`;
    return /* @__PURE__ */ t(
      "div",
      {
        className: s(
          Be({ rounded: a, aspectRatio: n }),
          e
        ),
        children: /* @__PURE__ */ t(
          "iframe",
          {
            ref: g,
            src: x,
            title: f,
            allowFullScreen: !0,
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            className: s("h-full w-full border-0", r),
            ...p
          }
        )
      }
    );
  }
);
Ho.displayName = "GoogleMapEmbed";
const qo = o.forwardRef(
  ({
    className: r,
    containerClassName: e,
    rounded: a,
    aspectRatio: n,
    lat: i,
    lng: l,
    zoom: c = 15,
    marker: d,
    title: f = "OpenStreetMap",
    ...p
  }, g) => {
    const h = Go(i, l, c), x = d ? `&marker=${i}%2C${l}` : "", v = `https://www.openstreetmap.org/export/embed.html?bbox=${h.west}%2C${h.south}%2C${h.east}%2C${h.north}&layer=mapnik${x}`;
    return /* @__PURE__ */ t(
      "div",
      {
        className: s(
          Be({ rounded: a, aspectRatio: n }),
          e
        ),
        children: /* @__PURE__ */ t(
          "iframe",
          {
            ref: g,
            src: v,
            title: f,
            loading: "lazy",
            className: s("h-full w-full border-0", r),
            ...p
          }
        )
      }
    );
  }
);
qo.displayName = "OpenStreetMapEmbed";
function Go(r, e, a) {
  const n = 0.01 * (20 - a);
  return {
    west: e - n,
    east: e + n,
    north: r + n,
    south: r - n
  };
}
const $o = o.forwardRef(
  ({
    className: r,
    address: e,
    phone: a,
    email: n,
    hours: i,
    directionsUrl: l,
    children: c,
    ...d
  }, f) => /* @__PURE__ */ m(
    "div",
    {
      ref: f,
      className: s("relative", r),
      ...d,
      children: [
        c,
        /* @__PURE__ */ t("div", { className: "absolute bottom-4 left-4 right-4 rounded-lg border bg-card p-4 shadow-lg sm:left-auto sm:right-4 sm:max-w-xs", children: /* @__PURE__ */ m("div", { className: "space-y-3", children: [
          /* @__PURE__ */ m("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ m(
              "svg",
              {
                className: "mt-0.5 h-5 w-5 shrink-0 text-muted-foreground",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: [
                  /* @__PURE__ */ t(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }
                  ),
                  /* @__PURE__ */ t(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ t("p", { className: "text-sm text-foreground", children: e })
          ] }),
          a && /* @__PURE__ */ m("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ t(
              "svg",
              {
                className: "h-5 w-5 shrink-0 text-muted-foreground",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ t(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  }
                )
              }
            ),
            /* @__PURE__ */ t(
              "a",
              {
                href: `tel:${a}`,
                className: "text-sm text-foreground hover:underline",
                children: a
              }
            )
          ] }),
          n && /* @__PURE__ */ m("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ t(
              "svg",
              {
                className: "h-5 w-5 shrink-0 text-muted-foreground",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ t(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  }
                )
              }
            ),
            /* @__PURE__ */ t(
              "a",
              {
                href: `mailto:${n}`,
                className: "text-sm text-foreground hover:underline",
                children: n
              }
            )
          ] }),
          i && /* @__PURE__ */ m("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ t(
              "svg",
              {
                className: "h-5 w-5 shrink-0 text-muted-foreground",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ t(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                )
              }
            ),
            /* @__PURE__ */ t("p", { className: "text-sm text-muted-foreground", children: i })
          ] }),
          l && /* @__PURE__ */ m(
            "a",
            {
              href: l,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
              children: [
                "Get Directions",
                /* @__PURE__ */ t(
                  "svg",
                  {
                    className: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    children: /* @__PURE__ */ t(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      }
                    )
                  }
                )
              ]
            }
          )
        ] }) })
      ]
    }
  )
);
$o.displayName = "MapWithInfo";
const Qo = y("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted/50",
      dark: "bg-zinc-900 text-white",
      gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
    },
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), Uo = o.forwardRef(
  ({ className: r, variant: e, size: a, children: n, ...i }, l) => /* @__PURE__ */ t(
    "section",
    {
      ref: l,
      className: s(Qo({ variant: e, size: a }), r),
      ...i,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto px-4", children: n })
    }
  )
);
Uo.displayName = "AppDownloadSection";
const Wo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "grid items-center gap-8 md:grid-cols-2 md:gap-12",
      r
    ),
    ...e
  }
));
Wo.displayName = "AppDownloadContent";
const Oo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("space-y-6", r), ...e }));
Oo.displayName = "AppDownloadInfo";
const Xo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s(
      "font-heading text-3xl font-bold tracking-tight sm:text-4xl",
      r
    ),
    ...e
  }
));
Xo.displayName = "AppDownloadTitle";
const Yo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("text-lg opacity-90", r),
    ...e
  }
));
Yo.displayName = "AppDownloadDescription";
const Jo = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex flex-wrap gap-4", r),
    ...e
  }
));
Jo.displayName = "AppDownloadButtons";
const Fe = y(
  "inline-flex items-center gap-3 rounded-lg px-4 py-3 transition-transform hover:scale-105",
  {
    variants: {
      variant: {
        apple: "bg-black text-white",
        google: "bg-black text-white",
        custom: ""
      }
    },
    defaultVariants: {
      variant: "apple"
    }
  }
), Ko = o.forwardRef(
  ({ className: r, variant: e, href: a, ...n }, i) => /* @__PURE__ */ m(
    "a",
    {
      ref: i,
      href: a,
      target: "_blank",
      rel: "noopener noreferrer",
      className: s(Fe({ variant: e }), r),
      ...n,
      children: [
        /* @__PURE__ */ t("svg", { className: "h-8 w-8", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ t("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) }),
        /* @__PURE__ */ m("div", { className: "text-left", children: [
          /* @__PURE__ */ t("div", { className: "text-xs opacity-80", children: "Download on the" }),
          /* @__PURE__ */ t("div", { className: "text-lg font-semibold leading-tight", children: "App Store" })
        ] })
      ]
    }
  )
);
Ko.displayName = "AppStoreBadge";
const Zo = o.forwardRef(({ className: r, href: e, ...a }, n) => /* @__PURE__ */ m(
  "a",
  {
    ref: n,
    href: e,
    target: "_blank",
    rel: "noopener noreferrer",
    className: s(Fe({ variant: "google" }), r),
    ...a,
    children: [
      /* @__PURE__ */ t("svg", { className: "h-8 w-8", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ t("path", { d: "M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" }) }),
      /* @__PURE__ */ m("div", { className: "text-left", children: [
        /* @__PURE__ */ t("div", { className: "text-xs opacity-80", children: "Get it on" }),
        /* @__PURE__ */ t("div", { className: "text-lg font-semibold leading-tight", children: "Google Play" })
      ] })
    ]
  }
));
Zo.displayName = "GooglePlayBadge";
const es = o.forwardRef(({ className: r, children: e, ...a }, n) => /* @__PURE__ */ t(
  "div",
  {
    ref: n,
    className: s("flex justify-center", r),
    ...a,
    children: e
  }
));
es.displayName = "AppDownloadMockup";
const rs = o.forwardRef(
  ({ className: r, screenshot: e, alt: a = "App screenshot", children: n, ...i }, l) => /* @__PURE__ */ m(
    "div",
    {
      ref: l,
      className: s(
        "relative mx-auto h-[500px] w-[250px] rounded-[2.5rem] border-[8px] border-gray-800 bg-gray-800 shadow-xl",
        r
      ),
      ...i,
      children: [
        /* @__PURE__ */ t("div", { className: "absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-gray-800" }),
        /* @__PURE__ */ t("div", { className: "h-full w-full overflow-hidden rounded-[2rem] bg-white", children: e ? /* @__PURE__ */ t(
          "img",
          {
            src: e,
            alt: a,
            className: "h-full w-full object-cover"
          }
        ) : n }),
        /* @__PURE__ */ t("div", { className: "absolute -left-[10px] top-24 h-8 w-1 rounded-l bg-gray-800" }),
        /* @__PURE__ */ t("div", { className: "absolute -left-[10px] top-36 h-14 w-1 rounded-l bg-gray-800" }),
        /* @__PURE__ */ t("div", { className: "absolute -left-[10px] top-52 h-14 w-1 rounded-l bg-gray-800" }),
        /* @__PURE__ */ t("div", { className: "absolute -right-[10px] top-32 h-16 w-1 rounded-r bg-gray-800" })
      ]
    }
  )
);
rs.displayName = "PhoneMockup";
const as = o.forwardRef(
  ({ className: r, label: e = "Scan to download", children: a, ...n }, i) => /* @__PURE__ */ m(
    "div",
    {
      ref: i,
      className: s("text-center", r),
      ...n,
      children: [
        /* @__PURE__ */ t("div", { className: "mx-auto mb-2 h-32 w-32 rounded-lg border bg-white p-2", children: a }),
        /* @__PURE__ */ t("p", { className: "text-sm text-muted-foreground", children: e })
      ]
    }
  )
);
as.displayName = "AppQRCode";
const ts = y("w-full overflow-hidden", {
  variants: {
    variant: {
      default: "",
      fade: "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    }
  },
  defaultVariants: {
    variant: "fade"
  }
}), os = o.forwardRef(
  ({
    className: r,
    variant: e,
    duration: a = 40,
    direction: n = "left",
    pauseOnHover: i = !0,
    gap: l = 16,
    children: c,
    ...d
  }, f) => /* @__PURE__ */ t(
    "div",
    {
      ref: f,
      className: s(ts({ variant: e }), r),
      ...d,
      children: /* @__PURE__ */ m(
        "div",
        {
          className: s(
            "flex w-max animate-marquee",
            i && "hover:[animation-play-state:paused]"
          ),
          style: {
            gap: `${l}px`,
            animationDuration: `${a}s`,
            animationDirection: n === "right" ? "reverse" : "normal"
          },
          children: [
            c,
            /* @__PURE__ */ t("div", { className: "flex", style: { gap: `${l}px` }, "aria-hidden": !0, children: c })
          ]
        }
      )
    }
  )
);
os.displayName = "Marquee";
const ss = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex shrink-0 items-center", r),
    ...e
  }
));
ss.displayName = "MarqueeItem";
const ns = y("h-full overflow-hidden", {
  variants: {
    variant: {
      default: "",
      fade: "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    }
  },
  defaultVariants: {
    variant: "fade"
  }
}), is = o.forwardRef(
  ({
    className: r,
    variant: e,
    duration: a = 40,
    direction: n = "up",
    pauseOnHover: i = !0,
    gap: l = 16,
    children: c,
    ...d
  }, f) => /* @__PURE__ */ t(
    "div",
    {
      ref: f,
      className: s(ns({ variant: e }), r),
      ...d,
      children: /* @__PURE__ */ m(
        "div",
        {
          className: s(
            "flex h-max flex-col animate-marquee-vertical",
            i && "hover:[animation-play-state:paused]"
          ),
          style: {
            gap: `${l}px`,
            animationDuration: `${a}s`,
            animationDirection: n === "down" ? "reverse" : "normal"
          },
          children: [
            c,
            /* @__PURE__ */ t("div", { className: "flex flex-col", style: { gap: `${l}px` }, "aria-hidden": !0, children: c })
          ]
        }
      )
    }
  )
);
is.displayName = "VerticalMarquee";
const ls = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "w-80 shrink-0 rounded-xl border bg-card p-6 shadow-sm",
      r
    ),
    ...e
  }
));
ls.displayName = "MarqueeTestimonial";
const ds = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("text-sm text-muted-foreground", r),
    ...e
  }
));
ds.displayName = "MarqueeTestimonialContent";
const cs = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mt-4 flex items-center gap-3", r),
    ...e
  }
));
cs.displayName = "MarqueeTestimonialAuthor";
const ms = o.forwardRef(({ className: r, src: e, alt: a, fallback: n, ...i }, l) => /* @__PURE__ */ t(
  "div",
  {
    ref: l,
    className: s("h-10 w-10 overflow-hidden rounded-full bg-muted", r),
    ...i,
    children: e ? /* @__PURE__ */ t("img", { src: e, alt: a || "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ t("div", { className: "flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground", children: n || (a == null ? void 0 : a.charAt(0).toUpperCase()) })
  }
));
ms.displayName = "MarqueeTestimonialAvatar";
const fs = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("", r), ...e }));
fs.displayName = "MarqueeTestimonialInfo";
const us = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("text-sm font-medium text-foreground", r),
    ...e
  }
));
us.displayName = "MarqueeTestimonialName";
const ps = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("text-xs text-muted-foreground", r),
    ...e
  }
));
ps.displayName = "MarqueeTestimonialRole";
const gs = y("tabular-nums", {
  variants: {
    size: {
      sm: "text-2xl font-bold",
      default: "text-4xl font-bold",
      lg: "text-5xl font-bold",
      xl: "text-6xl font-bold"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), vs = {
  linear: (r) => r,
  easeOut: (r) => 1 - Math.pow(1 - r, 3),
  easeInOut: (r) => r < 0.5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2
};
function xs(r, e, a, n) {
  const i = r.toFixed(e), [l, c] = i.split("."), d = l.replace(/\B(?=(\d{3})+(?!\d))/g, a);
  return c ? `${d}${n}${c}` : d;
}
const Le = o.forwardRef(
  ({
    className: r,
    size: e,
    value: a,
    from: n = 0,
    duration: i = 2e3,
    prefix: l = "",
    suffix: c = "",
    decimals: d = 0,
    separator: f = ",",
    decimalSeparator: p = ".",
    easing: g = "easeOut",
    delay: h = 0,
    triggerOnView: x = !0,
    onComplete: v,
    ...N
  }, w) => {
    const [C, R] = o.useState(n), [L, M] = o.useState(!1), A = o.useRef(null), H = o.useCallback(
      (F) => {
        A.current = F, typeof w == "function" ? w(F) : w && (w.current = F);
      },
      [w]
    ), B = o.useCallback(() => {
      if (L) return;
      const F = performance.now(), P = vs[g], E = (J) => {
        const K = J - F, q = Math.min(K / i, 1), ee = P(q), I = n + (a - n) * ee;
        R(I), q < 1 ? requestAnimationFrame(E) : (R(a), M(!0), v == null || v());
      };
      setTimeout(() => {
        requestAnimationFrame(E);
      }, h);
    }, [a, n, i, g, h, L, v]);
    return o.useEffect(() => {
      if (!x) {
        B();
        return;
      }
      const F = A.current;
      if (!F) return;
      const P = new IntersectionObserver(
        (E) => {
          E[0].isIntersecting && !L && B();
        },
        { threshold: 0.1 }
      );
      return P.observe(F), () => P.disconnect();
    }, [B, x, L]), o.useEffect(() => {
      M(!1), R(n);
    }, [a, n]), /* @__PURE__ */ m(
      "span",
      {
        ref: H,
        className: s(gs({ size: e }), r),
        ...N,
        children: [
          l,
          xs(C, d, f, p),
          c
        ]
      }
    );
  }
);
Le.displayName = "AnimatedCounter";
const hs = o.forwardRef(
  ({ label: r, labelClassName: e, className: a, ...n }, i) => /* @__PURE__ */ m("div", { ref: i, className: s("text-center", a), children: [
    /* @__PURE__ */ t(Le, { ...n }),
    /* @__PURE__ */ t("p", { className: s("mt-2 text-sm text-muted-foreground", e), children: r })
  ] })
);
hs.displayName = "CounterWithLabel";
const ys = o.forwardRef(
  ({ className: r, columns: e = 4, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: s("grid gap-8", {
        2: "grid-cols-2",
        3: "grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4"
      }[e], r),
      ...a
    }
  )
);
ys.displayName = "CounterGrid";
const Ns = o.forwardRef(
  ({
    className: r,
    targetDate: e,
    onComplete: a,
    labels: n = {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    },
    size: i = "default",
    ...l
  }, c) => {
    const [d, f] = o.useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    o.useEffect(() => {
      const g = () => {
        const x = e.getTime() - (/* @__PURE__ */ new Date()).getTime();
        return x <= 0 ? (a == null || a(), { days: 0, hours: 0, minutes: 0, seconds: 0 }) : {
          days: Math.floor(x / 864e5),
          hours: Math.floor(x / 36e5 % 24),
          minutes: Math.floor(x / 1e3 / 60 % 60),
          seconds: Math.floor(x / 1e3 % 60)
        };
      };
      f(g());
      const h = setInterval(() => {
        f(g());
      }, 1e3);
      return () => clearInterval(h);
    }, [e, a]);
    const p = {
      sm: { value: "text-2xl font-bold", label: "text-xs" },
      default: { value: "text-4xl font-bold", label: "text-sm" },
      lg: { value: "text-5xl font-bold", label: "text-base" }
    };
    return /* @__PURE__ */ t(
      "div",
      {
        ref: c,
        className: s("flex gap-4 md:gap-8", r),
        ...l,
        children: Object.entries(d).map(([g, h]) => /* @__PURE__ */ m("div", { className: "text-center", children: [
          /* @__PURE__ */ t("div", { className: s("tabular-nums", p[i].value), children: String(h).padStart(2, "0") }),
          /* @__PURE__ */ t("div", { className: s("text-muted-foreground", p[i].label), children: n[g] })
        ] }, g))
      }
    );
  }
);
Ns.displayName = "CountdownTimer";
const bs = y(
  "fixed z-50 w-full p-4 shadow-lg transition-transform duration-300",
  {
    variants: {
      position: {
        bottom: "bottom-0 left-0",
        top: "top-0 left-0",
        "bottom-left": "bottom-4 left-4 max-w-md rounded-lg",
        "bottom-right": "bottom-4 right-4 max-w-md rounded-lg"
      },
      variant: {
        default: "border-t bg-background",
        dark: "bg-zinc-900 text-white",
        card: "border bg-card"
      }
    },
    defaultVariants: {
      position: "bottom",
      variant: "default"
    }
  }
), ws = o.forwardRef(
  ({
    className: r,
    position: e,
    variant: a,
    isVisible: n = !0,
    children: i,
    ...l
  }, c) => n ? /* @__PURE__ */ t(
    "div",
    {
      ref: c,
      className: s(bs({ position: e, variant: a }), r),
      role: "dialog",
      "aria-label": "Cookie consent",
      ...l,
      children: /* @__PURE__ */ t("div", { className: "container mx-auto", children: i })
    }
  ) : null
);
ws.displayName = "CookieBanner";
const Cs = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s(
      "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
      r
    ),
    ...e
  }
));
Cs.displayName = "CookieBannerContent";
const Rs = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t("div", { ref: a, className: s("flex-1", r), ...e }));
Rs.displayName = "CookieBannerText";
const ks = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h3",
  {
    ref: a,
    className: s("font-heading text-lg font-semibold", r),
    ...e
  }
));
ks.displayName = "CookieBannerTitle";
const Ss = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mt-1 text-sm text-muted-foreground", r),
    ...e
  }
));
Ss.displayName = "CookieBannerDescription";
const Ts = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("flex flex-wrap items-center gap-2", r),
    ...e
  }
));
Ts.displayName = "CookieBannerActions";
const As = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "a",
  {
    ref: a,
    className: s(
      "text-sm text-primary underline-offset-4 hover:underline",
      r
    ),
    ...e
  }
));
As.displayName = "CookieBannerLink";
const Bs = o.forwardRef(
  ({ className: r, isOpen: e, onClose: a, onSave: n, children: i, ...l }, c) => (o.useEffect(() => {
    const d = (f) => {
      f.key === "Escape" && a();
    };
    return e && (document.addEventListener("keydown", d), document.body.style.overflow = "hidden"), () => {
      document.removeEventListener("keydown", d), document.body.style.overflow = "";
    };
  }, [e, a]), e ? /* @__PURE__ */ t(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
      onClick: a,
      children: /* @__PURE__ */ t(
        "div",
        {
          ref: c,
          className: s(
            "w-full max-w-lg rounded-lg bg-background p-6 shadow-xl",
            r
          ),
          onClick: (d) => d.stopPropagation(),
          role: "dialog",
          "aria-label": "Cookie preferences",
          ...l,
          children: i
        }
      )
    }
  ) : null)
);
Bs.displayName = "CookiePreferences";
const Fs = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mb-6", r),
    ...e
  }
));
Fs.displayName = "CookiePreferencesHeader";
const Ls = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "h2",
  {
    ref: a,
    className: s("font-heading text-xl font-semibold", r),
    ...e
  }
));
Ls.displayName = "CookiePreferencesTitle";
const Ms = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "p",
  {
    ref: a,
    className: s("mt-2 text-sm text-muted-foreground", r),
    ...e
  }
));
Ms.displayName = "CookiePreferencesDescription";
const Is = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("space-y-4", r),
    ...e
  }
));
Is.displayName = "CookiePreferencesList";
const Vs = o.forwardRef(
  ({
    className: r,
    name: e,
    description: a,
    required: n = !1,
    checked: i = !1,
    onChange: l,
    ...c
  }, d) => {
    const f = o.useId();
    return /* @__PURE__ */ m(
      "div",
      {
        ref: d,
        className: s(
          "flex items-start justify-between gap-4 rounded-lg border p-4",
          r
        ),
        ...c,
        children: [
          /* @__PURE__ */ m("div", { className: "flex-1", children: [
            /* @__PURE__ */ m("label", { htmlFor: f, className: "font-medium", children: [
              e,
              n && /* @__PURE__ */ t("span", { className: "ml-2 text-xs text-muted-foreground", children: "(Required)" })
            ] }),
            /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-muted-foreground", children: a })
          ] }),
          /* @__PURE__ */ t("div", { className: "shrink-0", children: /* @__PURE__ */ t(
            "button",
            {
              id: f,
              type: "button",
              role: "switch",
              "aria-checked": n || i,
              disabled: n,
              onClick: () => l == null ? void 0 : l(!i),
              className: s(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                n || i ? "bg-primary" : "bg-muted",
                n && "cursor-not-allowed opacity-50"
              ),
              children: /* @__PURE__ */ t(
                "span",
                {
                  className: s(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    n || i ? "translate-x-6" : "translate-x-1"
                  )
                }
              )
            }
          ) })
        ]
      }
    );
  }
);
Vs.displayName = "CookiePreferenceItem";
const zs = o.forwardRef(({ className: r, ...e }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: s("mt-6 flex justify-end gap-2", r),
    ...e
  }
));
zs.displayName = "CookiePreferencesFooter";
const Es = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`, Ps = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Animated gradient
    float t = uTime * 0.3;
    float noise = sin(uv.x * 3.0 + t) * sin(uv.y * 3.0 + t) * 0.5 + 0.5;

    vec3 color = mix(uColor1, uColor2, uv.x + sin(t) * 0.2);
    color = mix(color, uColor3, uv.y + cos(t) * 0.2);
    color = mix(color, uColor1, noise * uIntensity);

    gl_FragColor = vec4(color, 1.0);
  }
`, _s = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.2;

    // Multiple layers of noise for aurora effect
    float n1 = snoise(vec2(uv.x * 2.0, uv.y * 0.5 + t));
    float n2 = snoise(vec2(uv.x * 4.0 + t * 0.5, uv.y * 1.0));
    float n3 = snoise(vec2(uv.x * 1.0, uv.y * 2.0 - t * 0.3));

    float aurora = (n1 + n2 * 0.5 + n3 * 0.25) * 0.5 + 0.5;
    aurora = pow(aurora, 2.0) * uIntensity;

    // Vertical fade
    float fade = smoothstep(0.0, 0.6, uv.y) * smoothstep(1.0, 0.4, uv.y);
    aurora *= fade;

    // Color mixing
    vec3 color = mix(uColor1, uColor2, aurora);
    color = mix(color, uColor3, pow(aurora, 2.0));

    // Add glow
    color += uColor2 * aurora * 0.5;

    gl_FragColor = vec4(color, aurora * 0.8 + 0.2);
  }
`, Ds = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.5;

    // Morphing blob
    float blob = 0.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 offset = vec2(
        sin(t + fi * 1.2) * 0.3,
        cos(t + fi * 0.8) * 0.3
      );
      float size = 0.3 + sin(t + fi) * 0.1;
      blob += smoothstep(size, size - 0.1, length(uv - offset));
    }

    blob = clamp(blob, 0.0, 1.0) * uIntensity;

    // Color gradient
    vec3 color = mix(uColor1, uColor2, blob);
    color = mix(color, uColor3, pow(blob, 2.0));

    gl_FragColor = vec4(color, blob);
  }
`, js = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;
  uniform vec3 uColor1;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Animated noise
    float noise = random(uv + uTime * 0.1);
    noise = mix(0.5, noise, uIntensity);

    vec3 color = uColor1 * noise;

    gl_FragColor = vec4(color, uIntensity * 0.5);
  }
`, Hs = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.5;

    // Wave distortion
    float wave1 = sin(uv.x * 10.0 + t) * 0.1;
    float wave2 = sin(uv.x * 5.0 - t * 0.5) * 0.15;
    float wave3 = cos(uv.x * 15.0 + t * 0.7) * 0.05;

    float y = uv.y + (wave1 + wave2 + wave3) * uIntensity;

    // Gradient with waves
    vec3 color = mix(uColor1, uColor2, smoothstep(0.3, 0.7, y));

    gl_FragColor = vec4(color, 1.0);
  }
`, qs = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;

  varying vec2 vUv;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Animated mesh gradient using noise
    float n1 = snoise(uv * 2.0 + t) * 0.5 + 0.5;
    float n2 = snoise(uv * 3.0 - t * 0.5) * 0.5 + 0.5;
    float n3 = snoise(uv * 1.5 + vec2(t, -t)) * 0.5 + 0.5;

    // Four-corner gradient with noise displacement
    vec3 tl = uColor1;
    vec3 tr = uColor2;
    vec3 bl = uColor3;
    vec3 br = uColor4;

    vec2 nuv = uv + vec2(n1 - 0.5, n2 - 0.5) * 0.2 * uIntensity;
    nuv = clamp(nuv, 0.0, 1.0);

    vec3 top = mix(tl, tr, nuv.x);
    vec3 bottom = mix(bl, br, nuv.x);
    vec3 color = mix(bottom, top, nuv.y);

    // Add subtle glow
    color += (uColor1 + uColor2) * 0.1 * n3 * uIntensity;

    gl_FragColor = vec4(color, 1.0);
  }
`, Gs = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.2;

    vec3 color = vec3(0.0);

    // Multiple particle layers
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 grid = uv * (20.0 + fi * 10.0);
      vec2 id = floor(grid);
      vec2 gv = fract(grid) - 0.5;

      float n = random(id + fi);
      float size = n * 0.3 + 0.1;

      // Animated position
      vec2 offset = vec2(
        sin(t + n * 6.28) * 0.2,
        cos(t * 0.7 + n * 6.28) * 0.3 - t * 0.5
      );
      offset.y = mod(offset.y, 1.0) - 0.5;

      float d = length(gv - offset);
      float particle = smoothstep(size, size - 0.05, d);

      vec3 pColor = mix(uColor1, uColor2, n);
      color += pColor * particle * (1.0 - fi * 0.2);
    }

    color *= uIntensity;

    gl_FragColor = vec4(color, length(color) * 0.5);
  }
`;
function U(r) {
  const e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);
  return e ? [
    parseInt(e[1], 16) / 255,
    parseInt(e[2], 16) / 255,
    parseInt(e[3], 16) / 255
  ] : [1, 1, 1];
}
const Me = {
  gradient: Ps,
  aurora: _s,
  blob: Ds,
  noise: js,
  wave: Hs,
  mesh: qs,
  particles: Gs
}, Ie = {
  gradient: ["#ff0080", "#7928ca", "#0070f3"],
  aurora: ["#00ff87", "#60efff", "#7b2dff"],
  blob: ["#ff6b6b", "#feca57", "#48dbfb"],
  noise: ["#ffffff"],
  wave: ["#667eea", "#764ba2"],
  mesh: ["#f093fb", "#f5576c", "#4facfe", "#00f2fe"],
  particles: ["#ffffff", "#60efff"]
}, j = o.forwardRef(
  ({
    className: r,
    preset: e = "gradient",
    fragmentShader: a,
    vertexShader: n,
    speed: i = 1,
    interactive: l = !0,
    intensity: c = 0.8,
    colors: d,
    color4: f,
    paused: p = !1,
    pixelRatio: g,
    quality: h = "medium",
    onReady: x,
    onFrame: v,
    ...N
  }, w) => {
    const C = o.useRef(null), R = o.useRef(null), L = o.useRef(null), M = o.useRef(0), A = o.useRef({ x: 0.5, y: 0.5 }), H = o.useRef(0), B = d || Ie[e], F = U(B[0] || "#ffffff"), P = U(B[1] || B[0] || "#ffffff"), E = U(B[2] || B[0] || "#ffffff"), J = U(f || B[3] || B[0] || "#ffffff"), K = a || Me[e], q = n || Es, ee = h === "low" ? 0.5 : h === "high" ? 1 : 0.75, I = (g || (typeof window < "u" ? window.devicePixelRatio : 1)) * ee;
    return o.useEffect(() => {
      const z = C.current, _ = R.current;
      if (!z || !_) return;
      let u = null, S = null, W = null, O = null;
      const se = () => {
        if (u = _.getContext("webgl", {
          alpha: !0,
          antialias: !1,
          premultipliedAlpha: !1
        }), !u) {
          console.warn("WebGL not supported");
          return;
        }
        const T = u.createShader(u.VERTEX_SHADER);
        if (u.shaderSource(T, q), u.compileShader(T), !u.getShaderParameter(T, u.COMPILE_STATUS)) {
          console.error("Vertex shader error:", u.getShaderInfoLog(T));
          return;
        }
        const b = u.createShader(u.FRAGMENT_SHADER);
        if (u.shaderSource(b, K), u.compileShader(b), !u.getShaderParameter(b, u.COMPILE_STATUS)) {
          console.error("Fragment shader error:", u.getShaderInfoLog(b));
          return;
        }
        if (S = u.createProgram(), u.attachShader(S, T), u.attachShader(S, b), u.linkProgram(S), !u.getProgramParameter(S, u.LINK_STATUS)) {
          console.error("Program link error:", u.getProgramInfoLog(S));
          return;
        }
        u.useProgram(S);
        const X = new Float32Array([
          -1,
          -1,
          1,
          -1,
          -1,
          1,
          1,
          1
        ]), k = new Float32Array([
          0,
          0,
          1,
          0,
          0,
          1,
          1,
          1
        ]);
        W = u.createBuffer(), u.bindBuffer(u.ARRAY_BUFFER, W), u.bufferData(u.ARRAY_BUFFER, X, u.STATIC_DRAW);
        const D = u.getAttribLocation(S, "position");
        u.enableVertexAttribArray(D), u.vertexAttribPointer(D, 2, u.FLOAT, !1, 0, 0), O = u.createBuffer(), u.bindBuffer(u.ARRAY_BUFFER, O), u.bufferData(u.ARRAY_BUFFER, k, u.STATIC_DRAW);
        const te = u.getAttribLocation(S, "uv");
        u.enableVertexAttribArray(te), u.vertexAttribPointer(te, 2, u.FLOAT, !1, 0, 0), u.enable(u.BLEND), u.blendFunc(u.SRC_ALPHA, u.ONE_MINUS_SRC_ALPHA), L.current = { gl: u, program: S }, x == null || x();
      }, $ = () => {
        if (!_ || !u) return;
        const T = z.getBoundingClientRect(), b = Math.floor(T.width * I), X = Math.floor(T.height * I);
        _.width = b, _.height = X, u.viewport(0, 0, b, X);
      }, V = (T) => {
        if (!u || !S || p) {
          M.current = requestAnimationFrame(V);
          return;
        }
        H.current = T * 1e-3 * i, v == null || v(H.current), u.useProgram(S);
        const b = (X, k) => {
          const D = u.getUniformLocation(S, X);
          D && (Array.isArray(k) ? k.length === 2 ? u.uniform2f(D, k[0], k[1]) : k.length === 3 ? u.uniform3f(D, k[0], k[1], k[2]) : k.length === 4 && u.uniform4f(D, k[0], k[1], k[2], k[3]) : u.uniform1f(D, k));
        };
        b("uTime", H.current), b("uResolution", [_.width, _.height]), b("uMouse", [A.current.x, A.current.y]), b("uIntensity", c), b("uColor1", F), b("uColor2", P), b("uColor3", E), b("uColor4", J), u.drawArrays(u.TRIANGLE_STRIP, 0, 4), M.current = requestAnimationFrame(V);
      }, re = (T) => {
        if (!l) return;
        const b = z.getBoundingClientRect();
        A.current = {
          x: (T.clientX - b.left) / b.width,
          y: 1 - (T.clientY - b.top) / b.height
        };
      };
      return se(), $(), M.current = requestAnimationFrame(V), window.addEventListener("resize", $), l && z.addEventListener("mousemove", re), () => {
        cancelAnimationFrame(M.current), window.removeEventListener("resize", $), l && z.removeEventListener("mousemove", re), u && (W && u.deleteBuffer(W), O && u.deleteBuffer(O), S && u.deleteProgram(S));
      };
    }, [K, q, i, l, c, p, I, F, P, E, J, x, v]), /* @__PURE__ */ t(
      "div",
      {
        ref: (z) => {
          C.current = z, typeof w == "function" ? w(z) : w && (w.current = z);
        },
        className: s("relative h-full w-full overflow-hidden", r),
        ...N,
        children: /* @__PURE__ */ t(
          "canvas",
          {
            ref: R,
            className: "absolute inset-0 h-full w-full",
            style: { display: "block" }
          }
        )
      }
    );
  }
);
j.displayName = "ShaderCanvasOGL";
const $s = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`, Qs = o.forwardRef(
  ({
    className: r,
    preset: e = "gradient",
    fragmentShader: a,
    vertexShader: n,
    speed: i = 1,
    interactive: l = !0,
    intensity: c = 0.8,
    colors: d,
    color4: f,
    paused: p = !1,
    pixelRatio: g,
    quality: h = "medium",
    mode3D: x = !1,
    onReady: v,
    onFrame: N,
    ...w
  }, C) => {
    const R = o.useRef(null), L = o.useRef(null), M = o.useRef(null), A = o.useRef(null), H = o.useRef(null), B = o.useRef(null), F = o.useRef(null), P = o.useRef(0), E = o.useRef({ x: 0.5, y: 0.5 }), [J, K] = o.useState(!1), [q, ee] = o.useState(null), I = d || Ie[e], z = U(I[0] || "#ffffff"), _ = U(I[1] || I[0] || "#ffffff"), u = U(I[2] || I[0] || "#ffffff"), S = U(f || I[3] || I[0] || "#ffffff"), W = a || Me[e], O = n || $s, se = h === "low" ? 0.5 : h === "high" ? 1 : 0.75, $ = (g || (typeof window < "u" ? window.devicePixelRatio : 1)) * se;
    return o.useEffect(() => {
      const V = R.current, re = L.current;
      if (!V || !re) return;
      let T = null, b = !0;
      return (async () => {
        let k;
        try {
          k = await import("three");
        } catch {
          b && ee("three.js not installed. Install with: npm install three");
          return;
        }
        if (!b) return;
        const {
          WebGLRenderer: D,
          Scene: te,
          OrthographicCamera: ze,
          PerspectiveCamera: Ee,
          PlaneGeometry: Pe,
          Mesh: _e,
          ShaderMaterial: De,
          Vector2: pe,
          Vector3: oe,
          Clock: je
        } = k, ae = new D({
          canvas: re,
          alpha: !0,
          antialias: !1,
          premultipliedAlpha: !1
        });
        ae.setPixelRatio($), M.current = ae;
        const ne = new te();
        A.current = ne;
        const Z = x ? new Ee(75, 1, 0.1, 100) : new ze(-1, 1, 1, -1, 0.1, 100);
        Z.position.z = 1, H.current = Z;
        const Y = new De({
          vertexShader: O,
          fragmentShader: W,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new pe(1, 1) },
            uMouse: { value: new pe(0.5, 0.5) },
            uIntensity: { value: c },
            uColor1: { value: new oe(...z) },
            uColor2: { value: new oe(..._) },
            uColor3: { value: new oe(...u) },
            uColor4: { value: new oe(...S) }
          },
          transparent: !0
        });
        B.current = Y;
        const ge = new Pe(2, 2), He = new _e(ge, Y);
        ne.add(He);
        const ve = new je();
        F.current = ve;
        const ie = () => {
          if (!b) return;
          const G = V.getBoundingClientRect(), Q = G.width, le = G.height;
          ae.setSize(Q, le), Y.uniforms.uResolution.value.set(Q * $, le * $), x && Z.isPerspectiveCamera && (Z.aspect = Q / le, Z.updateProjectionMatrix());
        }, xe = () => {
          if (b) {
            if (!p) {
              const G = ve.getElapsedTime() * i;
              N == null || N(G), Y.uniforms.uTime.value = G, Y.uniforms.uIntensity.value = c, l && Y.uniforms.uMouse.value.set(E.current.x, E.current.y), ae.render(ne, Z);
            }
            P.current = requestAnimationFrame(xe);
          }
        }, he = (G) => {
          if (!l || !b) return;
          const Q = V.getBoundingClientRect();
          E.current = {
            x: (G.clientX - Q.left) / Q.width,
            y: 1 - (G.clientY - Q.top) / Q.height
          };
        };
        ie(), xe(), K(!0), v == null || v(), window.addEventListener("resize", ie), l && V.addEventListener("mousemove", he), T = () => {
          cancelAnimationFrame(P.current), window.removeEventListener("resize", ie), l && V.removeEventListener("mousemove", he), ae.dispose(), ge.dispose(), Y.dispose();
        };
      })(), () => {
        b = !1, T == null || T();
      };
    }, [W, O, i, l, c, p, $, x, z, _, u, S, v, N]), o.useEffect(() => {
      B.current && (B.current.uniforms.uIntensity.value = c);
    }, [c]), q ? /* @__PURE__ */ t(
      "div",
      {
        ref: C,
        className: s(
          "relative flex h-full w-full items-center justify-center bg-muted text-muted-foreground",
          r
        ),
        ...w,
        children: /* @__PURE__ */ t("p", { className: "text-sm", children: q })
      }
    ) : /* @__PURE__ */ m(
      "div",
      {
        ref: (V) => {
          R.current = V, typeof C == "function" ? C(V) : C && (C.current = V);
        },
        className: s("relative h-full w-full overflow-hidden", r),
        ...w,
        children: [
          /* @__PURE__ */ t(
            "canvas",
            {
              ref: L,
              className: "absolute inset-0 h-full w-full",
              style: { display: "block" }
            }
          ),
          !J && !q && /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center bg-muted", children: /* @__PURE__ */ t("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) })
        ]
      }
    );
  }
);
Qs.displayName = "ShaderCanvasR3F";
const Ve = o.forwardRef(
  ({
    className: r,
    shader: e,
    children: a,
    overlay: n = 0,
    overlayColor: i = "black",
    fixed: l = !1,
    ...c
  }, d) => /* @__PURE__ */ m(
    "div",
    {
      ref: d,
      className: s(
        "relative",
        l ? "fixed inset-0" : "h-full w-full",
        r
      ),
      children: [
        /* @__PURE__ */ t(
          j,
          {
            preset: e,
            className: "absolute inset-0 -z-10",
            ...c
          }
        ),
        n > 0 && /* @__PURE__ */ t(
          "div",
          {
            className: "absolute inset-0 -z-10",
            style: {
              backgroundColor: i,
              opacity: n
            }
          }
        ),
        a && /* @__PURE__ */ t("div", { className: "relative z-10 h-full w-full", children: a })
      ]
    }
  )
);
Ve.displayName = "ShaderBackground";
const Us = o.forwardRef(
  ({ className: r, colors: e = ["#ff0080", "#7928ca", "#0070f3"], ...a }, n) => /* @__PURE__ */ t(
    j,
    {
      ref: n,
      preset: "gradient",
      colors: e,
      className: r,
      ...a
    }
  )
);
Us.displayName = "ShaderGradient";
const Ws = o.forwardRef(
  ({ className: r, colors: e = ["#00ff87", "#60efff", "#7b2dff"], ...a }, n) => /* @__PURE__ */ t(
    j,
    {
      ref: n,
      preset: "aurora",
      colors: e,
      className: r,
      ...a
    }
  )
);
Ws.displayName = "ShaderAurora";
const Os = o.forwardRef(
  ({ className: r, colors: e = ["#ff6b6b", "#feca57", "#48dbfb"], ...a }, n) => /* @__PURE__ */ t(
    j,
    {
      ref: n,
      preset: "blob",
      colors: e,
      className: r,
      ...a
    }
  )
);
Os.displayName = "ShaderBlob";
const Xs = o.forwardRef(
  ({ className: r, color: e = "#ffffff", intensity: a = 0.15, ...n }, i) => /* @__PURE__ */ t(
    j,
    {
      ref: i,
      preset: "noise",
      colors: [e],
      intensity: a,
      className: r,
      ...n
    }
  )
);
Xs.displayName = "ShaderNoise";
const Ys = o.forwardRef(
  ({ className: r, colors: e = ["#667eea", "#764ba2"], ...a }, n) => /* @__PURE__ */ t(
    j,
    {
      ref: n,
      preset: "wave",
      colors: e,
      className: r,
      ...a
    }
  )
);
Ys.displayName = "ShaderWave";
const Js = o.forwardRef(
  ({
    className: r,
    colors: e = ["#f093fb", "#f5576c", "#4facfe", "#00f2fe"],
    ...a
  }, n) => /* @__PURE__ */ t(
    j,
    {
      ref: n,
      preset: "mesh",
      colors: e.slice(0, 3),
      color4: e[3],
      className: r,
      ...a
    }
  )
);
Js.displayName = "ShaderMesh";
const Ks = o.forwardRef(
  ({ className: r, colors: e = ["#ffffff", "#60efff"], ...a }, n) => /* @__PURE__ */ t(
    j,
    {
      ref: n,
      preset: "particles",
      colors: e,
      className: r,
      ...a
    }
  )
);
Ks.displayName = "ShaderParticles";
const Zs = o.forwardRef(
  ({
    className: r,
    shader: e = "gradient",
    title: a,
    subtitle: n,
    size: i = "default",
    align: l = "center",
    children: c,
    overlay: d = 0.3,
    ...f
  }, p) => {
    const g = {
      sm: "min-h-[40vh] py-16",
      default: "min-h-[60vh] py-20",
      lg: "min-h-[80vh] py-24",
      full: "min-h-screen py-24"
    }, h = {
      left: "items-start text-left",
      center: "items-center text-center",
      right: "items-end text-right"
    };
    return /* @__PURE__ */ t(
      Ve,
      {
        ref: p,
        shader: e,
        overlay: d,
        className: s(
          "flex flex-col justify-center",
          g[i],
          h[l],
          r
        ),
        ...f,
        children: /* @__PURE__ */ m(
          "div",
          {
            className: s(
              "container mx-auto px-4",
              l === "center" && "flex flex-col items-center"
            ),
            children: [
              a && /* @__PURE__ */ t("h1", { className: "max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl", children: a }),
              n && /* @__PURE__ */ t("p", { className: "mt-6 max-w-2xl text-lg text-white/80 sm:text-xl md:text-2xl", children: n }),
              c
            ]
          }
        )
      }
    );
  }
);
Zs.displayName = "ShaderHero";
const en = o.forwardRef(
  ({
    className: r,
    shader: e = "mesh",
    children: a,
    padding: n = "default",
    rounded: i = "xl",
    overlay: l = 0.5,
    intensity: c = 0.6,
    speed: d = 0.5,
    ...f
  }, p) => {
    const g = {
      sm: "p-4",
      default: "p-6",
      lg: "p-8"
    };
    return /* @__PURE__ */ m(
      "div",
      {
        ref: p,
        className: s(
          "relative overflow-hidden",
          {
            sm: "rounded-sm",
            default: "rounded",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            full: "rounded-full"
          }[i],
          r
        ),
        children: [
          /* @__PURE__ */ t(
            j,
            {
              preset: e,
              intensity: c,
              speed: d,
              className: "absolute inset-0",
              ...f
            }
          ),
          l > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "absolute inset-0",
              style: { backgroundColor: "black", opacity: l }
            }
          ),
          /* @__PURE__ */ t("div", { className: s("relative z-10", g[n]), children: a })
        ]
      }
    );
  }
);
en.displayName = "ShaderCard";
export {
  Le as AnimatedCounter,
  fe as AnnouncementBar,
  Jo as AppDownloadButtons,
  Wo as AppDownloadContent,
  Yo as AppDownloadDescription,
  Oo as AppDownloadInfo,
  es as AppDownloadMockup,
  Uo as AppDownloadSection,
  Xo as AppDownloadTitle,
  as as AppQRCode,
  Ko as AppStoreBadge,
  Lo as AvatarStack,
  No as BentoCard,
  So as BentoCardBadge,
  Ro as BentoCardContent,
  Co as BentoCardDescription,
  bo as BentoCardIcon,
  ko as BentoCardImage,
  To as BentoCardLink,
  wo as BentoCardTitle,
  ho as BentoGrid,
  Ao as BentoGridPreset,
  ro as BlogCard,
  fo as BlogCardAuthor,
  uo as BlogCardAuthorAvatar,
  po as BlogCardAuthorName,
  so as BlogCardCategory,
  to as BlogCardContent,
  no as BlogCardDate,
  co as BlogCardExcerpt,
  vo as BlogCardFeatured,
  mo as BlogCardFooter,
  ao as BlogCardImage,
  go as BlogCardLink,
  oo as BlogCardMeta,
  io as BlogCardReadTime,
  lo as BlogCardTitle,
  Zt as BlogGrid,
  zr as CTAActions,
  Er as CTACard,
  Mr as CTAContent,
  Vr as CTADescription,
  Fr as CTASection,
  Ir as CTATitle,
  at as ComparisonCategory,
  Oa as ComparisonCell,
  Ya as ComparisonCheck,
  Da as ComparisonDescription,
  Xa as ComparisonFeatureCell,
  Pa as ComparisonHeader,
  Ua as ComparisonHeaderCell,
  Ka as ComparisonMinus,
  Za as ComparisonPlanHeader,
  et as ComparisonPlanName,
  rt as ComparisonPlanPrice,
  Ea as ComparisonSection,
  ja as ComparisonTable,
  Ga as ComparisonTableBody,
  qa as ComparisonTableHead,
  Ha as ComparisonTableInner,
  $a as ComparisonTableRow,
  _a as ComparisonTitle,
  Ja as ComparisonX,
  gt as ContactContent,
  yt as ContactDescription,
  bt as ContactDetailItem,
  Nt as ContactDetails,
  kt as ContactForm,
  Mt as ContactFormError,
  Tt as ContactFormField,
  Bt as ContactFormInput,
  At as ContactFormLabel,
  St as ContactFormRow,
  Lt as ContactFormSelect,
  It as ContactFormSuccess,
  Ft as ContactFormTextarea,
  xt as ContactHeader,
  vt as ContactInfo,
  pt as ContactSection,
  Ct as ContactSocialLink,
  wt as ContactSocials,
  ht as ContactTitle,
  mr as ContentSpot,
  gr as ContentSpotActions,
  pr as ContentSpotDescription,
  fr as ContentSpotEyebrow,
  ur as ContentSpotTitle,
  ws as CookieBanner,
  Ts as CookieBannerActions,
  Cs as CookieBannerContent,
  Ss as CookieBannerDescription,
  As as CookieBannerLink,
  Rs as CookieBannerText,
  ks as CookieBannerTitle,
  Vs as CookiePreferenceItem,
  Bs as CookiePreferences,
  Ms as CookiePreferencesDescription,
  zs as CookiePreferencesFooter,
  Fs as CookiePreferencesHeader,
  Is as CookiePreferencesList,
  Ls as CookiePreferencesTitle,
  Ot as CountdownAnnouncementBar,
  Ns as CountdownTimer,
  ys as CounterGrid,
  hs as CounterWithLabel,
  zo as CustomerCount,
  tt as EmailForm,
  me as FAQAnswer,
  Va as FAQContact,
  Ba as FAQDescription,
  Ta as FAQHeader,
  Ma as FAQItem,
  Ia as FAQItemCard,
  La as FAQList,
  ce as FAQQuestion,
  Sa as FAQSection,
  Aa as FAQTitle,
  _s as FRAGMENT_SHADER_AURORA,
  Ds as FRAGMENT_SHADER_BLOB,
  Ps as FRAGMENT_SHADER_GRADIENT,
  qs as FRAGMENT_SHADER_MESH_GRADIENT,
  js as FRAGMENT_SHADER_NOISE,
  Gs as FRAGMENT_SHADER_PARTICLES,
  Hs as FRAGMENT_SHADER_WAVE,
  xr as FeatureSpot,
  Tr as FeatureSpotContent,
  br as FeatureSpotDescription,
  hr as FeatureSpotEyebrow,
  wr as FeatureSpotGrid,
  yr as FeatureSpotHeader,
  Cr as FeatureSpotItem,
  kr as FeatureSpotItemDescription,
  Rr as FeatureSpotItemTitle,
  Ar as FeatureSpotMedia,
  Sr as FeatureSpotSplit,
  Nr as FeatureSpotTitle,
  Po as FeaturedIn,
  Et as Footer,
  qt as FooterBottom,
  Pt as FooterContent,
  Gt as FooterCopyright,
  Ht as FooterLink,
  jt as FooterLinks,
  _t as FooterSection,
  $t as FooterSocial,
  Qt as FooterSocialLink,
  Dt as FooterTitle,
  Ho as GoogleMapEmbed,
  Zo as GooglePlayBadge,
  Vt as HeaderNavigation,
  or as Hero,
  lr as HeroActions,
  sr as HeroBadge,
  dr as HeroImage,
  ir as HeroSubtitle,
  nr as HeroTitle,
  ma as LogoCloud,
  ua as LogoCloudItem,
  $o as MapWithInfo,
  os as Marquee,
  ss as MarqueeItem,
  ls as MarqueeTestimonial,
  cs as MarqueeTestimonialAuthor,
  ms as MarqueeTestimonialAvatar,
  ds as MarqueeTestimonialContent,
  fs as MarqueeTestimonialInfo,
  us as MarqueeTestimonialName,
  ps as MarqueeTestimonialRole,
  st as Newsletter,
  lt as NewsletterDescription,
  mt as NewsletterDisclaimer,
  dt as NewsletterForm,
  nt as NewsletterIcon,
  ct as NewsletterInput,
  ft as NewsletterSuccess,
  it as NewsletterTitle,
  qo as OpenStreetMapEmbed,
  Ie as PRESET_COLORS,
  rs as PhoneMockup,
  Te as PricingCard,
  Yt as PricingOptions,
  Jt as PricingTable,
  ha as Quote,
  Na as QuoteAuthor,
  ba as QuoteAuthorAvatar,
  wa as QuoteAuthorInfo,
  Ca as QuoteAuthorName,
  Ra as QuoteAuthorTitle,
  ya as QuoteText,
  Wt as RotatingAnnouncementBar,
  Me as SHADER_PRESETS,
  Ws as ShaderAurora,
  Ve as ShaderBackground,
  Os as ShaderBlob,
  j as ShaderCanvasOGL,
  Qs as ShaderCanvasR3F,
  en as ShaderCard,
  Us as ShaderGradient,
  Zs as ShaderHero,
  Js as ShaderMesh,
  Xs as ShaderNoise,
  Ks as ShaderParticles,
  Ys as ShaderWave,
  Fo as SocialProof,
  Eo as SocialProofBanner,
  Mo as StarRating,
  Qr as StatItem,
  Wr as StatLabel,
  Or as StatTrend,
  Ur as StatValue,
  Hr as StatsDescription,
  Gr as StatsGrid,
  Dr as StatsHeader,
  _r as StatsSection,
  jr as StatsTitle,
  Zr as TeamDescription,
  ra as TeamGrid,
  Jr as TeamHeader,
  ta as TeamMember,
  ia as TeamMemberBio,
  oa as TeamMemberImage,
  da as TeamMemberLink,
  la as TeamMemberLinks,
  sa as TeamMemberName,
  na as TeamMemberRole,
  Yr as TeamSection,
  Kr as TeamTitle,
  Se as Testimonial,
  ga as TestimonialCarousel,
  pa as TestimonialGrid,
  Vo as TrustBadge,
  Io as TrustBadges,
  Es as VERTEX_SHADER_DEFAULT,
  is as VerticalMarquee,
  jo as VideoModal,
  Ae as VideoPlayer,
  Do as VimeoEmbed,
  _o as YouTubeEmbed,
  s as cn,
  U as hexToVec3
};
