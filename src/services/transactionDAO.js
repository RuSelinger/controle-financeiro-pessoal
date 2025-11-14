import { encryptData } from './cryptoService';
import { getDatabase } from './database';

/**
 * Data Access Object para transações financeiras
 * Implementa o padrão DAO com criptografia
 */
class TransactionDAO {
	/**
	 * Cria uma nova transação (receita ou despesa)
	 */
	async create(transaction) {
		try {
			const db = getDatabase();
			const { type, amount, description, category, date } = transaction;

			// Criptografar dados sensíveis
			const encryptedHash = await encryptData(
				`${type}-${amount}-${description}-${date}`
			);

			const result = await db.runAsync(
				`INSERT INTO transactions (type, amount, description, category, date, encrypted_hash)
         VALUES (?, ?, ?, ?, ?, ?)`,
				[type, amount, description, category, date, encryptedHash]
			);

			return {
				id: result.lastInsertRowId,
				...transaction,
				encrypted_hash: encryptedHash,
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
			return result;
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
			return result;
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
			return result;
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
			return result;
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
			const { type, amount, description, category, date } = transaction;

			// Atualizar hash criptográfico
			const encryptedHash = await encryptData(
				`${type}-${amount}-${description}-${date}`
			);

			await db.runAsync(
				`UPDATE transactions 
         SET type = ?, amount = ?, description = ?, category = ?, date = ?, encrypted_hash = ?
         WHERE id = ?`,
				[type, amount, description, category, date, encryptedHash, id]
			);

			return { id, ...transaction, encrypted_hash: encryptedHash };
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
	 */
	async getTotalsByPeriod(year, month) {
		try {
			const db = getDatabase();
			const monthStr = month.toString().padStart(2, '0');

			const result = await db.getAllAsync(
				`SELECT type, SUM(amount) as total 
         FROM transactions 
         WHERE strftime('%Y-%m', date) = ?
         GROUP BY type`,
				[`${year}-${monthStr}`]
			);

			const totals = {
				income: 0,
				expense: 0,
			};

			result.forEach((row) => {
				totals[row.type] = row.total || 0;
			});

			return totals;
		} catch (error) {
			console.error('Erro ao calcular totais:', error);
			throw error;
		}
	}
}

export default new TransactionDAO();

