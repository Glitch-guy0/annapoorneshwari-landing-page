# Website Specification — Annapoorneshwari Tours & Travellers

| Field | Value |
| --- | --- |
| Status | Implemented (v1) |
| Version | 1.0.0 |
| Last updated | 2026-11-25 |
| Product | Two-page marketing site for a Bangalore travel operator |
| Pages | Home (`/#/`), Service Gallery (`/#/gallery`), 404 |
| Stack | Vite 8, React 19, TypeScript 7, Tailwind CSS 4, Radix UI, GSAP |
| Source of truth | `src/constants/*`, `src/types/content.ts`, this document |

---

## 1. Purpose and scope

### 1.1 Product summary

A fast, static, mobile-first website that helps visitors understand the transport
services offered by Annapoorneshwari Tours & Travellers and start a WhatsApp
conversation with the Bangalore team. The site does not take bookings or payments;
WhatsApp is the single conversion channel.

### 1.2 Goals

| ID | Goal |
| --- | --- |
| G1 | Present the five service lines clearly: airport transfers, employee transport, school/college commutes, Karnataka & Pan-India tours, monthly contracts. |
| G2 | Give every page a single, obvious WhatsApp action with a context-aware message. |
| G3 | Stay usable when the WhatsApp number has not been configured yet (guided fallback). |
| G4 | Make all copy editable from one constants layer without touching components. |
| G5 | Ship as static files that work on GitHub Pages with no server runtime. |

### 1.3 Non-goals (out of scope for v1)

- Booking engine, seat availability, fare calculation or payments.
- User accounts, authentication or saved trips.
- CMS, blog, reviews, testimonials or analytics.
- Live fleet tracking, driver assignment or dispatch tooling.
- Multi-language content, currency switching or dark mode.
- Real photography (brand-approved images will replace the placeholders).

### 1.4 Assumptions

- The business supplies a verified WhatsApp number, phone, email and address later.
  Until then those values remain empty and the UI degrades safely.
- All imagery in `public/assets/images/` is a licensed placeholder, not a real
  vehicle or destination photograph.
- Content is English-only and reviewed by the business before launch.
- The deployment target is a GitHub Pages project site or a custom domain.

---

## 2. Use cases

| ID | Actor | Use case | Entry point | Successful outcome |
| --- | --- | --- | --- | --- |
| UC-01 | Prospective customer | Understand the service offering | Home | Visitor knows what is offered and where to enquire |
| UC-02 | Prospective customer | Explore services visually | Gallery | Visitor finds the relevant service section |
| UC-03 | Prospective customer | Start a WhatsApp enquiry | Any WhatsApp CTA | WhatsApp opens with a relevant prefilled message |
| UC-04 | Prospective customer | Enquire before WhatsApp is configured | Any WhatsApp CTA | Visitor copies a ready-made message |
| UC-05 | Prospective customer | Resolve a question before messaging | Home → FAQ | Visitor's question is answered inline |
| UC-06 | Content editor / developer | Update copy, services or contact details | `src/constants/*` | Site reflects changes with no component edits |
| UC-07 | Maintainer | Publish the site | GitHub Actions / manual build | Static site is live and routes resolve |

### UC-01 — Understand the service offering (Home)

- **Preconditions:** The site loads with JavaScript enabled.
- **Main flow:**
  1. Visitor lands on `/#/`.
  2. Hero shows the eyebrow, headline, service summary and primary WhatsApp CTA.
  3. On large landscape screens the hero uses a full-bleed backdrop; on smaller
     screens or portrait orientation the same image appears in a framed figure.
  4. Visitor scrolls to the FAQ section for pre-enquiry answers.
- **Alternate flow:** Visitor opens the Gallery from the header instead.
- **Postcondition:** Visitor can describe the service lines and knows how to enquire.
- **Acceptance:** Hero renders without layout shift, one `<h1>` exists, CTA is
  keyboard reachable, and the page works at 390 px and 1440 px widths.

### UC-02 — Explore services visually (Gallery)

- **Preconditions:** Visitor is on `/#/gallery`.
- **Main flow:**
  1. Intro shows the gallery title and five numbered jump chips.
  2. Visitor selects a chip; the matching service row scrolls into view.
  3. Each row alternates image/card direction on desktop and stacks on mobile.
  4. Each card offers a service-specific WhatsApp CTA.
  5. A closing enquiry band repeats the primary action.
