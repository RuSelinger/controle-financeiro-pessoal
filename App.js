import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import DashboardScreen from './src/screens/DashboardScreen';
import TransactionFormScreen from './src/screens/TransactionFormScreen';
import TransactionListScreen from './src/screens/TransactionListScreen';
import { initDatabase } from './src/services/database';
import { store } from './src/store/store';

const Stack = createStackNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		try {
			await initDatabase();
			setIsLoading(false);
		} catch (err) {
			console.error('Erro ao inicializar aplicativo:', err);
			setError(err.message);
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#3498DB" />
				<Text style={styles.loadingText}>Carregando...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Erro ao inicializar: {error}</Text>
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
							backgroundColor: '#3498DB',
						},
						headerTintColor: '#FFF',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
					}}
				>
					<Stack.Screen
						name="Dashboard"
						component={DashboardScreen}
						options={{ title: 'Dashboard' }}
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
		backgroundColor: '#F5F5F5',
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: '#666',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
		padding: 20,
	},
	errorText: {
		fontSize: 16,
		color: '#E74C3C',
		textAlign: 'center',
	},
});

