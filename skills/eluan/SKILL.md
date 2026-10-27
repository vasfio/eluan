---
name: eluan
description: Build UI with the Eluan design system. Use whenever creating, editing or reviewing interface code in a project that depends on Eluan (@eluan/core, @eluan/tokens, @eluan/theme-generator), including pages, forms, layouts, theming, or picking which component to use.
---

# Eluan

Eluan is a React design system: 68 components in `@eluan/core`, styled with StyleX and themed through CSS custom properties from `@eluan/tokens`. Components read semantic tokens; your theme sets them.

Install: `pnpm add @eluan/core @eluan/tokens`
Import: `import { Button } from "@eluan/core"`

Set up once at the app entry:

```tsx
import "@eluan/core/styles.css";
import { EluanProvider } from "@eluan/core";

export function App({ children }: { children: React.ReactNode }) {
  return <EluanProvider defaultTheme="minimal">{children}</EluanProvider>;
}
```

## Rules

These always apply.

1. Use tokens for every colour, space, radius and type value. Never write raw hex, rgb, oklch, px or rem values.
2. Use an existing Eluan component before building anything custom. Check the index below first.
3. Never override focus styles, contrast pairs or keyboard behaviour.
4. Read a component's file before using it for the first time in a task.
5. Read the matching foundation file before making any visual decision.
6. The theme is generated. Change the theme, never individual component colours.
7. Never pass `className` or `style` to an Eluan component. Most drop them; the few that forward them (Toast, and parts that are plain Radix re-exports such as the Tabs root, menu Group, Portal and Sub parts, NavigationMenuLink) aren't a supported styling path, and on Toast they replace Eluan's styling. Put layout (width, margin, grid placement) on a wrapper element you own.
8. Use the semantic token layer (`--container-*`, `--interactive-*`, `--action-*`, tone tokens, `--spacing-*`, `--size-*`, `--curves-*`, `--font-size-*`). Never use primitives such as `--color-mono-500` or `--spacing-space-4`.
9. Import components and theme helpers from `@eluan/core` only. Don't import `@radix-ui/*` primitives or `@eluan/tokens` when Eluan wraps or re-exports them.
10. Eluan has no shadow or motion tokens yet. Don't add `box-shadow`, transitions or animations; use the component's own props (for example Card `elevation`).

Style your own layout elements with CSS that reads tokens: a stylesheet, CSS modules, StyleX, or an inline style object. Examples here use inline styles for brevity.

## How to work

1. Find the task's intent in the decision tree.
2. Read the pattern file it points to, if any.
3. Read each component file you'll use.
4. Read foundations for any visual choice the components don't settle.
5. Build. Then check your output against each component's Rules and Don'ts.

## Decision tree

| If the task is to… | Read | Then use |
| --- | --- | --- |
| Collect input from the user | `patterns/forms.md` | Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label, Fieldset, Button |
| Tell the user something happened | `patterns/feedback.md` | Toast for transient confirmation, Banner for persistent or blocking messages, FormMessage for a field |
| Ask the user to confirm | `components/dialog.md` | Dialog, never a custom modal |
| Let the user move between views | `patterns/navigation.md` | Tabs, Header, NavigationMenu, NavigationDrawer, Breadcrumb, Pagination |
| Lay out a page or show a collection | `patterns/page-layout.md` | Table for comparing, Card for browsing, Accordion for long secondary content |
| Show that there's nothing yet | `patterns/empty-states.md` | Typography and one Button, composed |
| Pick a date or time | `components/date-picker.md` | DatePicker, DateRangePicker, DateTimePicker, TimeInput, Calendar |
| Offer a menu of actions | `components/dropdown-menu.md` | DropdownMenu, ContextMenu, ActionPopover, Menubar |
| Show more content without leaving the page | `components/sheet.md` | Sheet, Drawer, Popover, HoverCard, Tooltip |
| Search, filter or run a command | `components/search-input.md` | SearchInput, Command, MultiSelect |
| Show status or progress | `components/badge.md` | Badge, Progress, Spinner, Skeleton |
| Set text | `components/typography.md` | Typography |
| Change the look of the product | `foundations/theming.md` | the theme generator output, `createTheme`, Provider axes |

## Component index

