import fs from 'fs';
import path from 'path';

function removeComments(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively go into folders (but skip node_modules just in case)
      if (file !== 'node_modules') {
        removeComments(fullPath);
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 1. Remove JSX block comments: {/* ... */}
      content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
      
      // 2. Remove standard multi-line comments: /* ... */
      content = content.replace(/\/\*[\s\S]*?\*\//g, '');
      
      // 3. Remove single-line comments (//), but ignore http:// and https://
      content = content.replace(/(?<!https?:)\/\/.*$/gm, '');

      fs.writeFileSync(fullPath, content);
    }
  }
}

console.log('🧹 Stripping comments from src/ directory...');
removeComments('./src');
console.log('✅ Done!');
