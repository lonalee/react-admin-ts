import baseUrl from '../../shared/baseUrl';
import axios from 'axios';

export const login = (data: object) => {
  const url = `${baseUrl.ADMIN_AUTH_URL}/login`;
  return axios.post(url, data);
};
