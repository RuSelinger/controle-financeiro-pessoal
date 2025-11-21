// Mock para transactionDAO nos testes
const mockTransactions = [];

const transactionDAO = {
	async findAll() {
		return [...mockTransactions];
	},

	async findByPeriod(year, month) {
		return mockTransactions.filter(tx => {
			const txDate = new Date(tx.date);
			return txDate.getFullYear() === year && txDate.getMonth() + 1 === month;
		});
	},

	async getTotalsByPeriod(year, month) {
		const periodTransactions = await this.findByPeriod(year, month);
		const totals = { income: 0, expense: 0 };
		periodTransactions.forEach(tx => {
			if (tx.type === 'income') {
				totals.income += tx.amount;
			} else {
				totals.expense += tx.amount;
			}
		});
		return totals;
	},

	async create(transaction) {
		const newTx = {
			id: mockTransactions.length + 1,
			...transaction,
		};
		mockTransactions.push(newTx);
		return newTx;
	},

	async update(id, transaction) {
		const index = mockTransactions.findIndex(tx => tx.id === id);
		if (index !== -1) {
			mockTransactions[index] = { id, ...transaction };
			return mockTransactions[index];
		}
		return null;
	},

	async delete(id) {
		const index = mockTransactions.findIndex(tx => tx.id === id);
		if (index !== -1) {
			mockTransactions.splice(index, 1);
		}
	},

	async findById(id) {
		return mockTransactions.find(tx => tx.id === id) || null;
	},

	// Método para limpar os dados de teste
	clear() {
		mockTransactions.length = 0;
	},

	// Método para adicionar dados de teste
	setMockData(data) {
		mockTransactions.length = 0;
		mockTransactions.push(...data);
	},
};

module.exports = transactionDAO;

