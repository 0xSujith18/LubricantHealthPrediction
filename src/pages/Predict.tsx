import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Download, AlertCircle, CheckCircle, TrendingUp, HelpCircle, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { predictLubricantCondition, getPredictionHistory } from '@/lib/api';
import { LubricantData, PredictionResult, ValidationError } from '@/types';
import { getConditionColor, getConditionBg, downloadCSV } from '@/lib/utils';
import { validateLubricantData } from '@/lib/validation';
import { usePredictions } from '@/contexts/PredictionContext';
import toast from 'react-hot-toast';

const Predict = () => {
  const { predictions, addPrediction } = usePredictions();
  const [formData, setFormData] = useState<LubricantData>({
    viscosity: 0,
    temperature: 0,
    pressure: 0,
    contamination: 0,
    acidity: 0,
    moisture: 0,
    metalWear: 0,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleInputChange = (field: keyof LubricantData, value: string) => {
    const newData = {
      ...formData,
      [field]: parseFloat(value) || 0
    };
    setFormData(newData);
    
    // Clear errors for this field
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const handlePredict = async () => {
    // Validate input data
    const validationErrors = validateLubricantData(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix validation errors before predicting');
      return;
    }

    setLoading(true);
    setErrors([]);
    
    try {
      const result = await predictLubricantCondition(formData);
      setPrediction(result);
      addPrediction(result);
      toast.success('Prediction completed successfully!');
    } catch (error) {
      console.error('Prediction failed:', error);
      // Mock prediction for demo
      const mockResult: PredictionResult = {
        condition: formData.contamination > 20 ? 'Bad' : formData.contamination > 10 ? 'Average' : 'Good',
        confidence: 0.85 + Math.random() * 0.1,
        timestamp: new Date().toISOString(),
        parameters: formData,
      };
      setPrediction(mockResult);
      addPrediction(mockResult);
      toast.success('Prediction completed (demo mode)!');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (predictions.length === 0) {
      toast.error('No predictions to download');
      return;
    }
    
    const csvData = predictions.map(h => ({
      timestamp: h.timestamp,
      condition: h.condition,
      confidence: h.confidence,
      viscosity: h.parameters.viscosity,
      temperature: h.parameters.temperature,
      pressure: h.parameters.pressure,
      contamination: h.parameters.contamination,
      acidity: h.parameters.acidity,
      moisture: h.parameters.moisture,
      metalWear: h.parameters.metalWear,
    }));
    
    downloadCSV(csvData, 'lubricant_predictions.csv');
    toast.success('Predictions downloaded successfully!');
  };

  const chartData = predictions.map((h, index) => ({
    index: index + 1,
    confidence: h.confidence * 100,
    condition: h.condition,
  }));

  const fieldTooltips = {
    viscosity: 'Kinematic viscosity at 40°C (cSt). Normal range: 20-100 cSt',
    temperature: 'Operating temperature (°C). Normal range: 40-120°C',
    pressure: 'System pressure (bar). Normal range: 50-300 bar',
    contamination: 'Particle contamination level (%). Normal range: 0-25%',
    acidity: 'Total acid number (mg KOH/g). Normal range: 0-4 mg KOH/g',
    moisture: 'Water content (%). Normal range: 0-0.5%',
    metalWear: 'Metal wear particles (ppm). Normal range: 0-50 ppm',
  };

  const getFieldError = (field: string) => errors.find(e => e.field === field)?.message;

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Good': return <CheckCircle className="h-6 w-6" />;
      case 'Average': return <TrendingUp className="h-6 w-6" />;
      case 'Bad': return <AlertCircle className="h-6 w-6" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Lubricant Condition Prediction</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowHistory(!showHistory)} 
            variant="outline"
            disabled={predictions.length === 0}
          >
            <History className="h-4 w-4 mr-2" />
            {showHistory ? 'Hide' : 'View'} History ({predictions.length})
          </Button>
          <Button onClick={handleDownload} variant="outline" disabled={predictions.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Lubricant Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium text-foreground">Viscosity (cSt)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldTooltips.viscosity}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={formData.viscosity}
                    onChange={(e) => handleInputChange('viscosity', e.target.value)}
                    placeholder="40"
                    className={getFieldError('viscosity') ? 'border-red-500' : ''}
                  />
                  {getFieldError('viscosity') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('viscosity')}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium text-foreground">Temperature (°C)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldTooltips.temperature}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    placeholder="80"
                    className={getFieldError('temperature') ? 'border-red-500' : ''}
                  />
                  {getFieldError('temperature') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('temperature')}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium text-foreground">Pressure (bar)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldTooltips.pressure}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={formData.pressure}
                    onChange={(e) => handleInputChange('pressure', e.target.value)}
                    placeholder="150"
                    className={getFieldError('pressure') ? 'border-red-500' : ''}
                  />
                  {getFieldError('pressure') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('pressure')}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium text-foreground">Contamination (%)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldTooltips.contamination}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={formData.contamination}
                    onChange={(e) => handleInputChange('contamination', e.target.value)}
                    placeholder="5"
                    className={getFieldError('contamination') ? 'border-red-500' : ''}
                  />
                  {getFieldError('contamination') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('contamination')}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium text-foreground">Acidity (mg KOH/g)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldTooltips.acidity}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={formData.acidity}
                    onChange={(e) => handleInputChange('acidity', e.target.value)}
                    placeholder="2"
                    className={getFieldError('acidity') ? 'border-red-500' : ''}
                  />
                  {getFieldError('acidity') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('acidity')}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium text-foreground">Moisture (%)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldTooltips.moisture}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.moisture}
                    onChange={(e) => handleInputChange('moisture', e.target.value)}
                    placeholder="0.1"
                    className={getFieldError('moisture') ? 'border-red-500' : ''}
                  />
                  {getFieldError('moisture') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('moisture')}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium text-foreground">Metal Wear (ppm)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldTooltips.metalWear}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={formData.metalWear}
                    onChange={(e) => handleInputChange('metalWear', e.target.value)}
                    placeholder="10"
                    className={getFieldError('metalWear') ? 'border-red-500' : ''}
                  />
                  {getFieldError('metalWear') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('metalWear')}</p>
                  )}
                </div>
              </div>

              <Button 
                onClick={handlePredict} 
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Predicting...' : 'Predict Condition'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Prediction Result */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-4">
                  <div className={`p-6 rounded-lg ${getConditionBg(prediction.condition)}`}>
                    <div className="flex items-center justify-center space-x-3">
                      <div className={getConditionColor(prediction.condition)}>
                        {getConditionIcon(prediction.condition)}
                      </div>
                      <div className="text-center">
                        <h3 className={`text-2xl font-bold ${getConditionColor(prediction.condition)}`}>
                          {prediction.condition}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Timestamp:</span>
                      <p className="font-medium">{new Date(prediction.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Model Confidence:</span>
                      <p className="font-medium">{(prediction.confidence * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  {prediction.condition === 'Bad' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-500">Action Required</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Immediate maintenance recommended. Check contamination levels and replace lubricant.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Enter parameters and click predict to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Historical Predictions Chart */}
      {showHistory && predictions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Prediction History</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <ChartTooltip 
                    formatter={(value, name) => [`${value}%`, 'Confidence']}
                    labelFormatter={(label) => `Prediction #${label}`}
                  />
                  <Line type="monotone" dataKey="confidence" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Predict;