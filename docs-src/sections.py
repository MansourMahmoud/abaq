"""The guide's chapters, written once for both languages.

Every chapter is a function of the language that returns its HTML, built from
the small helpers below so the markup stays consistent: `where` (the dashboard
path), `steps` (a numbered how-to), `shots` (a row of screenshots), `tip`,
`table`.
"""

from html import escape

IMG = '/docs/img/'


def t(lang, ar, en):
    return ar if lang == 'ar' else en


def where(lang, ar_path, en_path):
    """The path to a setting in the Salla theme editor, as breadcrumb chips."""
    parts = (ar_path if lang == 'ar' else en_path).split(' › ')
    sep = '<span class="where__sep" aria-hidden="true">‹</span>' if lang == 'ar' else '<span class="where__sep" aria-hidden="true">›</span>'
    chips = sep.join(f'<span>{escape(p)}</span>' for p in parts)
    label = t(lang, 'المكان', 'Where')
    return f'<p class="where"><span class="where__label">{label}</span>{chips}</p>'


def steps(items):
    lis = ''.join(f'<li>{i}</li>' for i in items)
    return f'<ol class="steps">{lis}</ol>'


def bullets(items):
    lis = ''.join(f'<li>{i}</li>' for i in items)
    return f'<ul class="bullets">{lis}</ul>'


def tip(lang, text):
    label = t(lang, 'نصيحة', 'Tip')
    return f'<aside class="tip"><strong>{label}</strong><p>{text}</p></aside>'


def table(head, rows):
    th = ''.join(f'<th scope="col">{h}</th>' for h in head)
    body = ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows)
    return f'<div class="table-wrap"><table><thead><tr>{th}</tr></thead><tbody>{body}</tbody></table></div>'


def shot(name, alt, caption=None):
    """One screenshot: names starting with `m-` are phone captures, the rest computer captures."""
    phone = name.startswith('m-')
    w, h = (780, 1688) if phone else (1440, 900)
    cap = f'<figcaption>{caption}</figcaption>' if caption else ''
    kind = 'phone' if phone else 'desktop'
    return (
        f'<figure class="shot shot--{kind}"><button class="shot__zoom" type="button" data-zoom="{IMG}{name}.webp" '
        f'aria-label="{escape(alt)}"><img src="{IMG}{name}.webp" alt="{escape(alt)}" width="{w}" height="{h}" '
        f'loading="lazy" decoding="async"></button>{cap}</figure>'
    )


def shots(*figs, layout='row'):
    return f'<div class="shots shots--{layout}">{"".join(figs)}</div>'


# ── Chapters ──────────────────────────────────────────────────────────────


def start(L):
    return {
        'id': 'start',
        'title': t(L, 'ابدأ في عشر دقائق', 'Start in ten minutes'),
        'lead': t(L,
            'بعد التثبيت يعمل متجرك فوراً: العناصر الثلاثون في الصفحة الرئيسية موضوعة بنصوص وصور افتراضية، وكل إعداد على أفضل اختيار لمتجر عطور. هذه الخطوات تجعله متجرك أنت.',
            'Your store works the moment Fawh is installed: all 30 home blocks are placed with sample text and photos, and every setting starts at the best choice for a perfume store. These steps make it yours.'),
        'body': steps([
            t(L, '<strong>فعّل الثيم</strong> من «تصميم المتجر» في لوحة سلة، ثم افتح «تخصيص» لتصل إلى محرر الثيم.',
              '<strong>Activate the theme</strong> from Store Design in your Salla dashboard, then open Customise to reach the theme editor.'),
            t(L, '<strong>ارفع شعارك</strong> من «هوية وبيانات المتجر» بخلفية شفافة (PNG)، واضبط مقاسه من «رأس الصفحة › مقاس الشعار».',
              '<strong>Upload your logo</strong> in Store identity, on a transparent background (PNG), and set its size in Header › Logo size.'),
            t(L, '<strong>اختر ألوانك</strong> من «الهوية والألوان والخطوط»: ألوان فوح البرونزية، أو لون متجرك من سلة، أو ألوان مخصصة.',
              '<strong>Pick your colours</strong> in Identity, colours and fonts: Fawh bronze, your Salla store colour, or your own.'),
            t(L, '<strong>استبدل صور البنر الرئيسي ونصوصه</strong> من «الصفحة الرئيسية › فوح · بنر رئيسي متحرك».',
              '<strong>Replace the hero photos and text</strong> in Home page › Fawh · Hero slider.'),
            t(L, '<strong>رتّب العناصر</strong>: اسحبها لتغيير ترتيبها، واحذف ما لا تحتاجه. يمكنك إضافة أي عنصر مرة أخرى متى شئت.',
              '<strong>Arrange the blocks</strong>: drag to reorder and remove what you do not need. You can add any block back later.'),
            t(L, '<strong>جهّز القوائم</strong> من «المتجر › القوائم» في سلة، مع صورة لكل قسم.',
              '<strong>Set up your menus</strong> in Store › Menus in Salla, with a photo for each section.'),
            t(L, '<strong>اكتب نوتات عطورك</strong> في وصف كل منتج ليظهر هرم النوتات (انظر «صفحة المنتج»).',
              '<strong>Write your perfume notes</strong> in each product description to show the notes pyramid (see Product page).'),
        ]) + shots(
            shot('d-home', t(L, 'الصفحة الرئيسية على الكمبيوتر', 'Home page on a computer')),
            shot('m-home', t(L, 'الصفحة الرئيسية على الجوال', 'Home page on a phone')),
        ) + tip(L,
            t(L, 'البنرات الإعلانية فارغة حتى تضيفها، فلا يرى عميلك أي إطار فارغ أثناء تجهيزك للمتجر.',
              'Promo banners stay empty until you add them, so shoppers never see an empty frame while you set up.')),
    }


