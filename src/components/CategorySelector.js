import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
					<Text style={styles.icon}>{category.icon}</Text>
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
		marginVertical: 12,
	},
	contentContainer: {
		paddingHorizontal: 16,
	},
	categoryItem: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginRight: 12,
		borderRadius: 12,
		backgroundColor: '#F5F5F5',
		minWidth: 80,
	},
	selectedCategory: {
		backgroundColor: '#3498DB',
	},
	icon: {
		fontSize: 24,
		marginBottom: 4,
	},
	categoryName: {
		fontSize: 12,
		color: '#666',
		textAlign: 'center',
	},
	selectedText: {
		color: '#FFF',
		fontWeight: '600',
	},
});

export default CategorySelector;

