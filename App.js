import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-redux';
import theme from './src/constants/theme';
import DashboardScreen from './src/screens/DashboardScreen';
import TransactionFormScreen from './src/screens/TransactionFormScreen';
import TransactionListScreen from './src/screens/TransactionListScreen';
import { initDatabase } from './src/services/database';
import { store } from './src/store/store';

const Stack = createStackNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [retryCount, setRetryCount] = useState(0);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		try {
			setError(null);
			await initDatabase();
			setIsLoading(false);
		} catch (err) {
			console.error('Erro ao inicializar aplicativo:', err);
			const errorMessage = err.message || 'Erro desconhecido ao inicializar o banco de dados';
			setError(errorMessage);
			setIsLoading(false);
		}
	};

	const handleRetry = () => {
		setRetryCount(retryCount + 1);
		setIsLoading(true);
		initializeApp();
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={theme.colors.accent.primary} />
				<Text style={styles.loadingText}>Carregando...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorIcon}>⚠️</Text>
				<Text style={styles.errorTitle}>Erro ao Inicializar</Text>
				<Text style={styles.errorText}>{error}</Text>
				<TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
					<Text style={styles.retryButtonText}>Tentar Novamente</Text>
				</TouchableOpacity>
				{retryCount > 0 && (
					<Text style={styles.retryText}>Tentativas: {retryCount}</Text>
				)}
			</View>
		);
	}

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Dashboard"
					screenOptions={{
						headerStyle: {
							backgroundColor: theme.colors.background.header,
							elevation: 0,
							shadowOpacity: 0,
							borderBottomWidth: 0,
						},
						headerTintColor: theme.colors.text.white,
						headerTitleStyle: {
							fontWeight: theme.fonts.weights.bold,
							fontSize: theme.fonts.sizes.lg,
							letterSpacing: 0.3,
						},
					}}
				>
					<Stack.Screen
						name="Dashboard"
						component={DashboardScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="TransactionList"
						component={TransactionListScreen}
						options={{ title: 'Todas as Transações' }}
					/>
					<Stack.Screen
						name="TransactionForm"
						component={TransactionFormScreen}
						options={({ route }) => ({
							title: route.params?.isEdit
								? 'Editar Transação'
								: route.params?.type === 'income'
									? 'Nova Receita'
									: 'Nova Despesa',
						})}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.background.primary,
	},
	loadingText: {
		marginTop: theme.spacing.sm,
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.text.gray,
		fontWeight: theme.fonts.weights.medium,
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.background.primary,
		padding: theme.spacing.xl,
	},
	errorIcon: {
		fontSize: 64,
		marginBottom: theme.spacing.md,
	},
	errorTitle: {
		fontSize: theme.fonts.sizes.xl,
		fontWeight: theme.fonts.weights.bold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.sm,
		textAlign: 'center',
	},
	errorText: {
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.functional.error,
		textAlign: 'center',
		fontWeight: theme.fonts.weights.medium,
		marginBottom: theme.spacing.lg,
		paddingHorizontal: theme.spacing.md,
	},
	retryButton: {
		backgroundColor: theme.colors.accent.primary,
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.xl,
		borderRadius: theme.borderRadius.md,
		marginTop: theme.spacing.md,
		...theme.shadows.medium,
	},
	retryButtonText: {
		color: theme.colors.text.white,
		fontSize: theme.fonts.sizes.md,
		fontWeight: theme.fonts.weights.semibold,
		letterSpacing: 0.5,
	},
	retryText: {
		fontSize: theme.fonts.sizes.sm,
		color: theme.colors.text.gray,
		marginTop: theme.spacing.sm,
	},
});

