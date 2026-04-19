const fs = require('fs');
const files = [
  'index.html', 'pricing.html', 'teachers.html', 'contact.html', 'legacy.html', 'programs.html',
  'program-reading.html', 'program-tajweed.html', 'program-hifz.html', 'program-ijazah.html', 'program-arabic.html', 'program-islamic.html',
  'en/index.html', 'en/pricing.html', 'en/teachers.html', 'en/contact.html', 'en/legacy.html', 'en/programs.html',
  'en/program-reading.html', 'en/program-tajweed.html', 'en/program-hifz.html', 'en/program-ijazah.html', 'en/program-arabic.html', 'en/program-islamic.html'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/margin-left:\s*auto;?/g, '');
    content = content.replace(/margin-right:\s*auto;?/g, '');
    content = content.replace(/padding-left:\s*24px;?/g, '');
    content = content.replace(/style="([^"]*)"/g, (match, p1) => {
      let cleaned = p1.replace(/\s+/g, ' ').replace(/;\s*;/g, ';').trim();
      return 'style="' + cleaned + '"';
    });
    fs.writeFileSync(f, content);
  }
});
console.log('Cleaned inline styles');
