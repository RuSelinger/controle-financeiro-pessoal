import * as Crypto from 'expo-crypto';

// Chave de criptografia (em produção, deve ser gerada e armazenada de forma segura)
const ENCRYPTION_KEY = 'controle-financeiro-key-2024';

/**
 * Gera um hash da chave de criptografia
 */
const getKeyHash = async () => {
	try {
		return await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			ENCRYPTION_KEY
		);
	} catch (error) {
		console.error('Erro ao gerar hash da chave:', error);
		throw new Error('Falha ao gerar hash de segurança');
	}
};

/**
 * Criptografa dados usando SHA256 (hash unidirecional)
 * Nota: Para este projeto educacional, usamos hash SHA256.
 * Em produção profissional, considere usar expo-crypto com AES ou outra biblioteca de criptografia reversível.
 * @param {string|number} data - Dados a serem criptografados
 * @returns {Promise<string|null>} - Hash criptográfico dos dados
 */
export const encryptData = async (data) => {
	try {
		if (!data && data !== 0) return null;

		const keyHash = await getKeyHash();
		const dataString = String(data);

		// Combinar dados com a chave e gerar hash SHA256
		const combined = `${dataString}-${keyHash}`;
		const encrypted = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			combined
		);

		return encrypted;
	} catch (error) {
		console.error('Erro ao criptografar dados:', error);
		throw new Error('Falha ao criptografar dados');
	}
};

/**
 * Valida integridade dos dados comparando com hash fornecido
 * @param {string|number} data - Dados originais
 * @param {string} hash - Hash para comparação
 * @returns {Promise<boolean>} - True se o hash corresponde aos dados
 */
export const validateDataIntegrity = async (data, hash) => {
	try {
		if (!hash || (!data && data !== 0)) return false;

		const calculatedHash = await encryptData(data);
		return calculatedHash === hash;
	} catch (error) {
		console.error('Erro ao validar integridade:', error);
		return false;
	}
};

/**
 * Gera um hash único para um valor
 * Útil para criar identificadores únicos baseados em valores sensíveis
 * @param {string|number} value - Valor a ser hashado
 * @returns {Promise<string|null>} - Hash do valor (primeiros 20 caracteres)
 */
export const hashValue = async (value) => {
	try {
		if (value === null || value === undefined) return null;

		const keyHash = await getKeyHash();
		const valueString = String(value);
		const hash = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			`${valueString}-${keyHash}-${Date.now()}`
		);

		return hash.substring(0, 20);
	} catch (error) {
		console.error('Erro ao gerar hash do valor:', error);
		return null;
	}
};

/**
 * Gera um UUID v4 para identificadores únicos
 * @returns {Promise<string>} - UUID gerado
 */
export const generateUUID = async () => {
	try {
		return await Crypto.randomUUID();
	} catch (error) {
		console.error('Erro ao gerar UUID:', error);
		// Fallback: gerar UUID simples
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 | 0;
			const v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
};

