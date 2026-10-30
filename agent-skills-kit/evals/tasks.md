# Eluan eval tasks

Each task is a prompt given to an agent working in a fresh app that depends on Eluan. Keep prompts short and realistic: the way a person would actually ask. "Tests" lists what a correct answer must choose, so scoring stays consistent. Add a task for every with-skill failure you fix.

| Id | Prompt | Tests |
| --- | --- | --- |
| t01 | Build a signup form with name, email, password and a terms checkbox. | forms pattern, input labels, error states, one primary button |
| t02 | Add a "Delete project" action that asks before deleting. | dialog, destructive variant, focus returns to trigger |
| t03 | Build an account settings page with profile, notifications and billing sections. | page layout, switches for on/off settings, grouping and spacing tokens |
| t04 | Show a success message after the user saves settings. | toast, not alert or banner |
| t05 | Show a form-level error when the server rejects the signup. | inline alert in the form, not a toast |
| t06 | Build a pricing table with three plans, the middle one recommended. | card or table choice, one primary action, tokens only |
| t07 | Build the empty state for a dashboard with no projects yet. | empty state pattern, single clear action |
| t08 | Add tabs to switch between Overview, Activity and Settings. | tabs, not buttons or links styled as tabs |
| t09 | Build a users table with sorting and a row action menu. | table, menu, keyboard access |
| t10 | Add a search field to the top nav. | input with icon, accessible label without visible label |
| t11 | Make the app use our brand colour #2F6F5E with rounder corners. | theming foundation, generator, no per-component overrides |
| t12 | Add a dark mode toggle. | switch, theming, no hardcoded colours |
| t13 | Add an icon-only button to close a side panel. | icon button, aria-label, Lucide icon size token |
| t14 | Show a warning across the top that the trial ends in 3 days. | banner, not toast |
| t15 | Build a filter bar with a date range, a status select and a reset button. | select, date picker if available, secondary button for reset |
| t16 | Let users turn email notifications on and off; each change saves to the server. | switch, focus stays on the switch while it saves (aria-busy, not disabled), revert and inline error on failure |
| t17 | Add filters for assignee and labels above the issues list. | router sends field filters to forms and MultiSelect/Select, not SearchInput; labelled controls; a reset |

Remove or adapt tasks for components Eluan doesn't have (for example t09 without a table, t15 without a date picker). An agent hitting a missing component should follow "When nothing fits", and that is part of what's scored.
