---
"@eluan/core": patch
---

Calendar draws its divider between side-by-side months again (two-month
calendars and `DateRangePicker`, from a 640px viewport). The rule's selector
was built from the months' StyleX className, several classes joined by spaces,
so it matched nothing; the months now carry a static `eluan-calendar-months`
class, like the calendar's other stable hooks.