def editor(L):
    rows_ar = [
        ('الهوية والألوان والخطوط', 'الألوان، الوضع الداكن، الخطوط، حجم العناوين، الحركة، التحميل، ضغط الصور'),
        ('رأس الصفحة', 'ثلاثة أشكال، الشعار، الشريط العلوي، التثبيت عند التمرير، القائمة الكبيرة، نافذة البحث'),
        ('الجوال', 'ترتيب الرأس، أزرار الشريط السفلي، القائمة الجانبية وصورها وبنرها'),
        ('شريط الإعلانات', 'الرسائل والروابط، الحركة، خمسة تصاميم، زر بارز، عدّاد تنازلي'),
        ('بطاقة المنتج', 'الشكل، نسبة الصورة، حركة الصورة، العرض السريع، المقارنة'),
        ('صفحة المنتج', 'الخيارات، مكان الوصف، هرم النوتات، الماركة، الصفوف، شريط الشراء'),
        ('صفحات التصنيفات', 'البنر، المنتجات في الصف، المزايا، الأقسام الفرعية، صفحة التخفيضات'),
        ('البنرات الإعلانية', 'بنرات لكل صفحة ولمن تظهر'),
        ('السلة', 'تأكيد الإضافة، السلة الجانبية، البنر، المقترحات، الإهداء، الملاحظات'),
        ('الكوبون والنوافذ المنبثقة', 'الكوبون، والنوافذ بجمهورها وتوقيتها وتصميمها'),
        ('أزرار التواصل العائمة', 'واتساب، الاتصال، العودة للأعلى'),
        ('تذييل الصفحة', 'خمسة أشكال، الألوان، الشعار، النبذة، الأجزاء الظاهرة'),
        ('المدونة', 'البنرات، عرض المقالات، المنتج المختار، منتجات المقالات، التعليقات'),
        ('صفحات أخرى', 'الماركات، الولاء، الصفحات التعريفية، بنر حسابي، صفحة «غير موجودة»'),
    ]
    rows_en = [
        ('Identity, colours and fonts', 'Colours, dark mode, fonts, heading size, motion, loading, image compression'),
        ('Header', 'Three layouts, logo, top bar, sticky header, mega menu, search window'),
        ('Mobile', 'Header order, bottom bar buttons, side menu with photos and banner'),
        ('Announcement bar', 'Messages and links, motion, five designs, a highlighted button, countdown'),
        ('Product card', 'Style, image ratio, hover motion, quick view, compare'),
        ('Product page', 'Options, description position, notes pyramid, brand, rows, buy bar'),
        ('Category pages', 'Banner, products per row, perks, subcategories, offers page'),
        ('Promo banners', 'Banners for each page and who sees them'),
        ('Cart', 'Add confirmation, side cart, banner, suggestions, gifting, notes'),
        ('Coupon and popups', 'Coupon, and popups with audience, timing and design'),
        ('Floating contact buttons', 'WhatsApp, call, back to top'),
        ('Footer', 'Five layouts, colours, logo, about text, visible parts'),
        ('Blog', 'Banners, post layout, featured product, products in posts, comments'),
        ('Other pages', 'Brands, loyalty, info pages, account banner, not-found page'),
    ]
    rows = rows_ar if L == 'ar' else rows_en
    return {
        'id': 'editor',
        'title': t(L, 'أين أجد كل إعداد؟', 'Where every setting lives'),
        'lead': t(L,
            'كل إعدادات فوح في «إعدادات الثيم» داخل محرر سلة، في 15 مجموعة. تحت كل خيار سطر يشرح ما يفعله، والخيار الذي لا أثر له مع اختيار آخر يختفي وحده، فلا ترى إلا ما يعمل.',
            'All Fawh settings are under Theme settings in the Salla editor, in 15 groups. Every option has a line explaining what it does, and options that have no effect with your current choice hide themselves.'),
        'body': table([t(L, 'المجموعة', 'Group'), t(L, 'ما فيها', 'What is in it')],
                      [(f'<strong>{a}</strong>', b) for a, b in rows]),
    }


def identity(L):
    return {
        'id': 'identity',
        'title': t(L, 'الألوان والخطوط والوضع الداكن', 'Colours, fonts and dark mode'),
        'lead': t(L,
            'فوح يأتي بألوان برونزية دافئة تناسب العطور. غيّرها بلون متجرك، أو امنح عملاءك وضعاً داكناً كاملاً بضغطة زر.',
            'Fawh ships with warm bronze colours made for perfume. Switch to your own brand colour, or give shoppers a full dark mode with one tap.'),
        'body': where(L, 'إعدادات الثيم › الهوية والألوان والخطوط', 'Theme settings › Identity, colours and fonts') + steps([
            t(L, 'اختر <strong>ألوان المتجر</strong>: ألوان فوح (الافتراضي)، أو لون متجرك من «هوية المتجر» في سلة، أو «ألوان مخصصة» لتحدد اللون الرئيسي والخلفيات والنصوص وألوان الخصم.',
              'Choose <strong>Store colours</strong>: Fawh colours (default), your Salla store colour, or Custom to set the main colour, backgrounds, text and sale colours.'),
            t(L, 'اختر <strong>خط النصوص</strong> و<strong>خط العناوين</strong>. كلها خطوط عربية بحروف لاتينية: IBM Plex وتجوّل والمراعي وغيرها، والعناوين بالأميري أو المسيري أو رقعة.',
              'Pick a <strong>body font</strong> and a <strong>heading font</strong>. All are Arabic fonts with Latin letters: IBM Plex, Tajawal, Almarai and more; headings in Amiri, El Messiri or Ruqaa.'),
            t(L, 'في <strong>الوضع الداكن</strong> اختر: بدون، أو زر في رأس الصفحة يختار به العميل ويُحفظ على جهازه، أو داكن دائماً. وحدد ما يراه العميل أول مرة: فاتح أو داكن أو حسب جهازه.',
              'Under <strong>Dark mode</strong> choose off, a header button that each shopper sets for their device, or always dark. Then choose what a first visit shows: light, dark, or the device setting.'),
            t(L, 'إن أردت، حدد للوضع الداكن ألوانه الخاصة.', 'Optionally give dark mode its own colours.'),
        ]) + shots(
            shot('d-home-dark', t(L, 'الوضع الداكن على الكمبيوتر', 'Dark mode on a computer')),
            shot('m-home-dark', t(L, 'الوضع الداكن على الجوال', 'Dark mode on a phone')),
        ) + tip(L, t(L,
            'يُضبط الوضع قبل أن تظهر الصفحة، فلا يرى العميل وميضاً أبيض عند فتح المتجر داكناً. وألوان «تصميم القسم» في أي عنصر تتقدم على ألوان المتجر.',
            'The mode is set before the page paints, so there is no white flash when the store opens dark. Colours set in a block’s Section design take priority over store colours.')),
    }


