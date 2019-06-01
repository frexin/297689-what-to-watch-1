import axios from 'axios';

export const createApi = () => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  return api;
};
