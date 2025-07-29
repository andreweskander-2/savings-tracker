import React, { createContext, useContext, useState } from 'react';

export interface SavingsRecord {
  id: string;
  date: string;
  goldInCoins: number;
  goldConversionValue: number;
  totalGold: number;
  investments: number;
  bankCertificates: number;
  dollarsInUSD: number;
  dollarConversionValue: number;
  dollarsInEGP: number;
  cashSavings: number;
  total: number;
}

interface SavingsContextType {
  records: SavingsRecord[];
  addRecord: (record: Omit<SavingsRecord, 'id'>) => void;
  deleteRecord: (id: string) => void;
  getLatestRates: () => { goldRate: number; dollarRate: number };
}

const SavingsContext = createContext<SavingsContextType | null>(null);

export const SavingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<SavingsRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      goldInCoins: 2.5,
      goldConversionValue: 3500,
      totalGold: 8750,
      investments: 50000,
      bankCertificates: 100000,
      dollarsInUSD: 1000,
      dollarConversionValue: 31,
      dollarsInEGP: 31000,
      cashSavings: 25000,
      total: 214750
    },
    {
      id: '2',
      date: '2024-02-15',
      goldInCoins: 3.0,
      goldConversionValue: 3600,
      totalGold: 10800,
      investments: 55000,
      bankCertificates: 120000,
      dollarsInUSD: 1200,
      dollarConversionValue: 31.5,
      dollarsInEGP: 37800,
      cashSavings: 30000,
      total: 253600
    }
  ]);

  const addRecord = (record: Omit<SavingsRecord, 'id'>) => {
    const newRecord: SavingsRecord = {
      ...record,
      id: Date.now().toString(),
    };
    setRecords(prev => [newRecord, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const getLatestRates = () => {
    const latest = records[0];
    return {
      goldRate: latest?.goldConversionValue || 3500,
      dollarRate: latest?.dollarConversionValue || 31
    };
  };

  return (
    <SavingsContext.Provider value={{
      records,
      addRecord,
      deleteRecord,
      getLatestRates
    }}>
      {children}
    </SavingsContext.Provider>
  );
};

export const useSavings = () => {
  const context = useContext(SavingsContext);
  if (!context) {
    throw new Error('useSavings must be used within SavingsProvider');
  }
  return context;
};