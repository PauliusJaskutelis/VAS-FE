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

export const uploadModel = async (
  file: File,
  modelName: string,
  modelId: string
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', modelName); // if your backend supports it
  formData.append('modelId', modelId); // if your backend supports it

  const response = await axios.post(`${API_BASE_URL}/models`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const fetchModels = async () => {
  const response = await axios.get(`${API_BASE_URL}/models`);
  return response.data;
};
