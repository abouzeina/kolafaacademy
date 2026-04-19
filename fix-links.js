const fs = require('fs');
const files = [
  'index.html', 'pricing.html', 'teachers.html', 'contact.html', 'legacy.html', 'programs.html',
  'program-reading.html', 'program-tajweed.html', 'program-hifz.html', 'program-ijazah.html', 'program-arabic.html', 'program-islamic.html'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/href="en\/index\.html"(.*?)class="lang-switch-btn"/g, 'href="en/' + f + '"$1class="lang-switch-btn"');
    fs.writeFileSync(f, content);
  }
  let enF = 'en/' + f;
  if (fs.existsSync(enF)) {
    let content = fs.readFileSync(enF, 'utf8');
    content = content.replace(/href="\.\.\/index\.html"(.*?)class="lang-switch-btn"/g, 'href="../' + f + '"$1class="lang-switch-btn"');
    fs.writeFileSync(enF, content);
  }
});
console.log('Fixed lang switch links');
