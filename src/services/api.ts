import { API_BASE_URL } from '../config';
import { CatalogNode, ImageMetadata } from '../types';
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
    `${API_BASE_URL}/classify/with-model/${selectedModelId}?${params}`,
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
  formData.append('name', modelName);
  formData.append('modelId', modelId);

  const response = await apiInstance.post('/models', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const getModelById = async (modelId: string) => {
  const response = await apiInstance.get(`/models/${modelId}`);
  return response.data;
};

export const fetchModels = async () => {
  const response = await apiInstance.get(`/models`);
  return response.data;
};

export const deleteModel = async (modelId: string) => {
  const response = await apiInstance.delete(`/models/${modelId}`);
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
  const response = await apiInstance.get(`/image-storage`);
  return response.data; // Array of image metadata or preview URLs
};

export const deleteImage = async (imageId: string): Promise<void> => {
  await apiInstance.delete(`/images/${imageId}`);
};

export const fetchRootCatalogs = async (): Promise<CatalogNode[]> => {
  const response = await apiInstance.get('/catalogs/root');
  return response.data;
};

export const createCatalog = async (
  name: string,
  parentId: string | null,
  isPublic: boolean = false
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('isPublic', String(isPublic));
  if (parentId) formData.append('parentId', parentId);

  const response = await apiInstance.post('/catalogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const fetchCatalogChildren = async (
  parentId: string
): Promise<CatalogNode[]> => {
  const response = await apiInstance.get(`/catalogs/${parentId}/children`);
  return response.data;
};

export const uploadImagesToCatalog = async (
  catalogId: string,
  files: File[]
): Promise<ImageMetadata[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  formData.append('catalogId', catalogId);

  const response = await apiInstance.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const fetchImagesByCatalog = async (
  catalogId: string
): Promise<ImageMetadata[]> => {
  const response = await apiInstance.get(`/images/catalog/${catalogId}`);
  return response.data;
};

export const deleteCatalog = async (catalogId: string): Promise<void> => {
  await apiInstance.delete(`/catalogs/${catalogId}`);
};
