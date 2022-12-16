import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  EditButton,
  useListContext,
  useListController,
  useStore,
} from 'react-admin';

export const PostList = () => {
  const { data, page } = useListController();

  const [listData, setListData] = useStore('posts.list.data', { data });
  console.log('get store data :', data);

  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="userId" reference="users" />
        <TextField source="title" />
        {/* <TextField source="body" /> */}
        <EditButton />
      </Datagrid>
    </List>
  );
};
