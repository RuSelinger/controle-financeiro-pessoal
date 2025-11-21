import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import transactionReducer from '../store/slices/transactionSlice';
import TransactionListScreen from './TransactionListScreen';

// Mock do transactionDAO
jest.mock('../services/transactionDAO', () => require('../../__mocks__/transactionDAO'));

// Mock da navegação
const mockNavigation = {
	navigate: jest.fn(),
	goBack: jest.fn(),
};

// Helper para criar store de teste
const createTestStore = (initialState = {}) => {
	return configureStore({
		reducer: {
			transactions: transactionReducer,
		},
		preloadedState: {
			transactions: {
				transactions: [],
				currentPeriod: { year: 2024, month: 3 },
				totals: { income: 0, expense: 0 },
				balance: 0,
				loading: false,
				error: null,
				...initialState,
			},
		},
	});
};

describe('TransactionListScreen', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Limpar dados mockados antes de cada teste
		const transactionDAO = require('../services/transactionDAO');
		transactionDAO.clear();
	});

	it('deve renderizar corretamente', async () => {
		const store = createTestStore();
		const { getByText } = render(
			<Provider store={store}>
				<TransactionListScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			expect(getByText('Todas')).toBeTruthy();
			expect(getByText('Receitas')).toBeTruthy();
			expect(getByText('Despesas')).toBeTruthy();
		});
	});

	it('deve exibir todas as transações por padrão', async () => {
		const mockTransactions = [
			{
				id: 1,
				type: 'income',
				amount: 1000,
				description: 'Salário',
				category: '1',
				date: '2024-03-15',
			},
			{
				id: 2,
				type: 'expense',
				amount: 50,
				description: 'Almoço',
				category: '1',
				date: '2024-03-16',
			},
		];

		const transactionDAO = require('../services/transactionDAO');
		transactionDAO.setMockData(mockTransactions);

		const store = createTestStore({
			transactions: mockTransactions,
		});

		const { getAllByText, getByText } = render(
			<Provider store={store}>
				<TransactionListScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			// Usar getAllByText para lidar com múltiplos elementos
			const salarioElements = getAllByText('Salário');
			expect(salarioElements.length).toBeGreaterThan(0);
			expect(getByText('Almoço')).toBeTruthy();
		});
	});

	it('deve filtrar apenas receitas', async () => {
		const mockTransactions = [
			{
				id: 1,
				type: 'income',
				amount: 1000,
				description: 'Salário',
				category: '1',
				date: '2024-03-15',
			},
			{
				id: 2,
				type: 'expense',
				amount: 50,
				description: 'Almoço',
				category: '1',
				date: '2024-03-16',
			},
		];

		const transactionDAO = require('../services/transactionDAO');
		transactionDAO.setMockData(mockTransactions);

		const store = createTestStore({
			transactions: mockTransactions,
		});

		const { getAllByText, getByText, queryByText } = render(
			<Provider store={store}>
				<TransactionListScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			const receitasButton = getByText('Receitas');
			fireEvent.press(receitasButton);
		});

		await waitFor(() => {
			const salarioElements = getAllByText('Salário');
			expect(salarioElements.length).toBeGreaterThan(0);
			expect(queryByText('Almoço')).toBeNull();
		});
	});

	it('deve filtrar apenas despesas', async () => {
		const mockTransactions = [
			{
				id: 1,
				type: 'income',
				amount: 1000,
				description: 'Salário',
				category: '1',
				date: '2024-03-15',
			},
			{
				id: 2,
				type: 'expense',
				amount: 50,
				description: 'Almoço',
				category: '1',
				date: '2024-03-16',
			},
		];

		const transactionDAO = require('../services/transactionDAO');
		transactionDAO.setMockData(mockTransactions);

		const store = createTestStore({
			transactions: mockTransactions,
		});

		const { getByText, queryByText } = render(
			<Provider store={store}>
				<TransactionListScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			const despesasButton = getByText('Despesas');
			fireEvent.press(despesasButton);
		});

		await waitFor(() => {
			expect(getByText('Almoço')).toBeTruthy();
			expect(queryByText('Salário')).toBeNull();
		});
	});

	it('deve exibir mensagem quando não há transações', async () => {
		const transactionDAO = require('../services/transactionDAO');
		transactionDAO.clear();

		const store = createTestStore({
			transactions: [],
		});

		const { getByText } = render(
			<Provider store={store}>
				<TransactionListScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			expect(getByText('Nenhuma transação encontrada')).toBeTruthy();
		});
	});

	it('deve navegar para TransactionForm ao pressionar uma transação', async () => {
		const mockTransactions = [
			{
				id: 1,
				type: 'income',
				amount: 1000,
				description: 'Salário',
				category: '1',
				date: '2024-03-15',
			},
		];

		const transactionDAO = require('../services/transactionDAO');
		transactionDAO.setMockData(mockTransactions);

		const store = createTestStore({
			transactions: mockTransactions,
		});

		const { getAllByText } = render(
			<Provider store={store}>
				<TransactionListScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			const transactionElements = getAllByText('Salário');
			// Pegar o primeiro elemento que é a descrição da transação
			const transaction = transactionElements[0];
			fireEvent.press(transaction.parent.parent);

			expect(mockNavigation.navigate).toHaveBeenCalledWith('TransactionForm', {
				transaction: mockTransactions[0],
				isEdit: true,
			});
		});
	});

	it('deve voltar para todas as transações ao pressionar Todas', async () => {
		const mockTransactions = [
			{
				id: 1,
				type: 'income',
				amount: 1000,
				description: 'Salário',
				category: '1',
				date: '2024-03-15',
			},
			{
				id: 2,
				type: 'expense',
				amount: 50,
				description: 'Almoço',
				category: '1',
				date: '2024-03-16',
			},
		];

		const transactionDAO = require('../services/transactionDAO');
		transactionDAO.setMockData(mockTransactions);

		const store = createTestStore({
			transactions: mockTransactions,
		});

		const { getAllByText, getByText } = render(
			<Provider store={store}>
				<TransactionListScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			// Filtrar por receitas
			const receitasButton = getByText('Receitas');
			fireEvent.press(receitasButton);
		});

		await waitFor(() => {
			// Voltar para todas
			const todasButton = getByText('Todas');
			fireEvent.press(todasButton);
		});

		await waitFor(() => {
			const salarioElements = getAllByText('Salário');
			expect(salarioElements.length).toBeGreaterThan(0);
			expect(getByText('Almoço')).toBeTruthy();
		});
	});
});

