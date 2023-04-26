import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
const client = axios.create();

client.interceptors.request.use(
  (config) => {
    var token = Cookies.get('access_token');
    if (token) {
      config.headers['access-token'] = token;
      config.headers['Access-Allow-Cross-Origin'] = '*';
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      Cookies.remove('access_token');
      console.log(err.response);
      // throw new Error("auth invalid");
    } else {
      throw err;
    }
  }
);

export default client;
