import { fetchUtils, Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';

import { focusManager } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { authProvider } from './authProvider';
import dataProvider from './dataProvider';

import { ProjectsList } from './components/projects';
import { PostList } from './components/posts';
import { PostEdit } from './components/edit';
import { CustomPage } from './components/Pages/CustomPage';

interface MyHeaders {
  headers: Headers;
}

const fetchJson = (url: string, options = {} as MyHeaders) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: 'application/json',
      access_token: Cookies.get('access_token'),
    });
  }

  return fetchUtils.fetchJson(url, options);
};

const App = () => {
  focusManager.setEventListener((handleFocus) => {
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener(
        'focus',
        (e) => {
          /**
           * react-query의 window focus refetching 기능을 방지한다.
           * 라이브러리의 옵션(queryClient - defaultOptions)이 동작하지 않아서 작성한 workaround
           */
          e.stopImmediatePropagation();
        },
        false
      );
    }
    return () => {
      window.removeEventListener('focus', () => {
        console.log('handle focus in falsy --> ');
      });
    };
  });

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider('http://localhost:12300', fetchJson)}
    >
      <Resource
        name="console/project/v1.3" // main api (getList를 위한 엔드포인트 설정)
        list={ProjectsList}
        recordRepresentation="name"
      >
        <Route path="/sub-path/*" element={<CustomPage />} />
      </Resource>
      <Resource name="posts" list={PostList} edit={PostEdit} />
    </Admin>
  );
};

export default App;
