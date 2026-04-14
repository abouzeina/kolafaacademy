const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '.'); // current directory
const files = ['index.html', 'programs.html', 'pricing.html', 'teachers.html', 'legacy.html'];

const replacements = [
  { search: /أكاديمية الخلفاء الراشدين الدولية/g, replace: 'أكاديمية الخلفاء الراشدين' }
];

files.forEach(file => {
  const filePath = path.join(directoryPath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(rule => {
      content = content.replace(rule.search, rule.replace);
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
