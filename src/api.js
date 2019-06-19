import axios from 'axios';

export const createApi = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.request.responseURL.indexOf(`/login`) === -1 && err.response.status === 403) {
      onLoginFail();
      return;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
