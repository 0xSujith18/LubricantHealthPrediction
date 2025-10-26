import axios from 'axios';
import { LubricantData, PredictionResult, Model } from '@/types';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only show error toast for non-network errors or if explicitly needed
    if (error.code !== 'ECONNREFUSED' && error.code !== 'ERR_NETWORK') {
      const message = error.response?.data?.detail || 'An error occurred';
      toast.error(message);
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const predictLubricantCondition = async (data: LubricantData): Promise<PredictionResult> => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const getModels = async (): Promise<Model[]> => {
  const response = await api.get('/models');
  return response.data;
};

export const setActiveModel = async (modelId: string): Promise<void> => {
  await api.post('/models/set', { modelId });
};

export const getPredictionHistory = async (): Promise<PredictionResult[]> => {
  const response = await api.get('/history');
  return response.data;
};

export const retrainModel = async (modelId: string): Promise<void> => {
  await api.post('/retrain', { modelId });
};

export const retrainModelWithCsv = async (csvFile: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', csvFile);
  await api.post('/retrain_csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getModelMetrics = async (modelId: string) => {
  const response = await api.get(`/models/${modelId}/metrics`);
  return response.data;
};