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
		const hash = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			data.toString()
		);
		return hash;
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

