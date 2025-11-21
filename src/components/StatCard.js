import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/dateUtils';
import theme from '../constants/theme';

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
							<MaterialCommunityIcons name={icon} size={28} color={color} />
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
		backgroundColor: theme.colors.background.card,
		...theme.shadows.small,
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: theme.spacing.xs,
	},
	leftSection: {
		flex: 1,
	},
	title: {
		fontSize: theme.fonts.sizes.xs,
		color: theme.colors.text.gray,
		marginBottom: theme.spacing.xs,
		fontWeight: theme.fonts.weights.medium,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	value: {
		fontSize: theme.fonts.sizes.xl,
		fontWeight: theme.fonts.weights.bold,
		letterSpacing: 0.3,
	},
	iconContainer: {
		width: 56,
		height: 56,
		borderRadius: theme.borderRadius.full,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: 28,
	},
});

export default StatCard;

