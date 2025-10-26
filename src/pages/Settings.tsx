import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Moon, Sun, Bell, Mail, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { useTheme } from '@/contexts/ThemeContext';
import { Settings as SettingsType } from '@/types';
import { loadSettings, saveSettings } from '@/lib/storage';
import toast from 'react-hot-toast';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<SettingsType>({
    machineType: 'Industrial Pump',
    samplingInterval: 60,
    alertThresholds: {
      good: 0.8,
      average: 0.6,
      bad: 0.4,
    },
    theme: theme,
    notifications: {
      email: true,
      sms: false,
      dashboard: true,
    },
  });

  const [loading, setSaving] = useState(false);

  useEffect(() => {
    const savedSettings = loadSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleInputChange = (field: keyof SettingsType, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleThresholdChange = (threshold: keyof SettingsType['alertThresholds'], value: string) => {
    setSettings(prev => ({
      ...prev,
      alertThresholds: {
        ...prev.alertThresholds,
        [threshold]: parseFloat(value) || 0
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      saveSettings(settings);
      
      // Update theme if changed
      if (settings.theme !== theme) {
        setTheme(settings.theme);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const machineTypes = [
    'Industrial Pump',
    'Hydraulic System',
    'Gearbox',
    'Compressor',
    'Turbine',
    'Motor',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Machine Configuration */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Machine Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Machine Type
                </label>
                <select
                  value={settings.machineType}
                  onChange={(e) => handleInputChange('machineType', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {machineTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Sampling Interval (minutes)
                </label>
                <Input
                  type="number"
                  value={settings.samplingInterval}
                  onChange={(e) => handleInputChange('samplingInterval', parseInt(e.target.value) || 0)}
                  placeholder="60"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How often to collect lubricant samples for analysis
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alert Thresholds */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Alert Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Good Condition Threshold
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={settings.alertThresholds.good}
                  onChange={(e) => handleThresholdChange('good', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum confidence for "Good" classification
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Average Condition Threshold
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={settings.alertThresholds.average}
                  onChange={(e) => handleThresholdChange('average', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum confidence for "Average" classification
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Bad Condition Threshold
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={settings.alertThresholds.bad}
                  onChange={(e) => handleThresholdChange('bad', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum confidence for "Bad" classification
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Appearance Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Theme
                </label>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {settings.theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <div>
                      <p className="font-medium">{settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.theme === 'dark'}
                    onCheckedChange={(checked) => handleInputChange('theme', checked ? 'dark' : 'light')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="font-medium">v1.0.0</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">API Status</p>
                <p className="font-medium text-green-500">Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for critical conditions
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked }
                    }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive SMS notifications for urgent issues
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Dashboard Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Show toast notifications in the application
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.dashboard}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, dashboard: checked }
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;