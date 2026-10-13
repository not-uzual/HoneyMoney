import { Colors } from '../constants/colors';
import { TransactionType } from '../constants/categories';
import { Coins, Plane, ReceiptText, ShoppingBag } from 'lucide-react-native';

export interface TransactionVisual {
  icon: string;
  iconBg: string;
}

/**
 * Returns the emoji icon and background color for a transaction.
 * Mirrors reference utils.js getTransactionVisual function.
 */
export const getTransactionVisual = (
  type: TransactionType,
  category: string
): TransactionVisual => {
  if (type === 'CREDIT') {
    return { icon: '', iconBg: Colors.lime };
  }
  if (category === 'Shopping') {
    return { icon: '', iconBg: Colors.red };
  }
  if (category === 'Travel') {
    return { icon: '', iconBg: Colors.red };
  }
  // Default / General / Food / Work
  return { icon: '', iconBg: Colors.red };
};

export interface Transaction {
  id?: string | number;
  title: string;
  type: TransactionType;
  category: string;
  amount: number;
  created_at: string;
}

export interface FormattedTransaction extends Transaction {
  icon: string;
  iconBg: string;
  timeLabel: string;
}

/**
 * Enriches raw transaction data with display metadata.
 * Mirrors reference utils.js formatTransactionData function.
 */
export const formatTransactionData = (
  transactions: Transaction[],
): FormattedTransaction[] => {
  return transactions.map((transaction) => {
    const visual = getTransactionVisual(transaction.type, transaction.category);
    return {
      ...transaction,
      ...visual,
      timeLabel: new Date(transaction.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  });
};

/**
 * Computes today's total spending from transaction list.
 */
export const computeTodaySpent = (transactions: Transaction[]): number => {
  const today = new Date().toISOString().split('T')[0];
  return transactions
    .filter((t) => t.type === 'DEBIT' && t.created_at.startsWith(today))
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Computes monthly credit total.
 */
export const computeMonthlyCredit = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === 'CREDIT')
    .reduce((sum, t) => sum + t.amount, 0);

/**
 * Computes monthly debit total.
 */
export const computeMonthlyDebit = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === 'DEBIT')
    .reduce((sum, t) => sum + t.amount, 0);
