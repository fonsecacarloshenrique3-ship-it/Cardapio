const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const wwwDir = path.join(rootDir, 'www');

// Limpa/cria pasta www
if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

const filesToCopy = [
  'index.html',
  'style.css',
  'app.js',
  'sw.js',
  'manifest.json',
  'EXPLICACAO.txt'
];

filesToCopy.forEach(file => {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(wwwDir, file));
    console.log(`[BUILD] Copiado: ${file}`);
  }
});

// Copia pasta icons se existir
const iconsSrc = path.join(rootDir, 'icons');
const iconsDest = path.join(wwwDir, 'icons');
if (fs.existsSync(iconsSrc)) {
  fs.cpSync(iconsSrc, iconsDest, { recursive: true });
  console.log(`[BUILD] Copiada pasta: icons/`);
}

console.log('[BUILD] Pasta www/ gerada com sucesso para o Capacitor!');