- **Alternate flow:** Visitor scrolls manually; rows fade in once.
- **Postcondition:** Visitor has seen the service detail and can enquire.
- **Acceptance:** All five rows are visible after scrolling (never permanently
  hidden), jump chips scroll to the correct row with header offset, and the
  layout has no horizontal overflow at 390 px.

### UC-03 — Start a WhatsApp enquiry

- **Preconditions:** `WHATSAPP.phoneNumber` contains digits (with country code).
- **Main flow:**
  1. Visitor activates any WhatsApp CTA (header, hero, service card, band, footer).
  2. The CTA resolves a message in this order: explicit message → context message →
     topic sentence → default prefilled message.
  3. The browser opens `https://wa.me/<digits>?text=<encoded message>` in a new tab.
- **Postcondition:** WhatsApp opens with the correct message.
- **Acceptance:** Every CTA produces a distinct, relevant message; the link has
  `target="_blank"` and `rel="noopener noreferrer"`.

### UC-04 — Enquire before WhatsApp is configured

- **Preconditions:** `WHATSAPP.phoneNumber` is empty (the shipped default).
- **Main flow:**
  1. Visitor activates a WhatsApp CTA.
  2. A modal dialog explains that the number is not configured.
  3. The dialog shows the exact message that would be sent.
  4. Visitor copies the message; inline status confirms success or explains failure.
  5. Visitor closes the dialog with the close button, Escape or the overlay.
- **Postcondition:** Visitor can paste the message into WhatsApp manually.
- **Acceptance:** Dialog is labelled, traps focus, restores focus to the trigger,
  and the copy action reports success through `role="status"`.

### UC-05 — Resolve a question before messaging (FAQ)

- **Main flow:**
  1. Visitor reaches the FAQ section on Home.
  2. Visitor expands one or more questions.
  3. Answers appear with a short height/fade transition.
- **Acceptance:** Accordion works with mouse, Enter/Space, and Arrow/Home/End keys;
  `aria-expanded` and panel visibility stay in sync; multiple panels may be open.

### UC-06 — Update content

- **Main flow:**
  1. Editor changes a value in `src/constants/site.ts`, `home.ts` or `gallery.ts`.
  2. TypeScript validates the shape against `src/types/content.ts`.
  3. The dev server hot-reloads; the production build reflects the change.
- **Acceptance:** No component file needs editing for copy, services, FAQs, links,
  contact details or the WhatsApp number.

### UC-07 — Publish

- **Main flow:**
  1. Push to `main` (or run the workflow manually).
  2. GitHub Actions installs, builds with `BASE_PATH=/<repo>/`, and deploys `dist/`.
  3. Pages serves the site; hash routes resolve without server rewrites.
- **Acceptance:** Deep link `/#/gallery` loads directly; all assets resolve under
  the repository sub-path.

---

## 3. Functional requirements

### FR-01 — Static SPA routing

- **Requirement:** Provide `/` (Home), `/gallery` (Gallery) and a catch-all 404 page.
  Use `HashRouter` so GitHub Pages needs no rewrite rules.
- **Acceptance:** `/#/gallery` renders the Gallery; an unknown hash renders the 404
  page with a link home; route changes scroll to the top and update document metadata.

### FR-02 — Shared page chrome

- **Requirement:** Both pages use `PageShell`, which renders a skip link, the branded
  header, a single `<main id="main-content">` landmark, and the shared footer.
- **Acceptance:** Every page has exactly one `<main>` and one `<h1>`; the skip link
  becomes visible on focus and moves focus to the main landmark.

### FR-03 — Header and navigation

- **Requirement:** Header shows the logo, Home/Gallery links and the WhatsApp CTA.
  The active route is visually distinct and exposes `aria-current="page"`.
  The header is sticky by default and fixed over the hero only on Home at
  `min-width: 1024px` in landscape orientation.
- **Acceptance:** Active link styling matches the route; the CTA label switches to
  “WhatsApp” below 420 px; the header never overlaps gallery content.

### FR-04 — Home hero

- **Requirement:** Render eyebrow, headline, service copy and primary CTA from
  `HOME_HERO`. On large landscape screens show a full-bleed image with a left-to-right
  dark scrim and light text. On `max-width: 1023px` or portrait, hide the backdrop,
  switch to dark text and show the image in a framed figure below the copy.
- **Acceptance:** Both presentations match the design at 1440×900 and 390×844; the
  hero image reserves its 1920:850 ratio; the CTA is full width on small screens.

### FR-05 — FAQ accordion

