/**
 * Tema "Calma e Orgânica" - Paleta de Cores
 * Foco em Bem-Estar e Finanças
 */

export const colors = {
	// Fundo Principal
	background: {
		primary: '#F0EAD6', // Bege Champanhe
		secondary: '#FFFDD0', // Creme
		card: '#FFFFFF',
		header: '#9CAF88', // Verde Sálvia
	},

	// Texto e Elementos
	text: {
		primary: '#A52A2A', // Marrom Suave
		secondary: '#E37D5A', // Terracota
		light: '#8B6F47', // Marrom mais claro
		white: '#FFFFFF',
		gray: '#6B6B6B',
	},

	// Cores de Destaque
	accent: {
		primary: '#9CAF88', // Verde Sálvia
		secondary: '#808000', // Verde Oliva
		terracota: '#E37D5A',
	},

	// Cores Funcionais
	functional: {
		income: '#9CAF88', // Verde Sálvia para receitas
		expense: '#E37D5A', // Terracota para despesas
		balance: '#808000', // Verde Oliva para saldo positivo
		balanceNegative: '#C97D60', // Terracota escuro para saldo negativo
		success: '#9CAF88',
		warning: '#E37D5A',
		error: '#C97D60',
	},

	// Bordas e Divisores
	border: {
		light: '#E8E0D0',
		medium: '#D4C5A9',
		dark: '#A52A2A',
	},
};

/**
 * Fontes Modernas
 * Usando fontes do sistema que são modernas e legíveis
 */
export const fonts = {
	// Fontes principais (fallback para fontes do sistema)
	regular: 'System', // iOS: SF Pro, Android: Roboto
	bold: 'System',
	light: 'System',
	medium: 'System',

	// Tamanhos de fonte
	sizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
		xxl: 24,
		xxxl: 28,
		display: 32,
	},

	// Pesos
	weights: {
		light: '300',
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
};

/**
 * Espaçamentos
 */
export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
};

/**
 * Bordas e Sombras
 */
export const borderRadius = {
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	full: 9999,
};

export const shadows = {
	small: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	medium: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 4,
	},
	large: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 8,
	},
};

/**
 * Estilos de Botões Modernos
 */
export const buttonStyles = {
	primary: {
		backgroundColor: colors.accent.primary,
		borderRadius: borderRadius.md,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		...shadows.medium,
	},
	secondary: {
		backgroundColor: colors.accent.terracota,
		borderRadius: borderRadius.md,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		...shadows.medium,
	},
	outline: {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: colors.accent.primary,
		borderRadius: borderRadius.md,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
	},
	ghost: {
		backgroundColor: 'transparent',
		borderRadius: borderRadius.md,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
	},
};

export default {
	colors,
	fonts,
	spacing,
	borderRadius,
	shadows,
	buttonStyles,
};

