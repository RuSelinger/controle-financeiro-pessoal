import CryptoJS from 'crypto-js';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

const ENCRYPTION_KEY_NAME = 'controle-financeiro-encryption-key';
const IV_LENGTH = 16; // Tamanho do IV para AES (16 bytes)

/**
 * Gera uma chave de criptografia aleatória usando expo-crypto
 */
const generateEncryptionKey = async () => {
	try {
		const randomBytes = await Crypto.getRandomBytesAsync(32); // 256 bits
		return CryptoJS.lib.WordArray.create(randomBytes).toString();
	} catch (error) {
		console.error('Erro ao gerar chave de criptografia:', error);
		throw error;
	}
};

/**
 * Obtém ou cria a chave de criptografia armazenada de forma segura
 */
const getOrCreateEncryptionKey = async () => {
	try {
		// Tentar recuperar a chave do Secure Store
		let key = await SecureStore.getItemAsync(ENCRYPTION_KEY_NAME);

		if (!key) {
			// Se não existir, gerar uma nova chave
			key = await generateEncryptionKey();
			// Armazenar de forma segura
			await SecureStore.setItemAsync(ENCRYPTION_KEY_NAME, key);
		}

		return key;
	} catch (error) {
		console.error('Erro ao obter chave de criptografia:', error);
		// Fallback: usar uma chave padrão (não recomendado para produção)
		// Em produção, isso deve lançar um erro
		throw new Error('Não foi possível acessar o armazenamento seguro');
	}
};

/**
 * Criptografa dados usando AES-256-CBC
 * @param {string} data - Dados a serem criptografados
 * @returns {string} - Dados criptografados em formato base64
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
		console.error('Erro ao descriptografar dados:', error);
		throw error;
	}
};

/**
 * Criptografa um valor numérico (converte para string primeiro)
 * @param {number} value - Valor numérico a ser criptografado
 * @returns {string} - Valor criptografado em formato base64
 */
export const encryptValue = async (value) => {
	try {
		if (value === null || value === undefined) return null;
		return await encryptData(value.toString());
	} catch (error) {
		console.error('Erro ao criptografar valor:', error);
		throw error;
	}
};

/**
 * Descriptografa um valor numérico
 * @param {string} encryptedValue - Valor criptografado em formato base64
 * @returns {number} - Valor numérico descriptografado
 */
export const decryptValue = async (encryptedValue) => {
	try {
		if (!encryptedValue) return null;
		const decrypted = await decryptData(encryptedValue);
		return parseFloat(decrypted);
	} catch (error) {
		console.error('Erro ao descriptografar valor:', error);
		throw error;
	}
};

/**
 * Gera um hash SHA256 para validação de integridade (mantido para compatibilidade)
 * @param {string} data - Dados para gerar hash
 * @returns {string} - Hash SHA256
 */
export const generateHash = async (data) => {
	try {
		if (!data) return null;
		const hash = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			data.toString()
		);
		return hash;
	} catch (error) {
		console.error('Erro ao gerar hash:', error);
		return null;
	}
};

/**
 * Valida integridade dos dados usando hash SHA256
 * @param {string} data - Dados originais
 * @param {string} hash - Hash esperado
 * @returns {boolean} - True se o hash corresponde
 */
export const validateDataIntegrity = async (data, hash) => {
	try {
		const calculatedHash = await generateHash(data);
		return calculatedHash === hash;
	} catch (error) {
		console.error('Erro ao validar integridade:', error);
		return false;
	}
};

/**
 * Remove a chave de criptografia do armazenamento seguro
 * ATENÇÃO: Isso tornará todos os dados criptografados ilegíveis!
 * Use apenas para reset completo do app ou em casos de emergência
 */
export const clearEncryptionKey = async () => {
	try {
		await SecureStore.deleteItemAsync(ENCRYPTION_KEY_NAME);
		return true;
	} catch (error) {
		console.error('Erro ao limpar chave de criptografia:', error);
		return false;
	}
};
