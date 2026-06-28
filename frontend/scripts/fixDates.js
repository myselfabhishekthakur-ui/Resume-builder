const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../components/Templates');

const functionToAdd = `
const formatDates = (start: string, end: string, current?: boolean) => {
  const s = fmt(start);
  const e = current ? 'Present' : fmt(end);
  if (s && e) return \`\${s} — \${e}\`;
  if (s) return s;
  if (e) return e;
  return '';
};
`;

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('Template.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Add formatDates function if not present
      if (!content.includes('formatDates')) {
        content = content.replace(
          /const fmt = .*?;/s,
          match => match + '\n' + functionToAdd
        );
      }

      // Replace common patterns
      // {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}
      // {fmt(edu.startDate)} – {fmt(edu.endDate)}
      // Handle both en dash and em dash, and hyphen
      content = content.replace(
        /\{fmt\(([^.]+)\.startDate\)\}\s*[-–—]\s*\{([^.]+)\.current \? 'Present' : fmt\(\2\.endDate\)\}/g,
        '{formatDates($1.startDate, $1.endDate, $1.current)}'
      );
      
      content = content.replace(
        /\{fmt\(([^.]+)\.startDate\)\}\s*[-–—]\s*\{fmt\(\1\.endDate\)\}/g,
        '{formatDates($1.startDate, $1.endDate)}'
      );

      // Also for certifications: {cert.issuer} ({fmt(cert.date)}) -> maybe leave alone? The user complained about the dash. 
      // If cert.date is empty, it shows `Issuer ()` or `Issuer · `
      content = content.replace(
        /\{([^.]+)\.issuer\}\s*·\s*\{fmt\(\1\.date\)\}/g,
        '{$1.issuer}{$1.date ? ` · ${fmt($1.date)}` : ""}'
      );
      content = content.replace(
        /\{([^.]+)\.issuer\}\s*\(\{fmt\(\1\.date\)\}\)/g,
        '{$1.issuer}{$1.date ? ` (${fmt($1.date)})` : ""}'
      );

      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}`);
    }
  }
}

processDir(templatesDir);
console.log('Done!');
