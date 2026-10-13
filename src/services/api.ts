/**
 * API service stubs.
 * Mirrors the structure of referenceFrontend/scripts.js API calls.
 * Replace TODO comments with real API implementation when backend is ready.
 */

import { Transaction } from '../utils/transactions';

export interface UserData {
  name: string;
  username: string;
  balance: number;
}

export interface SignUpPayload {
  name: string;
  username: string;
  email: string;
  phone_no: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CreateTransactionPayload {
  title: string;
  type: 'DEBIT' | 'CREDIT';
  category: string;
  amount: number;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * Sign up a new user.
 * TODO: API call implementation
 */
export const signUp = async (payload: SignUpPayload): Promise<void> => {
  // TODO: API call implementation
  console.log('[API] signUp called with:', payload);
};

/**
 * Log in an existing user.
 * TODO: API call implementation
 */
export const login = async (payload: LoginPayload): Promise<void> => {
  // TODO: API call implementation
  console.log('[API] login called with:', payload);
};

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

/**
 * Retrieve the current user's data (profile + balance).
 * TODO: API call implementation
 * Returns mock data for UI development.
 */
export const getUserData = async (): Promise<UserData> => {
  // TODO: API call implementation
  console.log('[API] getUserData called');

  // Mock response for UI development
  return {
    name: 'Arya Sharma',
    username: 'honey.money',
    balance: 52430,
  };
};

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

/**
 * Create a new transaction.
 * TODO: API call implementation
 */
export const createTransaction = async (
  payload: CreateTransactionPayload,
): Promise<void> => {
  // TODO: API call implementation
  console.log('[API] createTransaction called with:', payload);
};

/**
 * Fetch all transactions for the current user.
 * TODO: API call implementation
 * Returns mock data for UI development.
 */
export const getTransactions = async (): Promise<Transaction[]> => {
  // TODO: API call implementation
  console.log('[API] getTransactions called');

  // Mock response for UI development
  return [
    {
      id: 1,
      title: 'Grocery Store',
      type: 'DEBIT',
      category: 'Food',
      amount: 870,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Monthly Salary',
      type: 'CREDIT',
      category: 'Company',
      amount: 40000,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Coffee',
      type: 'DEBIT',
      category: 'Food',
      amount: 200,
      created_at: new Date().toISOString(),
    },
  ];
};
