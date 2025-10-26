import { Settings } from '@/types';

const STORAGE_KEYS = {
  SETTINGS: 'lcp_settings',
  THEME: 'lcp_theme',
} as const;

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

export const loadSettings = (): Settings | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load settings:', error);
    return null;
  }
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
};

export const loadTheme = (): 'light' | 'dark' => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    return (stored as 'light' | 'dark') || 'dark';
  } catch (error) {
    console.error('Failed to load theme:', error);
    return 'dark';
  }
};