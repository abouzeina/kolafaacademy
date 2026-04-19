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
const targetFooter = `    <footer class="footer">
      <div class="watermark"></div>
      <div class="container">
        <div class="grid">
          <div class="brand">
            <div class="logo-footer">أكاديمية الخلفاء الراشدين</div>
            <p class="desc">مؤسسة تعليمية قرآنية راسخة، تمتد جذورها لنحو عشرين عاماً في خدمة كتاب الله وعلوم اللغة العربية.</p>
          </div>
          <div class="linksCol">
            <h4 class="colTitle">خريطة الأكاديمية</h4>
            <ul class="links">
              <li><a href="programs.html" class="link">البرامج الأكاديمية</a></li>
              <li><a href="pricing.html" class="link">التسجيل والرسوم</a></li>
              <li><a href="legacy.html" class="link">صرح الخلفاء</a></li>
              <li><a href="teachers.html" class="link">من نحن</a></li>
            </ul>
          </div>
          <div class="linksCol">
            <h4 class="colTitle">مسارات القبول</h4>
            <ul class="links">
              <li><a href="programs.html" class="link">تأسيس الأطفال</a></li>
              <li><a href="programs.html" class="link">خطط البالغين</a></li>
              <li><a href="programs.html" class="link">الإجازات والمتقدمين</a></li>
              <li><a href="programs.html" class="link">الناطقين بغير العربية</a></li>
            </ul>
          </div>
          <div class="linksCol">
            <h4 class="colTitle">تواصل معنا</h4>
            <ul class="links">
              <li class="link tel-text" style="direction: ltr; text-align: right">+20 155 650 9755</li>
              <li>
                <a href="https://wa.me/201556509755?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-global full-width" style="margin-top: 16px; padding: 12px 16px; font-size: 1rem">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  تواصل عبر واتساب
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottomBar">
          <div>جميع الحقوق محفوظة © 2026 - أكاديمية الخلفاء الراشدين</div>
        </div>
      </div>
    </footer>`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\s*<footer class="footer">[\s\S]*?<\/footer>/, '\n' + targetFooter);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
}
