import React from 'react';
import { Euro } from 'lucide-react';
import { VatReport } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface VatSummaryProps {
  report: VatReport;
}

export const VatSummary: React.FC<VatSummaryProps> = ({ report }) => {
  const chartData = Object.entries(report.vatByCountry).map(([country, amount]) => ({
    country,
    amount,
  }));

  return (
    <div className="glass-effect rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">VAT Summary</h2>
        <div className="glass-effect px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <Euro className="text-white" size={20} />
            <span className="text-white font-semibold">
              Total VAT: €{report.totalVat.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="h-64 text-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="country" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Bar dataKey="amount" fill="rgba(255, 255, 255, 0.2)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};