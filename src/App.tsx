import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PredictionProvider } from '@/contexts/PredictionContext';
import { TooltipProvider } from '@/components/ui/Tooltip';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Predict from '@/pages/Predict';
import Models from '@/pages/Models';
import Settings from '@/pages/Settings';
import About from '@/pages/About';

function App() {
  return (
    <ThemeProvider>
      <PredictionProvider>
        <TooltipProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="predict" element={<Predict />} />
                  <Route path="models" element={<Models />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="about" element={<About />} />
                </Route>
              </Routes>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))',
                    border: '1px solid hsl(var(--border))',
                  },
                }}
              />
            </div>
          </Router>
        </TooltipProvider>
      </PredictionProvider>
    </ThemeProvider>
  );
}

export default App;