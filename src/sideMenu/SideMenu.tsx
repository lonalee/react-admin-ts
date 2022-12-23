import { Menu, useResourceDefinitions } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import ListItem from '@mui/icons-material/List';

export const MyMenu = () => {
  const resources = useResourceDefinitions();

  return (
    <Menu>
      <Menu.ResourceItem name="posts" />
      {/* <Menu.ResourceItem name="console/project/v1.3" /> */}
      <Menu.Item
        leftIcon={<ListItem />}
        to="console/project/v1.3"
        primaryText="프로젝트"
      />
    </Menu>
  );
};