- **Requirement:** Render `FAQS` in a multi-open accordion. Answers come from constants.
  Use Radix for keyboard interaction and ARIA wiring.
- **Acceptance:** Six questions render; opening/closing animates height and chevron;
  keyboard navigation follows the WAI-ARIA accordion pattern; reduced motion removes
  the animation.

### FR-06 — Gallery intro and jump rail

- **Requirement:** Render the gallery eyebrow, title, lead and one numbered chip per
  service. Activating a chip scrolls to that service row.
- **Acceptance:** Chips are keyboard reachable; scrolling respects reduced motion;
  the header offset is preserved (`scroll-margin-top: 96px`); the URL hash is not
  replaced by the jump (required because routing uses the hash).

### FR-07 — Gallery showcase

- **Requirement:** Render all `GALLERY_ITEMS` as alternating rows on a 12-column grid.
  Odd rows place the image left and card right; even rows reverse this with a
  one-column overlap. Below 900 px, stack the image above the card with a negative
  offset. Cards show eyebrow, title, description, highlight pills and a CTA.
- **Acceptance:** Five services render in order; no horizontal scroll at 390 px;
  first image loads eagerly, the rest lazily; rows reveal once on scroll.

### FR-08 — WhatsApp CTA resolution

- **Requirement:** All conversion controls use `WhatsAppCta`. Message priority is:
  explicit `message` → `context` key in `WHATSAPP.contextMessages` → sentence built
  from `topic` → `WHATSAPP.prefilledMessage`.
- **Acceptance:** Header/footer use the default; hero uses `homeHero`; gallery cards
  use their service topic; closing band uses `galleryClosing`. Each click emits a
  development log event with its source.

### FR-09 — Unconfigured WhatsApp fallback

- **Requirement:** When the normalised phone number is empty, CTAs open
  `WhatsAppSetupDialog` instead of navigating. The dialog explains the configuration,
  previews the message and copies it to the clipboard.
- **Acceptance:** Dialog opens for every CTA, shows the context-specific message,
  copies successfully when the Clipboard API is available, and degrades to an
  instruction when it is not.

### FR-10 — Footer

- **Requirement:** Show brand name, description, footer navigation, WhatsApp CTA and
  copyright. Render contact rows only for non-empty `CONTACT` values, with `tel:` and
  `mailto:` links where applicable.
- **Acceptance:** With the shipped empty contact values, no empty list or broken links
  appear; filling a value makes the row appear automatically.

### FR-11 — Content constants

- **Requirement:** All marketing copy, services, FAQs, navigation, metadata and contact
  details live in `src/constants/*` and are typed by `src/types/content.ts`.
- **Acceptance:** Components contain only UI microcopy (button labels for copy/close,
  “Page not found”, etc.); content changes require no component edits.

### FR-12 — Assets

- **Requirement:** Ship local placeholder SVGs under `public/assets/images/` with
  descriptive names, intrinsic dimensions and alt text. Resolve URLs through `asset()`
  so the configured base path is respected.
- **Acceptance:** Logo, favicon, hero and five service images load on both pages and
  under a non-root `BASE_PATH`; every content image has meaningful alt text; the
  decorative backdrop uses `alt=""`.

### FR-13 — Metadata

- **Requirement:** Each route sets a unique `<title>`, meta description, `og:title`
  and `og:description` via `useDocumentMeta`.
- **Acceptance:** Home and Gallery expose different titles/descriptions; the 404 page
  has its own title; `index.html` carries baseline social metadata for crawlers.

### FR-14 — Responsive behaviour

- **Requirement:** Support the design breakpoints: 1023 px (hero/header layout),
  899 px (gallery stack), 639 px (mobile spacing), 419/420 px (header CTA label).
- **Acceptance:** No horizontal overflow at 360, 390, 768, 1024, 1280 or 1440 px;
  touch targets remain at least 44×44 px.

### FR-15 — Motion

- **Requirement:** Use GSAP for the hero entrance and one-time scroll reveals. Use CSS
  for accordion and dialog transitions. Disable all non-essential motion when
  `prefers-reduced-motion: reduce` is set.
- **Acceptance:** With reduced motion, all content is visible immediately and no
  transform/opacity animation runs; without it, hero items stagger in and rows reveal
  once.

### FR-16 — Development logging

- **Requirement:** Log boot, route changes, navigation clicks, WhatsApp CTA clicks,
  dialog state, copy results and jump actions. Development builds also mount an
  on-screen log panel. Production builds must not include development log code.
