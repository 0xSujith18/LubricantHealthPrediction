import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, TrendingUp, Database, Cpu, GitBranch, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Machine Learning Models',
      description: 'Advanced ML algorithms including Random Forest, SVM, and Neural Networks for accurate predictions.',
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Instant lubricant condition assessment with confidence scoring and actionable insights.',
    },
    {
      icon: Shield,
      title: 'Predictive Maintenance',
      description: 'Prevent equipment failures by monitoring lubricant degradation patterns.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Historical data analysis and trend visualization for informed decision making.',
    },
  ];

  const workflow = [
    {
      step: 1,
      title: 'Data Collection',
      description: 'Gather lubricant parameters including viscosity, temperature, contamination levels, and more.',
      icon: Database,
    },
    {
      step: 2,
      title: 'AI Processing',
      description: 'Advanced machine learning models analyze the data to predict lubricant condition.',
      icon: Cpu,
    },
    {
      step: 3,
      title: 'Result Generation',
      description: 'Generate condition assessment (Good/Average/Bad) with confidence scores.',
      icon: GitBranch,
    },
    {
      step: 4,
      title: 'Action Recommendations',
      description: 'Provide maintenance recommendations and alerts based on the analysis results.',
      icon: Users,
    },
  ];

  const technologies = [
    'React + TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Recharts',
    'FastAPI Backend',
    'Scikit-learn',
    'Pandas & NumPy',
    'Docker',
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-foreground">Lubricant Condition Predictor</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          An AI-powered system for predicting lubricant condition and optimizing maintenance schedules
          to prevent equipment failures and reduce operational costs.
        </p>
      </motion.div>

      {/* Project Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              The Lubricant Condition Predictor is an advanced AI/ML system designed to assess the health
              of industrial lubricants in real-time. By analyzing key parameters such as viscosity,
              temperature, pressure, contamination levels, acidity, moisture content, and metal wear,
              the system provides accurate predictions about lubricant condition.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This predictive maintenance solution helps organizations optimize their maintenance schedules,
              reduce unexpected equipment failures, and extend the lifespan of their machinery while
              minimizing operational costs and environmental impact.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>System Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Flow Diagram */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                    <Database className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">Sensor Data</p>
                </div>
                <div className="flex-1 h-0.5 bg-border"></div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                    <Cpu className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">Preprocessing</p>
                </div>
                <div className="flex-1 h-0.5 bg-border"></div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium">AI Model</p>
                </div>
                <div className="flex-1 h-0.5 bg-border"></div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-sm font-medium">Prediction</p>
                </div>
                <div className="flex-1 h-0.5 bg-border"></div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-cyan-500" />
                  </div>
                  <p className="text-sm font-medium">Dashboard</p>
                </div>
              </div>
            </div>

            {/* Detailed Steps */}
            <div className="space-y-6">
              {workflow.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-primary">Step {step.step}</span>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="p-3 bg-muted/50 rounded-lg text-center"
                >
                  <span className="text-sm font-medium text-foreground">{tech}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Methodology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Preprocessing</h3>
              <p className="text-muted-foreground text-sm">
                Raw lubricant data is cleaned, normalized, and feature-engineered to optimize model performance.
                Missing values are handled using advanced imputation techniques.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Model Training</h3>
              <p className="text-muted-foreground text-sm">
                Multiple machine learning algorithms are trained and evaluated using cross-validation.
                The best-performing model is selected based on accuracy, precision, recall, and F1-score metrics.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Prediction & Validation</h3>
              <p className="text-muted-foreground text-sm">
                Real-time predictions are made with confidence intervals. The system continuously learns
                and adapts to new data patterns to maintain high accuracy over time.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>


    </div>
  );
};

export default About;