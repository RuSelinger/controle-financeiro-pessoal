import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';

/**
 * Formata data para exibição
 */
export const formatDate = (date) => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'dd/MM/yyyy');
  } catch (error) {
    return date;
  }
};

/**
 * Formata data e hora para exibição
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'dd/MM/yyyy HH:mm');
  } catch (error) {
    return date;
  }
};

/**
 * Obtém o primeiro dia do mês atual
 */
export const getStartOfMonth = (date = new Date()) => {
  return format(startOfMonth(date), 'yyyy-MM-dd');
};

/**
 * Obtém o último dia do mês atual
 */
export const getEndOfMonth = (date = new Date()) => {
  return format(endOfMonth(date), 'yyyy-MM-dd');
};

/**
 * Obtém ano e mês atual
 */
export const getCurrentYearMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

/**
 * Formata valor monetário
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