def header(L):
    return {
        'id': 'header',
        'title': t(L, 'رأس الصفحة والقائمة والبحث', 'Header, menu and search'),
        'lead': t(L,
            'رأس الصفحة أول ما يراه العميل. فوح يعطيك ثلاثة أشكال له، وقائمة كبيرة تعرض الأقسام بصورها ومنتجاتها، ونافذة بحث تقترح قبل أن يكتب العميل.',
            'The header is the first thing shoppers see. Fawh gives you three layouts, a mega menu with section photos and products, and a search window that suggests before anyone types.'),
        'body': where(L, 'إعدادات الثيم › رأس الصفحة', 'Theme settings › Header') + bullets([
            t(L, '<strong>ثلاثة أشكال:</strong> عائم فوق البنر، أو كلاسيكي بحقل بحث، أو جانبي بزر القائمة. ومكان الشعار والشفافية فوق البنر.',
              '<strong>Three layouts:</strong> floating over the hero, classic with a search field, or a side menu button. Plus logo position and transparency over the hero.'),
            t(L, '<strong>التثبيت عند التمرير:</strong> دائم (الافتراضي)، أو ذكي يختفي مع النزول ويعود مع الصعود، أو بدون.',
              '<strong>Sticky header:</strong> always (default), smart (hides on the way down, returns on the way up), or off.'),
            t(L, '<strong>القائمة الكبيرة:</strong> القسم الذي يمر عليه العميل يعرض أقسامه الفرعية بصورها ومنتجاته وبنره. والأقسام التي لا تتسع لها القائمة تنتقل إلى زر «المزيد».',
              '<strong>Mega menu:</strong> hovering a section shows its subsections with photos, its products and its banner. Sections that do not fit move into a More button.'),
            t(L, '<strong>شريط الإعلانات</strong> فوق الرأس: رسائل متحركة أو تتبدل بأسهم، خمسة تصاميم، زر بارز، وعدّاد تنازلي لنهاية عرض.',
              '<strong>Announcement bar</strong> above the header: scrolling or rotating messages, five designs, a highlighted button, and a countdown to the end of an offer.'),
        ]) + shots(shot('d-mega', t(L, 'القائمة الكبيرة', 'Mega menu'))) + f'<h3>{t(L, "نافذة البحث", "Search window")}</h3>' + where(
            L, 'إعدادات الثيم › رأس الصفحة › البحث', 'Theme settings › Header › Search') + steps([
            t(L, 'اختر عنوان <strong>الكلمات الرائجة</strong> ومصدرها: أقسام القائمة تلقائياً، أو حتى 12 كلمة ترتبها أنت، لكل كلمة بحث أو تصنيف أو رابط، مع شعلة «رائج» على كلمة أو اثنتين.',
              'Set the <strong>trending words</strong> title and source: your menu sections automatically, or up to 12 words you order yourself, each running a search or opening a category or link, with a “trending” flame on one or two.'),
            t(L, 'اختر <strong>قائمة المنتجات</strong> المقترحة: الأكثر مبيعاً، أو منتجات تختارها، أو أحدث منتجات تصنيف، أو أقوى التخفيضات، من 2 إلى 8 منتجات.',
              'Choose the <strong>suggested products</strong>: best sellers, picked products, newest in a category, or deepest discounts, 2 to 8 of them.'),
            t(L, 'أضف إن شئت <strong>منتجاً مميزاً أو بنراً</strong> بجانبها.', 'Optionally add a <strong>featured product or banner</strong> beside them.'),
        ]) + shots(
            shot('d-search', t(L, 'نافذة البحث على الكمبيوتر', 'Search window on a computer')),
            shot('m-search', t(L, 'نافذة البحث على الجوال', 'Search window on a phone')),
        ) + tip(L, t(L,
            'اربط الكلمة الرائجة بتصنيف بدل البحث عنها، فالكلمة التي لا تطابق أسماء منتجاتك تعرض «لا نتائج».',
            'Link a trending word to a category rather than a search: a word that matches no product names shows no results.')),
    }


def mobile(L):
    return {
        'id': 'mobile',
        'title': t(L, 'مصمم للجوال', 'Built for phones'),
        'lead': t(L,
            'أغلب عملاء متاجر العطور يتسوقون من الجوال. فوح مصمم له أولاً، من شاشة 320 بكسل فما فوق.',
            'Most perfume shoppers buy on their phones. Fawh is designed for them first, from 320-pixel screens up.'),
        'body': where(L, 'إعدادات الثيم › الجوال', 'Theme settings › Mobile') + bullets([
            t(L, '<strong>شريط سفلي عائم</strong> بأزرار تختارها (الرئيسية، الأقسام، البحث، السلة، الحساب) وأسمائها.',
              '<strong>A floating bottom bar</strong> with the buttons you choose (home, sections, search, cart, account) and their labels.'),
            t(L, '<strong>قائمة جانبية</strong> بصور دائرية للأقسام في كل المستويات، وصورة ترفعها لروابط التخفيضات والمدونة والماركات، وبنر بصورته ونصه.',
              '<strong>A side menu</strong> with round section photos at every level, a photo you upload for the offers, blog and brands links, and a banner.'),
            t(L, '<strong>صفوف المنتجات</strong> تعرض بطاقة واحدة مع طرف التالية، ليعرف العميل أن الصف يُسحب. وتبويبات الأقسام أعمدة متساوية بعرض الشاشة.',
              '<strong>Product rows</strong> show one card with the edge of the next, so shoppers know the row swipes. Section tabs split the screen width evenly.'),
            t(L, '<strong>زر التصفية</strong> على طرف الشاشة في صفحات التصنيفات، يظهر بجانب المنتجات فقط.',
              '<strong>A filter tab</strong> on the screen edge on category pages, shown only beside the products.'),
        ]) + shots(
            shot('m-drawer', t(L, 'القائمة الجانبية بصور الأقسام', 'Side menu with section photos')),
            shot('m-rail', t(L, 'صف منتجات ببطاقة واحدة وتبويبات متساوية', 'One-card product row and even tabs')),
            shot('m-category', t(L, 'زر التصفية بجانب المنتجات', 'Filter tab beside the products')),
            layout='phones') + tip(L, t(L,
            'عدد البطاقات على الجوال يُغيَّر من «طريقة العرض» في كل عنصر. نوصي ببطاقة واحدة للمنتجات، واثنتين أو ثلاث للأقسام والصور الصغيرة.',
            'Change cards per phone screen in each block’s Display settings. We recommend one for products, two or three for sections and small images.')),
    }


