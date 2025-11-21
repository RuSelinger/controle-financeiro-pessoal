// Mock do expo-secure-store ANTES de importar o cryptoService
const mockStore = {};
jest.mock('expo-secure-store', () => ({
	getItemAsync: jest.fn((key) => Promise.resolve(mockStore[key] || null)),
	setItemAsync: jest.fn((key, value) => {
		mockStore[key] = value;
		return Promise.resolve();
	}),
	deleteItemAsync: jest.fn((key) => {
		delete mockStore[key];
		return Promise.resolve();
	}),
}));

import { clearEncryptionKey, decryptData, decryptValue, encryptData, encryptValue, generateHash, validateDataIntegrity } from './cryptoService';

describe('cryptoService', () => {
	beforeEach(() => {
		// Limpar o store antes de cada teste
		jest.clearAllMocks();
		Object.keys(mockStore).forEach(key => delete mockStore[key]);
	});

	describe('encryptData e decryptData', () => {
		it('deve criptografar e descriptografar dados corretamente', async () => {
			// Garantir que o store está limpo
			Object.keys(mockStore).forEach(key => delete mockStore[key]);

			const originalData = 'Dados sensíveis para criptografar';

			const encrypted = await encryptData(originalData);
			expect(encrypted).toBeTruthy();
			expect(encrypted).not.toBe(originalData);
			expect(typeof encrypted).toBe('string');

			// Verificar que a chave foi salva
			const SecureStore = require('expo-secure-store');
			const savedKey = await SecureStore.getItemAsync('controle-financeiro-encryption-key');
			expect(savedKey).toBeTruthy();

			const decrypted = await decryptData(encrypted);
			expect(decrypted).toBe(originalData);
		});

		it('deve retornar null para dados nulos', async () => {
			const encrypted = await encryptData(null);
			expect(encrypted).toBeNull();

			const decrypted = await decryptData(null);
			expect(decrypted).toBeNull();
		});

		it('deve criptografar strings vazias', async () => {
			const encrypted = await encryptData('');
			expect(encrypted).toBeTruthy();

			const decrypted = await decryptData(encrypted);
			expect(decrypted).toBe('');
		});

		it('deve criptografar dados com caracteres especiais', async () => {
			const originalData = 'Dados com ç, ã, é e símbolos: !@#$%^&*()';

			const encrypted = await encryptData(originalData);
			const decrypted = await decryptData(encrypted);

			expect(decrypted).toBe(originalData);
		});
	});

	describe('encryptValue e decryptValue', () => {
		it('deve criptografar e descriptografar valores numéricos', async () => {
			const originalValue = 1234.56;

			const encrypted = await encryptValue(originalValue);
			expect(encrypted).toBeTruthy();
			expect(typeof encrypted).toBe('string');

			const decrypted = await decryptValue(encrypted);
			expect(decrypted).toBe(originalValue);
		});

		it('deve criptografar valores zero', async () => {
			const encrypted = await encryptValue(0);
			const decrypted = await decryptValue(encrypted);

			expect(decrypted).toBe(0);
		});

		it('deve criptografar valores negativos', async () => {
			const originalValue = -500.25;

			const encrypted = await encryptValue(originalValue);
			const decrypted = await decryptValue(encrypted);

			expect(decrypted).toBe(originalValue);
		});

		it('deve retornar null para valores nulos', async () => {
			const encrypted = await encryptValue(null);
			expect(encrypted).toBeNull();

			const decrypted = await decryptValue(null);
			expect(decrypted).toBeNull();
		});
	});

	describe('generateHash', () => {
		it('deve gerar hash SHA256', async () => {
			const data = 'Dados para hash';
			const hash = await generateHash(data);

			expect(hash).toBeTruthy();
			expect(typeof hash).toBe('string');
			expect(hash.length).toBeGreaterThan(0);
		});

		it('deve gerar o mesmo hash para os mesmos dados', async () => {
			const data = 'Dados consistentes';
			const hash1 = await generateHash(data);
			const hash2 = await generateHash(data);

			expect(hash1).toBe(hash2);
		});

		it('deve gerar hashes diferentes para dados diferentes', async () => {
			const hash1 = await generateHash('Dados 1');
			const hash2 = await generateHash('Dados 2');

			expect(hash1).not.toBe(hash2);
		});

		it('deve retornar null para dados nulos', async () => {
			const hash = await generateHash(null);
			expect(hash).toBeNull();
		});
	});

	describe('validateDataIntegrity', () => {
		it('deve validar integridade corretamente', async () => {
			const data = 'Dados para validar';
			const hash = await generateHash(data);

			const isValid = await validateDataIntegrity(data, hash);
			expect(isValid).toBe(true);
		});

		it('deve retornar false para dados alterados', async () => {
			const data = 'Dados originais';
			const hash = await generateHash(data);
			const alteredData = 'Dados alterados';

			const isValid = await validateDataIntegrity(alteredData, hash);
			expect(isValid).toBe(false);
		});

		it('deve retornar false para hash inválido', async () => {
			const data = 'Dados para validar';
			const invalidHash = 'hash-invalido';

			const isValid = await validateDataIntegrity(data, invalidHash);
			expect(isValid).toBe(false);
		});
	});

	describe('clearEncryptionKey', () => {
		it('deve limpar a chave de criptografia', async () => {
			// Primeiro, criptografar algo para criar a chave
			await encryptData('teste');

			// Verificar que a chave existe
			const SecureStore = require('expo-secure-store');
			const keyBefore = await SecureStore.getItemAsync('controle-financeiro-encryption-key');
			expect(keyBefore).toBeTruthy();

			// Limpar a chave
			const result = await clearEncryptionKey();
			expect(result).toBe(true);

			// Verificar que a chave foi removida
			const keyAfter = await SecureStore.getItemAsync('controle-financeiro-encryption-key');
			expect(keyAfter).toBeNull();
		});
	});

	describe('Integração completa', () => {
		it('deve manter consistência entre criptografia e descriptografia em múltiplas operações', async () => {
			const testData = [
				'Descrição de transação 1',
				'1234.56',
				'Outra descrição com números 123',
			];

			for (const data of testData) {
				const encrypted = await encryptData(data);
				const decrypted = await decryptData(encrypted);
				expect(decrypted).toBe(data);
			}
		});

		it('deve gerar chaves diferentes para cada instalação', async () => {
			// Limpar chave atual
			await clearEncryptionKey();

			// Criptografar dados
			const encrypted1 = await encryptData('teste');

			// Limpar e criar nova chave
			await clearEncryptionKey();
			const encrypted2 = await encryptData('teste');

			// As chaves devem ser diferentes, então os criptogramas também
			expect(encrypted1).not.toBe(encrypted2);

			// Mas ambos devem descriptografar para o mesmo valor
			const decrypted1 = await decryptData(encrypted1);
			const decrypted2 = await decryptData(encrypted2);
			expect(decrypted1).toBe('teste');
			expect(decrypted2).toBe('teste');
		});
	});
});