- **Acceptance:** `import.meta.env.DEV` guards every dev-only branch; the production
  bundle contains no `tours:dev`, `Dev log` or dev-panel chunk (verified: 0 matches);
  warnings/errors remain in production.

### FR-17 — 404 handling

- **Requirement:** Unknown routes render a page inside the shared shell with a link
  back to Home.
- **Acceptance:** `/#/does-not-exist` renders the 404 content and the Home link works.

### FR-18 — Link safety and resilience

- **Requirement:** External links open with `noopener noreferrer`; scroll reveals must
  never leave content permanently invisible; missing constants fall back to safe copy.
- **Acceptance:** WhatsApp links include the correct `rel`; fast scrolling, anchor
  jumps and direct deep links all result in visible content.

---

## 4. Non-functional requirements

| ID | Category | Requirement | Target / verification |
| --- | --- | --- | --- |
| NFR-01 | Accessibility | WCAG 2.1 AA for both pages | Automated axe audit: 0 violations (WCAG 2.0/2.1 A + AA + best practice); manual keyboard pass |
| NFR-02 | Performance | Fast first load on mid-range mobile | JS ≤ 200 kB gzip (actual 147.7 kB), CSS ≤ 15 kB gzip (actual 7.7 kB), LCP ≤ 2.5 s, CLS ≤ 0.1 |
| NFR-03 | SEO | Crawlable structure and unique metadata | One `h1` per page, logical `h2` hierarchy, unique title/description, OG tags, favicon, descriptive alt text |
| NFR-04 | Security & privacy | No secrets, no tracking, no PII collection | No API keys, no cookies/localStorage, no third-party scripts; external links hardened |
| NFR-05 | Browser support | Modern evergreen browsers | Last two versions of Chrome, Edge, Firefox and Safari; iOS 16+; Android Chrome |
| NFR-06 | Maintainability | Predictable structure and type safety | TypeScript `strict`, no `any`, path alias `@/*`, atomic components, constants single source |
| NFR-07 | Reliability | Safe degradation | Fallback dialog when WhatsApp is unset; hidden contact rows when unset; 404 route; no permanently hidden content |
| NFR-08 | Motion & comfort | Respect user motion preference | `prefers-reduced-motion` disables GSAP and CSS transitions |
| NFR-09 | Environment separation | Dev diagnostics never ship | `import.meta.env.DEV` dead-code elimination; only `warn`/`error` remain in production |
| NFR-10 | Deployability | Static hosting with sub-path support | `npm run build` → `dist/`; `BASE_PATH` drives asset URLs; hash routing avoids server rewrites |
| NFR-11 | Content integrity | No fabricated business facts | Phone, email, address, hours and prices are not invented; empty values stay hidden |
| NFR-12 | Observability | Useful production diagnostics | Boot/route events dev-only; copy failures and missing scroll targets warn at runtime |

### NFR-01 — Accessibility detail

- Semantic landmarks: `header`, `nav`, `main`, `footer`; skip link to main.
- Every interactive element is reachable and operable by keyboard; visible focus ring
  (`2px` brand outline plus a soft halo).
- Accordion uses Radix primitives with correct `aria-expanded`, `aria-controls` and
  region labelling; dialog uses Radix focus trap, Escape handling and focus restore.
- Icon-only controls have accessible names; decorative SVGs are `aria-hidden`.
- Minimum 44×44 px target for links and buttons.
- Text contrast: brand `#355c49` on canvas `#f7f9f6` ≈ 7.5:1; muted `#53635a` ≈ 5.9:1.
- Hero copy uses near-white on a dark scrim, maintaining AA contrast.

### NFR-02 — Performance detail

- Self-hosted Figtree (400/500/600/700) via `@fontsource`, with `font-display: swap`
  behaviour and `woff2` served first.
- All illustrations are lightweight SVGs; hero image is eager, gallery images below
  the first are lazy; every image declares width and height to prevent CLS.
- No third-party requests at runtime (fonts, analytics or CDNs).
- Production build minifies and splits CSS/JS; no source maps shipped.

### NFR-03 — SEO note

Per-route metadata is applied client-side. `index.html` contains the Home metadata for
crawlers that do not execute JavaScript. If richer per-route indexing is required,
add a pre-render step (see Future work).

### NFR-10 — Deployment detail

- Vite `base` comes from `BASE_PATH` (default `/`).
- Project-site deploys use `BASE_PATH=/<repository>/`.
- `HashRouter` keeps deep links working without a `404.html` rewrite.
- GitHub Actions workflow builds and publishes `dist/` to Pages.

