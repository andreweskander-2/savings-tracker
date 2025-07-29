import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useSavings } from '../contexts/SavingsContext';
import { TrendingUp, Coins, DollarSign, Banknote, PiggyBank } from 'lucide-react';

const Dashboard = () => {
  const { records } = useSavings();

  const chartData = records
    .slice()
    .reverse()
    .map(record => ({
      date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: record.total,
      gold: record.totalGold,
      dollars: record.dollarsInEGP,
      investments: record.investments,
      certificates: record.bankCertificates,
      cash: record.cashSavings
    }));

  const latestRecord = records[0];
  const previousRecord = records[1];
  const growth = latestRecord && previousRecord 
    ? ((latestRecord.total - previousRecord.total) / previousRecord.total * 100).toFixed(1)
    : '0';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-6 safe-area-top">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <PiggyBank className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Savings Tracker</h1>
            <p className="text-emerald-100 text-sm">Track your wealth growth</p>
          </div>
        </div>
        
        {/* Total Savings Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Total Savings</p>
              <p className="text-2xl font-bold">
                {latestRecord ? formatCurrency(latestRecord.total) : 'EGP 0'}
              </p>
              {growth !== '0' && (
                <p className="text-emerald-200 text-sm flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +{growth}% from last record
                </p>
              )}
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-200" />
          </div>
        </div>
      </header>
      
      <main className="px-4 py-6 space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="h-4 w-4 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-700">Gold</span>
              </div>
              <p className="text-lg font-bold text-yellow-800">
                {latestRecord ? formatCurrencyShort(latestRecord.totalGold) : '0'}
              </p>
              <p className="text-xs text-yellow-600">
                {latestRecord ? `${latestRecord.goldInCoins} coins` : '0 coins'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">USD</span>
              </div>
              <p className="text-lg font-bold text-green-800">
                {latestRecord ? formatCurrencyShort(latestRecord.dollarsInEGP) : '0'}
              </p>
              <p className="text-xs text-green-600">
                {latestRecord ? `$${latestRecord.dollarsInUSD}` : '$0'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Investments</span>
              </div>
              <p className="text-lg font-bold text-blue-800">
                {latestRecord ? formatCurrencyShort(latestRecord.investments) : '0'}
              </p>
              <p className="text-xs text-blue-600">Stocks & Bonds</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">Certificates</span>
              </div>
              <p className="text-lg font-bold text-purple-800">
                {latestRecord ? formatCurrencyShort(latestRecord.bankCertificates) : '0'}
              </p>
              <p className="text-xs text-purple-600">Bank CDs</p>
            </CardContent>
          </Card>
        </div>

        {/* Growth Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Savings Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatCurrencyShort(value)}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), '']}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Asset Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => formatCurrencyShort(value)}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), '']}
                    contentStyle={{ fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="gold" stroke="#f59e0b" strokeWidth={2} name="Gold" />
                  <Line type="monotone" dataKey="dollars" stroke="#10b981" strokeWidth={2} name="USD" />
                  <Line type="monotone" dataKey="investments" stroke="#3b82f6" strokeWidth={2} name="Investments" />
                  <Line type="monotone" dataKey="certificates" stroke="#8b5cf6" strokeWidth={2} name="Certificates" />
                  <Line type="monotone" dataKey="cash" stroke="#ef4444" strokeWidth={2} name="Cash" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;