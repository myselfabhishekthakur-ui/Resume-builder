const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../components/Templates');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('Template.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Replace array-mapped experience descriptions
      content = content.replace(
        /\{exp\.description\s*&&\s*\(\s*<div[^>]*>\s*\{exp\.description\.split\('\\n'\)\.map\([^)]+\)\s*=>\s*<p[^>]*>\{[^}]+\}<\/p>\s*\)\}\s*<\/div>\s*\)\}/g,
        '{exp.description && <div className={styles.desc || styles.entryDesc} dangerouslySetInnerHTML={{ __html: exp.description }} />}'
      );

      // Handle cases where it maps directly without a div wrapper
      content = content.replace(
        /\{exp\.description\s*&&\s*\(\s*\{exp\.description\.split\('\\n'\)\.map\([^)]+\)\s*=>\s*(<p[^>]*>\{[^}]+\}<\/p>)\s*\)\s*\)\}/g,
        '{exp.description && <div className={styles.entryDesc} dangerouslySetInnerHTML={{ __html: exp.description }} />}'
      );
      
      // Handle inline map cases
      content = content.replace(
        /\{exp\.description\s*&&\s*<div[^>]*>\s*\{exp\.description\.split\('\\n'\)\.map\([^)]+\)\s*=>\s*<p[^>]*>\{[^}]+\}<\/p>\}\s*<\/div>\}/g,
        '{exp.description && <div className={styles.desc || styles.entryDesc} dangerouslySetInnerHTML={{ __html: exp.description }} />}'
      );

      // Handle simple paragraph mapped cases
      content = content.replace(
        /\{exp\.description\s*&&\s*<div[^>]*>\s*\{exp\.description\.split\('\\n'\)\.map\([^)]+\)\s*=>\s*<p[^>]*>\{[^}]+\}<\/p>\)\}\s*<\/div>\}/g,
        '{exp.description && <div className={styles.desc || styles.entryDesc} dangerouslySetInnerHTML={{ __html: exp.description }} />}'
      );

      // 2. Replace simple <p>{proj.description}</p>
      content = content.replace(
        /\{proj\.description\s*&&\s*<p([^>]*)>\{proj\.description\}<\/p>\}/g,
        '{proj.description && <div$1 dangerouslySetInnerHTML={{ __html: proj.description }} />}'
      );
      
      // 3. Replace summary rendering
      content = content.replace(
        /<p([^>]*)>\{personal\.summary\}<\/p>/g,
        '<div$1 dangerouslySetInnerHTML={{ __html: personal.summary }} />'
      );

      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}`);
    }
  }
}

processDir(templatesDir);
console.log('Done!');
