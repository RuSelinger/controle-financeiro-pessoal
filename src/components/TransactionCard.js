import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories';
import theme from '../constants/theme';
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
						<View style={[styles.categoryIcon, { backgroundColor: (category?.color || theme.colors.accent.primary) + '20' }]}>
							<MaterialCommunityIcons
								name={category?.icon || 'dots-horizontal-circle'}
								size={26}
								color={category?.color || theme.colors.accent.primary}
							/>
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
		marginVertical: theme.spacing.xs,
		marginHorizontal: theme.spacing.md,
		backgroundColor: theme.colors.background.card,
		...theme.shadows.small,
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
		width: 52,
		height: 52,
		borderRadius: theme.borderRadius.full,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: theme.spacing.sm,
		borderWidth: 1,
		borderColor: theme.colors.border.light,
	},
	info: {
		flex: 1,
	},
	description: {
		fontSize: theme.fonts.sizes.md,
		fontWeight: theme.fonts.weights.semibold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.xs,
		letterSpacing: 0.2,
	},
	categoryName: {
		fontSize: theme.fonts.sizes.xs,
		color: theme.colors.text.gray,
		marginBottom: 2,
		fontWeight: theme.fonts.weights.regular,
	},
	date: {
		fontSize: theme.fonts.sizes.xs - 1,
		color: theme.colors.text.gray,
		opacity: 0.7,
	},
	rightSection: {
		alignItems: 'flex-end',
	},
	amount: {
		fontSize: theme.fonts.sizes.lg,
		fontWeight: theme.fonts.weights.bold,
		letterSpacing: 0.3,
	},
	incomeAmount: {
		color: theme.colors.functional.income,
	},
	expenseAmount: {
		color: theme.colors.functional.expense,
	},
});

export default TransactionCard;

