import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { formatCurrency } from '../utils/dateUtils';

const StatCard = ({ title, value, color, icon }) => {
	return (
		<Card style={[styles.card, { borderLeftColor: color }]}>
			<Card.Content>
				<View style={styles.content}>
					<View style={styles.leftSection}>
						<Text style={styles.title}>{title}</Text>
						<Text style={[styles.value, { color }]}>{formatCurrency(value)}</Text>
					</View>
					{icon && (
						<View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
							<Text style={styles.icon}>{icon}</Text>
						</View>
					)}
				</View>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		marginVertical: 0,
		borderLeftWidth: 4,
		elevation: 2,
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	leftSection: {
		flex: 1,
	},
	title: {
		fontSize: 12,
		color: '#666',
		marginBottom: 4,
	},
	value: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: 24,
	},
});

export default StatCard;

