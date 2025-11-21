import * as SQLite from 'expo-sqlite';

let db = null;

/**
 * Inicializa o banco de dados SQLite
 */
export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('financeiro.db');

    // Criar tabela de transações (receitas e despesas)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
        amount REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        encrypted_hash TEXT
      );
    `);

    // Criar índices para melhor performance
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
    `);

    console.log('Banco de dados inicializado com sucesso');
    return db;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  }
};

/**
 * Obtém instância do banco de dados
 */
export const getDatabase = () => {
  if (!db) {
    throw new Error('Banco de dados não inicializado. Chame initDatabase() primeiro.');
  }
  return db;
};

/**
 * Fecha a conexão com o banco de dados
 */
export const closeDatabase = async () => {
  if (db) {
    await db.closeAsync();
    db = null;
  }
};

