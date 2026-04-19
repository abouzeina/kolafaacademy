const fs = require('fs');

const files = [
  'contact.html',
  'legacy.html',
  'pricing.html',
  'program-arabic.html',
  'program-hifz.html',
  'program-ijazah.html',
  'program-islamic.html',
  'program-reading.html',
  'program-tajweed.html',
  'programs.html',
  'teachers.html'
];

// Dictionary of global replacements
const globalDict = {
  // Title & Meta
  'أكاديمية الخلفاء الراشدين - تعليم القرآن واللغة العربية': 'Kholafa Academy - Quran & Arabic Learning',
  'مؤسسة قرآنية وتعليمية راسخة لتعليم القرآن الكريم واللغة العربية والدراسات الإسلامية أونلاين.': 'A firmly established Quranic and educational institution for teaching the Holy Quran, Arabic language, and Islamic studies online.',
  
  // Nav
  '>الرئيسية<': '>Home<',
  '>البرامج التعليمية<': '>Programs<',
  '>الباقات والرسوم<': '>Pricing<',
  '>صرح الخلفاء<': '>Legacy<',
  '>من نحن<': '>About Us<',
  '>تواصل معنا<': '>Contact<',
  '>المعلمون<': '>Teachers<',
  
  // Footer
  'مؤسسة تعليمية قرآنية راسخة، تمتد جذورها لنحو عشرين عاماً في خدمة كتاب الله وعلوم اللغة العربية.': 'A firmly established Quranic institution with roots extending for twenty years in serving the Book of Allah and Arabic sciences.',
  '>خريطة الأكاديمية<': '>Academy Sitemap<',
  '>مسارات القبول<': '>Admission Paths<',
  '>البرامج الأكاديمية<': '>Academic Programs<',
  '>التسجيل والرسوم<': '>Registration & Pricing<',
  '>الناطقين بغير العربية<': '>Non-Native Speakers<',
  '>الإجازات والمتقدمين<': '>Ijazah & Advanced<',
  'جميع الحقوق محفوظة © 2026 - أكاديمية الخلفاء الراشدين': 'All Rights Reserved © 2026 - Kholafa Academy',
  
  // WhatsApp & Buttons
  '>تواصل عبر واتساب<': '>Contact via WhatsApp<',
  '>إرسال رسالة عبر واتساب<': '>Send via WhatsApp<',

  // Contact Form (often in footer or contact page)
  'الاسم بالكامل': 'Full Name',
  'رقم الهاتف / الواتساب': 'Phone / WhatsApp',
  'اختر الدولة': 'Select Country',
  'نوع الاستفسار': 'Inquiry Type',
  'كيف يمكننا مساعدتك؟ (اختياري)': 'How can we help you? (Optional)',
  'مصر': 'Egypt',
  'السعودية': 'Saudi Arabia',
  'الإمارات': 'UAE',
  'المملكة المتحدة': 'UK',
  'الولايات المتحدة': 'USA',
  'أخرى': 'Other',
  'استفسار عام': 'General Inquiry',
  'الاشتراك في برنامج': 'Enroll in a Program',
  'الدعم الفني': 'Technical Support',
};

