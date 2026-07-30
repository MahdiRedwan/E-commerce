# CircuitForge

A Next.js 14 (App Router + TypeScript + Tailwind) storefront scaffold for a PC
hardware ecommerce site: top nav with category mega-menu, hero, a price-pledge
ticker, and three main sections (PC Hardware, Custom Built PCs, AI & Deep PC
Analysis), plus a newsletter/footer bottom section.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `app/layout.tsx` — root layout, loads fonts, wraps every page in Navbar + Footer
- `app/page.tsx` — homepage, assembles Hero + all sections
- `app/category/[slug]/page.tsx` — auto-generated page per category (add a
  category in `lib/data.ts` and it's routable immediately)
- `app/product/[slug]/page.tsx` — product detail page
- `components/` — Navbar, CategoryMegaMenu, Hero, ProductCard, ProductGrid,
  SectionHeader, PricePledgeTicker, CustomBuildCTA, AIInsights, Newsletter, Footer
- `lib/data.ts` — categories + mock product catalogue (swap for a real API/CMS/DB later)
- `lib/types.ts` — `Category` and `Product` shapes

## Extending it

- **New category**: add an entry to `categories` in `lib/data.ts`. It appears
  in the Navbar mega-menu and gets a working `/category/[slug]` page for free.
- **New product**: add an entry to `products` in `lib/data.ts`.
- **Real data source**: replace the functions at the bottom of `lib/data.ts`
  (`getCategory`, `getProductsByCategory`, `getProduct`, `getFeaturedProducts`)
  with calls to your API/CMS/database — the components don't need to change.
- **Cart/checkout/auth**: `/cart`, `/account` and `/build` are linked but not
  yet built out — add routes under `app/` as needed.
- **Real product photography**: swap the `image` field in `lib/data.ts`; if
  you use a new image host, add its domain to `next.config.mjs` under
  `images.remotePatterns`.

## Design system

Dark graphite/navy base with a copper "PCB trace" accent and a teal
"in-stock" indicator. Space Grotesk for display type, Inter for body copy,
JetBrains Mono for prices/specs/SKUs. The signature visual motif is the
`chip-card` (a notched corner like a component package) and `trace-node` /
`trace-rule` (a gold via-dot and line used above section headings) — both
defined as utility classes in `app/globals.css` so they stay consistent
everywhere.
