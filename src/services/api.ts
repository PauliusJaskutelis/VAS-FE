import axios from 'axios';
import { API_BASE_URL } from '../config';

export const uploadImage = async (file: File) => {
  const payload = new FormData();
  payload.append('file', file);

  return axios.post(`${API_BASE_URL}/image`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
