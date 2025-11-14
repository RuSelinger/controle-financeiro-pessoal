import { formatDate, formatCurrency, getCurrentYearMonth } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('deve formatar data corretamente', () => {
      const date = '2024-03-15';
      const formatted = formatDate(date);
      expect(formatted).toBe('15/03/2024');
    });

    it('deve retornar string vazia para data inválida', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('deve formatar valor monetário corretamente', () => {
      // Usar toMatch para lidar com possíveis diferenças de espaçamento
      expect(formatCurrency(100.5)).toMatch(/R\$\s*100,50/);
      expect(formatCurrency(1000)).toMatch(/R\$\s*1\.000,00/);
      expect(formatCurrency(0)).toMatch(/R\$\s*0,00/);
    });

    it('deve retornar R$ 0,00 para valores nulos', () => {
      expect(formatCurrency(null)).toMatch(/R\$\s*0,00/);
      expect(formatCurrency(undefined)).toMatch(/R\$\s*0,00/);
    });
  });

  describe('getCurrentYearMonth', () => {
    it('deve retornar ano e mês atual', () => {
      const now = new Date();
      const result = getCurrentYearMonth();
      
      expect(result.year).toBe(now.getFullYear());
      expect(result.month).toBe(now.getMonth() + 1);
    });
  });
});

