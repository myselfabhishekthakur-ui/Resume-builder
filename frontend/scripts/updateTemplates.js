const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../components/Templates');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('Template.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(
        /\{experience\.map\(([^=]+)=>\s*\(\s*<div\s+key=[^\s>]+(\s+className=[^>]+)?>/g,
        (match, arg1) => {
          const v = arg1.replace(/[()\s]/g, '');
          if (match.includes('style=')) return match;
          return match.slice(0, -1) + ` style={{ pageBreakBefore: ${v}.pageBreak ? 'always' : 'auto' }}>`;
        }
      );
      
      content = content.replace(
        /\{education\.map\(([^=]+)=>\s*\(\s*<div\s+key=[^\s>]+(\s+className=[^>]+)?>/g,
        (match, arg1) => {
          const v = arg1.replace(/[()\s]/g, '');
          if (match.includes('style=')) return match;
          return match.slice(0, -1) + ` style={{ pageBreakBefore: ${v}.pageBreak ? 'always' : 'auto' }}>`;
        }
      );

      content = content.replace(
        /\{projects\.map\(([^=]+)=>\s*\(\s*<div\s+key=[^\s>]+(\s+className=[^>]+)?>/g,
        (match, arg1) => {
          const v = arg1.replace(/[()\s]/g, '');
          if (match.includes('style=')) return match;
          return match.slice(0, -1) + ` style={{ pageBreakBefore: ${v}.pageBreak ? 'always' : 'auto' }}>`;
        }
      );
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(templatesDir);
console.log('Templates updated with page break styles.');
