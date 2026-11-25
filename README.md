# Annapoorneshwari Tours & Travellers

A two-page marketing site for a Bangalore travel operator, rebuilt in React from the
static designs in `Design/`. Home and Gallery share one component system, one content
layer and one WhatsApp enquiry flow.

- **Live routes:** `/#/` (Home) and `/#/gallery` (Service Gallery)
- **Specification:** [spec.md](./spec.md)
- **Design references:** [Design/index.html](./Design/index.html), [Design/gallery.html](./Design/gallery.html)

## Original requirements

- just a simple react project which must be all be build into static pages.
- will be using github pages to publish
- use vite and react for this.
- use extenal libraries for micro interactions and animation like gsap, anime.js
- have placeholder images and proper naming for assets
- use tailwind css to manage styling
- breakdown into managable automic components and build on top of it.
- use shadcn ui library for simple components
- there will be 2 environment development (dev) and production (prod) use node_env variable for this.
- in dev there will be logs on each step and it should be shown in development mode
- in prod no logs should be shown unless it's a required log to show, aka these dev logs must not be bundled

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 8 + React 19 + TypeScript 7 |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens) |
| Primitives | shadcn-style components on Radix UI + `class-variance-authority` |
| Icons | Custom WhatsApp SVG + `lucide-react` |
| Animation | GSAP (hero stagger, scroll reveals), CSS (accordion, dialog) |
| Fonts | Self-hosted Figtree via `@fontsource` |
| Routing | React Router (`HashRouter` for GitHub Pages) |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173. Development mode logs every step to the console and
mounts a small “Dev log” panel in the bottom-left corner.

```bash
npm run typecheck   # TypeScript only
npm run build       # typecheck + production build to dist/
npm run preview     # serve the production build
```

## Pages

| Route | Composition |
| --- | --- |
| `/#/` | Hero with full-bleed backdrop, FAQ accordion |
| `/#/gallery` | Intro + jump rail, five zig-zag service rows, closing CTA band |
| any other hash | 404 page with a link home |

Both pages share `PageShell`: skip link, header, `<main>` landmark, footer and the
global WhatsApp dialog.

## Project structure

```text
src/
├── App.tsx                     # routes, scroll reset, provider
├── main.tsx                    # font imports, CSS, HashRouter, dev panel
├── components/
│   ├── ui/                     # button, accordion, dialog, container, pill
│   ├── common/                 # brand logo, WhatsApp CTA/icon/dialog, call CTA, heading, band
│   ├── layout/                 # page shell, header, footer, nav link, skip link
│   ├── home/                   # hero, FAQ section
│   └── gallery/                # intro, showcase, service row
├── constants/
│   ├── site.ts                 # brand, nav, WhatsApp, contact, footer, page meta
│   ├── home.ts                 # hero, FAQ intro, FAQ list
│   ├── gallery.ts              # intro, five services, closing band
│   └── index.ts                # re-exports
├── dev/dev-log-panel.tsx       # development-only on-screen log
├── hooks/                      # hero intro, scroll reveal, document meta
├── lib/                        # cn, asset URL, WhatsApp helpers, logger, motion
├── pages/                      # home, gallery, 404
├── providers/                  # WhatsApp context + fallback dialog state
├── styles/index.css            # Tailwind theme, base, layout components
└── types/content.ts            # shared content contracts

public/assets/images/           # logo, favicon, hero, five service placeholders
```

## Content and constants

All marketing copy is in `src/constants/`. Components never hard-code business copy.

- **Brand / navigation / footer:** `src/constants/site.ts`
- **Home hero + FAQs:** `src/constants/home.ts`
- **Gallery services:** `src/constants/gallery.ts`
- **Shared shapes:** `src/types/content.ts`

When adding a service, include a unique `id`, a two-digit `number`, image dimensions,
meaningful `alt` text and a `whatsappTopic`. Add the image to
`public/assets/images/` and reference it through `asset("assets/images/<name>.svg")`.

## WhatsApp configuration

The site is configured with the verified number **+91 99000 55563**
(`WHATSAPP.phoneNumber = "919900055563"`), so every WhatsApp CTA opens a real
`wa.me` link with a context-specific message:

- Header and footer: general enquiry.
- Home hero: travel planning from Bangalore.
- FAQ: a question about the services.
- Gallery cards: the specific service.
- Closing band: custom routes or monthly contracts.
- 404 page: help finding the right page.

To change it:

1. Open `src/constants/site.ts`.
2. Set `WHATSAPP.phoneNumber` to digits only, including country code
   (for example `"919900055563"`).
3. Optionally adjust `prefilledMessage`, CTA labels and `contextMessages`.

If the number is emptied, every CTA automatically falls back to the guided
dialog that explains the configuration and copies the prefilled message.

### Click-to-call

`CallCta` (`src/components/common/call-cta.tsx`) renders a `tel:` action whenever
`CONTACT.phoneDisplay` is set. It appears in the footer next to the WhatsApp CTA
and logs a `cta:call:click` event in development.

Contact rows in the footer are hidden until the matching `CONTACT` value is filled in.
The phone row is active now:

```ts
export const CONTACT = {
  phoneDisplay: "+91 99000 55563",
  email: "",           // hidden until verified
  address: "",         // hidden until verified
  hours: "",           // hidden until verified
};
```

Only add details the business has verified.

## Environments and logging

| | Development | Production |
| --- | --- | --- |
| Command | `npm run dev` | `npm run build` |
| `import.meta.env.DEV` | `true` | `false` |
| Console logs | Boot, steps, events, CTA/dialog actions | Only `warn` / `error` |
| On-screen dev panel | Yes | Not bundled |
| Source maps | Dev tooling | Disabled |

Vite derives `DEV`/`PROD` from `NODE_ENV` (development for `vite`, production for
`vite build`), so no `.env` file is required. Dev branches in `src/lib/logger.ts` are
wrapped in `import.meta.env.DEV` and removed from the production bundle.

## Assets

Placeholders live in `public/assets/images/` and follow a descriptive naming scheme:

```text
logo.svg
favicon.svg
hero-banner.svg
service-airport-transfer.svg
service-employee-transport.svg
service-campus-commute.svg
service-tourist-travel.svg
service-monthly-contract.svg
```

Every image declares width/height, and content images carry descriptive alt text.
Replace the SVGs with licensed photography when available; keep the same filenames or
update the matching constants.

## Deploying to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push the repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually).

The workflow builds with `BASE_PATH=/<repository>/` for project sites and `/` for
`<user>.github.io` repositories. For a custom domain, change `BASE_PATH` to `/`.

Manual deploy:

```bash
BASE_PATH=/<repository-name>/ npm run build
# publish the contents of dist/
```

Routing uses `HashRouter`, so deep links such as `/#/gallery` work on GitHub Pages
without a `404.html` rewrite.

## Specification

Functional requirements, use cases, non-functional targets, constants and the
component architecture are documented in [spec.md](./spec.md).
