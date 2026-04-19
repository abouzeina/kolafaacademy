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

const indexHtml = fs.readFileSync('en/index.html', 'utf8');

// Extract Header
const headerRegex = /<header[\s\S]*?<\/header>/;
const headerMatch = indexHtml.match(headerRegex);
const headerContent = headerMatch ? headerMatch[0] : '';

// Extract Footer
const footerRegex = /<footer[\s\S]*?<\/footer>/;
const footerMatch = indexHtml.match(footerRegex);
const footerContent = footerMatch ? footerMatch[0] : '';

// Extract Floating WA
const waRegex = /<!-- ================= FLOATING WA ================= -->[\s\S]*?<\/a>/;
const waMatch = indexHtml.match(waRegex);
const waContent = waMatch ? waMatch[0] : '';

files.forEach(file => {
  const path = `en/${file}`;
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    
    // Replace Header
    if (headerContent) {
      content = content.replace(/<header[\s\S]*?<\/header>/, headerContent);
    }
    
    // Replace Footer
    if (footerContent) {
      content = content.replace(/<footer[\s\S]*?<\/footer>/, footerContent);
    }
    
    // Replace Floating WA
    if (waContent) {
      content = content.replace(/<!-- ================= FLOATING WA ================= -->[\s\S]*?<\/a>/, waContent);
    }

    fs.writeFileSync(path, content, 'utf8');
    console.log(`Synced Header/Footer for ${path}`);
  }
});
