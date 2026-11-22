"""The 30 Fawh home blocks as the guide presents them, in both languages.

Each entry: the block's key (its preview lives at /media/previews/fawh-<key>.webp),
its group, and for each language its name, what it does, what the merchant can
change, and one tip for setting it up well.
"""

GROUPS = [
    ('welcome', {'ar': 'الواجهة والهوية', 'en': 'First impression'}),
    ('sell', {'ar': 'البيع والعروض', 'en': 'Selling and offers'}),
    ('discover', {'ar': 'اكتشاف العطر', 'en': 'Finding a scent'}),
    ('social', {'ar': 'الفيديو والتواصل', 'en': 'Video and social'}),
    ('trust', {'ar': 'الثقة والمحتوى', 'en': 'Trust and content'}),
]

BLOCKS = [
    # ── First impression ──────────────────────────────────────────────
    ('hero', 'welcome', {
        'name': 'بنر رئيسي متحرك',
        'what': 'شرائح كبيرة أعلى الصفحة بعنوان ونص وزر، وبطاقة منتج صغيرة في زاوية كل شريحة يضيفه العميل للسلة دون مغادرة الصفحة.',
        'opts': ['حتى 8 شرائح بصورة لكل شاشة', 'الارتفاع ومكان النصوص', 'التعتيم فوق الصور', 'مدة الشريحة والانتقال بالتلاشي', 'منتج لكل شريحة'],
        'tip': 'المقاسات: 1920×900 للكمبيوتر، 1200×900 للتابلت، و800×1100 للجوال حتى لا يُقص موضوع الصورة على الشاشات الصغيرة.',
    }, {
        'name': 'Hero slider',
        'what': 'Large slides at the top of the page with a title, text and button, plus a small product card in the corner that shoppers can add to the cart without leaving.',
        'opts': ['Up to 8 slides with an image per screen', 'Height and text position', 'Image dimming', 'Slide duration and fade', 'A product per slide'],
        'tip': 'Sizes: 1920×900 for computers, 1200×900 for tablets, and 800×1100 for phones so the subject is not cropped on small screens.',
    }),
    ('perks', 'welcome', {
        'name': 'شريط المزايا',
        'what': 'وعود المتجر في سطر واحد تحت البنر: التوصيل، الأصالة، التغليف، الدفع.',
        'opts': ['أيقونة من 30 أيقونة أو ملفك (SVG أو PNG)', 'لون الأيقونة وخلفيتها ورابط لكل ميزة', 'الأعمدة لكل شاشة', 'تداخل الشريط مع البنر'],
        'tip': 'أربع مزايا قصيرة تكفي. اجعل كل ميزة رابطاً لصفحة تشرحها، مثل سياسة الشحن.',
    }, {
        'name': 'Store perks',
        'what': 'Your store promises in one row under the hero: delivery, authenticity, wrapping, payment.',
        'opts': ['30 built-in icons or your own SVG or PNG', 'Icon colour, background and link per perk', 'Columns per screen', 'Overlap with the hero'],
        'tip': 'Four short perks are enough. Link each one to the page that explains it, such as your shipping policy.',
    }),
    ('categories', 'welcome', {
        'name': 'أقسام المتجر',
        'what': 'أقسام القائمة الرئيسية في أقواس بصورها، فيصل العميل لما يريد بضغطة.',
        'opts': ['العنوان وعدد الأقسام', 'كاروسيل أو شبكة', 'العدد في الشاشة لكل جهاز', 'التحريك التلقائي والتدوير'],
        'tip': 'الصور تأتي من «المتجر › القوائم» في سلة. ارفع صورة طولية لكل قسم لتملأ القوس.',
    }, {
        'name': 'Store sections',
        'what': 'Your main menu sections in arched photo frames, one tap from what the shopper wants.',
        'opts': ['Title and number of sections', 'Carousel or grid', 'Items per screen on each device', 'Autoplay and looping'],
        'tip': 'The photos come from Store › Menus in Salla. Upload a portrait photo per section to fill the arch.',
    }),
    ('brands', 'welcome', {
        'name': 'شريط الماركات',
        'what': 'شعارات الماركات تتحرك في شريط لا ينتهي، أو في شبكة، وكل شعار يفتح صفحة ماركته.',
        'opts': ['ماركات تختارها وترتيبها', 'شريط متحرك أو شبكة وسرعة الحركة', 'الأعمدة على الكمبيوتر والجوال', 'شكل البطاقة والشعارات الرمادية والأسماء'],
        'tip': 'ارفع الشعارات بخلفية شفافة أو بيضاء وبلا هوامش كبيرة، فتظهر أوضح وأكبر.',
    }, {
        'name': 'Brand strip',
        'what': 'Brand logos drifting in an endless row, or laid out as a grid. Each logo opens its brand page.',
        'opts': ['Brands you pick, in your order', 'Moving row or grid, and speed', 'Columns on computer and phone', 'Card style, grey logos, names'],
        'tip': 'Upload logos on a transparent or white background with little padding so they read larger.',
    }),
    ('story', 'welcome', {
        'name': 'قصة العلامة',
        'what': 'صورتان ونص يحكي قصة متجرك، مع نقاط مختصرة وأرقام وزر.',
        'opts': ['صورة كبيرة وصغيرة وشارة', 'العنوان ونص القصة', 'نقاط وأرقام', 'الزر ورابطه'],
        'tip': 'اكتب القصة بصوتك أنت: من أين تأتي عطورك ولماذا يثق بك العميل.',
    }, {
        'name': 'Brand story',
        'what': 'Two photos and the story of your store, with short points, figures and a button.',
        'opts': ['Large and small photo, badge', 'Title and story text', 'Points and figures', 'Button and link'],
        'tip': 'Write it in your own voice: where your perfumes come from and why shoppers can trust you.',
    }),
    ('stats', 'welcome', {
        'name': 'المتجر بالأرقام',
        'what': 'أرقام متجرك بعدّاد يتحرك حين تظهر: العملاء، الطلبات، التقييم.',
        'opts': ['لكل رقم ما قبله وما بعده وعنوان وأيقونة', 'أربعة أشكال: بطاقات، شريط داكن، بسيط، جانبي مع صورة', 'لون الأرقام والأيقونات', 'زر ورابط'],
        'tip': 'استخدم أرقاماً حقيقية من لوحة سلة، فالعميل يثق بالرقم الدقيق أكثر من المبالغ فيه.',
    }, {
        'name': 'Store in numbers',
        'what': 'Your store figures with a counter that runs as they come into view: customers, orders, rating.',
        'opts': ['Prefix, suffix, title and icon per figure', 'Four looks: cards, dark band, plain, side photo', 'Figure and icon colours', 'Button and link'],
        'tip': 'Use real numbers from your Salla dashboard. Shoppers trust an exact figure more than an inflated one.',
    }),
    ('features', 'welcome', {
        'name': 'لماذا نحن',
        'what': 'مزايا المتجر بأيقونة وعنوان ووصف، بجانب صورة كبيرة.',
        'opts': ['ثلاثة أشكال: «بينتو» بصورة كبيرة، بطاقات، صورة وقائمة مرقّمة', 'أيقونة ورابط لكل ميزة', 'التشطيب والترقيم والألوان', 'شكل خاص للجوال'],
        'tip': 'ضع هذا العنصر قرب نهاية الصفحة، حين يبحث العميل عن سبب أخير ليشتري.',
    }, {
        'name': 'Why shop with us',
        'what': 'Your store’s strengths with an icon, title and line each, beside a large photo.',
        'opts': ['Three looks: bento with a large photo, cards, photo and numbered list', 'Icon and link per item', 'Finish, numbering and colours', 'Its own phone layout'],
        'tip': 'Place it near the end of the page, where a shopper looks for one last reason to buy.',
    }),
    # ── Selling and offers ────────────────────────────────────────────
    ('bestsellers', 'sell', {
        'name': 'الأكثر طلباً بتبويبات',
        'what': 'صف منتجات بتبويبات يتنقل بينها العميل: الأكثر مبيعاً، وصل حديثاً، العروض، مع بنر جانبي.',
        'opts': ['حتى 6 تبويبات، لكل تبويب مصدره: الأكثر مبيعاً، الأحدث، العروض، تصنيف، ماركة، منتجات مختارة', 'شكل التبويبات', 'البنر الجانبي وجهته ونصوصه', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'ثلاثة تبويبات واضحة أفضل من ستة. اجعل الأول «الأكثر مبيعاً» فهو أكثر ما يقنع الزائر الجديد.',
    }, {
        'name': 'Best sellers tabs',
        'what': 'A product row with tabs the shopper switches between, such as best sellers, new and offers, with a side banner.',
        'opts': ['Up to 6 tabs, each with its own source: best sellers, newest, offers, a category, a brand, picked products', 'Tab style', 'Side banner, its side and text', 'Display and items per screen'],
        'tip': 'Three clear tabs beat six. Put best sellers first: it convinces new visitors most.',
    }),
    ('products', 'sell', {
        'name': 'شريط منتجات',
        'what': 'صف منتجات بعنوانك من مصدر تختاره، مع رابط «عرض الكل».',
        'opts': ['المصدر: الأحدث، الأكثر مبيعاً، العروض، تصنيف، منتجات مختارة', 'عدد المنتجات', 'رابط «عرض الكل»', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'أضف هذا العنصر أكثر من مرة، مرة لكل تصنيف مهم، بعنوان مختلف.',
    }, {
        'name': 'Product row',
        'what': 'A row of products from a source you choose, under your own title, with a “view all” link.',
        'opts': ['Source: newest, best sellers, offers, a category, picked products', 'Number of products', '“View all” link', 'Display and items per screen'],
        'tip': 'Add this block more than once, one per key category, each with its own title.',
    }),
    ('signature', 'sell', {
        'name': 'منتج مميز',
        'what': 'منتج واحد في مساحة فاخرة بإطار مقوّس، بنوتاته وسعره وزري الإضافة والشراء.',
        'opts': ['المنتج', 'مصدر النوتات: تلقائي من الوصف، أو يدوي، أو إخفاء', 'سطر صغير فوق العنوان وسطر أسفل الأزرار'],
        'tip': 'اختر منتجاً له صورتان على الأقل، فالعميل يتنقل بينهما تحت الإطار.',
    }, {
        'name': 'Signature product',
        'what': 'One product in a showcase with an arched frame, its notes, price, and add and buy buttons.',
        'opts': ['The product', 'Notes source: from the description, typed in, or hidden', 'A small line above the title and below the buttons'],
        'tip': 'Pick a product with at least two photos: shoppers switch between them under the frame.',
    }),
    ('offer', 'sell', {
        'name': 'عرض بعدّاد تنازلي',
        'what': 'منتجات العرض مع عدّاد يعدّ الأيام والساعات حتى نهاية العرض.',
        'opts': ['العنوان والسطر الصغير', 'تاريخ ووقت انتهاء العرض', 'منتجات العرض', 'مدة التحريك التلقائي'],
        'tip': 'حين ينتهي التاريخ يختفي العنصر وحده، فلا يرى العميل عرضاً منتهياً.',
    }, {
        'name': 'Countdown offer',
        'what': 'Offer products with a counter running down the days and hours to the end of the offer.',
        'opts': ['Title and small line', 'End date and time', 'Offer products', 'Autoplay interval'],
        'tip': 'When the date passes the block hides itself, so nobody sees an expired offer.',
    }),
    ('banner', 'sell', {
        'name': 'بنر عريض مميز',
        'what': 'بنر واحد بعرض الصفحة أو الشاشة، بنص وزر في أي موضع تختاره.',
        'opts': ['صورة لكل شاشة ورابط', 'الارتفاع: المقاس الموصى به، أو أبعاد الصورة بلا قص، أو بالبكسل', 'مكان النص في شبكة 3×3 ومكان خاص للجوال', 'ألوان النص والزر والطبقة المعتمة', 'سهم في الزاوية وحركة الصورة'],
        'tip': 'المقاسات الموصى بها: 3:1 للكمبيوتر، 2:1 للتابلت، 4:5 للجوال.',
    }, {
        'name': 'Feature banner',
        'what': 'One banner across the page or the screen, with text and a button placed where you choose.',
        'opts': ['An image per screen and a link', 'Height: recommended ratio, the image as it is, or pixels', 'Text position on a 3×3 grid, with its own phone position', 'Text, button and overlay colours', 'Corner arrow and image motion'],
        'tip': 'Recommended ratios: 3:1 on computers, 2:1 on tablets, 4:5 on phones.',
    }),
    ('banners', 'sell', {
        'name': 'بنرات التشكيلات',
        'what': 'حتى 8 بنرات للتشكيلات في فسيفساء أو كاروسيل أو شبكة.',
        'opts': ['صورة لكل شاشة ووسم وعنوان ورابط لكل بنر', 'فسيفساء أو كاروسيل أو شبكة', 'العدد لكل شاشة'],
        'tip': 'الصورة تملأ البطاقة دائماً: 1200×900 للكمبيوتر والتابلت و800×1000 للجوال، وموضوعها في المنتصف.',
    }, {
        'name': 'Collection banners',
        'what': 'Up to 8 collection banners as a mosaic, a carousel or a grid.',
        'opts': ['Image per screen, tag, title and link per banner', 'Mosaic, carousel or grid', 'Items per screen'],
        'tip': 'Images always fill the card: 1200×900 for computer and tablet, 800×1000 for phone, subject centred.',
    }),
    ('recent', 'sell', {
        'name': 'شاهدتها مؤخراً',
        'what': 'آخر المنتجات التي فتحها العميل على جهازه، ليعود إليها بسهولة.',
        'opts': ['العنوان والسطر الصغير', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'لا يظهر للزائر الجديد حتى يفتح منتجاً، فلا تقلق من مكان فارغ.',
    }, {
        'name': 'Recently viewed',
        'what': 'The last products the shopper opened on this device, so they can get back to them.',
        'opts': ['Title and small line', 'Display and items per screen'],
        'tip': 'It stays hidden for new visitors until they open a product, so it never shows empty.',
    }),
    ('budget', 'sell', {
        'name': 'تسوّق حسب الميزانية',
        'what': 'بطاقات لنطاقات سعر تفتح صفحة بمنتجات النطاق.',
        'opts': ['ما تشاء من النطاقات بعنوان ووصف وصورة', 'أقل وأعلى سعر لكل نطاق', 'بطاقة أفقية أو عمودية', 'طريقة العرض'],
        'tip': 'نطاقات مثل «أقل من 200» و«200 إلى 400» تساعد من يشتري هدية بميزانية محددة.',
    }, {
        'name': 'Shop by budget',
        'what': 'Cards for price ranges, each opening a page with the products in that range.',
        'opts': ['As many ranges as you like, with title, line and photo', 'Lowest and highest price per range', 'Horizontal or vertical card', 'Display'],
        'tip': 'Ranges like “under 200” and “200 to 400” help people buying a gift on a set budget.',
    }),
    ('occasions', 'sell', {
        'name': 'هدية لكل مناسبة',
        'what': 'بطاقات المناسبات بصورها: عيد، زواج، مولود، تخرّج، كل بطاقة تفتح رابطها.',
        'opts': ['الاسم والوصف والصورة والرابط لكل مناسبة', 'رابط «عرض الكل»', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'اربط كل مناسبة بتصنيف أو وسم يجمع منتجاتها.',
    }, {
        'name': 'Gifts by occasion',
        'what': 'Occasion cards with photos, such as Eid, weddings, newborns and graduation, each opening its link.',
        'opts': ['Name, line, photo and link per occasion', '“View all” link', 'Display and items per screen'],
        'tip': 'Link each occasion to a category or tag that groups its products.',
    }),
    ('layering', 'sell', {
        'name': 'طقم بخطوات',
        'what': 'منتجات تُستخدم معاً بخطوات مرقّمة، وزر يضيف الطقم كله للسلة بضغطة.',
        'opts': ['العنوان والوصف', 'لكل خطوة منتج ووصف', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'مثال: دهن عود ثم عطر ثم بخور، بثلاث خطوات تشرح الترتيب.',
    }, {
        'name': 'Layering set',
        'what': 'Products used together in numbered steps, with one button that adds the whole set to the cart.',
        'opts': ['Title and description', 'A product and a line per step', 'Display and items per screen'],
        'tip': 'For example oud oil, then perfume, then bakhoor, in three steps that explain the order.',
    }),
    ('giftcard', 'sell', {
        'name': 'بطاقة الإهداء',
        'what': 'بطاقة إهداء مرسومة بقيم يختار منها العميل، وزر يفتح صفحة الشراء.',
        'opts': ['العنوان والوصف والسطر على البطاقة', 'القيم المعروضة', 'ميزتان قصيرتان', 'رابط الزر'],
        'tip': 'اربط الزر بمنتج بطاقة الإهداء في متجرك.',
    }, {
        'name': 'Gift card',
        'what': 'A drawn gift card with amounts to choose from and a button to the purchase page.',
        'opts': ['Title, description and the line on the card', 'Amounts shown', 'Two short benefits', 'Button link'],
        'tip': 'Point the button at your gift card product.',
    }),
    # ── Finding a scent ───────────────────────────────────────────────
    ('notes', 'discover', {
        'name': 'تسوّق حسب الرائحة',
        'what': 'بطاقات العائلات العطرية: عود، عنبر، مسك، ورد، كل بطاقة تفتح منتجاتها.',
        'opts': ['الاسم والوصف والصورة والرابط لكل رائحة', 'سطر تعريفي', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'اربط كل رائحة بتصنيف أو ببحث عن اسمها.',
    }, {
        'name': 'Shop by scent',
        'what': 'Cards for scent families such as oud, amber, musk and rose, each opening its products.',
        'opts': ['Name, line, photo and link per scent', 'Intro line', 'Display and items per screen'],
        'tip': 'Link each scent to a category or to a search for its name.',
    }),
    ('quiz', 'discover', {
        'name': 'اختبار العطر',
        'what': 'ثلاثة أسئلة يجيب عنها العميل، ثم يقترح الثيم منتجات تناسب إجاباته.',
        'opts': ['ثلاثة أسئلة بإجاباتها', 'لكل إجابة تصنيف وحد أدنى وأعلى للسعر', 'صورة الاختبار', 'عدد المنتجات المقترحة وطريقة عرضها'],
        'tip': 'اجعل السؤال الأول عن نوع العطر والثاني عن المناسبة والثالث عن الميزانية.',
    }, {
        'name': 'Scent quiz',
        'what': 'Three questions the shopper answers, then products that match their answers.',
        'opts': ['Three questions with answers', 'A category and price range per answer', 'Quiz photo', 'Number of suggestions and how they show'],
        'tip': 'Ask about the type first, then the occasion, then the budget.',
    }),
    ('moments', 'discover', {
        'name': 'عطر لكل لحظة',
        'what': 'تبويبات لأوقات اليوم أو المناسبات، لكل تبويب صورة ونص ومنتجات من تصنيف.',
        'opts': ['أيقونة واسم وعنوان ووصف وصورة لكل لحظة', 'التصنيف لكل لحظة', 'عدد المنتجات وطريقة العرض'],
        'tip': 'لحظات مثل الصباح والعمل والمساء والمناسبات تساعد العميل على تخيّل استخدام العطر.',
    }, {
        'name': 'Scent for every moment',
        'what': 'Tabs for times of day or occasions, each with a photo, text and products from a category.',
        'opts': ['Icon, tab name, title, text and photo per moment', 'Category per moment', 'Number of products and display'],
        'tip': 'Moments like morning, work, evening and events help shoppers picture wearing the scent.',
    }),
    ('guide', 'discover', {
        'name': 'دليل العطور',
        'what': 'جدول التركيزات بنسبة الزيت ومدة الثبات، ونصائح الاستخدام، ومنتج للبدء.',
        'opts': ['التركيزات: الاسم ونسبة الزيت والثبات والقوة', 'النصائح', 'رابط الدليل', 'منتج للبدء'],
        'tip': 'مفيد لمن يشتري لأول مرة ويسأل عن الفرق بين أو دو بارفان وأو دو تواليت.',
    }, {
        'name': 'Perfume guide',
        'what': 'Concentrations with oil percentage and longevity, wearing tips, and a starter product.',
        'opts': ['Concentrations: name, oil %, hours, strength', 'Tips', 'Guide link', 'Starter product'],
        'tip': 'Helps first-time buyers who ask how eau de parfum differs from eau de toilette.',
    }),
    # ── Video and social ──────────────────────────────────────────────
    ('video', 'social', {
        'name': 'مشغّل الفيديو',
        'what': 'مشغّل بقائمة مقاطع، وتحت كل مقطع المنتج الظاهر فيه مع زر الإضافة للسلة.',
        'opts': ['المقاطع (ملف mp4) وصورة الغلاف والعنوان والاتجاه', 'منتج لكل مقطع', 'شكل المشغّل على الجوال'],
        'tip': 'ارفع المقطع إلى سلة أو أي خدمة تعطي رابط mp4 مباشراً، وأبقِه أقل من 15 ميغابايت.',
    }, {
        'name': 'Video player',
        'what': 'A player with a playlist, and under each clip the product it shows with an add-to-cart button.',
        'opts': ['Clips (mp4 file), cover, title and orientation', 'A product per clip', 'Player shape on phones'],
        'tip': 'Host the clip anywhere that gives a direct mp4 link, and keep it under 15 MB.',
    }),
    ('reels', 'social', {
        'name': 'ريلز',
        'what': 'مقاطع طولية قصيرة تعمل عند الضغط، وعلى كل مقطع بطاقة المنتج.',
        'opts': ['المقاطع وأغلفتها وعناوينها', 'منتج لكل مقطع', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'المقاطع الطولية 9:16 بطول 15 إلى 30 ثانية تعمل أفضل.',
    }, {
        'name': 'Reels',
        'what': 'Short vertical clips that play on tap, each with its product card.',
        'opts': ['Clips, covers and titles', 'A product per clip', 'Display and items per screen'],
        'tip': 'Vertical 9:16 clips of 15 to 30 seconds work best.',
    }),
    ('instagram', 'social', {
        'name': 'إنستغرام',
        'what': 'رأس حسابك بأرقامه وقصصه، وشبكة منشورات تفتح كل منشور.',
        'opts': ['رابط الحساب واسم المستخدم والنبذة', 'الأرقام والقصص', 'المنشورات بصورها وإعجاباتها وروابطها', 'طريقة العرض'],
        'tip': 'المحتوى يُضاف يدوياً، فاختر أفضل 6 منشورات لديك وحدّثها كل شهر.',
    }, {
        'name': 'Instagram',
        'what': 'Your profile header with figures and highlights, and a grid of posts that open each post.',
        'opts': ['Account link, handle and bio', 'Figures and highlights', 'Posts with photo, likes and link', 'Display'],
        'tip': 'Posts are added by hand: pick your best six and refresh them monthly.',
    }),
    ('tiktok', 'social', {
        'name': 'تيك توك',
        'what': 'بطاقات مقاطع بأسلوب تيك توك مع المشاهدات والإعجابات، وزر لمتابعة حسابك.',
        'opts': ['الحساب والوصف والأرقام', 'المقاطع وأغلفتها وتعليقاتها وأرقامها', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'ضع رابط كل مقطع على تيك توك ليفتحه العميل هناك ويتفاعل معه.',
    }, {
        'name': 'TikTok',
        'what': 'TikTok-style clip cards with views and likes, and a button to follow your account.',
        'opts': ['Account, description and figures', 'Clips with covers, captions and figures', 'Display and items per screen'],
        'tip': 'Add each clip’s TikTok link so shoppers can open and engage with it there.',
    }),
    # ── Trust and content ─────────────────────────────────────────────
    ('testimonials', 'trust', {
        'name': 'آراء العملاء',
        'what': 'آراء العملاء بنجومها، تلقائياً من تقييمات متجرك أو بآراء تكتبها.',
        'opts': ['الآراء: الاسم والنص والتقييم والصورة', 'زر «عرض المزيد» ونصه ورابطه وشكله', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'اترك قائمة الآراء فارغة ليعرض الثيم تقييمات متجرك الحقيقية من سلة.',
    }, {
        'name': 'Customer reviews',
        'what': 'Customer reviews with stars, taken from your store ratings or written by you.',
        'opts': ['Reviews: name, text, rating, photo', '“See more” button text, link and style', 'Display and items per screen'],
        'tip': 'Leave the list empty to show your real Salla store ratings.',
    }),
    ('loyalty', 'trust', {
        'name': 'برنامج الولاء',
        'what': 'طرق كسب النقاط والمكافآت من برنامج الولاء في سلة، بزر لصفحة البرنامج.',
        'opts': ['السطر الصغير والعنوان والوصف'],
        'tip': 'فعّل برنامج الولاء أولاً من «التسويق › برنامج الولاء» في سلة، فالعنصر يقرأ منه.',
    }, {
        'name': 'Loyalty programme',
        'what': 'Ways to earn points and the rewards from Salla’s loyalty programme, with a button to its page.',
        'opts': ['Small line, title and description'],
        'tip': 'Turn on the programme in Marketing › Loyalty in Salla first: the block reads from it.',
    }),
    ('faq', 'trust', {
        'name': 'الأسئلة الشائعة',
        'what': 'أسئلة وأجوبة في قائمة منسدلة أو بطاقات، مع بطاقة تواصل بواتساب والاتصال.',
        'opts': ['الأسئلة والأجوبة', 'بطاقة التواصل ونصوصها', 'قائمة منسدلة أو بطاقات'],
        'tip': 'الأسئلة تظهر لمحركات البحث أيضاً، فاكتب أسئلة يبحث عنها عملاؤك فعلاً.',
    }, {
        'name': 'FAQ',
        'what': 'Questions and answers as an accordion or cards, with a contact card for WhatsApp and calls.',
        'opts': ['Questions and answers', 'Contact card and its text', 'Accordion or cards'],
        'tip': 'Search engines read these too, so write the questions your customers really search for.',
    }),
    ('blog', 'trust', {
        'name': 'من المدونة',
        'what': 'أحدث مقالات مدونتك بصورها وتصنيفاتها.',
        'opts': ['العنوان وعدد المقالات', 'طريقة العرض والعدد لكل شاشة'],
        'tip': 'المقالات من «المدونة» في سلة. مقال عن الفرق بين العود والعطر الفرنسي يجلب زيارات من البحث.',
    }, {
        'name': 'From the blog',
        'what': 'Your latest blog posts with photos and categories.',
        'opts': ['Title and number of posts', 'Display and items per screen'],
        'tip': 'Posts come from the Salla blog. A post on oud oil versus French perfume brings search traffic.',
    }),
]
