import { useState } from 'react';
import { TransactionType, DebitCategory, CreditCategory } from '../constants/categories';

export interface TransactionFormState {
  selectedType: TransactionType;
  selectedDebitCategory: DebitCategory;
  selectedCreditCategory: CreditCategory;
  amount: string;
  title: string;
}

const DEFAULT_STATE: TransactionFormState = {
  selectedType: 'DEBIT',
  selectedDebitCategory: 'General',
  selectedCreditCategory: 'Company',
  amount: '',
  title: '',
};

/**
 * Custom hook encapsulating Add Transaction screen form state and logic.
 * Mirrors the state management from referenceFrontend/scripts.js.
 */
export const useTransactionForm = () => {
  const [state, setState] = useState<TransactionFormState>(DEFAULT_STATE);

  const setType = (type: TransactionType) => {
    setState((prev) => ({ ...prev, selectedType: type }));
  };

  const setDebitCategory = (category: DebitCategory) => {
    setState((prev) => ({ ...prev, selectedDebitCategory: category }));
  };

  const setCreditCategory = (category: CreditCategory) => {
    setState((prev) => ({ ...prev, selectedCreditCategory: category }));
  };

  const setAmount = (amount: string) => {
    setState((prev) => ({ ...prev, amount }));
  };

  const setTitle = (title: string) => {
    setState((prev) => ({ ...prev, title }));
  };

  const reset = () => {
    setState(DEFAULT_STATE);
  };

  const getActiveCategory = () => {
    return state.selectedType === 'CREDIT'
      ? state.selectedCreditCategory
      : state.selectedDebitCategory;
  };

  return {
    state,
    setType,
    setDebitCategory,
    setCreditCategory,
    setAmount,
    setTitle,
    reset,
    getActiveCategory,
  };
};
