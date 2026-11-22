"""Builds the Fawh theme guide into public/docs: Arabic at /docs/, English at /docs/en/.

    python3 docs-src/build.py

The chapters live in sections.py and the home blocks in blocks.py; this file
only lays them out. Styles and script are copied from docs-src/assets.
"""

import shutil
from html import escape
from pathlib import Path

from blocks import BLOCKS, GROUPS
from sections import CHAPTERS, t

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / 'public' / 'docs'
SITE = 'https://fawh.vercel.app'


def block_gallery(L):
    """The 30 home blocks, filterable by group."""
    chips = [f'<button type="button" class="chip" aria-pressed="true" data-filter="all">{t(L, "الكل", "All")} <span>{len(BLOCKS)}</span></button>']
    for key, names in GROUPS:
        n = sum(1 for b in BLOCKS if b[1] == key)
        chips.append(f'<button type="button" class="chip" aria-pressed="false" data-filter="{key}">{names[L]} <span>{n}</span></button>')
    cards = []
    for key, group, ar, en in BLOCKS:
        d = ar if L == 'ar' else en
        opts = ''.join(f'<li>{escape(o)}</li>' for o in d['opts'])
        cards.append(
            f'<article class="block" data-group="{group}" id="block-{key}">'
            f'<button class="block__media" type="button" data-zoom="/media/previews/fawh-{key}.webp" aria-label="{escape(d["name"])}">'
            f'<img src="/media/previews/fawh-{key}.webp" alt="" width="1200" height="600" loading="lazy" decoding="async"></button>'
            f'<div class="block__body"><p class="block__group">{dict(GROUPS)[group][L]}</p>'
            f'<h3>{escape(d["name"])}</h3><p>{escape(d["what"])}</p>'
            f'<p class="block__label">{t(L, "ما تغيّره", "What you can change")}</p><ul class="block__opts">{opts}</ul>'
            f'<p class="block__tip">{escape(d["tip"])}</p></div></article>'
        )
    return (
        f'<div class="chips" role="group" aria-label="{t(L, "تصفية العناصر", "Filter blocks")}">{"".join(chips)}</div>'
        f'<div class="blocks">{"".join(cards)}</div>'
    )


