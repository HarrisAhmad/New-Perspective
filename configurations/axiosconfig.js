import axios from 'axios';
import {BASE_URL, BASE_URLL, BASE_URLUAT} from '@env';
import {UserSession} from '../common/commonfunctions';
import EncryptedStorage from 'react-native-encrypted-storage';

let token = '';
const getToken = UserSession().then(mytoken => {
  const bearer = 'Bearer '.concat(mytoken);
  axiosConfig.defaults.headers.common['Authorization'] = bearer;
});

export const axiosConfig = axios.create({
  // .. where we make our configurations
  // Local BASE_URL
  // Live BASE_URLL
  baseURL: BASE_URLUAT,
});

// Where you would set stuff like your 'Authorization' header, etc ...

// Also add/ configure interceptors && all the other cool stuff
axiosConfig.interceptors.request.use(
  async config => {
    token = await EncryptedStorage.getItem('user_token');
    if (token) {
      mytoken = token.replace(/["]/g, '');
      config.headers.Authorization = `Bearer ${mytoken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
//export default axiosConfig;
