import {
  useRecordContext,
  FunctionField as OrgFunctionField,
  DateField as OrgDateField,
} from 'react-admin';

export const TextField = ({ source }) => {
  const record = useRecordContext();

  if (!record) return null;
  return <span>{record[source] ?? '없음'}</span>;
};

export const AnchorField = ({ source }) => {
  const record = useRecordContext();

  if (!record) return null;
  return <a href={record[source]}>{record[source]}</a>;
};

export const FunctionField = ({
  fieldNames,
}: {
  fieldNames: Array<string>;
}) => {
  const record = useRecordContext();

  return (
    <OrgFunctionField
      render={() =>
        `${record[fieldNames[0]] ?? '없음'} / ${
          record[fieldNames[1]] ?? '없음'
        }`
      }
    />
  );
};

export const DateField = ({ source }) => {
  const record = useRecordContext();
  if (!record) return null;
  return <OrgDateField source={record[source]} />;
};
