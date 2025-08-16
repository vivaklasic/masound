const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public', 'relax');
const outDir = path.join(__dirname, '.vercel', 'output', 'relax');

fs.mkdirSync(outDir, { recursive: true });

fs.readdirSync(srcDir).forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(outDir, file);
  fs.copyFileSync(srcFile, destFile);
});

console.log('MP3 files copied to .vercel/output/relax');
