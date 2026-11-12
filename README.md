# Abaq storefront

Demo storefront for the Abaq perfume theme: React, TypeScript and Vite.

```bash
npm install
npm run dev      # local development
npm run build    # type-check and production build
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/settings` | Merchant-facing theme settings (mirrors the Salla `twilight.json` settings) |
| `src/i18n` | Arabic and English strings, locale and direction handling |
| `src/data` | Demo catalogue: nested categories and products |
| `src/components` | Layout (header, drawer, footer), product card and rail, UI primitives |
| `src/pages` | Route components |
| `src/styles` | Design tokens and stylesheets |
| `public/media` | Photos (`<name>-<width>.webp`) and videos |

## Media credits

Photos from Unsplash and video from Pexels, used under their free licences for
demonstration only. Replace them with the store's own media before launch.
