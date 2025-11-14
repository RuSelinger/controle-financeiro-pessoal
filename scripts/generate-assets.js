// Script para gerar assets básicos usando Node.js
// Este script cria imagens placeholder simples

const fs = require('fs');
const path = require('path');

// Criar pasta assets se não existir
const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Criar um arquivo SVG simples que pode ser usado como placeholder
// Nota: Para produção, você deve substituir por imagens reais

const iconSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#3498DB" rx="100"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle">💰</text>
</svg>`;

// Salvar como placeholder (mas precisamos de PNG)
console.log('⚠️  Assets não podem ser gerados automaticamente.');
console.log('📝 Por favor, crie manualmente os seguintes arquivos na pasta assets/:');
console.log('   - icon.png (1024x1024px)');
console.log('   - adaptive-icon.png (1024x1024px)');
console.log('   - splash.png (1242x2436px)');
console.log('   - favicon.png (48x48px)');
console.log('');
console.log('💡 Você pode usar ferramentas online como:');
console.log('   - https://www.favicon-generator.org/');
console.log('   - https://www.appicon.co/');
console.log('   - Ou criar imagens simples com qualquer editor de imagens');

