import React, { useEffect, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TransactionCard from '../components/TransactionCard';
import { fetchTransactionsByPeriod } from '../store/slices/transactionSlice';
import theme from '../constants/theme';

const TransactionListScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { transactions, loading, currentPeriod } = useSelector(
		(state) => state.transactions
	);
	const [filter, setFilter] = useState('all'); // all, income, expense

	useEffect(() => {
		loadTransactions();
	}, [currentPeriod]);

	const loadTransactions = () => {
		dispatch(fetchTransactionsByPeriod(currentPeriod));
	};

	const filteredTransactions =
		filter === 'all'
			? transactions
			: transactions.filter((t) => t.type === filter);

	const handleTransactionPress = (transaction) => {
		navigation.navigate('TransactionForm', { transaction, isEdit: true });
	};

	return (
		<View style={styles.container}>
			{/* Filter Buttons */}
			<View style={styles.filterContainer}>
				<TouchableOpacity
					style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
					onPress={() => setFilter('all')}
				>
					<Text
						style={[
							styles.filterText,
							filter === 'all' && styles.activeFilterText,
						]}
					>
						Todas
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.filterButton,
						filter === 'income' && styles.activeFilter,
					]}
					onPress={() => setFilter('income')}
				>
					<Text
						style={[
							styles.filterText,
							filter === 'income' && styles.activeFilterText,
						]}
					>
						Receitas
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.filterButton,
						filter === 'expense' && styles.activeFilter,
					]}
					onPress={() => setFilter('expense')}
				>
					<Text
						style={[
							styles.filterText,
							filter === 'expense' && styles.activeFilterText,
						]}
					>
						Despesas
					</Text>
				</TouchableOpacity>
			</View>

			{/* Transactions List */}
			<FlatList
				data={filteredTransactions}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TransactionCard
						transaction={item}
						onPress={() => handleTransactionPress(item)}
					/>
				)}
				contentContainerStyle={
					filteredTransactions.length === 0 && styles.emptyContainer
				}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							Nenhuma transação encontrada
						</Text>
					</View>
				}
				refreshing={loading}
				onRefresh={loadTransactions}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background.primary,
	},
	filterContainer: {
		flexDirection: 'row',
		padding: theme.spacing.md,
		backgroundColor: theme.colors.background.card,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border.light,
		...theme.shadows.small,
	},
	filterButton: {
		flex: 1,
		paddingVertical: theme.spacing.sm,
		paddingHorizontal: theme.spacing.md,
		marginHorizontal: theme.spacing.xs,
		borderRadius: theme.borderRadius.sm,
		backgroundColor: theme.colors.background.secondary,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: theme.colors.border.light,
	},
	activeFilter: {
		backgroundColor: theme.colors.accent.primary,
		borderColor: theme.colors.accent.primary,
		...theme.shadows.small,
	},
	filterText: {
		fontSize: theme.fonts.sizes.sm,
		color: theme.colors.text.gray,
		fontWeight: theme.fonts.weights.medium,
		letterSpacing: 0.2,
	},
	activeFilterText: {
		color: theme.colors.text.white,
		fontWeight: theme.fonts.weights.semibold,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing.xl,
	},
	emptyText: {
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.text.gray,
	},
});

export default TransactionListScreen;