---

## 5. Constants

### 5.1 Content constants

| Constant | File | Type | Shipped value / notes |
| --- | --- | --- | --- |
| `BRAND` | `src/constants/site.ts` | object | Name, short name, tagline, description, logo `{src, 300×87, alt}`, copyright year `2026` |
| `NAV_ITEMS` | `src/constants/site.ts` | `NavItem[]` | `Home → /`, `Gallery → /gallery` |
| `WHATSAPP.phoneNumber` | `src/constants/site.ts` | `string` | `"919900055563"` — digits only with country code (displayed as +91 99000 55563) |
| `WHATSAPP.prefilledMessage` | `src/constants/site.ts` | `string` | Default enquiry sentence |
| `WHATSAPP.headerCtaLabel` | `src/constants/site.ts` | `string` | “Chat on WhatsApp” |
| `WHATSAPP.shortCtaLabel` | `src/constants/site.ts` | `string` | “WhatsApp” (shown below 420 px) |
| `WHATSAPP.primaryCtaLabel` | `src/constants/site.ts` | `string` | “Chat with us on WhatsApp” |
| `WHATSAPP.callCtaLabel` | `src/constants/site.ts` | `string` | “Call now” |
| `WHATSAPP.contextMessages` | `src/constants/site.ts` | `Record<string, string>` | `homeHero`, `galleryClosing`, `faq`, `notFound`, `footer` |
| `CONTACT` | `src/constants/site.ts` | object | `phoneDisplay` = `"+91 99000 55563"`; `email`, `address`, `hours` empty and hidden |
| `CONTACT_ENTRIES` | `src/constants/site.ts` | `ContactEntry[]` | Derived list filtered to non-empty values |
| `FOOTER_COPY` | `src/constants/site.ts` | object | Description + copyright line |
| `PAGE_META` | `src/constants/site.ts` | object | `home` and `gallery` title/description |
| `HOME_HERO` | `src/constants/home.ts` | `HeroContent` | Eyebrow, title, copy, 1920×850 image |
| `FAQ_SECTION` | `src/constants/home.ts` | `SectionIntro` | Eyebrow, title, lead |
| `FAQ_HELP` | `src/constants/home.ts` | `FaqHelpContent` | “Still have a question?” prompt + CTA label under the accordion |
| `FAQS` | `src/constants/home.ts` | `FaqItem[]` | 6 questions (booking, coverage, employee, campus, tours, quote) |
| `GALLERY_INTRO` | `src/constants/gallery.ts` | `SectionIntro` | Eyebrow, title, lead |
| `GALLERY_ITEMS` | `src/constants/gallery.ts` | `GalleryItem[]` | 5 services: airport, employee, campus, tours, monthly contracts |
| `GALLERY_CLOSING` | `src/constants/gallery.ts` | `CtaBandContent` | Closing band copy |

### 5.2 Types

```ts
type NavItem = { label: string; to: string };

type FaqItem = { id: string; question: string; answer: string };

type GalleryImage = { src: string; width: number; height: number; alt: string };

type GalleryItem = {
  id: string;              // anchor id, e.g. "airport-transfers"
  number: string;          // display number, e.g. "01"
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  image: GalleryImage;
  whatsappTopic: string;   // builds a contextual enquiry sentence
  ctaLabel: string;
};

type ContactEntry = {
  label: string;
  value: string;
  hrefPrefix?: "tel:" | "mailto:";
};

type SectionIntro = { eyebrow: string; title: string; lead: string };

type FaqHelpContent = { title: string; copy: string; ctaLabel: string };

type HeroContent = {
  eyebrow: string;
  title: string;
  copy: string;
  image: GalleryImage;
};

type CtaBandContent = { eyebrow: string; title: string; lead: string };
```

### 5.3 Runtime, layout and design constants