def blocks_intro(L):
    return {
        'id': 'blocks',
        'title': t(L, 'عناصر الصفحة الرئيسية', 'Home page blocks'),
        'lead': t(L,
            'ثلاثون عنصراً صُممت لمتاجر العطور. كل عنصر يُضاف ويُحذف ويُرتّب، ويفتح في المحرر ببطاقة تشرح ما يفعله ومعاينة له.',
            'Thirty blocks designed for perfume stores. Add, remove and reorder any of them; each opens in the editor with a card that explains it and a preview.'),
        'body': where(L, 'محرر الثيم › الصفحة الرئيسية', 'Theme editor › Home page') + steps([
            t(L, 'اضغط <strong>إضافة عنصر</strong> واختر من عناصر فوح.', 'Click <strong>Add block</strong> and pick a Fawh block.'),
            t(L, 'املأ محتواه: العنوان والصور والمنتجات أو التصنيفات.', 'Fill in its content: title, photos, products or categories.'),
            t(L, 'اختر <strong>طريقة العرض</strong>: كاروسيل يُسحب، أو شبكة، أو شبكة على الكمبيوتر وكاروسيل على الجوال، والعدد في الشاشة لكل جهاز.',
              'Choose its <strong>Display</strong>: a swipeable carousel, a grid, or a grid on computers and a carousel on phones, plus items per screen on each device.'),
            t(L, 'افتح <strong>تصميم القسم</strong> في آخر العنصر لتغيّر خلفيته وألوانه وعرضه وزواياه ومسافاته.',
              'Open <strong>Section design</strong> at the end of the block to change its background, colours, width, corners and spacing.'),
            t(L, 'احفظ، واسحب العنصر لمكانه في الصفحة.', 'Save, and drag the block into place.'),
        ]) + f'<h3>{t(L, "تصميم القسم", "Section design")}</h3>' + bullets([
            t(L, '<strong>الخلفية:</strong> لون، أو تدرّج بلونين واتجاه، أو صورة لكل شاشة مع تعتيم.', '<strong>Background:</strong> a colour, a two-colour gradient with direction, or a photo per screen with dimming.'),
            t(L, '<strong>الألوان:</strong> نصوص فاتحة أو داكنة، ولون للعنوان والنص والأزرار.', '<strong>Colours:</strong> light or dark text, and colours for title, text and buttons.'),
            t(L, '<strong>العرض والشكل:</strong> بطاقة بعرض الصفحة أو ممتد بعرض الشاشة، الزوايا والظل والإطار.', '<strong>Width and shape:</strong> a card within the page or full-bleed, corners, shadow and border.'),
            t(L, '<strong>المسافات والعنوان:</strong> المسافة أعلى القسم وأسفله، محاذاة العنوان وحجمه وخطه.', '<strong>Spacing and title:</strong> space above and below, title alignment, size and font.'),
            t(L, '<strong>معرّف للروابط:</strong> مثل <code>#offers</code>، لزر في البنر ينقل الزائر إلى القسم.', '<strong>Anchor:</strong> such as <code>#offers</code>, so a hero button can jump to the section.'),
        ]) + tip(L, t(L,
            'ما دام مفتاح «تخصيص تصميم القسم» مغلقاً يبقى القسم على تصميم فوح الأصلي، فلا تخشَ التجربة.',
            'While “Customise section design” is off the block keeps Fawh’s own design, so feel free to experiment.')),
    }


