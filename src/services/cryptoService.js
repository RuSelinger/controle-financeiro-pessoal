import * as Crypto from 'expo-crypto';

// Chave de criptografia (em produção, deve ser gerada e armazenada de forma segura)
const ENCRYPTION_KEY = 'controle-financeiro-key-2024';

/**
 * Gera um hash da chave de criptografia
 */
const getKeyHash = async () => {
	return await Crypto.digestStringAsync(
		Crypto.CryptoDigestAlgorithm.SHA256,
		ENCRYPTION_KEY
	);
};

/**
 * Criptografa um texto usando SHA256 (hash unidirecional)
 * Para criptografia reversível, seria necessário usar AES, mas para este projeto
 * vamos usar hash para proteger dados sensíveis
 */
export const encryptData = async (data) => {
	try {
		if (!data) return null;

		const keyString = await getOrCreateEncryptionKey();
		const dataString = data.toString();

		// Gerar IV aleatório usando expo-crypto (não usa módulo nativo do Node)
		const randomBytes = await Crypto.getRandomBytesAsync(IV_LENGTH);
		// Converter para array de números se necessário
		const bytesArray = Array.isArray(randomBytes) ? randomBytes : Array.from(randomBytes);
		const iv = CryptoJS.lib.WordArray.create(bytesArray);

		// Converter a chave string para WordArray para evitar KDF que usa random
		// Isso evita que o CryptoJS tente usar o módulo nativo do Node.js
		const key = CryptoJS.enc.Utf8.parse(keyString);

		// Se a chave não tiver 32 bytes (256 bits), fazer hash SHA256
		let keyWordArray = key;
		if (key.sigBytes !== 32) {
			keyWordArray = CryptoJS.SHA256(key);
		}

		// Criptografar usando AES-256-CBC diretamente com a chave derivada
		const encrypted = CryptoJS.AES.encrypt(dataString, keyWordArray, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});

		// Combinar IV + dados criptografados e converter para base64
		const combined = iv.concat(encrypted.ciphertext);
		return combined.toString(CryptoJS.enc.Base64);
	} catch (error) {
		console.error('Erro ao criptografar dados:', error);
		throw error;
	}
};

/**
 * Descriptografa dados usando AES-256-CBC
 * @param {string} encryptedData - Dados criptografados em formato base64
 * @returns {string} - Dados descriptografados
 */
export const decryptData = async (encryptedData) => {
	try {
		if (!encryptedData) return null;

		const keyString = await getOrCreateEncryptionKey();

		// Converter de base64 para WordArray
		const combined = CryptoJS.enc.Base64.parse(encryptedData);

		// Extrair IV (primeiros 16 bytes)
		const iv = CryptoJS.lib.WordArray.create(
			combined.words.slice(0, IV_LENGTH / 4)
		);

		// Extrair dados criptografados (resto)
		const ciphertext = CryptoJS.lib.WordArray.create(
			combined.words.slice(IV_LENGTH / 4)
		);

		// Criar objeto CipherParams
		const cipherParams = CryptoJS.lib.CipherParams.create({
			ciphertext: ciphertext,
		});

		// Converter a chave string para WordArray (mesmo processo da criptografia)
		const key = CryptoJS.enc.Utf8.parse(keyString);

		// Se a chave não tiver 32 bytes (256 bits), fazer hash SHA256
		let keyWordArray = key;
		if (key.sigBytes !== 32) {
			keyWordArray = CryptoJS.SHA256(key);
		}

		// Descriptografar
		const decrypted = CryptoJS.AES.decrypt(cipherParams, keyWordArray, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});

		return decrypted.toString(CryptoJS.enc.Utf8);
	} catch (error) {
		console.error('Erro ao criptografar dados:', error);
		return data;
	}
};

/**
 * Para valores numéricos, aplicamos uma transformação simples
 * Em produção, usar AES para criptografia reversível
 */
export const encryptValue = async (value) => {
	try {
		if (value === null || value === undefined) return null;
		// Para este projeto, vamos usar uma criptografia simples
		// Em produção, usar AES do expo-crypto ou react-native-crypto
		const keyHash = await getKeyHash();
		const encrypted = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			`${value}-${keyHash}`
		);
		return encrypted.substring(0, 20); // Retorna parte do hash como identificador
	} catch (error) {
		console.error('Erro ao criptografar valor:', error);
		return value;
	}
};

/**
 * Valida integridade dos dados
 */
export const validateDataIntegrity = async (data, hash) => {
	try {
		const calculatedHash = await encryptData(data);
		return calculatedHash === hash;
	} catch (error) {
		console.error('Erro ao validar integridade:', error);
		return false;
	}
};

