import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useSavings } from '../contexts/SavingsContext';
import { ArrowLeft, Save, Coins, DollarSign, Banknote, PiggyBank } from 'lucide-react';

const AddRecord = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addRecord, getLatestRates } = useSavings();
  const { goldRate, dollarRate } = getLatestRates();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    goldInCoins: '',
    goldConversionValue: goldRate.toString(),
    investments: '',
    bankCertificates: '',
    dollarsInUSD: '',
    dollarConversionValue: dollarRate.toString(),
    cashSavings: ''
  });

  const calculateTotalGold = () => {
    const coins = parseFloat(formData.goldInCoins) || 0;
    const rate = parseFloat(formData.goldConversionValue) || 0;
    return coins * rate;
  };

  const calculateDollarsInEGP = () => {
    const dollars = parseFloat(formData.dollarsInUSD) || 0;
    const rate = parseFloat(formData.dollarConversionValue) || 0;
    return dollars * rate;
  };

  const calculateTotal = () => {
    const totalGold = calculateTotalGold();
    const dollarsInEGP = calculateDollarsInEGP();
    const investments = parseFloat(formData.investments) || 0;
    const certificates = parseFloat(formData.bankCertificates) || 0;
    const cash = parseFloat(formData.cashSavings) || 0;
    
    return totalGold + dollarsInEGP + investments + certificates + cash;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalGold = calculateTotalGold();
    const dollarsInEGP = calculateDollarsInEGP();
    const total = calculateTotal();

    const record = {
      date: formData.date,
      goldInCoins: parseFloat(formData.goldInCoins) || 0,
      goldConversionValue: parseFloat(formData.goldConversionValue) || 0,
      totalGold,
      investments: parseFloat(formData.investments) || 0,
      bankCertificates: parseFloat(formData.bankCertificates) || 0,
      dollarsInUSD: parseFloat(formData.dollarsInUSD) || 0,
      dollarConversionValue: parseFloat(formData.dollarConversionValue) || 0,
      dollarsInEGP,
      cashSavings: parseFloat(formData.cashSavings) || 0,
      total
    };

    addRecord(record);
    
    toast({
      title: "Record Added!",
      description: `Total: EGP ${total.toLocaleString()}`,
    });
    
    navigate('/');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <header className="bg-emerald-600 text-white px-4 py-6 safe-area-top">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Add New Record</h1>
            <p className="text-emerald-100 text-sm">Enter your current savings</p>
          </div>
        </div>
      </header>
      
      <main className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Record Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="date" className="text-sm font-medium">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </CardContent>
          </Card>

          {/* Gold Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-600" />
                Gold Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="goldInCoins" className="text-sm font-medium">Gold in Coins</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="goldInCoins"
                  name="goldInCoins"
                  value={formData.goldInCoins}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="goldConversionValue" className="text-sm font-medium">Gold Rate (EGP per coin)</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="goldConversionValue"
                  name="goldConversionValue"
                  value={formData.goldConversionValue}
                  onChange={handleChange}
                  placeholder="3500.00"
                  className="mt-1"
                />
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700 font-medium">Total Gold Value</p>
                <p className="text-lg font-bold text-yellow-800">
                  EGP {formatCurrency(calculateTotalGold())}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* USD Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                USD Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dollarsInUSD" className="text-sm font-medium">Dollars (USD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="dollarsInUSD"
                  name="dollarsInUSD"
                  value={formData.dollarsInUSD}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dollarConversionValue" className="text-sm font-medium">USD Rate (EGP per USD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="dollarConversionValue"
                  name="dollarConversionValue"
                  value={formData.dollarConversionValue}
                  onChange={handleChange}
                  placeholder="31.00"
                  className="mt-1"
                />
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-medium">Dollars Value</p>
                <p className="text-lg font-bold text-green-800">
                  EGP {formatCurrency(calculateDollarsInEGP())}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Other Savings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Banknote className="h-5 w-5 text-blue-600" />
                Other Savings (EGP)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="investments" className="text-sm font-medium">Investments</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="investments"
                  name="investments"
                  value={formData.investments}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bankCertificates" className="text-sm font-medium">Bank Certificates</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="bankCertificates"
                  name="bankCertificates"
                  value={formData.bankCertificates}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cashSavings" className="text-sm font-medium">Cash Savings</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="cashSavings"
                  name="cashSavings"
                  value={formData.cashSavings}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Total */}
          <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <PiggyBank className="h-6 w-6 text-emerald-600" />
                <p className="text-lg font-semibold text-emerald-800">Total Savings</p>
              </div>
              <p className="text-3xl font-bold text-emerald-600">
                EGP {formatCurrency(calculateTotal())}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3 pb-6">
            <Button type="submit" className="w-full h-12 text-lg" size="lg">
              <Save className="h-5 w-5 mr-2" />
              Save Record
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full h-12"
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddRecord;