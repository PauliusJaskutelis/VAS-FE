import axios from 'axios';
import { API_BASE_URL } from '../config';

export const uploadImage = async (
  files: File[],
  predictionCount: number,
  confidenceThreshold: number
) => {
  const payload = new FormData();
  const params = new URLSearchParams({
    prediction_count: predictionCount.toString(),
    confidence_threshold: confidenceThreshold.toString(),
  });

  files.forEach((file) => payload.append('files', file));

  return axios.post(`${API_BASE_URL}/image?${params}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
