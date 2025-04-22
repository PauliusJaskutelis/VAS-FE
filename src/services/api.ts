import { API_BASE_URL } from '../config';
import apiInstance from './apiInstance';

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

  return apiInstance.post(`${API_BASE_URL}/image?${params}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const classifyImage = async (
  files: File[],
  selectedModelId: string | undefined,
  modelName: string | undefined,
  predictionCount: number,
  confidenceThreshold: number
) => {
  const payload = new FormData();
  const params = new URLSearchParams({
    model_name: modelName || '',
    prediction_count: predictionCount.toString(),
    confidence_threshold: confidenceThreshold.toString(),
  });

  files.forEach((file) => payload.append('files', file));

  return apiInstance.post(
    `${API_BASE_URL}/image/classify-with-model/${selectedModelId}?${params}`,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const registerUser = async (email: string, password: string) => {
  const response = await apiInstance.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await apiInstance.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data; // usually contains token/user info
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

  const response = await apiInstance.post(`${API_BASE_URL}/models`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const fetchModels = async () => {
  const response = await apiInstance.get(`${API_BASE_URL}/models`);
  return response.data;
};

export const storeImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await apiInstance.post(
    `${API_BASE_URL}/image-storage`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

  return response.data;
};

// Retrieve all stored image metadata or previews
export const getStoredImages = async () => {
  const response = await apiInstance.get(`${API_BASE_URL}/image-storage`);
  return response.data; // Array of image metadata or preview URLs
};
