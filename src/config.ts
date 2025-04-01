export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const DEFAULT_PREDICTION_COUNT = 5;
export const DEFAULT_CONFIDENCE_THRESHOLD = 0.1;
export const MAX_PREDICTIONS = 10;
export const MIN_CONFIDENCE = 0.01;

export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg'];
export const MAX_FILE_SIZE_MB = 15;