<!-- index:start -->
| Component | Use when | Instead, use | File |
| --- | --- | --- | --- |
| Accordion | Stacking several sections of secondary content the user may skip, each expanded from its own header, such as an FAQ or advanced settings. | Collapsible for a single show/hide region; Tabs for switching between peer views; Card or headings for content everyone needs. | `components/accordion.md` |
| ActionPopover | A table row, list item or card needs a compact "more actions" menu behind a three-dots button. | DropdownMenu when you need separators, groups, submenus, checkable items or a custom trigger; inline Buttons for one or two actions; Popover for a panel with form content. | `components/action-popover.md` |
| AspectRatio | Content you own (an embed, map, canvas or placeholder) must keep a fixed width-to-height ratio as its container resizes. | Image or Video ratio presets for images and videos; a hard-coded height on your own element. | `components/aspect-ratio.md` |
| Avatar | Showing a person or account as a small circular image with initials as the fallback, optionally with a presence dot or notification count. | Media or Image for content pictures; Badge for status without a person; a plain img for profile pictures. | `components/avatar.md` |
| Badge | Labelling the status or category of an item, such as Active, Draft, Failed or Beta. | Toast or Banner for messages; Avatar's AvatarStatus for presence; Button or Toggle for anything clickable; Progress, Spinner or Skeleton for loading. | `components/badge.md` |
| Banner | A message must stay visible until it's resolved: a form-level error, an account or page notice, or a blocking problem. | Toast for transient confirmation; FormMessage for a single field; Badge for an item's status; Dialog when the user must decide. | `components/banner.md` |
| Breadcrumb | A page sits two or more levels deep in a hierarchy and the user needs to see where they are and step back up. | NavigationDrawer or NavigationMenu for primary navigation; Stepper for steps in a process; Button variant link with asChild for a single Back link. | `components/breadcrumb.md` |
| Button | The user triggers an action, submits a form or opens an overlay. | Link or your router's link for navigation (Button asChild only to style one); Toggle or Switch for on/off state; DropdownMenu for a list of actions. | `components/button.md` |
| Calendar | A month grid stays visible on the page for picking one date, several dates or a range. | DatePicker or DateRangePicker for a date field in a form or filter bar; DateTimePicker when the time matters too. | `components/calendar.md` |
| Card | Grouping content about one item or topic on its own surface, such as a project, a plan or a settings group. | Table for items compared across the same attributes; Fieldset for a group of form fields; Dialog or Sheet for content over the page. | `components/card.md` |
| Carousel | Showing a row of similar slides the user pages through one or a few at a time, such as screenshots, testimonials or featured items. | Card grid when every item should be visible; Tabs for switching views; Stepper for an ordered process. | `components/carousel.md` |
| CheckboxGroup | The user picks any number of options from a short, visible list, such as notification channels or permissions. | RadioGroup when only one option can be chosen; MultiSelect for long or searchable lists; Switch rows for settings that apply immediately. | `components/checkbox-group.md` |
| Checkbox | A single yes/no choice the user confirms when they submit a form, such as accepting terms, or a select-all control above a list. | Switch for settings that apply immediately; CheckboxGroup for a labelled list of options; RadioGroup when only one option can be chosen. | `components/checkbox.md` |
| CodeBlock | Showing a multi-line code sample, config file or command with syntax highlighting and a copy button. | Kbd for keyboard keys; an inline code element with the mono font for code inside a sentence; Textarea for code the user edits. | `components/code-block.md` |
| Collapsible | One region of the page shows and hides in place behind a single trigger, such as advanced options or extra details. | Accordion for several stacked sections; Tabs for switching views; Popover, Sheet or Drawer for content that should float or slide in. | `components/collapsible.md` |
| Command | A searchable, keyboard-driven list of commands or options, as a Cmd+K palette (CommandDialog), an inline filterable list or a searchable picker in a Popover. | Select for a short fixed list; MultiSelect for several choices; SearchInput for a plain search field; DropdownMenu for a few actions behind a button. Eluan has no Combobox; Command is that primitive. | `components/command.md` |
| ContextMenu | Right-click or long-press on a surface (a file tile, canvas or row) should offer actions for that thing. | DropdownMenu or ActionPopover for a visible actions button; Menubar for an app-wide File/Edit bar; Select to pick a value. | `components/context-menu.md` |
| CreditCardInput | Your app collects card number, expiry and security code in its own fields and needs formatting and brand detection. | Your payment provider's hosted card fields when it offers them; Input for any other text; NumberInput for quantities. | `components/credit-card-input.md` |
| DatePicker | The user picks one date (DatePicker) or a start and end date (DateRangePicker) in a form or filter bar. | Input type=date or a hand-built Popover and Calendar; DateTimePicker when a time is needed; TimeInput for a time alone; Calendar for an always-visible grid. | `components/date-picker.md` |
| DateTimePicker | The user picks one moment, a date plus a time of day, such as a scheduled send or a meeting start. | A DatePicker next to a separate TimeInput; DatePicker when the time doesn't matter; TimeInput for a time with no date. | `components/date-time-picker.md` |
| DecimalInput | The user enters money, a percentage, a measurement or another decimal that should display with fixed decimals and thousands separators. | NumberInput for counts with steppers; Slider for approximate values on a range; Input for text that isn't a number. | `components/decimal-input.md` |
| Dialog | The user must confirm or finish one short task before going back to the page, including destructive confirmations. | Sheet for long or form-heavy secondary content; Popover for a small non-blocking panel; Toast or Banner to report an outcome; never window.confirm or a custom modal. | `components/dialog.md` |
| Drawer | A side panel opens beside the main content and pushes it aside, so the user can keep working in the page while it's open. | Sheet for a modal panel that covers the page (and on small screens); NavigationDrawer for app navigation; Popover for small anchored content. | `components/drawer.md` |
| DropdownMenu | A button opens a short list of actions or view settings, such as a table row's actions menu or an account menu. | Select to pick a form value; ActionPopover for a plain icon-only list of actions; ContextMenu for right-click; Menubar for an app-wide File/Edit bar. | `components/dropdown-menu.md` |
| EmailInput | The user types an email address, with optional inline format feedback once they leave the field. | Input for any other single-line text; PasswordInput, PhoneInput or SearchInput for those field types. | `components/email-input.md` |
| Fieldset | Grouping related form fields under one title in a bordered panel, such as an address or notification preferences. | Card for content that isn't a form; CheckboxGroup or RadioGroup alone for one list of options; Separator to divide form sections without a border. | `components/fieldset.md` |
| FileInput | The user attaches one or more files from their device, such as a receipt, an avatar or a CSV to import. | a bare native file input; ImageInput or DocumentInput (same module) when only images or only documents are allowed. | `components/file-input.md` |
| Footer | A site page needs a bottom section with grouped links, legal links, a copyright line and social links. | CardFooter, DialogFooter or SheetFooter for the bottom of those surfaces; NavigationDrawerFooter for the bottom of an app sidebar; Header for the top bar. | `components/footer.md` |
| FormLabel | Naming a form control, adding helper text under it, or showing an error or status message for one field. | FieldsetLegend to title a group of fields; Banner for form-level or server errors; Toast for a saved confirmation; Typography for text that isn't part of a form. | `components/form-label.md` |
| Header | A site or simple app needs a top bar with a logo, a flat list of page links and actions such as search or sign-in, collapsing to a menu on small screens. | NavigationMenu for links with dropdown panels; NavigationDrawer for an app shell with a sidebar; Tabs for switching views inside a page. | `components/header.md` |
| HoverCard | A pointer user rests on a link or mention and sees a read-only preview of what it points to, such as a profile card. | Popover for anything interactive or essential; Tooltip for a short text hint; a page or Sheet for full details. | `components/hover-card.md` |
| InputOTP | The user enters a short numeric one-time code from an email, text message or authenticator app. | Input for codes with letters; PasswordInput for a password or chosen PIN; NumberInput for quantities. | `components/input-otp.md` |
| Input | The user types a single line of free text: a name, title, URL, code or short answer. | Textarea for more than one line; EmailInput, PasswordInput, SearchInput, PhoneInput or NumberInput when the value has that shape; Select or RadioGroup to pick from known options. | `components/input.md` |
| Kbd | Show a keyboard key or shortcut as a keycap in help text, a tooltip, a shortcuts list or next to a trigger's label. | CommandShortcut, DropdownMenuShortcut, ContextMenuShortcut or MenubarShortcut inside those menus' rows; CodeBlock for code; plain text like Ctrl-K. | `components/kbd.md` |
| Media | You show a content image or a video and want a ratio preset, token-rounded corners, a loading state or simple playback controls. | Avatar for profile pictures; AspectRatio for embeds and custom ratios; Carousel for a slideshow; Skeleton before you have a source. | `components/media.md` |
| Menubar | An editor-style app needs a persistent desktop-style bar of menus such as File, Edit and View. | DropdownMenu for a single menu; NavigationMenu or Header for site navigation; Button or ToggleGroup for a toolbar of direct actions. | `components/menubar.md` |
| MultiSelect | The user picks several values from a list long enough to need search, such as labels, tags, assignees or filter values. | CheckboxGroup for a short list that should stay visible; Select for one value; ToggleGroup type="multiple" for toolbar states. | `components/multi-select.md` |
| NavigationDrawer | An app needs persistent side navigation between its main sections, collapsible to an icon rail on desktop and a slide-in sheet on phones. | NavigationMenu or Header for a website's top navigation; Tabs to switch views within a page; Sheet or Drawer for temporary side content. | `components/navigation-drawer.md` |
| NavigationMenu | A site header needs a row of top-level navigation links, some of which open a panel of further links. | Header for a complete site header with a mobile menu; NavigationDrawer for an app's side navigation; Tabs to switch views within a page; DropdownMenu for actions. | `components/navigation-menu.md` |
| NumberInput | The user sets a count or small number with a known step, such as a quantity, with optional minus and plus buttons. | DecimalInput for money, percentages and formatted decimals; Slider for approximate values on a range; Input for digits that aren't quantities. | `components/number-input.md` |
| Pagination | A long list or table is split into numbered pages and the user moves between them. | Tabs to switch views of the same page; Stepper for ordered steps; a "Load more" Button for feeds; Carousel for slides. | `components/pagination.md` |
| PasswordInput | The user types a password, with an optional strength meter and requirement checklist when they create one. | Input for any other single-line text; InputOTP for one-time codes; EmailInput for the username field. | `components/password-input.md` |
| PhoneInput | The user enters a phone number and you need its country calling code. | Input type="tel" when the country is fixed; Input for any other text. | `components/phone-input.md` |
| Popover | A small interactive panel (a short form, a few options) opens from a control and floats next to it without blocking the page. | DropdownMenu or ActionPopover for a list of actions; Tooltip for a text hint; HoverCard for a hover preview; Dialog or Sheet for content that must block the page. | `components/popover.md` |
| Progress | Showing how far a task with a known amount has got, such as an upload, a sync or setup completion. | Spinner when you can't say how long it will take; Skeleton for content loading into a layout; Stepper for steps in a flow. | `components/progress.md` |
| RadioGroup | The user picks exactly one option from a short list that should stay visible, such as a plan, density or delivery speed. | Select for long lists or tight space; CheckboxGroup when several options can be chosen; SegmentedControl or Tabs to switch between views. | `components/radio-group.md` |
| RichText | The user writes formatted long-form content (headings, lists, emphasis) that you store as HTML. | Textarea for plain multi-line text; Input for a single line; CodeBlock for showing code. | `components/rich-text.md` |
| ScrollArea | A bounded box needs its own scrolling region with themed scrollbars, such as a long list in a fixed-height panel. | Letting the page scroll for page-length content; Accordion or Collapsible to shorten secondary content; the built-in scrolling of Command lists and Select menus. | `components/scroll-area.md` |
| SearchInput | The user types a query to search or filter, in a header, toolbar or above a list; AutocompleteSearch when they pick one result from suggestions. | Command for a command palette; Select or MultiSelect for choosing from a fixed list; Input for text that isn't a query. | `components/search-input.md` |
| SegmentedControl | The user picks exactly one of two to five short options that set the mode or filter of the current view, such as Day, Week, Month or List, Board. | Tabs when each option has its own content panel; ToggleGroup for toolbar tool options or several values; RadioGroup for a value submitted with a form; Select for longer lists. | `components/segmented-control.md` |
| Select | The user picks one value from a list too long to show as radio buttons, such as country, time zone or role. | RadioGroup for a few options that fit on screen; SegmentedControl for a mode of the same view; MultiSelect for several values; DropdownMenu for actions. | `components/select.md` |
| Separator | You need a visible line between sections, list rows or groups of inline items. | A border or spacing-token line on your own element; the separator part of DropdownMenu, ContextMenu, Menubar, Select or Command inside those; BreadcrumbSeparator in a breadcrumb. | `components/separator.md` |
| Sheet | Secondary content or a longer task (edit a record, filters, details) opens in a modal panel from the edge of the screen. | Drawer for a non-modal panel that pushes the page; Dialog for a short confirmation; Popover, HoverCard or Tooltip for small content anchored to a control. | `components/sheet.md` |
| Skeleton | Holding the shape of content that's loading into a known layout, such as a list, card grid or table on first load. | Spinner for a short in-place wait or a running action; Progress when the amount is known. | `components/skeleton.md` |
| Slider | The user sets a value or a range on a bounded scale where the position matters more than the exact number, such as volume, opacity or a price range. | NumberInput or DecimalInput when the exact value matters; SegmentedControl or RadioGroup for a few named steps; Progress to show progress. | `components/slider.md` |
| Spinner | Showing that something is working when you can't say how long it will take, such as a button action or a panel refreshing. | Progress when the amount is known; Skeleton when content loads into a known layout. | `components/spinner.md` |
| Stepper | Showing where the user is in a fixed sequence of steps, such as a checkout or an onboarding wizard. | Tabs for switching between independent views; Progress for a percentage; Breadcrumb for where a page sits in the site. | `components/stepper.md` |
| Switch | Turning a setting on or off where the change takes effect immediately, such as notifications or a feature flag. | Checkbox for choices the user submits with a form; Toggle for a pressed toolbar button; RadioGroup or SegmentedControl for more than two options. | `components/switch.md` |
| Table | Showing items the user compares across the same attributes, such as users, invoices or plan features. | Card for items browsed on their own; TreeView for hierarchical data; your own grid of divs for tabular data. | `components/table.md` |
| Tabs | One area of a page switches between a few peer views of the same subject, such as Overview, Activity and Settings for one project. | SegmentedControl to switch a value or filter without separate panels; NavigationMenu, NavigationDrawer or links to go to another page; Accordion to stack sections the user can open together. | `components/tabs.md` |
| Textarea | The user writes free text that can run past one line: a message, description, note or comment. | Input for single-line values; RichText when the text needs formatting such as bold, lists or links. | `components/textarea.md` |
| TimeInput | The user enters a time of day with no date, such as opening hours or a daily reminder. | Input type=time or a Select of times; DateTimePicker when a date is needed too. | `components/time-input.md` |
| Toast | Briefly confirming an action that just finished, such as "Settings saved"; mount Toast once, then call toast() from sonner. | Banner for persistent, blocking or form-level messages; FormMessage for a single field; Dialog when the user must decide. | `components/toast.md` |
| ToggleGroup | A row of related pressable tool options in a toolbar, pressing one (text alignment) or several (bold, italic, underline). | SegmentedControl for a mode or filter of the same view; RadioGroup or CheckboxGroup for a form value; Toggle for a single on/off; Tabs to switch panels. | `components/toggle-group.md` |
| Toggle | A single button that stays pressed to show a state of the content or view, such as Bold, Mute or Show grid. | Switch for an on/off setting; Button for a one-off action; ToggleGroup for a set of related toggles; Checkbox for a yes/no submitted with a form. | `components/toggle.md` |
| Tooltip | A short text hint appears when the user hovers or focuses a control, such as the label and shortcut of an icon-only button. | aria-label for naming a control (a tooltip only describes); Popover or HoverCard for rich or interactive content; inline helper text or FormMessage for anything essential. | `components/tooltip.md` |
| TreeView | Showing hierarchical data the user expands and picks from, such as a file explorer, a folder picker or a category tree. | Accordion for stacked content sections; NavigationDrawer for app navigation; nested lists you build yourself. | `components/tree-view.md` |
| Typography | Setting any app text (page titles, section headings, paragraphs, labels and captions) on the fluid type scale. | Raw h1–h6, p or span with hand-set font sizes; Label for form labels; CodeBlock or Kbd for code. | `components/typography.md` |
<!-- index:end -->

## Foundations

| File | Read before |
| --- | --- |
| `foundations/theming.md` | applying or switching a theme, dark mode, density, corner style |
| `foundations/colour.md` | choosing any colour |
| `foundations/typography.md` | setting any text style |
| `foundations/spacing.md` | any margin, padding, gap or fixed size |
| `foundations/radius.md` | any corner |
| `foundations/elevation.md` | any shadow or layering (no tokens yet) |
| `foundations/motion.md` | any transition or animation (no tokens yet) |
| `foundations/iconography.md` | adding an icon |

## When nothing fits

Compose from existing components and tokens. Add a code comment `// eluan: composed, no component for {intent}`. Never introduce a new colour, radius, shadow or font.

Known gaps: Eluan has no Alert (use Banner with `position="inline"`), no EmptyState (see `patterns/empty-states.md`), no Link (use Button `variant="link"` with `asChild`, or your router's link), no IconButton (use Button with an `icon*` size) and no List component.
