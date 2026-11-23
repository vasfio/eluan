---
name: Footer
use_when: A site page needs a bottom section with grouped links, legal links, a copyright line and social links.
instead_of: CardFooter, DialogFooter or SheetFooter for the bottom of those surfaces; NavigationDrawerFooter for the bottom of an app sidebar; Header for the top bar.
source: packages/core/src/components/footer.tsx
---

# Footer

## 1. Overview

Footer is a composable site footer. `Footer` renders a `<footer>` with a centred container, and you build the inside from parts: a responsive grid of link sections, a bottom row with the copyright and social links, and optional brand treatments. It comes in two variants (`default` and `modern`) and three paddings, with an optional full-bleed `wordmark` and a `FooterStagger` grid that fades its columns in.

## 2. When to use

- The bottom of a marketing, docs or content site: grouped links, legal links, copyright, social links.
- A compact legal bar with a copyright line and a few links (`size="sm"`).
- A branded closing band with a large wordmark (`variant="modern"` with `wordmark`).

### When not to use

- Actions at the bottom of a card → use `CardFooter` in [Card](./card.md).
- Buttons at the bottom of a dialog or side panel → use `DialogFooter` in [Dialog](./dialog.md) or `SheetFooter` in [Sheet](./sheet.md).
- The bottom of an app sidebar → use `NavigationDrawerFooter` in [NavigationDrawer](./navigation-drawer.md).
- The top bar of the page → use [Header](./header.md).

## 3. Anatomy

1. **Footer**: the `<footer>` landmark. Applies the variant surface and vertical padding, and centres a container up to `80rem` with `--spacing-md` side padding.
2. **FooterContent**: a grid of columns: one column, two from 768px, four from 1024px.
3. **FooterSection**: one column; stacks its title and links with a `--spacing-md` gap.
4. **FooterTitle**: the column heading, an `<h3>` in `--container-fg-alt`.
5. **FooterLinks**: the `<ul>` that holds a column's links.
6. **FooterLink**: an `<li>` with an underlined `<a>` inside. `FooterModernLink` is identical.
7. **FooterBottom**: the closing row under a top border in `--container-border-alt`; stacked on small screens, spread across one row from 768px.
8. **FooterCopyright**: a `<p>` in `--container-fg-alt`.
9. **FooterSocial**: a row of social links.
10. **FooterSocialLink**: a ghost icon Button wrapping an `<a>`, named by `label`. `FooterModernSocialLink` is the round version.
11. **FooterBrand** (optional): a large, faint, uppercase brand name above a bottom border.
12. **FooterStagger** (optional): the same grid as FooterContent, fading each child in one after another.
13. **Wordmark** (optional, `wordmark` prop): a huge brand word along the bottom edge with its lower half clipped. Decorative and hidden from assistive tech.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `default` | Most footers: the page surface (`--container-bg`) with a top border in `--container-border-alt`. |
| `modern` | A dark closing band: `--container-fg` background with `--container-fg-inverse` text, usually with `wordmark` and FooterStagger. Titles, copyright and social icons are currently near-invisible on it; see Accessibility. |

<!-- REVIEW: "Use for" text drafted from the variant styles and stories; source gives no usage guidance. -->

## 5. Sizes

`size` sets the vertical padding.

| Size | Use in |
| --- | --- |
| `sm` | A compact legal bar with a copyright line and a few links (`--spacing-lg` padding). |
| `default` | A standard multi-column footer (`--spacing-2xl`). |
| `lg` | A spacious closing band (1.5 × `--spacing-2xl`); the Modern story pairs it with `wordmark`. |

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Underlined links in the inherited text colour | |
| Hover | Links fade to 70% opacity; social links take the ghost Button hover | |
| Focus | Links: 1px outline in `--focus-ring`, 2px offset. Social links: Button focus outline | Never remove or restyle the focus ring. |

## 7. Content guidelines

- Title each column with a short, sentence-case noun: "Product", "Company", "Resources", "Legal".
- Label links with the destination's name: "Changelog", "Help center", "Cookie policy".
- Write the copyright as "© 2026 Northwind Ltd. All rights reserved." with the current year.
- Name each social link after the network in `label`: "GitHub", "LinkedIn".
- Pass your own brand to FooterBrand; its default text is "ELUAN".

