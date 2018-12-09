/* eslint-disable no-param-reassign */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { BASE_URL } from '../consts';
import auth from '../auth';


const authAxios = axios.create({
  baseURL: BASE_URL,
});


/* * /
authAxios.interceptors.request.use(
  (config) => {
    const { token } = auth.getUserInfo();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },

  error => Promise.reject(error),
);
/* */


authAxios.interceptors.response.use(
  response => response,

  (error) => {
    if ((error.response && error.response.status === 401) && auth.checkAuth()) {
      auth.logout();
    }

    return Promise.reject(error);
  },
);


Vue.use(VueAxios, authAxios);
