# Third-Party Notices

Eluan is built on, and in places adapts source from, the open-source projects
listed below. Each project is provided under its own license.

This file is split into three parts:

1. **Adapted source** — projects whose code Eluan derives from or is directly
   built on. Their copyright and permission notices are reproduced in full below.
2. **Bundled fonts** — font files redistributed inside an Eluan package rather
   than pulled from a registry at install time. Their copyright and license
   notices are reproduced in full below, as their licenses require.
3. **Acknowledgements** — third-party libraries Eluan depends on but consumes
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

## Bundled fonts

### Paper Mono

`@eluan/tokens` redistributes Paper Mono as a variable WOFF2 (weight axis
100–800) at `packages/tokens/src/files/paper-mono-variable.woff2`, converted
from the upstream `PaperMono[wght].ttf` with no other modification. It is the
monospace face for every Eluan theme (`--font-mono`).

- **Project:** Paper Mono — <https://github.com/paper-design/paper-mono>
- **License:** SIL Open Font License, Version 1.1 — <https://openfontlicense.org>
- **Copyright:** Copyright 2025 The Paper Mono Project Authors
- **Designers:** Guido Ferreyra, Javier Quintana Godoy

```
Copyright 2025 The Paper Mono Project Authors
(https://github.com/paper-design/paper-mono)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
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
| [`@fontsource/inter`](https://github.com/fontsource/font-files) | Inter — heading + body face for the `minimal` theme | OFL-1.1 |

---

*Last reviewed: August 2026. If a dependency is added, removed, or begins to have
its source adapted (rather than merely consumed), update this file to keep the
notices accurate.*
