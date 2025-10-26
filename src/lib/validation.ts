import { LubricantData, ValidationError } from '@/types';

export const validateLubricantData = (data: LubricantData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.viscosity || data.viscosity <= 0) {
    errors.push({ field: 'viscosity', message: 'Viscosity must be greater than 0' });
  }
  if (!data.temperature || data.temperature < -50 || data.temperature > 200) {
    errors.push({ field: 'temperature', message: 'Temperature must be between -50°C and 200°C' });
  }
  if (!data.pressure || data.pressure <= 0) {
    errors.push({ field: 'pressure', message: 'Pressure must be greater than 0' });
  }
  if (data.contamination < 0 || data.contamination > 100) {
    errors.push({ field: 'contamination', message: 'Contamination must be between 0% and 100%' });
  }
  if (data.acidity < 0) {
    errors.push({ field: 'acidity', message: 'Acidity cannot be negative' });
  }
  if (data.moisture < 0 || data.moisture > 100) {
    errors.push({ field: 'moisture', message: 'Moisture must be between 0% and 100%' });
  }
  if (data.metalWear < 0) {
    errors.push({ field: 'metalWear', message: 'Metal wear cannot be negative' });
  }

  return errors;
};