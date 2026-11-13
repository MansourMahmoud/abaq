# Abaq

A storefront theme for perfume, oud and bakhoor stores on Salla. This
repository holds the standalone demo: the full theme running on a sample
catalogue, so every page and option can be reviewed in a browser before the
components are wired to Salla's storefront data.

Live demo: https://abaq-digimarket.vercel.app

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Getting started

```bash
npm install
npm run dev      # local server with hot reload
npm run build    # type-check and build to dist/
npm run preview  # serve the production build
npm run lint
```

## What is in the theme

| Area | Highlights |
| --- | --- |
| Header | Three layouts (over the hero, classic, drawer), announcement bar with icons and coupon or link buttons, top bar with social accounts and contact details, sub-category panel with banner, live search |
| Home | Hero slider (drag, fade, video slides), perks, categories, tabbed products, shop by note, video player with playlist, timed offer, shop by budget, reels, banners, story with figures, reviews, customer gallery, FAQ, journal |
| Listing | Filters in the URL (category, price, brand, rating, offers, stock), sorting, infinite loading or a "show more" button, promotional card inside the grid, bottom sheet filters on phones |
| Product | Gallery with zoom and video, options with live price, discount and savings, notes pyramid, reviews with filters and customer photos, sticky buy bar on phones |
| Cart | Free-shipping meter, gift option, configurable banner, promotional slots, suggestions |
| Loyalty | Points balance, ways to earn, rewards to redeem (coupon, free shipping, free product), history |
| Other | Journal, article, static pages, branches with map, 404, error and loading states |

Arabic (right to left) and English (left to right) are both supported, with
four display currencies.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): folders, data flow, styling, conventions
- [Theme settings](docs/THEME-SETTINGS.md): every merchant option and its values
- [Changelog](CHANGELOG.md)

## Brand assets

Logo files are in `public/brand` (SVG and PNG, for light and dark
backgrounds). The header draws the same shapes inline so the logo follows the
theme colours.

## Demo content

Products, reviews, branch details, registration numbers and customer photos
are sample data. They are replaced by the store's own data in the Salla theme.
