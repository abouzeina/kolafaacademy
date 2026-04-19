const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// HTML tag & SEO
html = html.replace('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">');
html = html.replace('</head>', '  <link rel="stylesheet" href="../css/en-ltr.css" />\n  <link rel="alternate" hreflang="ar" href="../index.html" />\n  <link rel="alternate" hreflang="en" href="index.html" />\n</head>');

// Title
html = html.replace('<title>أكاديمية الخلفاء الراشدين - تعليم القرآن واللغة العربية</title>', '<title>Kholafa Academy - Quran & Arabic Learning</title>');
html = html.replace('content="مؤسسة قرآنية وتعليمية راسخة لتعليم القرآن الكريم واللغة العربية والدراسات الإسلامية أونلاين."', 'content="A firmly established Quranic and educational institution for teaching the Holy Quran, Arabic language, and Islamic studies online."');

// Paths
html = html.replace(/href="css\//g, 'href="../css/');
html = html.replace(/src="js\//g, 'src="../js/');
html = html.replace(/src="assets\//g, 'src="../assets/');
html = html.replace(/href="assets\//g, 'href="../assets/');
html = html.replace(/href="programs.html"/g, 'href="../programs.html"');
html = html.replace(/href="pricing.html"/g, 'href="../pricing.html"');
html = html.replace(/href="legacy.html"/g, 'href="../legacy.html"');
html = html.replace(/href="teachers.html"/g, 'href="../teachers.html"');
html = html.replace(/href="contact.html"/g, 'href="../contact.html"');

// Nav
html = html.replace('>الرئيسية<', '>Home<');
html = html.replace('>البرامج التعليمية<', '>Programs<');
html = html.replace('>الباقات والرسوم<', '>Pricing<');
html = html.replace('>صرح الخلفاء<', '>Legacy<');
html = html.replace('>من نحن<', '>About Us<');
html = html.replace('>تواصل معنا<', '>Contact<');
html = html.replace('>تواصل عبر واتساب<', '>Contact via WhatsApp<');

// Hero
html = html.replace('دراسة حضورية بفروعنا، ومتاحة أونلاين عالمياً', 'On-site study at our branches, available online globally');
html = html.replace(/>أكاديمية الخلفاء الراشدين</g, '>Kholafa Academy<');

// Replace the multiline hero subtitle carefully (whitespace agnostic)
html = html.replace(/نقدم بيئة قرآنية وتعليمية راسخة تعتني بتلاوة وحفظ القرآن الكريم،\s*تعليم القراءة واللغة العربية، والدراسات الإسلامية على يد أكثر من\s*50 معلماً ومعلمة، ممتدين بجذورنا لقرابة العشرين عاماً\./g, 'We provide a solid educational environment dedicated to the recitation and memorization of the Holy Quran, teaching Arabic and Islamic studies by more than 50 male and female certified teachers, with roots extending for nearly 20 years.');

html = html.replace('>ابدأ رحلتك عبر واتساب<', '>Start Your Journey via WhatsApp<');

// Gateways
html = html.replace('تأسيس الأطفال', 'Kids Foundation');
html = html.replace('خطط البالغين', 'Adult Plans');
html = html.replace('المسار المتقدم', 'Advanced Track');
html = html.replace(/>متاح أونلاين</g, '>Available Online<');
html = html.replace('تأسيس قوي وسليم في نور البيان وقراءة القرآن للأطفال بأساليب محببة.', 'Strong and proper foundation in Noor Al-Bayan and Quran reading for children using engaging methods.');
html = html.replace('خطط مرنة تناسب الموظفين والطلاب لحفظ القرآن وضبط التلاوة وإتقان العربية.', 'Flexible plans tailored for professionals and students to memorize the Quran, perfect recitation, and master Arabic.');
html = html.replace('مسارات الإجازة والسند المتصل، والتعمق في علوم التجويد والقراءات للمتفوقين.', 'Tracks for Ijazah and connected Sanad, diving deep into Tajweed sciences and Qira\'at for advanced students.');
html = html.replace(/>تصفح البرنامج</g, '>View Program<');

// Authority
html = html.replace('صرح مؤسسي، لا جهود فردية', 'Institutional Excellence, Not Individual Efforts');
html = html.replace('نحن لسنا مجرد منصة وسيطة، بل مؤسسة تعليمية متكاملة تدار باحترافية، تمتلك فروعاً على الأرض ونظاماً أكاديمياً صارماً يضمن لك ولأبنائك استمرارية وجودة التعليم بعيداً عن عشوائية العمل الفردي.', 'We are not just a middleman platform; we are an integrated educational institution managed professionally. We possess physical branches and a strict academic system that ensures the continuity and quality of education for you and your children, far from the randomness of individual efforts.');
html = html.replace('20 عاماً', '20 Years');
html = html.replace('خبرة في التعليم', 'of Education Experience');
html = html.replace('أكثر من 50', '50+');
html = html.replace('معلم ومعلمة معتمدين', 'Certified Tutors');
html = html.replace('طالب حول العالم', 'Students Worldwide');

// Programs List
html = html.replace('برامجنا الأكاديمية المعتمدة', 'Our Certified Academic Programs');
html = html.replace('مسارات علمية مدروسة تلبي احتياجات مختلف الأعمار والمستويات.', 'Carefully structured scientific tracks meeting the needs of all ages and levels.');
html = html.replace('أساسيات القراءة (نور البيان)', 'Reading Basics (Noor Al-Bayan)');
html = html.replace('للمبتدئين تماماً', 'For Absolute Beginners');
html = html.replace('إتقان أحكام التجويد', 'Mastering Tajweed Rules');
html = html.replace('تصحيح التلاوة', 'Recitation Correction');
html = html.replace('حفظ ومراجعة القرآن', 'Quran Memorization');
html = html.replace('خطط مخصصة', 'Customized Plans');
html = html.replace('الإجازة والسند', 'Ijazah & Sanad');
html = html.replace('للمتقدمين والخاتمين', 'For Advanced & Graduates');
html = html.replace('اللغة العربية لغير الناطقين بها', 'Arabic for Non-Native Speakers');
html = html.replace('مناهج متخصصة', 'Specialized Curricula');
html = html.replace('الدراسات الإسلامية', 'Islamic Studies');
html = html.replace('فقه، عقيدة، وسيرة', 'Fiqh, Aqeedah, & Seerah');

// Features
html = html.replace('لماذا أكاديمية الخلفاء الراشدين؟', 'Why Choose Kholafa Academy?');
html = html.replace('منهجية علمية صارمة', 'Strict Scientific Methodology');
html = html.replace('متابعة دورية وتقييمات مستمرة لضمان تقدم الطالب وفق الخطة.', 'Regular follow-ups and continuous assessments to ensure the student\'s progress according to the plan.');
html = html.replace('بيئة آمنة ومنفصلة', 'Safe & Segregated Environment');
html = html.replace('معلمون للذكور ومعلمات للإناث مع الالتزام بالضوابط الشرعية.', 'Male teachers for brothers and female teachers for sisters, adhering strictly to Islamic guidelines.');
html = html.replace('مرونة في المواعيد', 'Flexible Scheduling');
html = html.replace('اختيار الأوقات التي تناسب جدولك على مدار 24 ساعة.', 'Choose times that fit your schedule, available 24/7.');
html = html.replace('شهادات معتمدة', 'Certified Certificates');
html = html.replace('تُمنح عند إتمام كل مستوى دراسي أو حفظ أجزاء من القرآن.', 'Awarded upon completing each level or memorizing parts of the Quran.');

// Testimonials
html = html.replace('آراء طلابنا', 'Student Testimonials');
html = html.replace('قصص نجاح من مختلف أنحاء العالم.', 'Success stories from all over the globe.');
html = html.replace('ولي أمر (طالبين بتأسيس الأطفال)', 'Parent (Two students in Kids Foundation)');
html = html.replace('ما شاء الله، مستوى الأولاد في القراءة اختلف تماماً في أقل من 3 شهور. المعلمة صبورة جداً وتستخدم أساليب تحببهم في الحصة.', 'Masha\'Allah, the children\'s reading level changed completely in less than 3 months. The teacher is very patient and uses engaging methods.');
html = html.replace('طالبة بخطة البالغين - بريطانيا', 'Student in Adult Plan - UK');
html = html.replace('كنت أجد صعوبة في الالتزام، لكن مرونة المواعيد والمتابعة المستمرة من الأكاديمية شجعتني على ختم جزأين بفضل الله.', 'I found it hard to commit, but the flexible scheduling and continuous follow-up encouraged me to finish two Juz\', Alhamdulillah.');
html = html.replace('طالب بمسار الإجازة - الولايات المتحدة', 'Ijazah Track Student - USA');
html = html.replace('الشيخ دقيق جداً في المخارج والصفات. حصلت على سندي بعد رحلة ممتعة وشاقة، ولا أستغني عن توجيهاتهم.', 'The Sheikh is extremely precise in Makhaarij and Sifaat. I received my Sanad after an enjoyable yet rigorous journey.');
html = html.replace('طالب بمسار اللغة العربية - أستراليا', 'Arabic Language Student - Australia');
html = html.replace('المنهج مصمم بذكاء لغير الناطقين بالعربية، أصبحت قادراً على فهم معاني الآيات أثناء الصلاة وهذا غيّر حياتي.', 'The curriculum is smartly designed for non-natives. I can now understand the meanings of the verses during Salah, which changed my life.');
html = html.replace('>جميع الآراء<', '>View All Reviews<');

// Final CTA
html = html.replace('ابدأ رحلتك القرآنية اليوم', 'Start Your Quranic Journey Today');
html = html.replace('انضم إلى مئات الطلاب حول العالم وابدأ بحجز حصتك التجريبية.', 'Join hundreds of students worldwide and book your free trial lesson.');

// Footer
html = html.replace('مؤسسة تعليمية قرآنية راسخة، تمتد جذورها لنحو عشرين عاماً في خدمة كتاب الله وعلوم اللغة العربية.', 'A firmly established Quranic institution with roots extending for twenty years in serving the Book of Allah and Arabic sciences.');
html = html.replace(/>خريطة الأكاديمية</g, '>Academy Sitemap<');
html = html.replace(/>مسارات القبول</g, '>Admission Paths<');
html = html.replace(/>البرامج الأكاديمية</g, '>Academic Programs<');
html = html.replace(/>التسجيل والرسوم</g, '>Registration & Pricing<');
html = html.replace(/>الناطقين بغير العربية</g, '>Non-Native Speakers<');
html = html.replace(/>الإجازات والمتقدمين</g, '>Ijazah & Advanced<');
html = html.replace('جميع الحقوق محفوظة © 2026 - أكاديمية الخلفاء الراشدين', 'All Rights Reserved © 2026 - Kholafa Academy');

// Add the switcher to Header if not present. Wait, let's just make sure there's an English button.
// The user currently doesn't have an "English" button in `index.html`. 
// I'll add the switcher in `index.html` manually first, then run this.

// Contact Form
html = html.replace('الاسم بالكامل', 'Full Name');
html = html.replace('رقم الهاتف / الواتساب', 'Phone / WhatsApp');
html = html.replace('اختر الدولة', 'Select Country');
html = html.replace('نوع الاستفسار', 'Inquiry Type');
html = html.replace('كيف يمكننا مساعدتك؟ (اختياري)', 'How can we help you? (Optional)');
html = html.replace('>إرسال رسالة عبر واتساب<', '>Send via WhatsApp<');
html = html.replace('مصر', 'Egypt');
html = html.replace('السعودية', 'Saudi Arabia');
html = html.replace('الإمارات', 'UAE');
html = html.replace('المملكة المتحدة', 'UK');
html = html.replace('الولايات المتحدة', 'USA');
html = html.replace('أخرى', 'Other');
html = html.replace('استفسار عام', 'General Inquiry');
html = html.replace('الاشتراك في برنامج', 'Enroll in a Program');
html = html.replace('الدعم الفني', 'Technical Support');

fs.writeFileSync('en/index.html', html, 'utf8');
console.log("Translation complete!");
