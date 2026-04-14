const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '.'); // current directory
const files = ['index.html', 'programs.html', 'pricing.html', 'teachers.html', 'legacy.html'];

const replacements = [
  { search: /مركز الخلفاء الراشدين/g, replace: 'أكاديمية الخلفاء الراشدين الدولية' },
  { search: /خريطة المركز/g, replace: 'خريطة الأكاديمية' },
  { search: /أنشطة المركز/g, replace: 'أنشطة الأكاديمية' },
  { search: /أبواب المركز/g, replace: 'أبواب الأكاديمية' },
  { search: /تجربة المركز/g, replace: 'تجربة الأكاديمية' },
  { search: /طلاب المركز/g, replace: 'طلاب الأكاديمية' },
  { search: /أشبال المركز/g, replace: 'أشبال الأكاديمية' },
  { search: /يوميات المركز/g, replace: 'يوميات الأكاديمية' },
  { search: /داخل المركز/g, replace: 'داخل الأكاديمية' },
  { search: /في المركز/g, replace: 'في الأكاديمية' },
  { search: /لوجو المركز/g, replace: 'لوجو الأكاديمية' },
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
