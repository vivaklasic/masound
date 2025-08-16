const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public');
const outDir = path.join(__dirname, '.vercel', 'output', 'static');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

fs.readdirSync(srcDir, { withFileTypes: true }).forEach(entry => {
  if (entry.isDirectory()) {
    const genre = entry.name;
    const srcGenreDir = path.join(srcDir, genre);
    const outGenreDir = path.join(outDir, genre);

    copyDir(srcGenreDir, outGenreDir);
    console.log(`Файлы из ${genre} скопированы в .vercel/output/static/${genre}`);
  }
});