def page(L):
    other = 'en' if L == 'ar' else 'ar'
    chapters = [c(L) for c in CHAPTERS]
    toc = ''.join(f'<li><a href="#{c["id"]}">{c["title"]}</a></li>' for c in chapters)
    body = []
    for c in chapters:
        extra = block_gallery(L) if c['id'] == 'blocks' else ''
        body.append(
            f'<section class="chapter" id="{c["id"]}" aria-labelledby="{c["id"]}-title">'
            f'<h2 id="{c["id"]}-title">{c["title"]}</h2><p class="lead">{c["lead"]}</p>{c["body"]}{extra}</section>'
        )
    title = t(L, 'دليل ثيم فوح', 'Fawh Theme Guide')
    desc = t(L, 'دليل استخدام ثيم فوح لمتاجر العطور والعود والبخور على سلة: كل تخصيص خطوة بخطوة، بالصور.',
             'The guide to the Fawh theme for perfume, oud and bakhoor stores on Salla: every customisation step by step, with screenshots.')
    here = '/docs/' if L == 'ar' else '/docs/en/'
    there = '/docs/en/' if L == 'ar' else '/docs/'
    facts = [
        (t(L, '30', '30'), t(L, 'عنصراً للصفحة الرئيسية', 'home page blocks')),
        (t(L, '15', '15'), t(L, 'مجموعة إعدادات بشرح لكل خيار', 'settings groups, each option explained')),
        (t(L, 'من 320px', 'From 320px'), t(L, 'الجوال والتابلت والكمبيوتر', 'phone, tablet and computer')),
        (t(L, 'لغتان', 'Two languages'), t(L, 'العربية والإنجليزية، مع الوضع الداكن', 'Arabic and English, with dark mode')),
    ]
    facts_html = ''.join(f'<li><strong>{a}</strong><span>{b}</span></li>' for a, b in facts)
    return f'''<!doctype html>
<html lang="{L}" dir="{'rtl' if L == 'ar' else 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{escape(desc)}">
<link rel="canonical" href="{SITE}{here}">
<link rel="alternate" hreflang="ar" href="{SITE}/docs/">
<link rel="alternate" hreflang="en" href="{SITE}/docs/en/">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{escape(desc)}">
<meta property="og:image" content="{SITE}/docs/img/d-home.webp">
<link rel="icon" href="/brand/mark.svg" type="image/svg+xml">
<meta name="theme-color" content="#f8f4ed">
<script>(function(){{try{{var m=localStorage.getItem('fawh-docs:mode');if(m==='dark'||m==='light')document.documentElement.dataset.theme=m}}catch(e){{}}}})()</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/docs/assets/docs.css">
</head>
<body>
<a class="skip" href="#main">{t(L, 'تخطّ إلى المحتوى', 'Skip to content')}</a>
<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="{here}"><img class="brand__logo" src="/brand/logo.svg" alt="{t(L, 'فوح', 'Fawh')}" width="66" height="28"><img class="brand__logo brand__logo--light" src="/brand/logo-light.svg" alt="" width="66" height="28"><span>{t(L, 'دليل الاستخدام', 'Theme guide')}</span></a>
    <nav class="topbar__actions" aria-label="{t(L, 'خيارات', 'Options')}">
      <a class="pill" href="{there}" hreflang="{other}" lang="{other}">{t(L, 'English', 'العربية')}</a>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="{t(L, 'الوضع الداكن', 'Dark mode')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg></button>
      <a class="pill pill--solid" href="/" target="_blank" rel="noopener">{t(L, 'المتجر التجريبي', 'Live demo')}</a>
    </nav>
  </div>
</header>
<div class="hero">
  <div class="hero__copy">
    <p class="hero__kicker">{t(L, 'ثيم فوح لمتاجر العطور على سلة', 'The Fawh theme for perfume stores on Salla')}</p>
    <h1>{t(L, 'كل ما في ثيمك، وكيف تجعله متجرك', 'Everything in your theme, and how to make it yours')}</h1>
    <p>{t(L, 'دليل يشرح كل تخصيص في فوح خطوة بخطوة، بلقطات من الثيم نفسه. ابدأ من «ابدأ في عشر دقائق»، أو اقفز إلى ما تحتاجه من الفهرس.', 'A guide to every Fawh customisation, step by step, with screenshots of the theme itself. Begin with Start in ten minutes, or jump to what you need from the contents.')}</p>
    <ul class="facts">{facts_html}</ul>
  </div>
  <div class="hero__art" aria-hidden="true">
    <div class="arch"><img src="/docs/img/d-home.webp" alt="" width="1440" height="900" fetchpriority="high"></div>
    <div class="hero__phone"><img src="/docs/img/m-home.webp" alt="" width="780" height="1688"></div>
  </div>
</div>
<div class="layout">
  <aside class="toc" aria-label="{t(L, 'الفهرس', 'Contents')}">
    <details class="toc__box" open>
      <summary>{t(L, 'الفهرس', 'Contents')}</summary>
      <ol>{toc}</ol>
    </details>
  </aside>
  <main id="main" class="content">
    {''.join(body)}
    <footer class="foot"><img src="/brand/mark.svg" alt="" width="40" height="40"><p>{t(L, 'دليل ثيم فوح لمتاجر سلة. اللقطات من متجر فوح التجريبي.', 'Fawh theme guide for Salla stores. Screenshots from the Fawh demo store.')}</p></footer>
  </main>
</div>
<dialog class="zoom" aria-label="{t(L, 'عرض الصورة', 'Image')}"><button type="button" class="zoom__close" aria-label="{t(L, 'إغلاق', 'Close')}">×</button><img alt=""></dialog>
<script src="/docs/assets/docs.js" defer></script>
</body>
</html>
'''


def main():
    (OUT / 'en').mkdir(parents=True, exist_ok=True)
    (OUT / 'assets').mkdir(parents=True, exist_ok=True)
    (OUT / 'index.html').write_text(page('ar'), encoding='utf-8')
    (OUT / 'en' / 'index.html').write_text(page('en'), encoding='utf-8')
    for f in (ROOT / 'assets').iterdir():
        shutil.copy(f, OUT / 'assets' / f.name)
    print('built', OUT)


if __name__ == '__main__':
    main()
