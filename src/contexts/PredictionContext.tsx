import React, { createContext, useContext, useState } from 'react';
import { PredictionResult } from '@/types';

interface PredictionContextType {
  predictions: PredictionResult[];
  addPrediction: (prediction: PredictionResult) => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: React.ReactNode }) {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);

  const addPrediction = (prediction: PredictionResult) => {
    setPredictions(prev => [...prev, prediction]);
  };

  return (
    <PredictionContext.Provider value={{ predictions, addPrediction }}>
      {children}
    </PredictionContext.Provider>
  );
}

export const usePredictions = () => {
  const context = useContext(PredictionContext);
  if (context === undefined) {
    throw new Error('usePredictions must be used within a PredictionProvider');
  }
  return context;
};