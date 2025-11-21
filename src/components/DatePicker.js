import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useState } from 'react';
import {
	Modal,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import theme from '../constants/theme';
import { formatDate } from '../utils/dateUtils';

const DatePicker = ({ value, onChange, placeholder = 'Selecione uma data' }) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleDateSelect = (day) => {
		if (day && day.dateString) {
			onChange(day.dateString);
			setIsVisible(false);
		}
	};

	const getMarkedDates = () => {
		if (!value) return {};

		return {
			[value]: {
				selected: true,
				selectedColor: theme.colors.accent.primary,
				selectedTextColor: theme.colors.text.white,
			},
		};
	};

	const getMinDate = () => {
		// Permite selecionar datas de até 10 anos atrás
		const minDate = new Date();
		minDate.setFullYear(minDate.getFullYear() - 10);
		return format(minDate, 'yyyy-MM-dd');
	};

	const getMaxDate = () => {
		// Permite selecionar datas de até 1 ano no futuro
		const maxDate = new Date();
		maxDate.setFullYear(maxDate.getFullYear() + 1);
		return format(maxDate, 'yyyy-MM-dd');
	};

	const calendarTheme = {
		// Cores principais
		backgroundColor: theme.colors.background.card,
		calendarBackground: theme.colors.background.card,

		// Cores do texto
		textSectionTitleColor: theme.colors.text.primary,
		textSectionTitleDisabledColor: theme.colors.text.gray,
		selectedDayBackgroundColor: theme.colors.accent.primary,
		selectedDayTextColor: theme.colors.text.white,
		todayTextColor: theme.colors.accent.secondary,

		// Cores dos dias
		dayTextColor: theme.colors.text.primary,
		textDisabledColor: theme.colors.text.gray,
		dotColor: theme.colors.accent.primary,
		selectedDotColor: theme.colors.text.white,
		arrowColor: theme.colors.accent.primary,
		disabledArrowColor: theme.colors.text.gray,

		// Cores do mês
		monthTextColor: theme.colors.text.primary,
		indicatorColor: theme.colors.accent.primary,

		// Estilos de texto
		textDayFontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
		textMonthFontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
		textDayHeaderFontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
		textDayFontWeight: '400',
		textMonthFontWeight: '600',
		textDayHeaderFontWeight: '500',
		textDayFontSize: theme.fonts.sizes.md,
		textMonthFontSize: theme.fonts.sizes.lg,
		textDayHeaderFontSize: theme.fonts.sizes.sm,
	};

	return (
		<View>
			<TouchableOpacity
				style={styles.input}
				onPress={() => setIsVisible(true)}
				activeOpacity={0.7}
			>
				<View style={styles.inputContent}>
					<MaterialCommunityIcons
						name="calendar"
						size={20}
						color={value ? theme.colors.text.primary : theme.colors.text.gray}
						style={styles.icon}
					/>
					<Text
						style={[
							styles.inputText,
							!value && styles.placeholderText,
						]}
					>
						{value ? formatDate(value) : placeholder}
					</Text>
				</View>
				<MaterialCommunityIcons
					name="chevron-down"
					size={20}
					color={theme.colors.text.gray}
				/>
			</TouchableOpacity>

			<Modal
				visible={isVisible}
				transparent
				animationType="slide"
				onRequestClose={() => setIsVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						{/* Header do Modal */}
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Selecione a Data</Text>
							<TouchableOpacity
								onPress={() => setIsVisible(false)}
								style={styles.closeButton}
							>
								<MaterialCommunityIcons
									name="close"
									size={24}
									color={theme.colors.text.primary}
								/>
							</TouchableOpacity>
						</View>

						{/* Calendário */}
						<Calendar
							current={value || new Date().toISOString().split('T')[0]}
							minDate={getMinDate()}
							maxDate={getMaxDate()}
							onDayPress={handleDateSelect}
							markedDates={getMarkedDates()}
							theme={calendarTheme}
							enableSwipeMonths
							firstDay={1} // Segunda-feira como primeiro dia
							hideExtraDays
							showWeekNumbers={false}
							style={styles.calendar}
						/>

						{/* Botão de hoje */}
						<View style={styles.modalFooter}>
							<TouchableOpacity
								style={styles.todayButton}
								onPress={() => {
									const today = new Date().toISOString().split('T')[0];
									onChange(today);
									setIsVisible(false);
								}}
							>
								<MaterialCommunityIcons
									name="calendar-today"
									size={18}
									color={theme.colors.text.white}
								/>
								<Text style={styles.todayButtonText}>Hoje</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: theme.colors.background.card,
		borderRadius: theme.borderRadius.sm,
		padding: theme.spacing.md,
		fontSize: theme.fonts.sizes.md,
		borderWidth: 1,
		borderColor: theme.colors.border.light,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		...theme.shadows.small,
	},
	inputContent: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	icon: {
		marginRight: theme.spacing.sm,
	},
	inputText: {
		fontSize: theme.fonts.sizes.md,
		color: theme.colors.text.primary,
		flex: 1,
	},
	placeholderText: {
		color: theme.colors.text.gray,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: theme.colors.background.card,
		borderTopLeftRadius: theme.borderRadius.lg,
		borderTopRightRadius: theme.borderRadius.lg,
		paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.md,
		maxHeight: '90%',
		...theme.shadows.large,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: theme.spacing.md,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border.light,
	},
	modalTitle: {
		fontSize: theme.fonts.sizes.lg,
		fontWeight: theme.fonts.weights.semibold,
		color: theme.colors.text.primary,
	},
	closeButton: {
		padding: theme.spacing.xs,
	},
	calendar: {
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
	},
	modalFooter: {
		padding: theme.spacing.md,
		borderTopWidth: 1,
		borderTopColor: theme.colors.border.light,
	},
	todayButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.accent.primary,
		paddingVertical: theme.spacing.sm,
		paddingHorizontal: theme.spacing.md,
		borderRadius: theme.borderRadius.sm,
		...theme.shadows.small,
	},
	todayButtonText: {
		color: theme.colors.text.white,
		fontSize: theme.fonts.sizes.md,
		fontWeight: theme.fonts.weights.semibold,
		marginLeft: theme.spacing.xs,
	},
});

export default DatePicker;

