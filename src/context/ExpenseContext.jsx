import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage';

const ExpenseContext = createContext(null);

export const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Education', 'Health', 'Salary', 'Other'];

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState(loadTransactions);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    setTransactions((current) => [{ ...transaction, id: crypto.randomUUID() }, ...current]);
  }, []);

  const editTransaction = useCallback((id, changes) => {
    setTransactions((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((current) => current.filter((item) => item.id !== id));
  }, []);

  const calculateIncome = useCallback(
    (items = transactions) => items.filter((item) => item.type === 'income').reduce((sum, item) => sum + Number(item.amount), 0),
    [transactions],
  );

  const calculateExpenses = useCallback(
    (items = transactions) => items.filter((item) => item.type === 'expense').reduce((sum, item) => sum + Number(item.amount), 0),
    [transactions],
  );

  const calculateBalance = useCallback(
    (items = transactions) => calculateIncome(items) - calculateExpenses(items),
    [calculateIncome, calculateExpenses, transactions],
  );

  const filterTransactions = useCallback((filters) => {
    const { search = '', category = 'all', type = 'all', dateRange = 'all' } = filters;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return transactions.filter((item) => {
      const searchMatches = `${item.title} ${item.description ?? ''}`.toLowerCase().includes(search.trim().toLowerCase());
      const categoryMatches = category === 'all' || item.category === category;
      const typeMatches = type === 'all' || item.type === type;
      const date = new Date(`${item.date}T00:00:00`);
      const dateMatches = dateRange === 'all' || (dateRange === 'month' && date >= startOfMonth) || (dateRange === 'week' && date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
      return searchMatches && categoryMatches && typeMatches && dateMatches;
    });
  }, [transactions]);

  const value = useMemo(() => ({
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    filterTransactions,
    calculateIncome,
    calculateExpenses,
    calculateBalance,
  }), [transactions, addTransaction, editTransaction, deleteTransaction, filterTransactions, calculateIncome, calculateExpenses, calculateBalance]);

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used inside ExpenseProvider');
  return context;
}
