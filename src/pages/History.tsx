import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSavings } from '../contexts/SavingsContext';
import { ArrowLeft, Trash2, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const { records, deleteRecord } = useSavings();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      deleteRecord(id);
      toast({
        title: "Record Deleted",
        description: "The savings record has been removed.",
      });
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <header className="bg-emerald-600 text-white px-4 py-6 safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Savings History</h1>
            <p className="text-emerald-100 text-sm">{records.length} records</p>
          </div>
        </div>
      </header>
      
      <main className="px-4 py-6">
        {records.length === 0 ? (
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Records Yet</h3>
              <p className="text-gray-600 text-center mb-4">
                Start tracking your savings by adding your first record.
              </p>
              <Button onClick={() => navigate('/add-record')}>
                Add First Record
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {records.map((record, index) => {
              const previousRecord = records[index + 1];
              const growth = previousRecord 
                ? ((record.total - previousRecord.total) / previousRecord.total * 100)
                : 0;

              return (
                <Card key={record.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                          <Calendar className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{formatDate(record.date)}</CardTitle>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">EGP {formatCurrency(record.total)}</span>
                            {growth !== 0 && (
                              <span className={`flex items-center gap-1 ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <p className="text-xs text-yellow-700 font-medium mb-1">Gold</p>
                        <p className="text-sm font-semibold text-yellow-800">
                          EGP {formatCurrency(record.totalGold)}
                        </p>
                        <p className="text-xs text-yellow-600">
                          {record.goldInCoins} coins
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-xs text-green-700 font-medium mb-1">USD</p>
                        <p className="text-sm font-semibold text-green-800">
                          EGP {formatCurrency(record.dollarsInEGP)}
                        </p>
                        <p className="text-xs text-green-600">
                          ${record.dollarsInUSD}
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-700 font-medium mb-1">Investments</p>
                        <p className="text-sm font-semibold text-blue-800">
                          EGP {formatCurrency(record.investments)}
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <p className="text-xs text-purple-700 font-medium mb-1">Certificates</p>
                        <p className="text-sm font-semibold text-purple-800">
                          EGP {formatCurrency(record.bankCertificates)}
                        </p>
                      </div>
                    </div>
                    
                    {record.cashSavings > 0 && (
                      <div className="mt-3">
                        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                          <p className="text-xs text-red-700 font-medium mb-1">Cash Savings</p>
                          <p className="text-sm font-semibold text-red-800">
                            EGP {formatCurrency(record.cashSavings)}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;