| Constant | Value | Location |
| --- | --- | --- |
| `VIEWPORT_THRESHOLD` | `0.88` (reveal when element top ≤ 88% viewport height) | `src/hooks/use-reveal.ts` |
| Container max width | `1200px` | `Container`, `src/styles/index.css` |
| Gutters | `16px` mobile, `24px` from 640 px | `Container` |
| Header height | `72px` desktop, `64px` mobile | `SiteHeader` |
| Touch target | `min-height: 44px` | Buttons, nav links, chips |
| Hero desktop padding | `124px 0 64px`, `min-height: 100dvh` | `.hero-section` |
| Hero mobile padding | `48px 0 64px` (≤1023 px), `32px 0 48px` (≤639 px) | `.hero-section` |
| Hero backdrop query | `(min-width: 1024px) and (orientation: landscape)` | `.hero-backdrop` |
| Hero image ratio | `1920 / 850` | `.hero-media` |
| Gallery grid | 12 columns, 1-column overlap | `.gallery-row` |
| Gallery card min height | `440px` desktop, `460px` ≤1023 px, auto below 900 px | `.gallery-card` |
| Gallery stack breakpoint | `899px` | `src/styles/index.css` |
| Gallery mobile offset | `-28px` ≤899 px, `-20px` ≤639 px | `.gallery-card` |
| Gallery scroll offset | `96px` | `.gallery-row` |
| Radii | button `10px`, card `16px`, pill `9999px` | `@theme` |
| Shadows | `0 8px 24px rgba(38,53,45,.05)`, `0 20px 48px rgba(38,53,45,.1)` | `@theme` |
| Motion durations | `160ms` fast, `220ms` base, `700–800ms` reveals | `@theme`, hooks |
| Easing | `cubic-bezier(0.2, 0, 0, 1)` | `@theme` |
| WhatsApp URL | `https://wa.me/919900055563?text=<encodeURIComponent(message)>` | `src/lib/whatsapp.ts` |
| Phone URL | `tel:+919900055563` | `src/components/common/call-cta.tsx` |
| Dev log limit | 40 entries in the panel | `src/dev/dev-log-panel.tsx` |
| Storage | None (no cookies, no localStorage) | — |

### 5.4 Rules for changing constants

1. Never hard-code marketing copy, URLs or contact details inside components.
2. `WHATSAPP.phoneNumber` must contain digits only, including country code.
3. Keep `CONTACT` values empty until they are verified by the business.
4. When adding a service, provide a unique `id`, two-digit `number`, both image
   dimensions, meaningful `alt` text and a `whatsappTopic`.
5. New context messages must be added to `WHATSAPP.contextMessages` and referenced by
   key from the CTA; unknown keys fall back safely.
6. Add new image files to `public/assets/images/` and reference them through
   `asset("assets/images/<name>.svg")`.
7. Run `npm run typecheck` after changing a shape in `src/types/content.ts`.

---

## 6. Component architecture

### 6.1 Tree

```text
main.tsx
└── HashRouter
    └── App
        ├── ScrollToTop
        └── WhatsAppProvider
            ├── Routes
            │   ├── HomePage
            │   │   └── PageShell (headerOverlay)
            │   │       ├── SkipLink
            │   │       ├── SiteHeader → BrandLogo, NavItemLink, WhatsAppCta
            │   │       ├── HomeHero → WhatsAppCta
            │   │       ├── FaqSection → SectionHeading, Accordion
            │   │       └── SiteFooter → NavItemLink, WhatsAppCta
            │   ├── GalleryPage
            │   │   └── PageShell
            │   │       ├── GalleryIntro → SectionHeading, ScrollToSectionLink
            │   │       ├── GalleryShowcase → ServiceRow (×5)
            │   │       └── EnquiryBand → WhatsAppCta
            │   └── NotFoundPage
            └── WhatsAppSetupDialog
```

### 6.2 Responsibilities

| Layer | Files | Responsibility |
| --- | --- | --- |
| Primitives (`components/ui`) | `button`, `accordion`, `dialog`, `container`, `pill` | Presentation-only, shadcn-style API, Tailwind variants |
| Common (`components/common`) | `brand-logo`, `whatsapp-icon`, `whatsapp-cta`, `section-heading`, `enquiry-band`, `scroll-to-section-link`, `whatsapp-setup-dialog` | Cross-page building blocks |
| Layout (`components/layout`) | `site-header`, `site-footer`, `page-shell`, `nav-item-link`, `skip-link` | Page chrome and navigation |
| Home (`components/home`) | `home-hero`, `faq-section` | Home-only sections |
| Gallery (`components/gallery`) | `gallery-intro`, `gallery-showcase`, `service-row` | Gallery-only sections |
| Pages (`pages`) | `home-page`, `gallery-page`, `not-found-page` | Route composition and metadata |
| Hooks (`hooks`) | `use-hero-intro`, `use-reveal`, `use-document-meta` | Animation and document side effects |
| Lib (`lib`) | `utils`, `assets`, `whatsapp`, `logger`, `motion` | Framework-agnostic helpers |
| Constants (`constants`) | `site`, `home`, `gallery`, `index` | Content and configuration |
| Types (`types`) | `content` | Shared content contracts |
| Dev (`dev`) | `dev-log-panel` | Development-only on-screen log |

