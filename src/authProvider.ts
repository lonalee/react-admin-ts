import { AuthProvider } from 'react-admin';
import Cookies from 'js-cookie';

import { login } from './api/auth/login';

export const authProvider: AuthProvider = {
  login: async (params: any) => {
    try {
      const {
        data: { access_token, refresh_token },
      } = await login({ ...params, grant_type: 'password' });
      Cookies.set('access_token', access_token, { expires: 1 });
      Cookies.set('refresh_token', refresh_token, { expires: 1 });
    } catch (error) {
      console.log('chk login error ---> ', error);
    }
  },
  checkError: (error) => Promise.resolve(/* ... */),
  checkAuth: (params) => Promise.resolve(/* ... */),
  logout: () => Promise.resolve(/* ... */),
  getPermissions: () => Promise.resolve(/* ... */),
  getIdentity: (): any => Promise.resolve(),
};
