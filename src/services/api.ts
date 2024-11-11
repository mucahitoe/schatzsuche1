import { Transaction, VatReport } from '../types';

const MOCK_DELAY = 1000;

// Simulated API calls - replace with actual API integration
export const fetchAmazonTransactions = async (startDate: string, endDate: string): Promise<Transaction[]> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return mockAmazonData;
};

export const fetchZalandoTransactions = async (startDate: string, endDate: string): Promise<Transaction[]> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return mockZalandoData;
};

export const generateVatReport = (transactions: Transaction[]): VatReport => {
  const vatByCountry = transactions.reduce((acc, transaction) => {
    acc[transaction.country] = (acc[transaction.country] || 0) + transaction.vatAmount;
    return acc;
  }, {} as Record<string, number>);

  return {
    startDate: transactions[0]?.date || '',
    endDate: transactions[transactions.length - 1]?.date || '',
    totalVat: transactions.reduce((sum, t) => sum + t.vatAmount, 0),
    transactions,
    vatByCountry,
  };
};

// Mock data - remove in production
const mockAmazonData: Transaction[] = [
  {
    id: 'a1',
    platform: 'amazon',
    date: '2024-03-01',
    amount: 100,
    vatRate: 0.19,
    vatAmount: 19,
    description: 'Electronics sale',
    country: 'DE',
  },
  // Add more mock data as needed
];

const mockZalandoData: Transaction[] = [
  {
    id: 'z1',
    platform: 'zalando',
    date: '2024-03-01',
    amount: 150,
    vatRate: 0.21,
    vatAmount: 31.50,
    description: 'Fashion items',
    country: 'NL',
  },
  // Add more mock data as needed
];