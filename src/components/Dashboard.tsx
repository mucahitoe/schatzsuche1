import React from 'react';
import { useQuery } from 'react-query';
import { FileSpreadsheet, RefreshCw, LogOut } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';
import { VatSummary } from './VatSummary';
import { TransactionList } from './TransactionList';
import { useAuth } from '../context/AuthContext';
import { fetchAmazonTransactions, fetchZalandoTransactions, generateVatReport } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState('2024-03-01');
  const [endDate, setEndDate] = React.useState('2024-03-31');

  const { data: amazonData, isLoading: amazonLoading } = useQuery(
    ['amazon', startDate, endDate],
    () => fetchAmazonTransactions(startDate, endDate),
    { enabled: !!user }
  );

  const { data: zalandoData, isLoading: zalandoLoading } = useQuery(
    ['zalando', startDate, endDate],
    () => fetchZalandoTransactions(startDate, endDate),
    { enabled: !!user }
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLoading = amazonLoading || zalandoLoading;
  const transactions = [...(amazonData || []), ...(zalandoData || [])];
  const report = transactions.length > 0 ? generateVatReport(transactions) : null;

  return (
    <div className="min-h-screen">
      <header className="glass-effect shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileSpreadsheet className="h-8 w-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">VAT Report Generator</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/70">{user?.email}</span>
              {isLoading ? (
                <div className="flex items-center text-white/70">
                  <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                  Loading...
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white/70 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          {report && (
            <>
              <VatSummary report={report} />
              <TransactionList transactions={transactions} />
            </>
          )}

          {!isLoading && !report && (
            <div className="text-center py-12 glass-effect rounded-lg">
              <p className="text-white/70">No data available for the selected date range</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;