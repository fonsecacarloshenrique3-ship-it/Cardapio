const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');
const wwwDir = path.join(rootDir, 'www');

console.log('--------------------------------------------------');
console.log('🚀 INICIANDO BUILD DO CARDÁPIO DIGITAL');
console.log('--------------------------------------------------');

// 1. Limpa e recria pasta www
if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

// 2. Copia arquivos de src/ para www/ e para a raiz
const filesToCopy = [
  'index.html',
  'style.css',
  'app.js',
  'sw.js',
  'manifest.json'
];

filesToCopy.forEach(file => {
  const srcFile = path.join(srcDir, file);
  if (fs.existsSync(srcFile)) {
    // Copia para www (Capacitor)
    fs.copyFileSync(srcFile, path.join(wwwDir, file));
    // Sincroniza com a raiz (para Live Server / GitHub Pages)
    fs.copyFileSync(srcFile, path.join(rootDir, file));
    console.log(`  [✔] Sincronizado: ${file}`);
  }
});

// Copia pasta icons se existir em src
const iconsSrc = path.join(srcDir, 'icons');
const iconsWww = path.join(wwwDir, 'icons');
const iconsRoot = path.join(rootDir, 'icons');

if (fs.existsSync(iconsSrc)) {
  fs.cpSync(iconsSrc, iconsWww, { recursive: true });
  fs.cpSync(iconsSrc, iconsRoot, { recursive: true });
  console.log(`  [✔] Sincronizada pasta: icons/`);
}

console.log('--------------------------------------------------');
console.log('✨ Build concluído com sucesso!');
console.log('   - Pasta www/ pronta para compilação no Capacitor/Android.');
console.log('   - Arquivos da raiz atualizados.');
console.log('--------------------------------------------------');
