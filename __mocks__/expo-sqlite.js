// Mock para expo-sqlite nos testes
const mockDb = {
  execAsync: jest.fn(() => Promise.resolve()),
  runAsync: jest.fn(() => Promise.resolve({ lastInsertRowId: 1, changes: 1 })),
  getAllAsync: jest.fn(() => Promise.resolve([])),
  getFirstAsync: jest.fn(() => Promise.resolve(null)),
  closeAsync: jest.fn(() => Promise.resolve()),
};

const openDatabaseAsync = jest.fn(() => Promise.resolve(mockDb));

module.exports = {
  __esModule: true,
  default: {
    openDatabaseAsync,
  },
  openDatabaseAsync,
};

