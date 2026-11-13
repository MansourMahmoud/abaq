# Theme settings

Every option below is a field of `ThemeSettings` (`src/settings/ThemeSettings.tsx`)
and maps to one setting in the Salla theme's `twilight.json`.

## Header

| Setting | Values | Default |
| --- | --- | --- |
| `header.variant` | `overlay` (over the hero), `classic` (search field and category row), `drawer` (categories behind a menu button) | `overlay` |
| `header.sticky` | on / off | on |
| `header.logoPosition` | `start`, `center` | `start` |
| `header.showActionLabels` | on / off | off |
| `header.topBar` | on / off: social accounts, phone, email | on |
| `header.megaMenu` | on / off: sub-category panel with banner | on |
| `header.navItems` | number of categories in the navigation row | 5 |
| `header.allCategories` | `auto` (only when there are more categories than the row shows), `always`, `never` | `auto` |

## Announcement bar

| Setting | Values | Default |
| --- | --- | --- |
| `announcement.enabled` | on / off | on |
| `announcement.mode` | `marquee`, `static` | `marquee` |
| `announcement.dismissible` | on / off | on |
| `announcement.stickWithHeader` | on / off | off |
| `announcement.showIcons` | on / off | on |

Each message has an icon, a text and an optional button that copies a coupon
code or opens a link (`data/content.ts`, `announcements`).

## Hero

| Setting | Values | Default |
| --- | --- | --- |
| `hero.effect` | `fade`, `slide` | `fade` |
| `hero.autoplaySeconds` | number | 7 |

## Home sections

| Setting | Values | Default |
| --- | --- | --- |
| `home.categoriesLayout` | `carousel`, `grid` | `carousel` |
| `home.productsLayout` | `carousel`, `grid` | `carousel` |
| `home.carouselIndicator` | `dots`, `bar` | `dots` |
| `home.categoryRail.categoryId` | any category or sub-category | `bakhoor` |
| `home.categoryRail.count` | number of products in the row | 8 |

## Product card

| Setting | Values | Default |
| --- | --- | --- |
| `productCard.hover` | `zoom`, `lift`, `none` | `zoom` |
| `productCard.imageRatio` | `1/1`, `4/5`, `3/4` | `4/5` |

## Listing pages

| Setting | Values | Default |
| --- | --- | --- |
| `category.perPage` | number | 8 |
| `category.pagination` | `infinite`, `button` | `infinite` |
| `category.filters` | on / off | on |
| `category.inlineBanner` | on / off | on |
| `category.bottomBanners` | `one` (wide), `two`, `none` | `one` |
| `category.showPerks` | on / off | on |
| `category.showReviews` | on / off | on |

## Cart

| Setting | Values | Default |
| --- | --- | --- |
| `cart.banner` | on / off | on |
| `cart.bannerHeight` | `short`, `medium`, `tall` | `medium` |
| `cart.bannerWidth` | `contained`, `full` | `contained` |

## Floating buttons

| Setting | Values | Default |
| --- | --- | --- |
| `floating.whatsapp` | on / off | on |
| `floating.side` | `right`, `left` | `right` |
| `floating.prompts` | on / off: rotating messages beside the button | on |
| `floating.phone` | on / off: call button above the chat button | on |
| `floating.coupon` | on / off: discount ticket on the opposite edge | on |

## Welcome popup

| Setting | Values | Default |
| --- | --- | --- |
| `popup.enabled` | on / off | on |
| `popup.delaySeconds` | number | 6 |
| `popup.remindAfterDays` | number: days before it may return after being closed | 3 |

## Footer

| Setting | Values | Default |
| --- | --- | --- |
| `footer.showPromo` | on / off: card overlapping the footer | on |
| `footer.showSocial` | on / off | on |
| `footer.showPayments` | on / off | on |
| `footer.showCompliance` | on / off | on |
| `footer.contactStyle` | `icons`, `text` | `icons` |

## Preloader

| Setting | Values | Default |
| --- | --- | --- |
| `preloader.enabled` | on / off | on |
| `preloader.background` | `blur`, `solid` | `blur` |
