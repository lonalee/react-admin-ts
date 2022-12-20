// const { NODE_ENV } = process.env; vite에선 사용불가
const { MODE } = import.meta.env;
console.log('MODE -->', MODE);

const base = {
  ADMIN_API_URL: 'http://localhost:12300',
  ADMIN_AUTH_URL: 'http://localhost:23400',
};

const baseURL = () => {
  switch (MODE) {
    case 'development':
      return {
        DASHBOARD: `${base.ADMIN_API_URL}/dashboard`,
        CONSOLE: `${base.ADMIN_API_URL}/console`,
        ADMIN_AUTH_URL: base.ADMIN_AUTH_URL,
      };
    // case 'alpha':
    //   baseURL = {
    //     ADMIN_API_URL: 'https://adminapi.alpha.thebackend.io/console',
    //     ADMIN_AUTH_URL: 'https://adminauth.alpha.thebackend.io',
    //    dashboard --> https://adminapi.alpha.thebackend.io/dashboard
    //   };
    //   break;
    default:
      return {
        ADMIN_API_URL: 'http://localhost:12300',
        ADMIN_AUTH_URL: 'http://localhost:23400',
      };
  }
};

export default baseURL();
