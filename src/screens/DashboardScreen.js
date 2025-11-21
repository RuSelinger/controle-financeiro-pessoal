import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import theme from '../constants/theme';
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
							color={balance >= 0 ? theme.colors.functional.balance : theme.colors.functional.balanceNegative}
							icon={balance >= 0 ? 'wallet' : 'alert-circle'}
						/>
					</View>
					<View style={styles.statCardWrapper}>
						<StatCard
							title="Receitas"
							value={totals.income}
							color={theme.colors.functional.income}
							icon="arrow-up-circle"
						/>
					</View>
					<View style={[styles.statCardWrapper, styles.lastStatCard]}>
						<StatCard
							title="Despesas"
							value={totals.expense}
							color={theme.colors.functional.expense}
							icon="arrow-down-circle"
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
						<MaterialCommunityIcons name="plus-circle" size={25} color={theme.colors.text.white} />
						<Text style={styles.actionButtonText}>Nova Receita</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.actionButton, styles.expenseButton]}
						onPress={() =>
							navigation.navigate('TransactionForm', { type: 'expense' })
						}
					>
						<MaterialCommunityIcons name="minus-circle" size={25} color={theme.colors.text.white} />
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
		backgroundColor: theme.colors.background.primary,
	},
	scrollView: {
		flex: 1,
	},
	header: {
		backgroundColor: theme.colors.background.header,
		padding: theme.spacing.lg,
		paddingTop: 60,
		borderBottomLeftRadius: theme.borderRadius.xl,
		borderBottomRightRadius: theme.borderRadius.xl,
		...theme.shadows.medium,
	},
	headerTitle: {
		fontSize: theme.fonts.sizes.xxxl,
		fontWeight: theme.fonts.weights.bold,
		color: theme.colors.text.white,
		marginBottom: theme.spacing.xs,
		letterSpacing: 0.5,
	},
	headerSubtitle: {
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.text.white,
		textTransform: 'capitalize',
		opacity: 0.9,
	},
	statsContainer: {
		flexDirection: 'column',
		paddingHorizontal: theme.spacing.md,
		marginTop: -20,
		marginBottom: theme.spacing.md,
	},
	statCardWrapper: {
		marginBottom: theme.spacing.sm,
	},
	lastStatCard: {
		marginBottom: 0,
	},
	actionsContainer: {
		flexDirection: 'row',
		paddingHorizontal: theme.spacing.md,
		marginBottom: theme.spacing.md,
		gap: theme.spacing.sm,
	},
	actionButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		...theme.shadows.medium,
	},
	incomeButton: {
		backgroundColor: theme.colors.functional.income,
	},
	expenseButton: {
		backgroundColor: theme.colors.functional.expense,
	},
	actionButtonText: {
		color: theme.colors.text.white,
		fontSize: theme.fonts.sizes.sm,
		fontWeight: theme.fonts.weights.semibold,
		letterSpacing: 0.3,
		marginLeft: theme.spacing.sm,
	},
	section: {
		marginTop: theme.spacing.sm,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: theme.spacing.md,
		marginBottom: theme.spacing.sm,
	},
	sectionTitle: {
		fontSize: theme.fonts.sizes.lg,
		fontWeight: theme.fonts.weights.bold,
		color: theme.colors.text.primary,
		letterSpacing: 0.3,
	},
	seeAllText: {
		fontSize: theme.fonts.sizes.sm,
		color: theme.colors.accent.primary,
		fontWeight: theme.fonts.weights.semibold,
	},
	emptyContainer: {
		padding: theme.spacing.xl,
		alignItems: 'center',
	},
	emptyText: {
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.text.gray,
		marginBottom: theme.spacing.sm,
	},
	emptySubtext: {
		fontSize: theme.fonts.sizes.sm,
		color: theme.colors.text.gray,
		opacity: 0.7,
	},
});

export default DashboardScreen;