| Do | Don't |
| --- | --- |
| Help center | Click here for help |
| Privacy | Privacy Policy Information |
| `label="GitHub"` | `label="icon"` |

## 8. Rules

1. Put FooterLink only inside FooterLinks; it renders an `<li>`. Don't put bare anchors in FooterLinks.
2. Use FooterContent for the column grid, or FooterStagger for the same grid with a fade-in. Never nest one in the other.
3. Give every FooterSocialLink a `label`, mark its icon `aria-hidden="true"`, and size the icon with `--size-xxs`.
4. Pass `text` or children to FooterBrand. Without them it shows "ELUAN".
5. Wrap the link columns in `<nav aria-label="Footer">` so they form a named navigation landmark. <!-- REVIEW: drafted; Footer renders no nav element. -->
6. Check the heading outline: FooterTitle is always an `<h3>` and has no `as` prop. <!-- REVIEW: source gap; the heading level can't be changed. -->
7. Use one Footer per page and keep it outside `<main>` so it's the `contentinfo` landmark.
8. Lay out anything else inside Footer with a wrapper you own, as the Small story does. Footer and its parts drop `className` and `style`.
9. Prefer `variant="default"` until the `modern` contrast issue is fixed.
10. Don't call `footerVariants`. It always returns an empty string.

## 9. Dos and don'ts

**Do:** compose links from the parts.

```tsx
<FooterSection>
  <FooterTitle>Company</FooterTitle>
  <FooterLinks>
    <FooterLink href="/about">About</FooterLink>
    <FooterLink href="/careers">Careers</FooterLink>
  </FooterLinks>
</FooterSection>
```

**Don't:** put bare anchors in the list or style the parts.

```tsx
<FooterLinks style={{ gap: 12 }}>
  <a href="/about">About</a>
  <a href="/careers">Careers</a>
</FooterLinks>
```

**Do:** name social links and size icons with a token.

```tsx
<FooterSocialLink href="https://github.com/northwind" label="GitHub">
  <Github aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
</FooterSocialLink>
```

**Don't:** leave them unnamed or size icons in pixels.

```tsx
<FooterSocialLink href="https://github.com/northwind" label="">
  <Github size={20} />
</FooterSocialLink>
```

## 10. Accessibility

- Role: `<footer>` is the `contentinfo` landmark when it isn't nested inside `<main>`, `<article>`, `<aside>`, `<nav>` or `<section>`. FooterLinks is a list, so screen readers announce each column's link count. FooterTitle is an `<h3>`. The `wordmark` is `aria-hidden`.
- Label: FooterLink takes its text. FooterSocialLink puts `label` on the anchor as `aria-label`.
- Keyboard: Tab moves through the links in DOM order; Enter follows a link.
- Focus: FooterLink shows an outline on `:focus-visible`; social links use the Button outline.
- Contrast: handled by the theme. Don't override colours.
- Modern variant: FooterTitle and FooterCopyright (`--container-fg-alt`) and the social icons (ghost Button colour) sit at about 1.3:1 on the `modern` background, in both light and dark mode. Use `default` until it's fixed. <!-- REVIEW: source bug, not in the fix plan. `modern` sets the background to --container-fg but these parts keep their own dark-on-light colours. -->

## 11. Behaviour

- Responsive: FooterContent and FooterStagger go from one column to two at 768px and four at 1024px. FooterBottom stacks below 768px and spreads into one row above it.
- Overflow and truncation: link text wraps. The `wordmark` never wraps; it's scaled to the viewport and its lower half is clipped by the footer.
- Motion: links fade on hover over 150ms. FooterStagger fades and lifts each child on mount (0.5s each, `delayMs` apart, 80ms by default), not when scrolled into view. Under reduced motion each fade is near-instant, but the delays remain, so columns still appear one by one.
- With `wordmark`, the container gets extra bottom padding (`--spacing-2xl`) so content clears the word.

## 12. API

