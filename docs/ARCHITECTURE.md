# Architecture

## Stack

| Concern | Choice |
| --- | --- |
| UI | React 19, TypeScript (strict) |
| Build | Vite |
| Routing | React Router; every page except the home page is loaded on demand |
| Styling | Design tokens as CSS custom properties, plus Tailwind CSS utilities mapped to the same tokens |
| Carousels | Embla Carousel (drag, snap, RTL), with its autoplay and fade plugins for the hero |
| Animation | Motion, loaded through `LazyMotion` to keep the bundle small |
| Loading and errors | `React.lazy` + `Suspense`, `react-error-boundary`, `react-intersection-observer` |

## Folders

```
src/
  components/
    category/   listing filters, price slider, paged grid
    home/       one file per home page section
    layout/     announcement bar, top bar, header, drawer, footer, floating actions
    product/    product card, rail, review card, reviews panel
    ui/         building blocks shared by everything else
  data/         sample catalogue and content (the seam for Salla data)
  i18n/         interface strings and the locale / currency provider
  lib/          cart state, filter logic, paging hook, image helpers
  pages/        one component per route
  settings/     merchant options (mirrors twilight.json)
  styles/       tokens, reset, and one stylesheet per area
docs/           this documentation
public/brand/   logo files
public/media/   photos, video clips and posters
```

## Data flow

Components never import mock values directly from each other. They read from
three places:

1. `data/*`: catalogue and editorial content. Each module documents the shape
   it exports, and those shapes follow Salla's storefront responses, so moving
   to live data replaces the modules, not the components.
2. `settings/ThemeSettings`: merchant options. One field per setting the theme
   declares to Salla.
3. `i18n/I18nProvider`: language, direction, currency and formatters.

Text falls into two groups. Interface strings ("Add to cart") live in
`i18n/messages.ts`; Arabic is the source and the English table is typed
against it, so a missing translation fails the build. Editorial content the
merchant writes (section titles, banner copy) lives in `data/` as
`{ ar, en }` pairs.

## Styling

- `styles/tokens.css` declares every colour, type size, radius and timing.
  Components use the tokens and never a literal colour, which is what lets
  the merchant's palette restyle the whole store.
- Sections that sit on a photo, a video or a dark band re-declare the palette
  locally (the "dark scope" in `tokens.css`), so the buttons and text inside
  them need no dark-specific rules. `.scope-light` and `.scope-dark` apply
  the same idea to any element.
- Layout uses logical properties (`inline-start`, `margin-inline`) so one
  stylesheet serves both directions.
- Tailwind's reset is switched off; `styles/base.css` is the reset.
- Arabic display type needs a taller line box for its vowel marks; see
  `--lh-display`.

## Conventions

- One component per file, named exports, a doc comment that says what the
  component is for and anything non-obvious about how it behaves.
- Comments explain why, not what.
- No direct DOM queries; refs only where a browser API needs the element.
- Every interactive element is reachable by keyboard and has an accessible
  name. Motion respects `prefers-reduced-motion`.
- Images go through `ui/Picture`, which handles responsive sources, lazy
  loading, the loading shimmer and the failure placeholder.

## Loading and error handling

| Situation | Behaviour |
| --- | --- |
| First visit | Branded preloader, once per session |
| Navigating to a page not yet downloaded | Page skeleton until the code arrives |
| A page throws or its code cannot be fetched | Error screen with retry; header and footer stay usable |
| Next page of a listing | Skeleton cards in the grid, then the products |
| An image is loading / fails | Shimmer / neutral placeholder |
| A payment or badge icon fails | The method's name is shown instead |
| Unknown address | 404 page |