### 6.3 State and data flow

- Content flows one way: constants → page → section → primitive. No component owns
  business copy.
- WhatsApp configuration is read once per render from constants; the provider owns
  only dialog state (`open`, `previewMessage`).
- The dialog is rendered once at the provider level, so every CTA shares it.
- No global store, no server data fetching, no persistence.

### 6.4 Styling approach

- Tailwind v4 CSS-first theme in `src/styles/index.css` (`@theme` tokens).
- Layout-only CSS classes (`.hero-*`, `.gallery-*`, `.site-header`, `.skip-link`) live
  in `@layer components` because they need media queries or grid overlap.
- Utilities handle colour, spacing, typography and state variants.
- `cn()` merges conditional classes with `tailwind-merge` to prevent conflicts.

---

## 7. Design tokens

### 7.1 Colour

| Token | Value | Usage |
| --- | --- | --- |
| `brand` | `#355c49` | Primary buttons, links, eyebrows |
| `brand-hover` | `#2b4c3c` | Primary hover |
| `brand-active` | `#223d30` | Primary active, hero CTA text |
| `canvas` | `#f7f9f6` | Page background |
| `sage` | `#e5eee7` | Active nav, pills, CTA band |
| `mist` | `#e4edf2` | Reserved accent surface |
| `sand` | `#f1e8dc` | Reserved warm surface |
| `surface` | `#ffffff` | Cards, header, footer |
| `ink` | `#26352d` | Primary text |
| `muted` | `#53635a` | Secondary text |
| `ink-sage` | `#3d4d44` | CTA band lead |
| `line` | `#dce4dd` | Default borders |
| `line-strong` | `#c6d3c8` | Emphasised card borders |

### 7.2 Typography

- Family: Figtree, self-hosted weights 400/500/600/700.
- Hero: `clamp(2.125rem, 4.4vw, 3.625rem)`, weight 700, line-height 1.08,
  letter-spacing −0.028em.
- Section title: `clamp(1.75rem, 3vw, 2.375rem)`, weight 700, line-height 1.15.
- Lead: `1.125rem`, line-height 1.6.
- Body: `1rem`, line-height 1.6.
- Small: `0.875rem`; extra small: `0.75rem`.

### 7.3 Spacing and geometry

- 8 px scale: 8, 16, 24, 32, 40, 48, 64, 80, 96.
- Section padding: 80 px desktop, 64 px tablet, 48 px mobile.
- Cards: 32 px padding desktop, 24 px tablet, 20 px mobile.
- Container 1200 px; gutters 24 px / 16 px.

---

## 8. Environments, build and logging

| Aspect | Development (`npm run dev`) | Production (`npm run build`) |
| --- | --- | --- |
| Mode | `import.meta.env.DEV === true` | `import.meta.env.DEV === false` |
| Console logging | Boot, steps, events, CTA clicks, dialog/copy | Only `warn` and `error` |
| On-screen log panel | Mounted via guarded dynamic import | Not bundled (0 dev strings in output) |
| Source maps | Inline dev tooling | Disabled |
| Assets | Served from source | Hashed in `dist/assets` |
| Base path | `BASE_PATH` env or `/` | `BASE_PATH` env or `/` |

`src/lib/logger.ts` exposes `debug`, `info`, `step`, `event`, `warn` and `error`.
Every dev branch is wrapped in `import.meta.env.DEV`, which Vite replaces with a
literal so the branch is removed by the bundler.

---

## 9. Deployment

### 9.1 GitHub Pages via Actions

`.github/workflows/deploy.yml` builds on pushes to `main` and manual dispatch:

1. Checkout, install Node 24 and run `npm ci`.
2. Run `npm run build` with `BASE_PATH=/${{ github.event.repository.name }}/`.
3. Upload `dist/` as a Pages artifact and deploy with `actions/deploy-pages`.

Repository settings → Pages → Source must be set to **GitHub Actions**.

### 9.2 Manual deployment

```bash
BASE_PATH=/<repository-name>/ npm run build
# publish the contents of dist/ to the Pages branch or hosting provider
```

For a custom domain or user site, build with `BASE_PATH=/`.

### 9.3 Why hash routing

GitHub Pages serves static files and returns 404 for unknown paths. `HashRouter`
keeps all routes inside the fragment (`/#/gallery`), so a direct visit works without
a server rewrite. In-page jumps are handled in JavaScript because the fragment is
owned by the router.

