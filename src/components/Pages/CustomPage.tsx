/**
 * @description Tip: To look like other react-admin pages, your custom pages should have the following structure:
 */
import { Card, CardContent } from '@mui/material';
import { Title, useRecordContext } from 'react-admin';
import { useLocation } from 'react-router-dom';

export const CustomPage = () => {
  const location = useLocation();
  console.log('@location@ ', location);
  return (
    <Card>
      <Title title="My Page" />
      <CardContent>...</CardContent>
    </Card>
  );
};
