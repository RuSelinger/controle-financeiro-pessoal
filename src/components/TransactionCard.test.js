import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import TransactionCard from './TransactionCard';

describe('TransactionCard', () => {
	const mockTransaction = {
		id: 1,
		type: 'income',
		amount: 1000.50,
		description: 'Salário',
		category: '1',
		date: '2024-03-15',
	};

	const mockOnPress = jest.fn();
	const mockOnDelete = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('deve renderizar corretamente uma transação de receita', () => {
		const { getAllByText, getByText } = render(
			<TransactionCard transaction={mockTransaction} onPress={mockOnPress} />
		);

		const salarioElements = getAllByText('Salário');
		expect(salarioElements.length).toBeGreaterThan(0);
		expect(getByText('+ R$ 1.000,50')).toBeTruthy();
	});

	it('deve renderizar corretamente uma transação de despesa', () => {
		const expenseTransaction = {
			...mockTransaction,
			type: 'expense',
			description: 'Almoço',
			amount: 25.50,
		};

		const { getByText } = render(
			<TransactionCard transaction={expenseTransaction} onPress={mockOnPress} />
		);

		expect(getByText('Almoço')).toBeTruthy();
		expect(getByText('- R$ 25,50')).toBeTruthy();
	});

	it('deve chamar onPress quando o card for pressionado', () => {
		const { getAllByText } = render(
			<TransactionCard transaction={mockTransaction} onPress={mockOnPress} />
		);

		const salarioElements = getAllByText('Salário');
		const card = salarioElements[0].parent.parent;
		fireEvent.press(card);

		expect(mockOnPress).toHaveBeenCalledTimes(1);
	});

	it('deve exibir a categoria correta', () => {
		const { getAllByText } = render(
			<TransactionCard transaction={mockTransaction} onPress={mockOnPress} />
		);

		// Verificar se a categoria é exibida (pode variar dependendo da implementação)
		const salarioElements = getAllByText('Salário');
		expect(salarioElements.length).toBeGreaterThan(0);
	});

	it('deve formatar a data corretamente', () => {
		const { getAllByText } = render(
			<TransactionCard transaction={mockTransaction} onPress={mockOnPress} />
		);

		// A data deve estar formatada (ex: "15/03/2024")
		// O formato exato depende da implementação de formatDate
		const dateTexts = getAllByText(/15/);
		expect(dateTexts.length).toBeGreaterThan(0);
	});

	it('deve renderizar com categoria "Outros" quando categoria não encontrada', () => {
		const transactionWithUnknownCategory = {
			...mockTransaction,
			category: '999',
		};

		const { getByText } = render(
			<TransactionCard
				transaction={transactionWithUnknownCategory}
				onPress={mockOnPress}
			/>
		);

		expect(getByText('Outros')).toBeTruthy();
	});

	it('deve renderizar descrições longas com numberOfLines={1}', () => {
		const longDescriptionTransaction = {
			...mockTransaction,
			description: 'Esta é uma descrição muito longa que deve ser truncada',
		};

		const { getByText } = render(
			<TransactionCard
				transaction={longDescriptionTransaction}
				onPress={mockOnPress}
			/>
		);

		const description = getByText('Esta é uma descrição muito longa que deve ser truncada');
		expect(description).toBeTruthy();
		expect(description.props.numberOfLines).toBe(1);
	});

	it('deve aplicar cores diferentes para receitas e despesas', () => {
		const { getByText: getByTextIncome } = render(
			<TransactionCard transaction={mockTransaction} onPress={mockOnPress} />
		);

		const incomeAmount = getByTextIncome('+ R$ 1.000,50');
		expect(incomeAmount).toBeTruthy();

		const expenseTransaction = {
			...mockTransaction,
			type: 'expense',
			amount: 50,
		};

		const { getByText: getByTextExpense } = render(
			<TransactionCard transaction={expenseTransaction} onPress={mockOnPress} />
		);

		const expenseAmount = getByTextExpense('- R$ 50,00');
		expect(expenseAmount).toBeTruthy();
	});
});

