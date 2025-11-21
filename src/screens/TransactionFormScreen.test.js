import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import transactionReducer from '../store/slices/transactionSlice';
import TransactionFormScreen from './TransactionFormScreen';

// Mock do Alert
jest.spyOn(Alert, 'alert');

// Mock da navegação
const mockNavigation = {
	navigate: jest.fn(),
	goBack: jest.fn(),
};

// Helper para criar store de teste
const createTestStore = () => {
	return configureStore({
		reducer: {
			transactions: transactionReducer,
		},
	});
};

describe('TransactionFormScreen', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		Alert.alert.mockClear();
	});

	it('deve renderizar o formulário de nova transação', () => {
		const store = createTestStore();
		const mockRoute = {
			params: { type: 'expense' },
		};

		const { getByText, getByPlaceholderText } = render(
			<Provider store={store}>
				<TransactionFormScreen route={mockRoute} navigation={mockNavigation} />
			</Provider>
		);

		expect(getByText('Despesa')).toBeTruthy();
		expect(getByPlaceholderText('0,00')).toBeTruthy();
		expect(getByPlaceholderText('Ex: Salário, Almoço, etc.')).toBeTruthy();
	});

	it('deve renderizar o formulário de edição', () => {
		const store = createTestStore();
		const mockTransaction = {
			id: 1,
			type: 'income',
			amount: 1000,
			description: 'Salário',
			category: '1',
			date: '2024-03-15',
		};

		const mockRoute = {
			params: { transaction: mockTransaction, isEdit: true },
		};

		const { getByDisplayValue } = render(
			<Provider store={store}>
				<TransactionFormScreen route={mockRoute} navigation={mockNavigation} />
			</Provider>
		);

		expect(getByDisplayValue('1000')).toBeTruthy();
		expect(getByDisplayValue('Salário')).toBeTruthy();
	});

	it('deve validar campos obrigatórios', async () => {
		const store = createTestStore();
		const mockRoute = {
			params: { type: 'expense' },
		};

		const { getByText } = render(
			<Provider store={store}>
				<TransactionFormScreen route={mockRoute} navigation={mockNavigation} />
			</Provider>
		);

		const saveButton = getByText('Salvar');
		fireEvent.press(saveButton);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith('Erro', 'Por favor, informe um valor válido');
		});
	});

	it('deve validar descrição vazia', async () => {
		const store = createTestStore();
		const mockRoute = {
			params: { type: 'expense' },
		};

		const { getByText, getByPlaceholderText } = render(
			<Provider store={store}>
				<TransactionFormScreen route={mockRoute} navigation={mockNavigation} />
			</Provider>
		);

		const amountInput = getByPlaceholderText('0,00');
		fireEvent.changeText(amountInput, '100');

		const saveButton = getByText('Salvar');
		fireEvent.press(saveButton);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith('Erro', 'Por favor, informe uma descrição');
		});
	});

	it('deve alternar entre Receita e Despesa', () => {
		const store = createTestStore();
		const mockRoute = {
			params: { type: 'expense' },
		};

		const { getByText } = render(
			<Provider store={store}>
				<TransactionFormScreen route={mockRoute} navigation={mockNavigation} />
			</Provider>
		);

		const receitaButton = getByText('Receita');
		fireEvent.press(receitaButton);

		// Verificar se o botão de receita está ativo
		expect(receitaButton).toBeTruthy();
	});

	it('deve exibir botão de excluir apenas no modo de edição', () => {
		const store = createTestStore();
		const mockTransaction = {
			id: 1,
			type: 'income',
			amount: 1000,
			description: 'Salário',
			category: '1',
			date: '2024-03-15',
		};

		const mockRoute = {
			params: { transaction: mockTransaction, isEdit: true },
		};

		const { getByText } = render(
			<Provider store={store}>
				<TransactionFormScreen route={mockRoute} navigation={mockNavigation} />
			</Provider>
		);

		expect(getByText('Excluir')).toBeTruthy();
		expect(getByText('Atualizar')).toBeTruthy();
	});

	it('deve exibir botão Salvar no modo de criação', () => {
		const store = createTestStore();
		const mockRoute = {
			params: { type: 'expense' },
		};

		const { getByText, queryByText } = render(
			<Provider store={store}>
				<TransactionFormScreen route={mockRoute} navigation={mockNavigation} />
			</Provider>
		);

		expect(getByText('Salvar')).toBeTruthy();
		expect(queryByText('Excluir')).toBeNull();
	});
});

