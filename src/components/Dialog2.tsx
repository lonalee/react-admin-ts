// 사이즈 조절용 다이얼로그 템플릿
// 다이얼로그 타이틀 부분은 커스텀 다이얼로그의 그것을 사용
// import 구문 조절 테스트 하기

import { useState } from 'react';
import { Grid } from '@mui/material';

import {
  EditButton,
  TextField,
  Labeled,
  useRecordContext,
  TextInput,
  SaveButton,
  Form,
  Datagrid,
} from 'react-admin';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog, { DialogProps } from '@mui/material/Dialog';
import {
  Card,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Box,
  Button,
  Dialog,
  DialogProps,
  Radio,
  RadioGroup,
  Input,
  FormHelperText,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function MaxWidthDialog() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

  const [modalOpen, setModalOpen] = useState(false);
  const { title, status } = useRecordContext();
  // record context를 암묵적으로 참조

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullWidth(event.target.checked);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <EditButton
        onClick={() => {
          setModalOpen(true);
        }}
        label=""
        icon={<SettingsIcon />}
      />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={modalOpen}
        onClose={handleClose}
      >
        {/* TODO: Title 및 Content는 메뉴별로 주입하도록 모듈화할 것이다. 
            Prop 이름 : dialogContents
         */}
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          프로젝트 상태 관리
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* TODO: FORM 모듈화, 스타일에는 큰 리소스를 쏟지 않는다. */}
          <Form>
            <Grid container>
              {/* a row starts */}
              <Grid item xs={4}>
                <FormControl>
                  <FormLabel>대상</FormLabel>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl>
                  <Input value={title} readOnly />
                </FormControl>
              </Grid>

              {/* a row starts */}
              <Grid item xs={4}>
                <FormControl>
                  <FormLabel>상태</FormLabel>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl>
                  <RadioGroup
                    row
                    name="controlled-radio-buttons-group"
                    defaultValue={status}
                    value={status}
                    onChange={(e, o) => {
                      console.log(e, o);
                    }}
                  >
                    <FormControlLabel
                      value="정상"
                      control={<Radio />}
                      label="정상"
                    />
                    <FormControlLabel
                      value="정지"
                      control={<Radio />}
                      label="정지"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* a row starts */}
              <Grid item xs={4}>
                <FormControl>
                  <FormLabel>사유</FormLabel>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl>
                  <Input />
                </FormControl>
              </Grid>

              <Card>
                <Datagrid
                  data={[
                    { id: 1, title: 'AAA', body: 'body' },
                    { id: 2, title: 'AA1', body: 'body1' },
                    { id: 3, title: 'AA2', body: 'body2' },
                    { id: 4, title: 'AA3', body: 'body3' },
                    { id: 5, title: 'AA4', body: 'body4' },
                    { id: 6, title: 'AA5', body: 'body5' },
                  ]}
                >
                  <TextField source="id" />
                  <TextField source="title" />
                  <TextField source="body" />
                </Datagrid>
              </Card>

              <Grid item xs={12}>
                <SaveButton />
              </Grid>
            </Grid>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