### 9.4 Post-deploy checklist

- [ ] `/#/` and `/#/gallery` load directly.
- [ ] Logo, favicon, hero and service images resolve under the repository sub-path.
- [ ] Both nav links show the correct active state.
- [ ] WhatsApp CTA opens either `wa.me` or the fallback dialog.
- [ ] FAQ accordion and gallery jump chips work on touch.
- [ ] No console errors in production.

---

## 10. Verification and acceptance

### 10.1 Checks performed

| Check | Result |
| --- | --- |
| `npm run build` (TypeScript + Vite) | Pass |
| Production bundle contains dev log code | None (0 matches) |
| axe-core, Home + Gallery (WCAG 2.0/2.1 A, AA, best practice) | 0 violations |
| Home at 1440×900 and 390×844 | Verified in Chrome |
| Gallery at 1440×900 and 390×844 | Verified in Chrome |
| FAQ open/close | `aria-expanded="true"`, panel visible, 115 px content |
| WhatsApp fallback dialog | Opens with correct title and preview message |
| Gallery jump chip | Scrolls to service row, header offset 96 px |
| All five gallery rows after scroll | Visible (opacity 1) |
| Browser console errors | None |

### 10.2 Definition of done

- [ ] All FR-01–FR-18 implemented and demonstrated.
- [ ] All NFR targets met or explicitly waived by the business.
- [ ] Verified WhatsApp number added to `WHATSAPP.phoneNumber`.
- [ ] Verified contact details added to `CONTACT` (or intentionally omitted).
- [ ] Placeholder SVGs replaced with licensed photography where available.
- [ ] Copy reviewed and approved by Annapoorneshwari Tours & Travellers.
- [ ] `spec.md` and `README.md` updated with any configuration changes.

---

## 11. Traceability

| Requirement | Primary implementation |
| --- | --- |
| FR-01 | `src/App.tsx`, `src/main.tsx`, `src/pages/not-found-page.tsx` |
| FR-02 | `src/components/layout/page-shell.tsx`, `src/components/layout/skip-link.tsx` |
| FR-03 | `src/components/layout/site-header.tsx`, `src/components/layout/nav-item-link.tsx` |
| FR-04 | `src/components/home/home-hero.tsx`, `.hero-*` in `src/styles/index.css` |
| FR-05 | `src/components/home/faq-section.tsx`, `src/components/ui/accordion.tsx` |
| FR-06 | `src/components/gallery/gallery-intro.tsx`, `src/components/common/scroll-to-section-link.tsx` |
| FR-07 | `src/components/gallery/gallery-showcase.tsx`, `src/components/gallery/service-row.tsx`, `.gallery-*` |
| FR-08 | `src/components/common/whatsapp-cta.tsx`, `src/lib/whatsapp.ts` |
| FR-09 | `src/providers/whatsapp-provider.tsx`, `src/components/common/whatsapp-setup-dialog.tsx` |
| FR-10 | `src/components/layout/site-footer.tsx` |
| FR-11 | `src/constants/*`, `src/types/content.ts` |
| FR-12 | `public/assets/images/*`, `src/lib/assets.ts` |
| FR-13 | `src/hooks/use-document-meta.ts`, `src/constants/site.ts` (`PAGE_META`) |
| FR-14 | Tailwind breakpoints + `src/styles/index.css` media queries |
| FR-15 | `src/hooks/use-hero-intro.ts`, `src/hooks/use-reveal.ts`, `src/lib/motion.ts` |
| FR-16 | `src/lib/logger.ts`, `src/dev/dev-log-panel.tsx`, `src/main.tsx` |
| FR-17 | `src/pages/not-found-page.tsx` |
| FR-18 | `src/hooks/use-reveal.ts`, `src/lib/whatsapp.ts`, CTA components |

---

## 12. Future work

1. Replace placeholder SVGs with licensed, optimised photography (AVIF/WebP with
   SVG or JPEG fallbacks) and add `srcset`.
2. Add a pre-render step (e.g. `vite-plugin-ssg` or route-level static HTML) for
   per-route SEO without JavaScript.
3. Add unit tests for message resolution and component tests for the dialog/accordion.
4. Add a lightweight, privacy-first analytics event on CTA clicks.
5. Add a real contact form only if the business wants a non-WhatsApp channel.
6. Add `hreflang` and content translation if Kannada/Hindi versions are required.
7. Add `manifest.webmanifest` and maskable icons if installability matters.