// Function to translate a file
function translateFile(filename) {
  let arHtml = fs.readFileSync(filename, 'utf8');

  // --- 1. Modify ARABIC FILE to add "English" button if missing, and fix its position ---
  // The button should be at the extreme left (margin-right: auto in RTL).
  // We'll insert it right after <div class="desktopActions..."> if it doesn't exist.
  if (!arHtml.includes('lang-switch-btn')) {
    arHtml = arHtml.replace(
      /(<div class="desktopActions[^"]*">)/, 
      `$1\n          <a href="en/${filename}" class="lang-switch-btn" style="color: var(--color-gold-luxury); font-weight: bold; margin-right: auto; text-decoration: none; font-family: 'Outfit', sans-serif;">English</a>`
    );
    fs.writeFileSync(filename, arHtml, 'utf8');
  }

  // Also fix index.html button position
  if (filename === 'index.html' && fs.existsSync('index.html')) {
    let idxHtml = fs.readFileSync('index.html', 'utf8');
    idxHtml = idxHtml.replace(/margin-left: 24px;/, 'margin-right: auto; padding-left: 24px;');
    fs.writeFileSync('index.html', idxHtml, 'utf8');
  }

  // --- 2. Generate ENGLISH FILE ---
  let enHtml = arHtml;

  // HTML tag & SEO
  enHtml = enHtml.replace('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">');
  enHtml = enHtml.replace('</head>', `  <link rel="stylesheet" href="../css/en-ltr.css" />\n  <link rel="alternate" hreflang="ar" href="../${filename}" />\n  <link rel="alternate" hreflang="en" href="${filename}" />\n</head>`);

  // Paths
  enHtml = enHtml.replace(/href="css\//g, 'href="../css/');
  enHtml = enHtml.replace(/src="js\//g, 'src="../js/');
  enHtml = enHtml.replace(/src="assets\//g, 'src="../assets/');
  enHtml = enHtml.replace(/href="assets\//g, 'href="../assets/');
  
  // Link to other EN pages
  enHtml = enHtml.replace(/href="index\.html"/g, 'href="index.html"');
  enHtml = enHtml.replace(/href="programs\.html"/g, 'href="programs.html"');
  enHtml = enHtml.replace(/href="pricing\.html"/g, 'href="pricing.html"');
  enHtml = enHtml.replace(/href="legacy\.html"/g, 'href="legacy.html"');
  enHtml = enHtml.replace(/href="teachers\.html"/g, 'href="teachers.html"');
  enHtml = enHtml.replace(/href="contact\.html"/g, 'href="contact.html"');
  enHtml = enHtml.replace(/href="program-/g, 'href="program-'); // keep relative
  
  // In the navigation, Home is slightly tricky because the logo also links to index.html
  enHtml = enHtml.replace(/href="\.\.\/index\.html"/g, 'href="index.html"'); // clean up

  // Language Switcher (Change English to عربي)
  // The button was added above. Let's replace it in the EN version.
  enHtml = enHtml.replace(
    /<a href="en\/[^"]+" class="lang-switch-btn"[^>]+>English<\/a>/,
    `<a href="../${filename}" class="lang-switch-btn" style="color: var(--color-gold-luxury); font-weight: bold; margin-left: auto; text-decoration: none; font-family: var(--font-ibm-plex-sans-arabic);">عربي</a>`
  );

  // Apply Global Dict
  for (const [ar, en] of Object.entries(globalDict)) {
    // Escape regex characters if necessary, but simple string replace works for exact matches
    enHtml = enHtml.split(ar).join(en);
  }

  // --- Specific Pages Translations ---
  if (filename === 'pricing.html') {
    enHtml = enHtml.split('اختر الباقة المناسبة لك').join('Choose Your Perfect Plan');
    enHtml = enHtml.split('خطط مرنة تناسب جميع الأعمار والمستويات، بأسعار تنافسية وبدون أي رسوم خفية.').join('Flexible plans for all ages and levels, at competitive prices with no hidden fees.');
    enHtml = enHtml.split('الباقة الأساسية').join('Basic Plan');
    enHtml = enHtml.split('الباقة المتقدمة').join('Advanced Plan');
    enHtml = enHtml.split('الباقة المكثفة').join('Intensive Plan');
    enHtml = enHtml.split('الأكثر طلباً').join('Most Popular');
    enHtml = enHtml.split('دولار / شهرياً').join('USD / Month');
    enHtml = enHtml.split('حصتان أسبوعياً').join('2 Classes / Week');
    enHtml = enHtml.split('3 حصص أسبوعياً').join('3 Classes / Week');
    enHtml = enHtml.split('5 حصص أسبوعياً').join('5 Classes / Week');
    enHtml = enHtml.split('مدة الحصة 30 دقيقة').join('30 Mins / Class');
    enHtml = enHtml.split('متابعة شهرية مع ولي الأمر').join('Monthly Follow-up with Parent');
    enHtml = enHtml.split('شهادة معتمدة بنهاية المستوى').join('Certificate upon completion');
    enHtml = enHtml.split('إمكانية تعويض الحصص الفائتة').join('Make-up classes available');
    enHtml = enHtml.split('اشترك الآن').join('Subscribe Now');
  }

  if (filename === 'contact.html') {
    enHtml = enHtml.split('تواصل معنا').join('Contact Us');
    enHtml = enHtml.split('نحن هنا للإجابة على جميع استفساراتك ومساعدتك في بدء رحلتك القرآنية.').join('We are here to answer all your questions and help you start your Quranic journey.');
    enHtml = enHtml.split('معلومات التواصل').join('Contact Information');
    enHtml = enHtml.split('البريد الإلكتروني').join('Email Address');
    enHtml = enHtml.split('رقم الهاتف').join('Phone Number');
    enHtml = enHtml.split('مواعيد العمل').join('Working Hours');
    enHtml = enHtml.split('متاحون على مدار 24 ساعة').join('Available 24/7');
    enHtml = enHtml.split('أرسل لنا رسالة').join('Send Us a Message');
  }

  if (filename === 'legacy.html') {
    enHtml = enHtml.split('صرح الخلفاء').join('Kholafa Legacy');
    enHtml = enHtml.split('شاهد مقتطفات من رحلتنا في خدمة القرآن الكريم وإنجازات طلابنا حول العالم.').join('Watch excerpts of our journey in serving the Holy Quran and our students\' achievements worldwide.');
    enHtml = enHtml.split('مكتبة الفيديوهات').join('Video Library');
  }

  // Generic programs list replacements (used across many pages)
  enHtml = enHtml.split('أساسيات القراءة (نور البيان)').join('Reading Basics (Noor Al-Bayan)');
  enHtml = enHtml.split('إتقان أحكام التجويد').join('Mastering Tajweed Rules');
  enHtml = enHtml.split('حفظ ومراجعة القرآن').join('Quran Memorization & Revision');
  enHtml = enHtml.split('الإجازة والسند').join('Ijazah & Sanad');
  enHtml = enHtml.split('اللغة العربية لغير الناطقين بها').join('Arabic for Non-Native Speakers');
  enHtml = enHtml.split('الدراسات الإسلامية').join('Islamic Studies');

  if (filename === 'programs.html') {
    enHtml = enHtml.split('البرامج الأكاديمية').join('Academic Programs');
    enHtml = enHtml.split('تصفح البرنامج').join('View Program');
  }

  fs.writeFileSync(`en/${filename}`, enHtml, 'utf8');
}

files.forEach(file => {
  if (fs.existsSync(file)) {
    translateFile(file);
    console.log(`Translated ${file}`);
  }
});

// Also fix index.html just in case we need to update the button position
translateFile('index.html');
