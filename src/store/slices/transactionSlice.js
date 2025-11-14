import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import transactionDAO from '../../services/transactionDAO';
import { getCurrentYearMonth } from '../../utils/dateUtils';

// Thunks assíncronos
export const fetchTransactions = createAsyncThunk(
	'transactions/fetchAll',
	async () => {
		const transactions = await transactionDAO.findAll();
		return transactions;
	}
);

export const fetchTransactionsByPeriod = createAsyncThunk(
	'transactions/fetchByPeriod',
	async ({ year, month }) => {
		const transactions = await transactionDAO.findByPeriod(year, month);
		const totals = await transactionDAO.getTotalsByPeriod(year, month);
		return { transactions, totals };
	}
);

export const addTransaction = createAsyncThunk(
	'transactions/add',
	async (transaction) => {
		const newTransaction = await transactionDAO.create(transaction);
		return newTransaction;
	}
);

export const updateTransaction = createAsyncThunk(
	'transactions/update',
	async ({ id, transaction }) => {
		const updated = await transactionDAO.update(id, transaction);
		return updated;
	}
);

export const deleteTransaction = createAsyncThunk(
	'transactions/delete',
	async (id) => {
		await transactionDAO.delete(id);
		return id;
	}
);

const initialState = {
	transactions: [],
	currentPeriod: getCurrentYearMonth(),
	totals: {
		income: 0,
		expense: 0,
	},
	balance: 0,
	loading: false,
	error: null,
};

const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setCurrentPeriod: (state, action) => {
			state.currentPeriod = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// Fetch all
		builder
			.addCase(fetchTransactions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.loading = false;
				state.transactions = action.payload;
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		// Fetch by period
		builder
			.addCase(fetchTransactionsByPeriod.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTransactionsByPeriod.fulfilled, (state, action) => {
				state.loading = false;
				state.transactions = action.payload.transactions;
				state.totals = action.payload.totals;
				state.balance = action.payload.totals.income - action.payload.totals.expense;
			})
			.addCase(fetchTransactionsByPeriod.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		// Add transaction
		builder
			.addCase(addTransaction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addTransaction.fulfilled, (state, action) => {
				state.loading = false;
				state.transactions.unshift(action.payload);
				// Recalcular totais
				if (action.payload.type === 'income') {
					state.totals.income += action.payload.amount;
				} else {
					state.totals.expense += action.payload.amount;
				}
				state.balance = state.totals.income - state.totals.expense;
			})
			.addCase(addTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		// Update transaction
		builder
			.addCase(updateTransaction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTransaction.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.transactions.findIndex(
					(t) => t.id === action.payload.id
				);
				if (index !== -1) {
					const oldTransaction = state.transactions[index];
					// Ajustar totais
					if (oldTransaction.type === 'income') {
						state.totals.income -= oldTransaction.amount;
					} else {
						state.totals.expense -= oldTransaction.amount;
					}
					state.transactions[index] = action.payload;
					// Atualizar totais com novo valor
					if (action.payload.type === 'income') {
						state.totals.income += action.payload.amount;
					} else {
						state.totals.expense += action.payload.amount;
					}
					state.balance = state.totals.income - state.totals.expense;
				}
			})
			.addCase(updateTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		// Delete transaction
		builder
			.addCase(deleteTransaction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteTransaction.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.transactions.findIndex((t) => t.id === action.payload);
				if (index !== -1) {
					const transaction = state.transactions[index];
					// Ajustar totais
					if (transaction.type === 'income') {
						state.totals.income -= transaction.amount;
					} else {
						state.totals.expense -= transaction.amount;
					}
					state.transactions.splice(index, 1);
					state.balance = state.totals.income - state.totals.expense;
				}
			})
			.addCase(deleteTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setCurrentPeriod, clearError } = transactionSlice.actions;
export default transactionSlice.reducer;

