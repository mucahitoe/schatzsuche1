import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { Transaction } from '../types';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="glass-effect rounded-lg overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                VAT Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Country
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-white">
                    {transaction.platform === 'amazon' ? (
                      <ShoppingCart className="h-5 w-5 text-orange-300 mr-2" />
                    ) : (
                      <Package className="h-5 w-5 text-purple-300 mr-2" />
                    )}
                    <span className="capitalize">{transaction.platform}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {format(new Date(transaction.date), 'dd MMM yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  €{transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  €{transaction.vatAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {transaction.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};