def product(L):
    pyramid = t(L,
        'النوتات العليا: برغموت، هيل\nنوتات القلب: ورد طائفي، ياسمين\nالنوتات الأساسية: عود، عنبر، مسك\nالثبات: 4\nالفوحان: 3',
        'Top notes: bergamot, cardamom\nHeart notes: Taif rose, jasmine\nBase notes: oud, amber, musk\nLongevity: 4\nSillage: 3')
    return {
        'id': 'product',
        'title': t(L, 'صفحة المنتج وهرم النوتات', 'Product page and notes pyramid'),
        'lead': t(L,
            'صفحة المنتج في فوح تبيع العطر كما يبيعه البائع في المحل: نوتاته، وثباته، وماركته، وطريقة شرائه بأقل خطوات.',
            'The Fawh product page sells a scent the way a good shop assistant does: its notes, how long it lasts, its brand, and the fewest steps to buy.'),
        'body': f'<h3>{t(L, "هرم النوتات", "Notes pyramid")}</h3>' + f'<p>{t(L, "اكتب في وصف المنتج سطراً لكل مرحلة، فيرسمه فوح هرماً بتوقيتات وأشرطة للثبات والفوحان:", "Write one line per stage in the product description and Fawh draws it as a pyramid, with timings and bars for longevity and sillage:")}</p>'
        + f'<pre class="code" dir="{"rtl" if L == "ar" else "ltr"}"><code>{escape(pyramid)}</code></pre>' + bullets([
            t(L, 'تُقبل عناوين بديلة مثل «نوتات الرأس» و«Top notes»، والفاصل <code>:</code> أو <code>-</code> أو <code>|</code>.',
              'Alternative headings such as “Head notes” are understood, with <code>:</code>, <code>-</code> or <code>|</code> as the separator.'),
            t(L, 'لتوقيت خاص بمنتج اكتبه بين قوسين: <code>النوتات العليا (أول 30 دقيقة): هيل</code>.',
              'For a timing on one product, put it in brackets: <code>Top notes (first 30 minutes): cardamom</code>.'),
            t(L, 'تُحذف هذه الأسطر من تبويب الوصف حتى لا تتكرر.', 'These lines are removed from the description tab so they do not repeat.'),
        ]) + shots(shot('d-pyramid', t(L, 'هرم النوتات في صفحة المنتج', 'Notes pyramid on the product page')))
        + f'<h3>{t(L, "ما في الصفحة", "On the page")}</h3>' + where(L, 'إعدادات الثيم › صفحة المنتج', 'Theme settings › Product page') + bullets([
            t(L, '<strong>الخيارات أزراراً</strong> بدل القائمة المنسدلة للحجم والتركيز، والسعر والمخزون يعملان كما هما.',
              '<strong>Options as buttons</strong> instead of a dropdown for size and concentration; price and stock work as usual.'),
            t(L, '<strong>بطاقة الماركة</strong> بشعارها ورابط «تسوّق من الماركة»، وشارة الأصالة والمزايا.',
              '<strong>A brand card</strong> with its logo and a shop-the-brand link, plus an authenticity badge and perks.'),
            t(L, '<strong>مكان الوصف:</strong> تبويب، أو مقتطف تحت السعر، أو كاملاً تحت السعر.',
              '<strong>Description position:</strong> a tab, an excerpt under the price, or in full under the price.'),
            t(L, '<strong>شريط الشراء السفلي:</strong> حين يتجاوز العميل أزرار الشراء ينزلق شريط بالصورة والسعر والكمية وزر الإضافة، و«اشترِ الآن» وApple Pay إن كانا مفعّلين في متجرك. تختار شاشاته وشكله وأجزاءه.',
              '<strong>Sticky buy bar:</strong> once shoppers scroll past the buy buttons, a bar slides in with the photo, price, quantity and add button, plus Buy now and Apple Pay when your store has them. Choose its screens, look and parts.'),
            t(L, '<strong>منتجات مشابهة وشاهدتها مؤخراً</strong> بعنوانين تكتبهما وطريقة عرض تختارها.',
              '<strong>Similar products and recently viewed</strong> rows with your own titles and display.'),
        ]) + shots(
            shot('d-product', t(L, 'صفحة المنتج', 'Product page')),
            shot('m-buybar', t(L, 'شريط الشراء على الجوال', 'Buy bar on a phone')),
        ) + f'<h3>{t(L, "بطاقة المنتج", "Product card")}</h3>' + where(L, 'إعدادات الثيم › بطاقة المنتج', 'Theme settings › Product card') + bullets([
            t(L, '<strong>حركة الصورة عند المرور:</strong> تكبير هادئ، أو الصورة الثانية للمنتج، أو ضوء يعبر الصورة، أو رفع البطاقة.',
              '<strong>Hover motion:</strong> a gentle zoom, the product’s second photo, a light sweep, or a lifted card.'),
            t(L, '<strong>العرض السريع:</strong> نافذة بالصور والسعر والنوتات والكمية وزر الإضافة، دون مغادرة الصفحة.',
              '<strong>Quick view:</strong> a window with photos, price, notes, quantity and add to cart, without leaving the page.'),
            t(L, '<strong>المقارنة:</strong> حتى 4 منتجات في جدول بالسعر والتقييم والنوتات والثبات والفوحان.',
              '<strong>Compare:</strong> up to 4 products side by side by price, rating, notes, longevity and sillage.'),
        ]) + shots(shot('d-quick', t(L, 'العرض السريع', 'Quick view'))),
    }


def category(L):
    return {
        'id': 'category',
        'title': t(L, 'التصنيفات والتخفيضات', 'Categories and offers'),
        'lead': t(L,
            'صفحات التصنيفات تفتح ببنر التصنيف، ثم أقسامه الفرعية في أقواس، ثم المنتجات بتصفية واضحة.',
            'Category pages open with the category banner, then its subcategories in arches, then the products with clear filters.'),
        'body': where(L, 'إعدادات الثيم › صفحات التصنيفات', 'Theme settings › Category pages') + bullets([
            t(L, '<strong>البنر:</strong> داخل الصفحة أو بعرض الشاشة، وارتفاعه والتعتيم ومكان النص. صورته هي صورة التصنيف في سلة.',
              '<strong>Banner:</strong> within the page or full width, its height, dimming and text position. Its photo is the category photo in Salla.'),
            t(L, '<strong>الأقسام الفرعية:</strong> كل قوس بصورة التصنيف أو صورة أحدث منتج فيه، وللفارغ بديل تختاره: الحرف الأول، أو صورة الأب، أو صورتك، أو شعارك.',
              '<strong>Subcategories:</strong> each arch shows the category photo or its newest product, and empty ones show a fallback you choose: the first letter, the parent photo, your image or your logo.'),
            t(L, '<strong>المنتجات:</strong> العدد في الصف لكل جهاز، وعرض شبكة أو صفوف، والمزايا فوقها.',
              '<strong>Products:</strong> per-row count on each device, grid or list view, and perks above them.'),
            t(L, '<strong>صفحة التخفيضات:</strong> بنر بصورته ونصوصه وزره، وتصفية تختار أجزاءها: التصنيفات، الماركات، نسبة الخصم، نطاقات السعر، المتوفر فقط.',
              '<strong>Offers page:</strong> a banner with its photo, text and button, and filters you choose: categories, brands, discount, price ranges, in stock only.'),
            t(L, '<strong>تسوّق حسب الميزانية:</strong> صفحة لكل نطاق سعر تفتحها بطاقات عنصر الميزانية.',
              '<strong>Shop by budget:</strong> a page per price range, opened from the budget block cards.'),
        ]) + shots(
            shot('d-category', t(L, 'بنر التصنيف وأقسامه الفرعية', 'Category banner and subcategories')),
            shot('d-catlist', t(L, 'المنتجات والتصفية', 'Products and filters')),
            shot('d-offers', t(L, 'صفحة التخفيضات', 'Offers page')),
            shot('d-budget', t(L, 'صفحة الميزانية', 'Budget page')),
            layout='grid'),
    }


