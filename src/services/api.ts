import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const uploadImage = async (file: File) => {
  const payload = new FormData();
  payload.append("file", file);

  return axios.post(`${API_URL}/upload`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
