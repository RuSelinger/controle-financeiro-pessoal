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
		backgroundColor: '#F5F5F5',
	},
	filterContainer: {
		flexDirection: 'row',
		padding: 16,
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	filterButton: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginHorizontal: 4,
		borderRadius: 8,
		backgroundColor: '#F5F5F5',
		alignItems: 'center',
	},
	activeFilter: {
		backgroundColor: '#3498DB',
	},
	filterText: {
		fontSize: 14,
		color: '#666',
		fontWeight: '500',
	},
	activeFilterText: {
		color: '#FFF',
		fontWeight: '600',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	},
	emptyText: {
		fontSize: 16,
		color: '#666',
	},
});

export default TransactionListScreen;