<!-- api:start -->
### Footer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "modern" \| null` | `"default"` | Surface treatment. |
| `size` | `"sm" \| "default" \| "lg" \| null` | `"default"` | Vertical padding. |
| `wordmark` | `string` | | Full-bleed decorative brand word along the bottom edge, lower half clipped, hidden from assistive tech. |
| `...props` | `HTMLAttributes<HTMLElement>` without `className`, `style` | | Applied to the `<footer>`. Children render inside the centred container. `className` and `style` are omitted. |

### FooterSocialLink and FooterModernSocialLink

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | | Accessible name, set as `aria-label` on the link. Required. |
| `children` | `ReactNode` | | The icon. |
| `...props` | `AnchorHTMLAttributes<HTMLAnchorElement>` without `className`, `style` | | `href`, `target`, `rel`. Renders a ghost `icon` Button around the `<a>`; the Modern version is round. |

### FooterBrand

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"ELUAN"` | Brand text, shown uppercase, when there are no children. |
| `children` | `ReactNode` | | Replaces the text, for example with a logo. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | |

### FooterStagger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delayMs` | `number` | `80` | Milliseconds between each child's fade-in. |
| `children` | `ReactNode` | | Each child is wrapped in an animated cell of the column grid. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | |

### Structural parts

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` (FooterContent, FooterSection, FooterBottom, FooterSocial) | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Each renders a `<div>`. |
| `...props` (FooterTitle) | `HTMLAttributes<HTMLHeadingElement>` without `className`, `style` | | Renders an `<h3>`. |
| `...props` (FooterLinks) | `HTMLAttributes<HTMLUListElement>` without `className`, `style` | | Renders a `<ul>` with no bullets. |
| `...props` (FooterLink, FooterModernLink) | `AnchorHTMLAttributes<HTMLAnchorElement>` without `className`, `style` | | `href`, `target`, `rel`. Renders `<li><a>`; `ref` points to the `<a>`. |
| `...props` (FooterCopyright) | `HTMLAttributes<HTMLParagraphElement>` without `className`, `style` | | Renders a `<p>`. |

### footerVariants

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `footerVariants(options?)` | `(options?: { variant?, size? }) => string` | | Always returns `""`. Kept for compatibility; don't use it. |
<!-- api:end -->

## 13. Examples

```tsx
import {
  Footer,
  FooterBottom,
  FooterContent,
  FooterCopyright,
  FooterLink,
  FooterLinks,
  FooterSection,
  FooterSocial,
  FooterSocialLink,
  FooterTitle,
} from "@eluan/core";
import { Github, Linkedin, Rss } from "lucide-react";

const iconStyle = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

export function SiteFooter() {
  return (
    <Footer>
      <nav aria-label="Footer">
        <FooterContent>
          <FooterSection>
            <FooterTitle>Product</FooterTitle>
            <FooterLinks>
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Company</FooterTitle>
            <FooterLinks>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Resources</FooterTitle>
            <FooterLinks>
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/help">Help center</FooterLink>
              <FooterLink href="/status">Status</FooterLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Legal</FooterTitle>
            <FooterLinks>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/cookies">Cookie policy</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>
      </nav>
      <FooterBottom>
        <FooterCopyright>© 2026 Northwind Ltd. All rights reserved.</FooterCopyright>
        <FooterSocial>
          <FooterSocialLink href="https://github.com/northwind" label="GitHub">
            <Github aria-hidden="true" style={iconStyle} />
          </FooterSocialLink>
          <FooterSocialLink href="https://www.linkedin.com/company/northwind" label="LinkedIn">
            <Linkedin aria-hidden="true" style={iconStyle} />
          </FooterSocialLink>
          <FooterSocialLink href="/blog/rss.xml" label="Blog RSS feed">
            <Rss aria-hidden="true" style={iconStyle} />
          </FooterSocialLink>
        </FooterSocial>
      </FooterBottom>
    </Footer>
  );
}
```

## 14. Related components

- [Header](./header.md): the matching top bar.
- [Button](./button.md): renders the social links (ghost, `icon` size).
- [Separator](./separator.md): for any extra divider you add inside the footer.
- [Card](./card.md): `CardFooter` for actions at the bottom of a card.
- [NavigationDrawer](./navigation-drawer.md): `NavigationDrawerFooter` for the bottom of an app sidebar.

## 15. Common agent mistakes

_Filled from evals._
