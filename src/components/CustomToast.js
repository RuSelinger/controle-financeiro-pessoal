import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

const CustomToast = ({ visible, message, type = 'success', onHide, duration = 3000 }) => {
	const translateY = React.useRef(new Animated.Value(-100)).current;
	const opacity = React.useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (visible) {
			// Animar entrada
			Animated.parallel([
				Animated.spring(translateY, {
					toValue: 0,
					tension: 65,
					friction: 10,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();

			// Auto-hide após duração
			const timer = setTimeout(() => {
				hideToast();
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [visible]);

	const hideToast = () => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: -100,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start(() => {
			if (onHide) onHide();
		});
	};

	if (!visible) return null;

	const getConfig = () => {
		switch (type) {
			case 'success':
				return {
					icon: 'check-circle',
					backgroundColor: theme.colors.functional.success,
					borderColor: theme.colors.accent.secondary,
				};
			case 'error':
				return {
					icon: 'alert-circle',
					backgroundColor: theme.colors.functional.error,
					borderColor: theme.colors.functional.warning,
				};
			case 'warning':
				return {
					icon: 'alert',
					backgroundColor: theme.colors.functional.warning,
					borderColor: theme.colors.accent.terracota,
				};
			default:
				return {
					icon: 'information',
					backgroundColor: theme.colors.accent.primary,
					borderColor: theme.colors.accent.secondary,
				};
		}
	};

	const config = getConfig();

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ translateY }],
					opacity,
					backgroundColor: config.backgroundColor,
					borderLeftColor: config.borderColor,
				},
			]}
		>
			<View style={styles.iconContainer}>
				<MaterialCommunityIcons
					name={config.icon}
					size={28}
					color={theme.colors.text.white}
				/>
			</View>
			<Text style={styles.message}>{message}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 50,
		left: theme.spacing.md,
		right: theme.spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.lg,
		borderRadius: theme.borderRadius.md,
		borderLeftWidth: 4,
		zIndex: 9999,
		...theme.shadows.large,
	},
	iconContainer: {
		marginRight: theme.spacing.md,
	},
	message: {
		flex: 1,
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.text.white,
		fontWeight: theme.fonts.weights.semibold,
		letterSpacing: 0.3,
	},
});

export default CustomToast;

