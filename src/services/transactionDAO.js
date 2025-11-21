import { decryptData, decryptValue, encryptData, encryptValue, generateHash } from './cryptoService';
import { getDatabase } from './database';

/**
 * Data Access Object para transações financeiras
 * Implementa o padrão DAO com criptografia AES
 */
class TransactionDAO {
	/**
	 * Criptografa os dados sensíveis de uma transação
	 */
	async encryptTransaction(transaction) {
		const { amount, description } = transaction;

		// Criptografar dados sensíveis
		const encryptedAmount = await encryptValue(amount);
		const encryptedDescription = await encryptData(description);

		// Gerar hash de integridade
		const integrityHash = await generateHash(
			`${transaction.type}-${amount}-${description}-${transaction.date}`
		);

		return {
			...transaction,
			amount: encryptedAmount,
			description: encryptedDescription,
			encrypted_hash: integrityHash,
		};
	}

	/**
	 * Descriptografa os dados sensíveis de uma transação
	 */
	async decryptTransaction(transaction) {
		if (!transaction) return null;

		try {
			const decryptedAmount = await decryptValue(transaction.amount);
			const decryptedDescription = await decryptData(transaction.description);

			return {
				...transaction,
				amount: decryptedAmount,
				description: decryptedDescription,
			};
		} catch (error) {
			console.error('Erro ao descriptografar transação:', error);
			// Se falhar a descriptografia, retornar dados originais (para compatibilidade com dados antigos)
			return transaction;
		}
	}

	/**
	 * Cria uma nova transação (receita ou despesa)
	 */
	async create(transaction) {
		try {
			const db = getDatabase();
			const { type, category, date } = transaction;

			// Criptografar dados sensíveis
			const encrypted = await this.encryptTransaction(transaction);

			const result = await db.runAsync(
				`INSERT INTO transactions (type, amount, description, category, date, encrypted_hash)
         VALUES (?, ?, ?, ?, ?, ?)`,
				[type, encrypted.amount, encrypted.description, category, date, encrypted.encrypted_hash]
			);

			// Retornar transação descriptografada
			return {
				id: result.lastInsertRowId,
				...transaction,
				encrypted_hash: encrypted.encrypted_hash,
			};
		} catch (error) {
			console.error('Erro ao criar transação:', error);
			throw error;
		}
	}

	/**
	 * Busca todas as transações
	 */
	async findAll() {
		try {
			const db = getDatabase();
			const result = await db.getAllAsync(
				`SELECT * FROM transactions ORDER BY date DESC, created_at DESC`
			);

			// Descriptografar todas as transações
			const decryptedResults = await Promise.all(
				result.map(tx => this.decryptTransaction(tx))
			);

			return decryptedResults;
		} catch (error) {
			console.error('Erro ao buscar transações:', error);
			throw error;
		}
	}

	/**
	 * Busca transações por tipo (income ou expense)
	 */
	async findByType(type) {
		try {
			const db = getDatabase();
			const result = await db.getAllAsync(
				`SELECT * FROM transactions WHERE type = ? ORDER BY date DESC, created_at DESC`,
				[type]
			);

			// Descriptografar todas as transações
			const decryptedResults = await Promise.all(
				result.map(tx => this.decryptTransaction(tx))
			);

			return decryptedResults;
		} catch (error) {
			console.error('Erro ao buscar transações por tipo:', error);
			throw error;
		}
	}

	/**
	 * Busca transações por período (mês/ano)
	 */
	async findByPeriod(year, month) {
		try {
			const db = getDatabase();
			const monthStr = month.toString().padStart(2, '0');
			const result = await db.getAllAsync(
				`SELECT * FROM transactions 
         WHERE strftime('%Y-%m', date) = ? 
         ORDER BY date DESC, created_at DESC`,
				[`${year}-${monthStr}`]
			);

			// Descriptografar todas as transações
			const decryptedResults = await Promise.all(
				result.map(tx => this.decryptTransaction(tx))
			);

			return decryptedResults;
		} catch (error) {
			console.error('Erro ao buscar transações por período:', error);
			throw error;
		}
	}

	/**
	 * Busca uma transação por ID
	 */
	async findById(id) {
		try {
			const db = getDatabase();
			const result = await db.getFirstAsync(
				`SELECT * FROM transactions WHERE id = ?`,
				[id]
			);

			if (!result) return null;

			// Descriptografar transação
			return await this.decryptTransaction(result);
		} catch (error) {
			console.error('Erro ao buscar transação por ID:', error);
			throw error;
		}
	}

	/**
	 * Atualiza uma transação existente
	 */
	async update(id, transaction) {
		try {
			const db = getDatabase();
			const { type, category, date } = transaction;

			// Criptografar dados sensíveis
			const encrypted = await this.encryptTransaction(transaction);

			await db.runAsync(
				`UPDATE transactions 
         SET type = ?, amount = ?, description = ?, category = ?, date = ?, encrypted_hash = ?
         WHERE id = ?`,
				[type, encrypted.amount, encrypted.description, category, date, encrypted.encrypted_hash, id]
			);

			// Retornar transação descriptografada
			return { id, ...transaction, encrypted_hash: encrypted.encrypted_hash };
		} catch (error) {
			console.error('Erro ao atualizar transação:', error);
			throw error;
		}
	}

	/**
	 * Remove uma transação
	 */
	async delete(id) {
		try {
			const db = getDatabase();
			await db.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
			return true;
		} catch (error) {
			console.error('Erro ao deletar transação:', error);
			throw error;
		}
	}

	/**
	 * Calcula totais por tipo no período
	 * Nota: Como os valores estão criptografados, precisamos descriptografar cada transação
	 */
	async getTotalsByPeriod(year, month) {
		try {
			// Buscar todas as transações do período e calcular manualmente
			// pois não podemos fazer SUM() diretamente em dados criptografados
			const transactions = await this.findByPeriod(year, month);

			const totals = {
				income: 0,
				expense: 0,
			};

			transactions.forEach((transaction) => {
				const amount = parseFloat(transaction.amount) || 0;
				if (transaction.type === 'income') {
					totals.income += amount;
				} else if (transaction.type === 'expense') {
					totals.expense += amount;
				}
			});

			return totals;
		} catch (error) {
			console.error('Erro ao calcular totais:', error);
			throw error;
		}
	}
}

export default new TransactionDAO();

