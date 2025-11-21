import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Animated,
} from 'react-native';
import theme from '../constants/theme';

const CustomConfirmModal = ({
	visible,
	title,
	message,
	confirmText = 'Confirmar',
	cancelText = 'Cancelar',
	onConfirm,
	onCancel,
	type = 'danger', // danger, warning, info
	icon = 'alert-circle-outline',
}) => {
	const fadeAnim = React.useRef(new Animated.Value(0)).current;
	const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

	React.useEffect(() => {
		if (visible) {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.spring(scaleAnim, {
					toValue: 1,
					tension: 100,
					friction: 10,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 150,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 0.9,
					duration: 150,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [visible]);

	const getTypeConfig = () => {
		switch (type) {
			case 'danger':
				return {
					color: theme.colors.functional.error,
					backgroundColor: theme.colors.functional.error + '15',
				};
			case 'warning':
				return {
					color: theme.colors.functional.warning,
					backgroundColor: theme.colors.functional.warning + '15',
				};
			case 'info':
				return {
					color: theme.colors.accent.primary,
					backgroundColor: theme.colors.accent.primary + '15',
				};
			default:
				return {
					color: theme.colors.functional.error,
					backgroundColor: theme.colors.functional.error + '15',
				};
		}
	};

	const config = getTypeConfig();

	return (
		<Modal
			transparent
			visible={visible}
			animationType="none"
			onRequestClose={onCancel}
		>
			<Animated.View
				style={[
					styles.overlay,
					{
						opacity: fadeAnim,
					},
				]}
			>
				<TouchableOpacity
					style={styles.overlayTouchable}
					activeOpacity={1}
					onPress={onCancel}
				/>
				<Animated.View
					style={[
						styles.modalContainer,
						{
							transform: [{ scale: scaleAnim }],
						},
					]}
				>
					{/* Icon */}
					<View style={[styles.iconContainer, { backgroundColor: config.backgroundColor }]}>
						<MaterialCommunityIcons
							name={icon}
							size={48}
							color={config.color}
						/>
					</View>

					{/* Title */}
					<Text style={styles.title}>{title}</Text>

					{/* Message */}
					<Text style={styles.message}>{message}</Text>

					{/* Buttons */}
					<View style={styles.buttonsContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onCancel}
							activeOpacity={0.8}
						>
							<Text style={styles.cancelButtonText}>{cancelText}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.confirmButton, { backgroundColor: config.color }]}
							onPress={onConfirm}
							activeOpacity={0.8}
						>
							<Text style={styles.confirmButtonText}>{confirmText}</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</Animated.View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing.lg,
	},
	overlayTouchable: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	modalContainer: {
		backgroundColor: theme.colors.background.card,
		borderRadius: theme.borderRadius.lg,
		padding: theme.spacing.xl,
		width: '100%',
		maxWidth: 400,
		alignItems: 'center',
		...theme.shadows.large,
	},
	iconContainer: {
		width: 80,
		height: 80,
		borderRadius: theme.borderRadius.full,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: theme.spacing.lg,
	},
	title: {
		fontSize: theme.fonts.sizes.xl,
		fontWeight: theme.fonts.weights.bold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.sm,
		textAlign: 'center',
		letterSpacing: 0.3,
	},
	message: {
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.text.gray,
		textAlign: 'center',
		marginBottom: theme.spacing.xl,
		lineHeight: 22,
		paddingHorizontal: theme.spacing.sm,
	},
	buttonsContainer: {
		flexDirection: 'row',
		width: '100%',
		gap: theme.spacing.sm,
	},
	button: {
		flex: 1,
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.lg,
		borderRadius: theme.borderRadius.md,
		alignItems: 'center',
		justifyContent: 'center',
		...theme.shadows.small,
	},
	cancelButton: {
		backgroundColor: theme.colors.background.secondary,
		borderWidth: 1,
		borderColor: theme.colors.border.light,
	},
	confirmButton: {
		backgroundColor: theme.colors.functional.error,
	},
	cancelButtonText: {
		fontSize: theme.fonts.sizes.md,
		fontWeight: theme.fonts.weights.semibold,
		color: theme.colors.text.primary,
		letterSpacing: 0.3,
	},
	confirmButtonText: {
		fontSize: theme.fonts.sizes.md,
		fontWeight: theme.fonts.weights.semibold,
		color: theme.colors.text.white,
		letterSpacing: 0.3,
	},
});

export default CustomConfirmModal;

