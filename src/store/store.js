import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice';

export const store = configureStore({
	reducer: {
		transactions: transactionReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignorar verificação de serialização para datas
				ignoredActions: ['transactions/addTransaction', 'transactions/updateTransaction'],
			},
		}),
});

