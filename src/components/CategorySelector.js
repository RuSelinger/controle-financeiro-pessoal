import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{categories.map((category) => (
				<TouchableOpacity
					key={category.id}
					style={[
						styles.categoryItem,
						selectedCategory === category.id && styles.selectedCategory,
					]}
					onPress={() => onSelect(category.id)}
				>
					<View style={styles.iconContainer}>
						<MaterialCommunityIcons
							name={category.icon}
							size={24}
							color={selectedCategory === category.id ? theme.colors.text.white : category.color}
						/>
					</View>
					<Text
						style={[
							styles.categoryName,
							selectedCategory === category.id && styles.selectedText,
						]}
					>
						{category.name}
					</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,
	},
	contentContainer: {
		paddingHorizontal: theme.spacing.md,
	},
	categoryItem: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		marginRight: theme.spacing.sm,
		borderRadius: theme.borderRadius.md,
		backgroundColor: theme.colors.background.secondary,
		minWidth: 80,
		borderWidth: 1,
		borderColor: theme.colors.border.light,
		...theme.shadows.small,
	},
	selectedCategory: {
		backgroundColor: theme.colors.accent.primary,
		borderColor: theme.colors.accent.primary,
		...theme.shadows.medium,
	},
	iconContainer: {
		marginBottom: theme.spacing.xs,
	},
	categoryName: {
		fontSize: theme.fonts.sizes.xs,
		color: theme.colors.text.gray,
		textAlign: 'center',
		fontWeight: theme.fonts.weights.medium,
	},
	selectedText: {
		color: theme.colors.text.white,
		fontWeight: theme.fonts.weights.semibold,
	},
});

export default CategorySelector;

