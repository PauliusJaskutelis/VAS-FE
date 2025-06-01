import axios from 'axios';

export const googleOAuth = async (token: string | undefined) => {
  return await axios.post('http://localhost:8080/api/auth/google', {
    token,
  });
};
