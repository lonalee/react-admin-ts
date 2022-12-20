import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button } from '@mui/material';

import ContentFilter from '@mui/icons-material/FilterList';
import { TextInput, SelectInput, useListContext } from 'react-admin';

export const FilterForm = ({ filters }) => {
  const { displayedFilters, filterValues, setFilters, hideFilter } =
    useListContext();

  const form = useForm({
    defaultValues: filterValues,
  });

  if (!displayedFilters.main) return null;

  const onSubmit = (values: any) => {
    if (Object.keys(values).length > 0) {
      setFilters(values, null);
    } else {
      hideFilter('main');
    }
  };

  const resetFilter = () => {
    setFilters({}, []);
  };

  const makeTextInputBox = (
    filters: Array<{ source: string; label: string; type: string }>
  ) =>
    filters.map((filter, i) => (
      <Box component="span" mr={2}>
        {filter.type === 'select' ? (
          <SelectInput
            choices={[
              { id: null, name: '전체' },
              { id: 'n', name: '정상' },
              { id: 's', name: '정지' },
            ]}
            resettable
            helperText={false}
            source={filter.source}
            label={filter.label}
          />
        ) : (
          <TextInput
            resettable
            helperText={false}
            source={filter.source}
            label={filter.label}
          />
        )}
      </Box>
    ));

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="flex-end" mb={1}>
          {makeTextInputBox(filters.slice(0, 5))}
        </Box>

        <Box display="flex" alignItems="flex-end" mb={1}>
          {makeTextInputBox(filters.slice(5))}
        </Box>

        {/*  */}
        <Box display="flex" alignItems="flex-end" mb={1}>
          <Box component="span" mr={2} mb={1.5}>
            <Button variant="outlined" color="primary" type="submit">
              검색하기
            </Button>
          </Box>
          <Box component="span" mb={1.5}>
            <Button variant="outlined" onClick={resetFilter}>
              닫기
            </Button>
          </Box>
        </Box>
        {/*  */}
      </form>
    </FormProvider>
  );
};

export const FilterButton = () => {
  const { showFilter } = useListContext();
  return (
    <Button
      size="small"
      color="primary"
      onClick={() => showFilter('main', '')}
      startIcon={<ContentFilter />}
    >
      검색
    </Button>
  );
};