def cart(L):
    return {
        'id': 'cart',
        'title': t(L, 'السلة والإهداء', 'Cart and gifting'),
        'lead': t(L,
            'العطر هدية في أغلب الأحيان، فالسلة في فوح تجعل الإهداء خطوة واضحة، وتعرض كوبوناتك ومقترحاتك قبل الدفع.',
            'Perfume is often a gift, so the Fawh cart makes gifting an obvious step and shows your coupons and suggestions before checkout.'),
        'body': where(L, 'إعدادات الثيم › السلة', 'Theme settings › Cart') + bullets([
            t(L, '<strong>أرسل الطلب كهدية:</strong> بطاقة بارزة في السلة الجانبية وصفحة السلة تفتح نافذة الإهداء، بعنوان وسطر تكتبهما.',
              '<strong>Send as a gift:</strong> a prominent card in the side cart and cart page that opens the gifting window, with your own title and line.'),
            t(L, '<strong>كوبونات المتجر:</strong> تذاكر بلون المتجر في صف يُسحب.', '<strong>Store coupons:</strong> tickets in your store colour, in a swipeable row.'),
            t(L, '<strong>قد يعجبك أيضاً:</strong> صف منتجات بعنوانه وطريقة عرضه.', '<strong>You may also like:</strong> a product row with its own title and display.'),
            t(L, '<strong>بنر السلة</strong> بصورته ونصه ورابطه، و<strong>تأكيد الإضافة</strong> بالشكل الذي تختاره.',
              '<strong>A cart banner</strong> with photo, text and link, and an <strong>add-to-cart confirmation</strong> in the style you choose.'),
            t(L, '<strong>ملاحظات على الطلب:</strong> بطاقة توضح للعميل أن خانة الملاحظة في صفحة إتمام الطلب.',
              '<strong>Order notes:</strong> a card telling shoppers the note field is on the checkout page.'),
        ]) + shots(
            shot('d-cart', t(L, 'صفحة السلة', 'Cart page')),
            shot('m-cart', t(L, 'السلة على الجوال', 'Cart on a phone')),
        ),
    }


def promo(L):
    return {
        'id': 'promo',
        'title': t(L, 'البنرات الإعلانية والنوافذ المنبثقة', 'Promo banners and popups'),
        'lead': t(L,
            'اعرض العرض المناسب في المكان المناسب: بنر لتصنيف العود في صفحاته فقط، ونافذة ترحيب لزائرك الأول، وعرض أقوى لمن أغلقها.',
            'Show the right offer in the right place: an oud banner on oud pages only, a welcome popup for first visits, and a stronger offer for those who close it.'),
        'body': f'<h3>{t(L, "البنرات الإعلانية", "Promo banners")}</h3>' + where(L, 'إعدادات الثيم › البنرات الإعلانية', 'Theme settings › Promo banners') + steps([
            t(L, 'أضف بنراً واختر <strong>مكانه</strong>: صفحة المنتج، صفحة التصنيف، التخفيضات، السلة، المدونة، الصفحات التعريفية، حسابي، نافذة الدخول، أو القائمة الجانبية.',
              'Add a banner and choose <strong>where</strong>: product page, category page, offers, cart, blog, info pages, account, login window, or side menu.'),
            t(L, 'اختر <strong>لمن يظهر</strong>: الكل، أو منتجات أو تصنيفات أو ماركات محددة. التصنيف الأب يشمل فروعه ومنتجاتها.',
              'Choose <strong>who sees it</strong>: everyone, or specific products, categories or brands. A parent category includes its children and their products.'),
            t(L, 'ارفع <strong>الصورة</strong> لكل شاشة، واكتب النص والرابط، واختر الشكل: نص فوق الصورة، أو صورة فقط، أو صورة بجانب النص.',
              'Upload the <strong>image</strong> for each screen, write the text and link, and choose the look: text over the image, image only, or image beside text.'),
            t(L, 'حدد إن شئت <strong>تاريخ البداية والنهاية</strong>، فيظهر البنر ويختفي وحده.', 'Optionally set <strong>start and end dates</strong> so the banner appears and disappears on its own.'),
        ]) + f'<h3>{t(L, "النوافذ المنبثقة", "Popups")}</h3>' + where(L, 'إعدادات الثيم › الكوبون والنوافذ المنبثقة', 'Theme settings › Coupon and popups') + bullets([
            t(L, '<strong>لمن تظهر:</strong> الكل، الزائر الأول، العائد، غير المسجل، المسجل، أو من أغلق نافذة أخرى. بهذا تبني سلسلة: ترحيب ثم عرض أقوى.',
              '<strong>Audience:</strong> everyone, first visit, returning, guests, signed-in customers, or people who closed another popup. That builds a sequence: a welcome, then a stronger offer.'),
            t(L, '<strong>أين ومتى:</strong> الصفحات والجهاز، وفوراً أو بعد ثوانٍ أو بعد التمرير أو عند محاولة المغادرة. ولا تظهر أي نافذة في السلة وإتمام الطلب.',
              '<strong>Where and when:</strong> pages and device; immediately, after seconds, after scrolling, or on exit intent. No popup ever shows in the cart or checkout.'),
            t(L, '<strong>التصميم:</strong> صورة بجانب النص أو فوقه، ختم الخصم، كود كوبون يُنسخ، زر ورابط، والألوان.',
              '<strong>Design:</strong> image beside or above the text, a discount stamp, a copyable coupon code, a button and link, and colours.'),
        ]) + shots(shot('d-popup', t(L, 'نافذة ترحيب بكوبون', 'Welcome popup with a coupon'))) + tip(L, t(L,
            'تغيير «اسم الحملة» يعيد النافذة لكل الزوار، حتى من اختار «لا تظهر مجدداً». استخدمه حين تطلق عرضاً جديداً.',
            'Changing the campaign name shows the popup to everyone again, even those who chose not to see it. Use it when you launch a new offer.')),
    }


