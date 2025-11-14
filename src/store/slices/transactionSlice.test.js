import transactionReducer, {
  setCurrentPeriod,
  clearError,
  addTransaction,
  deleteTransaction,
} from './transactionSlice';

describe('transactionSlice', () => {
  const initialState = {
    transactions: [],
    currentPeriod: { year: 2024, month: 3 },
    totals: { income: 0, expense: 0 },
    balance: 0,
    loading: false,
    error: null,
  };

  it('deve retornar o estado inicial', () => {
    expect(transactionReducer(undefined, { type: 'unknown' })).toEqual(
      expect.objectContaining({
        transactions: [],
        totals: { income: 0, expense: 0 },
        balance: 0,
        loading: false,
        error: null,
      })
    );
  });

  it('deve atualizar o período atual', () => {
    const newPeriod = { year: 2024, month: 4 };
    const action = setCurrentPeriod(newPeriod);
    const state = transactionReducer(initialState, action);
    
    expect(state.currentPeriod).toEqual(newPeriod);
  });

  it('deve limpar o erro', () => {
    const stateWithError = { ...initialState, error: 'Erro de teste' };
    const action = clearError();
    const state = transactionReducer(stateWithError, action);
    
    expect(state.error).toBeNull();
  });

  it('deve adicionar uma receita e atualizar totais', () => {
    const transaction = {
      id: 1,
      type: 'income',
      amount: 1000,
      description: 'Salário',
      category: '1',
      date: '2024-03-15',
    };

    const action = addTransaction.fulfilled(transaction);
    const state = transactionReducer(initialState, action);

    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0]).toEqual(transaction);
    expect(state.totals.income).toBe(1000);
    expect(state.totals.expense).toBe(0);
    expect(state.balance).toBe(1000);
  });

  it('deve adicionar uma despesa e atualizar totais', () => {
    const transaction = {
      id: 1,
      type: 'expense',
      amount: 500,
      description: 'Almoço',
      category: '1',
      date: '2024-03-15',
    };

    const action = addTransaction.fulfilled(transaction);
    const state = transactionReducer(initialState, action);

    expect(state.transactions).toHaveLength(1);
    expect(state.totals.income).toBe(0);
    expect(state.totals.expense).toBe(500);
    expect(state.balance).toBe(-500);
  });

  it('deve remover uma transação e atualizar totais', () => {
    const stateWithTransaction = {
      ...initialState,
      transactions: [
        {
          id: 1,
          type: 'income',
          amount: 1000,
          description: 'Salário',
          category: '1',
          date: '2024-03-15',
        },
      ],
      totals: { income: 1000, expense: 0 },
      balance: 1000,
    };

    const action = deleteTransaction.fulfilled(1);
    const state = transactionReducer(stateWithTransaction, action);

    expect(state.transactions).toHaveLength(0);
    expect(state.totals.income).toBe(0);
    expect(state.balance).toBe(0);
  });
});

