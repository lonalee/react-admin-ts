import { AuthProvider } from 'react-admin';
import Cookies from 'js-cookie';

import { login } from './api/auth/login';

export const authProvider = {
  login: async (params: any) => {
    console.log('chk login 1');
    const {
      data: { access_token, refresh_token },
    } = await login({ ...params, grant_type: 'password' });
    Cookies.set('access_token', access_token, { expires: 1 });
    Cookies.set('refresh_token', refresh_token, { expires: 1 });
    return Promise.resolve();
  },
  // login: (): any => Promise.resolve(),
  checkError: (): any => {
    console.log('chk login 2');
    return Promise.resolve();
  },
  /**
   * @description 로그인 여부를 쿠키를 이용해서 체크한다.
   * @returns
   */
  checkAuth: (): any => {
    console.log('chk login 3');

    return Cookies.get('access_token') ? Promise.resolve() : Promise.reject();
  },
  logout: (): any => {
    console.log('chk login 4');
    return Promise.resolve();
  },
  getPermissions: (): any => {
    console.log('chk login 5');
    return Promise.resolve();
  },
  getIdentity: (): any => {
    console.log('chk login 6');
    return Promise.resolve();
  },
};
