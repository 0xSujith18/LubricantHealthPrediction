import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Brain, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getPredictionHistory, getModels } from '@/lib/api';
import { PredictionResult, Model } from '@/types';
import { getConditionColor } from '@/lib/utils';
import { usePredictions } from '@/contexts/PredictionContext';

const Dashboard = () => {
  const { predictions } = usePredictions();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelList = await getModels();
        setModels(modelList);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setModels([
          { id: 'rf-v1', name: 'Random Forest v1.0', accuracy: 0.94, f1Score: 0.92, precision: 0.93, recall: 0.91, isActive: true, lastTrained: '2024-01-15T10:00:00Z', status: 'ready' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = {
    total: predictions.length,
    good: predictions.filter(p => p.condition === 'Good').length,
    average: predictions.filter(p => p.condition === 'Average').length,
    bad: predictions.filter(p => p.condition === 'Bad').length,
  };

  const activeModel = models.find(m => m.isActive);
  const avgAccuracy = predictions.length > 0 
    ? predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length 
    : 0;

  const chartData = predictions.map((p, index) => ({
    index: index + 1,
    confidence: p.confidence * 100,
    condition: p.condition,
    viscosity: p.parameters.viscosity,
    temperature: p.parameters.temperature,
  }));

  const conditionData = [
    { name: 'Good', value: stats.good, color: '#10b981' },
    { name: 'Average', value: stats.average, color: '#f59e0b' },
    { name: 'Bad', value: stats.bad, color: '#ef4444' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Good Condition</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.good}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Condition</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.average}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bad Condition</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.bad}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Active Model & Accuracy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Model</CardTitle>
              <Brain className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{activeModel?.name || 'No Model Active'}</div>
              {activeModel && (
                <p className="text-sm text-muted-foreground">
                  Accuracy: {(activeModel.accuracy * 100).toFixed(1)}%
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{(avgAccuracy * 100).toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">
                Based on {predictions.length} predictions
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle>Prediction Confidence Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="confidence" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <Card>
            <CardHeader>
              <CardTitle>Condition Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conditionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Predictions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.slice(-5).reverse().map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      prediction.condition === 'Good' ? 'bg-green-500' :
                      prediction.condition === 'Average' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className={`font-medium ${getConditionColor(prediction.condition)}`}>
                        {prediction.condition}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Confidence: {(prediction.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(prediction.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;