def content(L):
    return {
        'id': 'content',
        'title': t(L, 'المدونة والولاء والماركات', 'Blog, loyalty and brands'),
        'lead': t(L,
            'الصفحات التي تبني الثقة وتعيد العميل: مقالات تبيع، وبرنامج ولاء واضح، وصفحة لكل ماركة.',
            'The pages that build trust and bring shoppers back: posts that sell, a clear loyalty programme, and a page for every brand.'),
        'body': bullets([
            t(L, '<strong>المدونة:</strong> مقال مميز ومقالات بطريقة عرض تختارها، ومنتجات داخل كل مقال (حتى أربعة) بعد الفقرة الأولى أو في آخره أو بجانبه، ومنتج مختار وحسابات المتجر أسفل المقال.',
              '<strong>Blog:</strong> a featured post and posts in the layout you choose, up to four products inside each post (after the first paragraph, at the end, or beside it), a featured product, and your social accounts under each post.'),
            t(L, '<strong>برنامج الولاء:</strong> طرق كسب النقاط والمكافآت من برنامج سلة، بأسماء مترجمة وأيقونات.',
              '<strong>Loyalty:</strong> ways to earn points and rewards from Salla’s programme, with translated names and icons.'),
            t(L, '<strong>الماركات:</strong> صفحة بكل الماركات وحروفها، وصفحة لكل ماركة بمنتجاتها.',
              '<strong>Brands:</strong> a page of all brands with an A–Z index, and a page per brand with its products.'),
        ]) + shots(
            shot('d-article', t(L, 'مقال بمنتجاته', 'A post with its products')),
            shot('d-blog', t(L, 'المدونة', 'Blog')),
            shot('d-loyalty', t(L, 'برنامج الولاء', 'Loyalty page')),
            shot('d-brands', t(L, 'الماركات', 'Brands')),
            layout='grid'),
    }


def footer(L):
    return {
        'id': 'footer',
        'title': t(L, 'التذييل وأزرار التواصل', 'Footer and contact buttons'),
        'lead': t(L,
            'آخر ما يراه العميل: عبارة تدعوه للتواصل، روابطك، توثيق متجرك، وطرق الدفع.',
            'The last thing shoppers see: a line inviting them to get in touch, your links, your store verification, and payment methods.'),
        'body': where(L, 'إعدادات الثيم › تذييل الصفحة', 'Theme settings › Footer') + bullets([
            t(L, '<strong>خمسة أشكال:</strong> عصري بعبارة كبيرة، بطاقات، أعمدة، متمركز، مختصر. والتوهّج والكلمة الضخمة والألوان.',
              '<strong>Five layouts:</strong> modern with a large line, cards, columns, centred, compact. Plus glow, an oversized word, and colours.'),
            t(L, '<strong>التوثيق:</strong> بطاقة لكل ما وثّقته في سلة: السجل التجاري أو وثيقة العمل الحر، الرقم الضريبي، المركز السعودي للأعمال، معروف.',
              '<strong>Verification:</strong> a card for everything verified in Salla: commercial register or freelance document, VAT number, Saudi Business Center, Maroof.'),
            t(L, '<strong>أزرار عائمة:</strong> واتساب برقمك ورسالة جاهزة، والاتصال، والعودة للأعلى.',
              '<strong>Floating buttons:</strong> WhatsApp with your number and a ready message, call, and back to top.'),
        ]) + shots(
            shot('d-footer', t(L, 'التذييل', 'Footer')),
            shot('m-footer', t(L, 'التذييل على الجوال', 'Footer on a phone')),
        ),
    }


def speed(L):
    return {
        'id': 'speed',
        'title': t(L, 'الصور والسرعة', 'Images and speed'),
        'lead': t(L,
            'متجر سريع يبيع أكثر. فوح يرسل لكل جهاز صورة بمقاس شاشته ومضغوطة تلقائياً، ويؤجل ما لا يراه العميل بعد.',
            'A fast store sells more. Fawh sends every device an image sized for its screen and compressed automatically, and waits to load what shoppers cannot see yet.'),
        'body': where(L, 'إعدادات الثيم › الهوية والألوان والخطوط › التحميل والسرعة', 'Theme settings › Identity › Loading and speed') + table(
            [t(L, 'ضغط الصور', 'Image compression'), t(L, 'ما يحدث', 'What happens')],
            [
                (t(L, '<strong>متوازن</strong> (الافتراضي)', '<strong>Balanced</strong> (default)'),
                 t(L, 'نسخة بمقاس الشاشة (من 360 إلى 1920 بكسل) بصيغة WebP أو AVIF، بجودة لا تفرق عن الأصل بالعين', 'A copy sized to the screen (360 to 1920 px) in WebP or AVIF, indistinguishable from the original')),
                (t(L, '<strong>جودة أعلى</strong>', '<strong>Higher quality</strong>'), t(L, 'المقاس نفسه بضغط أخف، للصور ذات التفاصيل الدقيقة', 'The same sizes with lighter compression, for finely detailed photos')),
                (t(L, '<strong>الأصلية</strong>', '<strong>Original</strong>'), t(L, 'الملف كما رفعته، وهو الأبطأ', 'The file exactly as uploaded, the slowest option')),
            ]) + f'<h3>{t(L, "المقاسات الموصى بها", "Recommended sizes")}</h3>' + table(
            [t(L, 'الصورة', 'Image'), t(L, 'الكمبيوتر', 'Computer'), t(L, 'الجوال', 'Phone')],
            [
                (t(L, 'البنر الرئيسي', 'Hero slide'), '1920×900', '800×1100'),
                (t(L, 'البنر العريض', 'Feature banner'), '1920×640 (3:1)', '800×1000 (4:5)'),
                (t(L, 'بنرات التشكيلات', 'Collection banners'), '1200×900', '800×1000'),
                (t(L, 'صورة القصة الكبيرة', 'Brand story photo'), '800×1000', '800×900'),
                (t(L, 'صورة المناسبة', 'Occasion photo'), '600×800', '600×800'),
                (t(L, 'منشور إنستغرام', 'Instagram post'), '800×800', '800×800'),
                (t(L, 'بنر صفحات حسابي', 'Account banner'), '1920×400', '800×450'),
                (t(L, 'النافذة المنبثقة', 'Popup'), '800×1000', '800×500'),
            ]) + bullets([
            t(L, 'ارفع الصور بصيغة WebP أو JPG، وPNG للشفاف فقط، وبحجم أقل من 400 كيلوبايت.', 'Upload WebP or JPG, PNG only for transparency, under 400 KB.'),
            t(L, 'لكل صورة ملف اختياري للتابلت والجوال، فيأخذ كل جهاز صورته لا صورة الكمبيوتر.', 'Every image takes optional tablet and phone files, so each device loads its own.'),
            t(L, 'العناصر البعيدة في الصفحة لا تُحمّل إلا حين يقترب منها العميل.', 'Blocks further down the page load only as the shopper approaches them.'),
        ]),
    }


