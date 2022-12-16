import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../';

const authAxios = (() => {
  let instance;

  return {
    getInstance() {
      if (!instance) {
        instance = axios.create({
          baseURL: baseUrl.CONSOLE_API_SEOUL, // 기본 주소는 서울 리전
          // 파라미터 직렬화
          paramsSerializer: {
            serialize: (params) =>
              Qs.stringify(params, { arrayFormat: 'brackets' }),
          },
        });

        // 요청 가로채기
        instance.interceptors.request.use(
          (config) => ({
            ...config,
            headers: {
              ...config.headers,
              // 헤더에 Authorization 정보 추가
              Authorization: Cookies.get('authorization'),
            },
          }),
          (error) => Promise.reject(error)
        );

        // 응답 가로채기
        instance.interceptors.response.use(
          (response) => response,
          (error) => {
            if (
              error.response?.status === 401 &&
              (error.response?.data.errorCode ===
                'BadAuthorizationUnauthorizedException' ||
                error.response?.data.errorCode === 'ServerErrorException')
            ) {
              // 401 BadAuthorizationUnauthorizedException 오류를 반환하면 액세스 토큰 재발급
              const refreshToken = Cookies.get('refreshToken');
              if (refreshToken) {
                const data = {
                  grant_type: 'refresh_token',
                  refresh_token: refreshToken,
                };
                login(data, {
                  headers: {
                    // 헤더에 Authorization 정보 추가
                    Authorization: Cookies.get('authorization'),
                  },
                })
                  .then(
                    ({
                      data: {
                        access_token: accessToken,
                        refresh_token: newRefreshToken,
                      },
                    }) => {
                      // 재발급 성공하면 새 토큰을 쿠키에 저장
                      Cookies.set('authorization', accessToken, {
                        expires: 7,
                        SameSite: 'Lax',
                      });
                      Cookies.set('refreshToken', newRefreshToken, {
                        expires: 30,
                        SameSite: 'Lax',
                      });

                      window.location.reload(); // 새로고침
                    }
                  )
                  .catch(() => {
                    // 재발급 실패하면 로그아웃 처리
                    window.location.replace('/logout');
                  });
              } else {
                // 로그아웃 처리
                window.location.replace('/logout');
              }
            }
            return Promise.reject(error);
          }
        );
      }
      return instance;
    },
  };
})();

const instance = authAxios.getInstance();

export default instance;
