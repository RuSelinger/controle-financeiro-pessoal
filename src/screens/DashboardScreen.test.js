import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import transactionReducer from '../store/slices/transactionSlice';
import DashboardScreen from './DashboardScreen';

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

describe('DashboardScreen', () => {
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
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			expect(getByText('Controle Financeiro')).toBeTruthy();
		});
	});

	it('deve exibir saldo, receitas e despesas', async () => {
		const store = createTestStore({
			totals: { income: 2000, expense: 500 },
			balance: 1500,
		});

		const { getByText } = render(
			<Provider store={store}>
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			expect(getByText('Saldo')).toBeTruthy();
			expect(getByText('Receitas')).toBeTruthy();
			expect(getByText('Despesas')).toBeTruthy();
		});
	});

	it('deve exibir transações recentes', async () => {
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
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			const salarioElements = getAllByText('Salário');
			expect(salarioElements.length).toBeGreaterThan(0);
			expect(getByText('Almoço')).toBeTruthy();
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
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			expect(getByText('Nenhuma transação registrada ainda')).toBeTruthy();
			expect(getByText('Adicione receitas e despesas para começar')).toBeTruthy();
		});
	});

	it('deve navegar para TransactionForm ao pressionar Nova Receita', () => {
		const store = createTestStore();
		const { getByText } = render(
			<Provider store={store}>
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		const button = getByText('Nova Receita');
		fireEvent.press(button);

		expect(mockNavigation.navigate).toHaveBeenCalledWith('TransactionForm', {
			type: 'income',
		});
	});

	it('deve navegar para TransactionForm ao pressionar Nova Despesa', () => {
		const store = createTestStore();
		const { getByText } = render(
			<Provider store={store}>
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		const button = getByText('Nova Despesa');
		fireEvent.press(button);

		expect(mockNavigation.navigate).toHaveBeenCalledWith('TransactionForm', {
			type: 'expense',
		});
	});

	it('deve navegar para TransactionList ao pressionar Ver todas', () => {
		const store = createTestStore();
		const { getByText } = render(
			<Provider store={store}>
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		const link = getByText('Ver todas');
		fireEvent.press(link);

		expect(mockNavigation.navigate).toHaveBeenCalledWith('TransactionList');
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
				<DashboardScreen navigation={mockNavigation} />
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

	it('deve exibir saldo negativo corretamente', async () => {
		const store = createTestStore({
			totals: { income: 500, expense: 1000 },
			balance: -500,
		});

		const { getByText } = render(
			<Provider store={store}>
				<DashboardScreen navigation={mockNavigation} />
			</Provider>
		);

		await waitFor(() => {
			expect(getByText('-R$ 500,00')).toBeTruthy();
		});
	});
});

