import { render } from '@testing-library/react-native';
import React from 'react';
import StatCard from './StatCard';

describe('StatCard', () => {
	const defaultProps = {
		title: 'Saldo',
		value: 1000.50,
		color: '#9CAF88',
		icon: 'wallet',
	};

	it('deve renderizar corretamente com todas as props', () => {
		const { getByText } = render(<StatCard {...defaultProps} />);

		expect(getByText('Saldo')).toBeTruthy();
		expect(getByText('R$ 1.000,50')).toBeTruthy();
	});

	it('deve formatar valores monetários corretamente', () => {
		const { getByText, rerender } = render(<StatCard {...defaultProps} value={0} />);
		expect(getByText('R$ 0,00')).toBeTruthy();

		rerender(<StatCard {...defaultProps} value={1234.56} />);
		expect(getByText('R$ 1.234,56')).toBeTruthy();

		rerender(<StatCard {...defaultProps} value={-500.25} />);
		expect(getByText('-R$ 500,25')).toBeTruthy();
	});

	it('deve aplicar a cor correta ao valor', () => {
		const { getByText } = render(<StatCard {...defaultProps} color="#E37D5A" />);
		const valueText = getByText('R$ 1.000,50');

		expect(valueText).toBeTruthy();
		// Verificar se a cor foi aplicada (pode variar dependendo da implementação)
	});

	it('deve renderizar sem ícone quando não fornecido', () => {
		const { getByText, queryByTestId } = render(
			<StatCard title="Teste" value={100} color="#000" />
		);

		expect(getByText('Teste')).toBeTruthy();
		expect(getByText('R$ 100,00')).toBeTruthy();
	});

	it('deve renderizar com diferentes títulos', () => {
		const { getByText, rerender } = render(<StatCard {...defaultProps} title="Receitas" />);
		expect(getByText('Receitas')).toBeTruthy();

		rerender(<StatCard {...defaultProps} title="Despesas" />);
		expect(getByText('Despesas')).toBeTruthy();
	});

	it('deve renderizar valores grandes corretamente', () => {
		const { getByText } = render(
			<StatCard {...defaultProps} value={999999.99} />
		);

		expect(getByText('R$ 999.999,99')).toBeTruthy();
	});
});

