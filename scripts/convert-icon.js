const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../assets/controle-financeiro.jpg');
const outputPath = path.join(__dirname, '../assets/icon.png');

async function convertIcon() {
	try {
		// Verifica se o arquivo de entrada existe
		if (!fs.existsSync(inputPath)) {
			console.error('Arquivo não encontrado:', inputPath);
			process.exit(1);
		}

		// Converte JPG para PNG e redimensiona para 1024x1024 (tamanho recomendado para ícones)
		await sharp(inputPath)
			.resize(1024, 1024, {
				fit: 'contain',
				background: { r: 240, g: 234, b: 214, alpha: 1 } // Bege Champanhe #F0EAD6
			})
			.png()
			.toFile(outputPath);

		console.log('✅ Ícone convertido com sucesso!');
		console.log('📁 Arquivo salvo em:', outputPath);
	} catch (error) {
		console.error('❌ Erro ao converter ícone:', error);
		process.exit(1);
	}
}

convertIcon();

