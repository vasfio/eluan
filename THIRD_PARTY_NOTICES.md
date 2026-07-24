# Third-Party Notices

Eluan is built on, and in places adapts source from, the open-source projects
listed below. Each project is provided under its own license.

This file is split into two parts:

1. **Adapted source** — projects whose code Eluan derives from or is directly
   built on. Their copyright and permission notices are reproduced in full below.
2. **Acknowledgements** — third-party libraries Eluan depends on but consumes
   **unmodified** as npm packages. Their complete license texts ship inside each
   package's own `node_modules` distribution; they are acknowledged here for
   attribution.

This file does not alter the license of Eluan itself, which is stated in the
root `LICENSE` file.

---

## Adapted source

### shadcn/ui

Component patterns and source in Eluan are derived from shadcn/ui.

- **Project:** shadcn/ui — <https://github.com/shadcn-ui/ui>
- **License:** MIT
- **Copyright:** Copyright (c) 2023 shadcn

```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

### Radix UI Primitives

Eluan's component behavior layer is built on Radix UI Primitives, which are also
redistributed as runtime dependencies of `@eluan/core`.

- **Project:** Radix Primitives — <https://github.com/radix-ui/primitives>
- **License:** MIT
- **Copyright:** Copyright (c) 2022-present WorkOS

```
MIT License

Copyright (c) 2022-present WorkOS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgements

The following libraries are used as unmodified dependencies. Their full license
texts are distributed with each package inside `node_modules`.

| Library | Used for | License |
|---------|----------|---------|
| [`@stylexjs/stylex`](https://github.com/facebook/stylex) | Component styling engine (compile-time, type-safe) | MIT |
| [`lucide-react`](https://github.com/lucide-icons/lucide) | Icon set | ISC |
| [`sonner`](https://github.com/emilkowalski/sonner) | Toast notifications | MIT |
| [`cmdk`](https://github.com/pacocoursey/cmdk) | Command palette | MIT |
| [`embla-carousel-react`](https://github.com/davidjerleke/embla-carousel) | Carousel | MIT |
| [`@tiptap/*`](https://github.com/ueberdosis/tiptap) | Rich text editor | MIT |
| [`react-day-picker`](https://github.com/gpbl/react-day-picker) | Calendar / date picking | MIT |
| [`date-fns`](https://github.com/date-fns/date-fns) | Date utilities | MIT |
| [`prismjs`](https://github.com/PrismJS/prism) | Code block syntax highlighting | MIT |
| [`countries-list`](https://github.com/annexare/Countries) | Country/phone data for inputs | MIT |
| [`culori`](https://github.com/Evercoder/culori) | Color math in `@eluan/theme-generator` | MIT |

---

*Last reviewed: July 2026. If a dependency is added, removed, or begins to have
its source adapted (rather than merely consumed), update this file to keep the
notices accurate.*
