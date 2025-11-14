import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories';
import { formatCurrency, formatDate } from '../utils/dateUtils';

const TransactionCard = ({ transaction, onPress, onDelete }) => {
	const isIncome = transaction.type === 'income';
	const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
	const category = categories.find((cat) => cat.id === transaction.category);

	return (
		<Card style={styles.card} onPress={onPress}>
			<Card.Content>
				<View style={styles.row}>
					<View style={styles.leftSection}>
						<View style={styles.categoryIcon}>
							<Text style={styles.iconText}>{category?.icon || '📦'}</Text>
						</View>
						<View style={styles.info}>
							<Text style={styles.description} numberOfLines={1}>
								{transaction.description}
							</Text>
							<Text style={styles.categoryName}>{category?.name || 'Outros'}</Text>
							<Text style={styles.date}>{formatDate(transaction.date)}</Text>
						</View>
					</View>
					<View style={styles.rightSection}>
						<Text
							style={[
								styles.amount,
								isIncome ? styles.incomeAmount : styles.expenseAmount,
							]}
						>
							{isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
						</Text>
					</View>
				</View>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginVertical: 4,
		marginHorizontal: 16,
		elevation: 2,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	leftSection: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
	},
	categoryIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#F5F5F5',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	iconText: {
		fontSize: 24,
	},
	info: {
		flex: 1,
	},
	description: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 4,
	},
	categoryName: {
		fontSize: 12,
		color: '#666',
		marginBottom: 2,
	},
	date: {
		fontSize: 11,
		color: '#999',
	},
	rightSection: {
		alignItems: 'flex-end',
	},
	amount: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	incomeAmount: {
		color: '#2ECC71',
	},
	expenseAmount: {
		color: '#E74C3C',
	},
});

export default TransactionCard;

