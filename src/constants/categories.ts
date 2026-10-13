// Category lists matching the reference HTML exactly

export const DEBIT_CATEGORIES = [
  'General',
  'Food',
  'Shopping',
  'Travel',
  'Friend',
  'Family',
  'Stocks',
] as const;

export const CREDIT_CATEGORIES = [
  'Company',
  'Client',
  'Friend',
  'Family',
  'Stocks',
  'Savings',
  'Business'
] as const;

export const DEBIT_CATEGORY_LABELS: Record<string, string> = {
  General: 'General',
  Food: 'Food & Drinks',
  Shopping: 'Shopping',
  Travel: 'Travel',
  Friend: 'Friend',
  Family: 'Family',
  Stock: 'Stocks'
};

export const CREDIT_CATEGORY_LABELS: Record<string, string> = {
  Company: 'Company',
  Client: 'Client',
  Friend: 'Friend',
  Family: 'Family',
  Stock: 'Stocks',
  Savings: 'Savings',
  Business: 'Business'
};

export type TransactionType = 'DEBIT' | 'CREDIT';
export type DebitCategory = (typeof DEBIT_CATEGORIES)[number];
export type CreditCategory = (typeof CREDIT_CATEGORIES)[number];
