const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');
const wwwDir = path.join(rootDir, 'www');

console.log('--------------------------------------------------');
console.log('🚀 INICIANDO BUILD DO CARDÁPIO DIGITAL (ARQUITETURA MVC)');
console.log('--------------------------------------------------');

// 1. Limpa e recria pasta www
if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

// 2. Copia pastas de módulos (css, js, icons) para www e raiz
const dirsToSync = ['css', 'js', 'icons'];

dirsToSync.forEach(dir => {
  const srcPath = path.join(srcDir, dir);
  const wwwPath = path.join(wwwDir, dir);
  const rootPath = path.join(rootDir, dir);

  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, wwwPath, { recursive: true });
    fs.cpSync(srcPath, rootPath, { recursive: true });
    console.log(`  [✔] Sincronizada pasta MVC: ${dir}/`);
  }
});

// 3. Gerar arquivo style.css unificado a partir dos módulos CSS do MVC
const cssModules = ['base.css', 'components.css', 'modals.css'];
let bundleCSS = '';
cssModules.forEach(mod => {
  const modPath = path.join(srcDir, 'css', mod);
  if (fs.existsSync(modPath)) {
    bundleCSS += `/* --- ${mod} --- */\n` + fs.readFileSync(modPath, 'utf8') + '\n\n';
  }
});
if (bundleCSS) {
  fs.writeFileSync(path.join(srcDir, 'style.css'), bundleCSS);
  fs.writeFileSync(path.join(wwwDir, 'style.css'), bundleCSS);
  fs.writeFileSync(path.join(rootDir, 'style.css'), bundleCSS);
  console.log('  [✔] Gerado bundle unificado: style.css');
}

// 4. Copia arquivos principais
const filesToCopy = [
  'index.html',
  'app.js',
  'sw.js',
  'manifest.json'
];

filesToCopy.forEach(file => {
  const srcFile = path.join(srcDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, path.join(wwwDir, file));
    fs.copyFileSync(srcFile, path.join(rootDir, file));
    console.log(`  [✔] Sincronizado: ${file}`);
  }
});

console.log('--------------------------------------------------');
console.log('✨ Build MVC concluído com sucesso!');
console.log('   - Estrutura MVC pronta em src/js e src/css.');
console.log('   - Pasta www/ sincronizada para Capacitor/Android.');
console.log('--------------------------------------------------');
