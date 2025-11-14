import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../components/StatCard';
import TransactionCard from '../components/TransactionCard';
import { fetchTransactionsByPeriod } from '../store/slices/transactionSlice';

const DashboardScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { transactions, totals, balance, loading, currentPeriod } = useSelector(
		(state) => state.transactions
	);

	useEffect(() => {
		loadTransactions();
	}, [currentPeriod]);

	const loadTransactions = () => {
		dispatch(fetchTransactionsByPeriod(currentPeriod));
	};

	const handleTransactionPress = (transaction) => {
		navigation.navigate('TransactionForm', { transaction, isEdit: true });
	};

	const recentTransactions = transactions.slice(0, 5);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<ScrollView
				style={styles.scrollView}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={loadTransactions} />
				}
			>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Controle Financeiro</Text>
					<Text style={styles.headerSubtitle}>
						{new Date().toLocaleDateString('pt-BR', {
							month: 'long',
							year: 'numeric',
						})}
					</Text>
				</View>

				{/* Stats Cards */}
				<View style={styles.statsContainer}>
					<View style={styles.statCardWrapper}>
						<StatCard
							title="Saldo"
							value={balance}
							color={balance >= 0 ? '#2ECC71' : '#E74C3C'}
							icon={balance >= 0 ? '💰' : '⚠️'}
						/>
					</View>
					<View style={styles.statCardWrapper}>
						<StatCard
							title="Receitas"
							value={totals.income}
							color="#2ECC71"
							icon="📈"
						/>
					</View>
					<View style={[styles.statCardWrapper, styles.lastStatCard]}>
						<StatCard
							title="Despesas"
							value={totals.expense}
							color="#E74C3C"
							icon="📉"
						/>
					</View>
				</View>

				{/* Quick Actions */}
				<View style={styles.actionsContainer}>
					<TouchableOpacity
						style={[styles.actionButton, styles.incomeButton]}
						onPress={() =>
							navigation.navigate('TransactionForm', { type: 'income' })
						}
					>
						<Text style={styles.actionButtonIcon}>➕</Text>
						<Text style={styles.actionButtonText}>Nova Receita</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.actionButton, styles.expenseButton]}
						onPress={() =>
							navigation.navigate('TransactionForm', { type: 'expense' })
						}
					>
						<Text style={styles.actionButtonIcon}>➖</Text>
						<Text style={styles.actionButtonText}>Nova Despesa</Text>
					</TouchableOpacity>
				</View>

				{/* Recent Transactions */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Transações Recentes</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('TransactionList')}
						>
							<Text style={styles.seeAllText}>Ver todas</Text>
						</TouchableOpacity>
					</View>

					{recentTransactions.length === 0 ? (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>
								Nenhuma transação registrada ainda
							</Text>
							<Text style={styles.emptySubtext}>
								Adicione receitas e despesas para começar
							</Text>
						</View>
					) : (
						recentTransactions.map((transaction) => (
							<TransactionCard
								key={transaction.id}
								transaction={transaction}
								onPress={() => handleTransactionPress(transaction)}
							/>
						))
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	scrollView: {
		flex: 1,
	},
	header: {
		backgroundColor: '#3498DB',
		padding: 20,
		paddingTop: 60,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#FFF',
		marginBottom: 4,
	},
	headerSubtitle: {
		fontSize: 16,
		color: '#E8F4F8',
		textTransform: 'capitalize',
	},
	statsContainer: {
		flexDirection: 'column',
		paddingHorizontal: 16,
		marginTop: -20,
		marginBottom: 16,
	},
	statCardWrapper: {
		marginBottom: 12,
	},
	lastStatCard: {
		marginBottom: 0,
	},
	actionsContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		marginBottom: 16,
		gap: 12,
	},
	actionButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		borderRadius: 12,
		elevation: 2,
	},
	incomeButton: {
		backgroundColor: '#2ECC71',
	},
	expenseButton: {
		backgroundColor: '#E74C3C',
	},
	actionButtonIcon: {
		fontSize: 20,
		marginRight: 8,
	},
	actionButtonText: {
		color: '#FFF',
		fontSize: 14,
		fontWeight: '600',
	},
	section: {
		marginTop: 8,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
	},
	seeAllText: {
		fontSize: 14,
		color: '#3498DB',
		fontWeight: '600',
	},
	emptyContainer: {
		padding: 32,
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: '#666',
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 14,
		color: '#999',
	},
});

export default DashboardScreen;