def salla(L):
    rows = [
        (t(L, 'الشعار', 'Logo'), t(L, 'تصميم المتجر › تخصيص › هوية وبيانات المتجر', 'Store design › Customise › Store identity')),
        (t(L, 'صورة بنر التصنيف', 'Category banner photo'), t(L, 'المنتجات › التصنيفات › صورة التصنيف', 'Products › Categories › Category image')),
        (t(L, 'القوائم وصور الأقسام', 'Menus and section photos'), t(L, 'المتجر › القوائم', 'Store › Menus')),
        (t(L, 'التصفية بالخيارات والتقييم', 'Filtering by options and rating'), t(L, 'الإعدادات › إعدادات المنتجات › تصفية المنتجات', 'Settings › Product settings › Product filters')),
        (t(L, 'برنامج الولاء', 'Loyalty programme'), t(L, 'التسويق › برنامج الولاء', 'Marketing › Loyalty programme')),
        (t(L, 'تصنيفات المدونة والتعليقات', 'Blog categories and comments'), t(L, 'التسويق › المدونة', 'Marketing › Blog')),
        (t(L, 'التوثيق والرقم الضريبي', 'Verification and VAT'), t(L, 'الإعدادات › توثيق المتجر، والإعدادات › الضرائب', 'Settings › Store verification, and Settings › Taxes')),
        (t(L, 'حسابات التواصل', 'Social accounts'), t(L, 'الإعدادات › معلومات المتجر', 'Settings › Store information')),
        (t(L, 'إظهار عنصر حسب الجهاز أو اللغة', 'Show a block by device or language'), t(L, '«إعدادات متقدمة» في كل عنصر', 'Advanced settings in each block')),
    ]
    return {
        'id': 'salla',
        'title': t(L, 'ما يُضبط من لوحة سلة', 'Set in your Salla dashboard'),
        'lead': t(L,
            'بعض ما يعرضه فوح يأتي من بيانات متجرك في سلة لا من إعدادات الثيم. هذا مكان كل منها.',
            'Some of what Fawh shows comes from your store data in Salla rather than from theme settings. Here is where each one lives.'),
        'body': table([t(L, 'الميزة', 'Feature'), t(L, 'مكانها في سلة', 'Where in Salla')], rows) + tip(L, t(L,
            'كل نص في إعدادات الثيم يُكتب بكل لغة تفعّلها في متجرك، ونصوص فوح الافتراضية جاهزة بالعربية والإنجليزية.',
            'Every text in the theme settings can be written in each language your store has; Fawh’s own text comes ready in Arabic and English.')),
    }


def support(L):
    return {
        'id': 'support',
        'title': t(L, 'الدعم', 'Support'),
        'lead': t(L,
            'نرد على استفسارك خلال يومي عمل على الأكثر. أرسل لنا رابط متجرك ووصفاً لما تحتاجه، ولقطة شاشة إن أمكن.',
            'We answer within two working days at most. Send your store link, what you need, and a screenshot if you can.'),
        'body': '<div class="contact">'
        + f'<a class="contact__item" href="https://wa.me/201021786873" target="_blank" rel="noopener"><span>{t(L, "واتساب", "WhatsApp")}</span><strong dir="ltr">+20 102 178 6873</strong></a>'
        + f'<a class="contact__item" href="mailto:get.digimarket@gmail.com"><span>{t(L, "البريد", "Email")}</span><strong dir="ltr">get.digimarket@gmail.com</strong></a>'
        + f'<a class="contact__item" href="https://fawh.vercel.app/" target="_blank" rel="noopener"><span>{t(L, "المتجر التجريبي", "Live demo")}</span><strong dir="ltr">fawh.vercel.app</strong></a>'
        + '</div>' + f'<h3>{t(L, "أسئلة شائعة", "Common questions")}</h3>' + ''.join(
            f'<details class="faq"><summary>{q}</summary><p>{a}</p></details>' for q, a in [
                (t(L, 'هل أفقد إعداداتي عند تحديث الثيم؟', 'Do I lose my settings when the theme updates?'),
                 t(L, 'لا. التحديثات تصل لمتجرك وتبقى إعداداتك وصورك ونصوصك كما هي.', 'No. Updates reach your store and your settings, images and text stay as they are.')),
                (t(L, 'هل يعمل الثيم بالإنجليزية؟', 'Does the theme work in English?'),
                 t(L, 'نعم. كل نص في الثيم مترجم، وكل حقل في الإعدادات يقبل نصاً لكل لغة في متجرك.', 'Yes. Every theme text is translated, and every settings field takes text per store language.')),
                (t(L, 'لماذا لا تظهر صور الأقسام في القائمة؟', 'Why are section photos missing from the menu?'),
                 t(L, 'ارفع صورة لكل عنصر في «المتجر › القوائم» في سلة. إن لم تُرفع يعرض فوح صورة أحدث منتج في القسم.', 'Upload a photo for each item in Store › Menus in Salla. Without one, Fawh shows the section’s newest product.')),
                (t(L, 'لماذا لا يظهر هرم النوتات؟', 'Why is the notes pyramid not showing?'),
                 t(L, 'اكتب النوتات في وصف المنتج بالصيغة في قسم «صفحة المنتج»، سطراً لكل مرحلة.', 'Write the notes in the product description in the format shown in Product page, one line per stage.')),
                (t(L, 'هل يمكن تجربة الثيم قبل الشراء؟', 'Can I try the theme before buying?'),
                 t(L, 'نعم، من «معاينة» في متجر ثيمات سلة، أو في المتجر التجريبي على fawh.vercel.app.', 'Yes, with Preview in the Salla theme store, or on the live demo at fawh.vercel.app.')),
            ]),
    }


CHAPTERS = [start, editor, identity, header, mobile, blocks_intro, product, category, cart, promo, content, footer, speed, salla, support]
