const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from 'axios';

const catClassApi = axios.create({
  baseURL: BASE_URL + 'api'
});

catClassApi.interceptors.request.use( (config) => {
  config.headers = {
    'x-access-token': localStorage.getItem('userToken')
  };

  return config;
});

export default catClassApi;