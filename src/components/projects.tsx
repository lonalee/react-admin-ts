import {
  List,
  Datagrid,
  DateField,
  TextInput,
  TopToolbar,
  useRecordContext,
  useStore,
} from 'react-admin';
import { useState, SetStateAction } from 'react';
import { TableHead, TableRow, TableCell, Box } from '@mui/material';

import { LinkField, FunctionField, TextField } from './datagridFields';
import { FilterForm, FilterButton } from './filterForm';
import { DefaultDialog } from './Dialog';
import MaxWidthDialog from './Dialog2';

export const ProjectsList = () => {
  const DatagridHeader = () => (
    <TableHead>
      <TableRow>
        {/* empty cell to account for the select row checkbox in the body */}
        <TableCell></TableCell>
        <TableCell>프로젝트</TableCell>
        <TableCell>아이디</TableCell>
        <TableCell>CA ID</TableCell>
        <TableCell>회사명</TableCell>
        <TableCell>생성일시</TableCell>
        <TableCell>평균DAU (7일)</TableCell>
        <TableCell>요금제</TableCell>
        <TableCell>할인율</TableCell>
        <TableCell>스토어(G/A)</TableCell>
        <TableCell>구글</TableCell>
        <TableCell>애플</TableCell>
        <TableCell>상태</TableCell>
        <TableCell></TableCell>

        {/* {Children.map(children, child => (
                <TableCell key={child.props.source}>
                    {child.props.source}
                </TableCell>
            ))} */}
      </TableRow>
    </TableHead>
  );

  const filters = [
    { label: '프로젝트', source: 'title' },
    { label: '아이디', source: 'id ' },
    { label: '회사명', source: 'companyName ' },
    { label: '클라이언트 앱 아이디', source: 'clientAppId' },
    { label: '할인율', source: 'discountRate' },
    { label: '생성일', source: 'inDate' },
    { label: '요금제', source: 'plan' },
    { label: '스토어 정보', source: 'store' },
    { label: '출시 정보', source: 'release' },
    { label: '상태', source: 'status', type: 'select' },
  ];

  const ListActions = () => (
    <Box width="100%">
      <TopToolbar>
        <FilterButton />
        {/* <ExportButton /> */}
      </TopToolbar>
      <FilterForm filters={filters} />
    </Box>
  );

  const [record, setRecord] = useStore('project.list.record', {});

  return (
    <>
      <List actions={<ListActions />}>
        <Datagrid header={<DatagridHeader />}>
          <LinkField source="title" />
          <TextField source="id" />
          <TextField source="clientAppId" />
          <TextField source="companyName" />
          <DateField source="inDate" showTime />
          <TextField source="avgDAU" />
          <TextField source="plan" />
          <TextField source="discountRate" />
          <FunctionField fieldNames={['googleStore', 'appleStore']} />
          <TextField source="googleReleased" />
          <TextField source="appleReleased" />
          <TextField source="status" />
          {/* <DefaultDialog /> */}
          <MaxWidthDialog />
        </Datagrid>
      </List>
    </>
  );
};
