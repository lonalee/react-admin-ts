import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { focusManager } from '@tanstack/react-query';
import { authProvider } from './authProvider';

import { UserList } from './components/users';
import { PostList } from './components/posts';
import { PostEdit } from './components/edit';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

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
    <Admin requireAuth authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="users" list={UserList} recordRepresentation="name" />
      <Resource name="posts" list={PostList} edit={PostEdit} />
    </Admin>
  );
};

export default App;
