---
"@eluan/core": patch
---

Portal `TooltipContent` and `HoverCardContent`, so they honour
`PortalContainerProvider` / `EluanProvider portalContainer` like every other
Eluan overlay. Both now accept an optional `container` prop to override the
portal target per instance. Previously a scoped theme reached the trigger but
not the tooltip or hover card.
