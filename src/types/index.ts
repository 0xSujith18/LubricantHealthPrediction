export interface LubricantData {
  viscosity: number;
  temperature: number;
  pressure: number;
  contamination: number;
  acidity: number;
  moisture: number;
  metalWear: number;
}

export interface PredictionResult {
  condition: 'Good' | 'Average' | 'Bad';
  confidence: number;
  timestamp: string;
  parameters: LubricantData;
}

export interface Model {
  id: string;
  name: string;
  accuracy: number;
  f1Score: number;
  precision: number;
  recall: number;
  isActive: boolean;
  lastTrained: string;
  status: 'training' | 'ready' | 'error';
}

export interface Settings {
  machineType: string;
  samplingInterval: number;
  alertThresholds: {
    good: number;
    average: number;
    bad: number;
  };
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    sms: boolean;
    dashboard: boolean;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}