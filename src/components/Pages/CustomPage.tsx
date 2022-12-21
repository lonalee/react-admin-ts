/**
 * @description Tip: To look like other react-admin pages, your custom pages should have the following structure:
 */
import {
  Card,
  CardContent,
  Box,
  Grid,
  Stack,
  Typography,
  styled,
  Paper,
} from '@mui/material';
import {
  ShowBase,
  SimpleShowLayout,
  TextField,
  useShowController,
  RecordContextProvider,
  Title,
} from 'react-admin';
import { useLocation } from 'react-router-dom';
import dataProvider from '../../dataProvider';

export const CustomPage = () => {
  const {
    state: { id },
  } = useLocation();

  const {
    defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
    error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onError` side effect.
    isFetching, // boolean that is true while the record is being fetched, and false once the record is fetched
    isLoading, // boolean that is true until the record is available for the first time
    record, // record fetched via dataProvider.getOne() based on the id from the location
    refetch, // callback to refetch the record via dataProvider.getOne()
    resource, // the resource name, deduced from the location. e.g. 'posts'
  } = useShowController({
    resource: 'console/project',
    id,
  });

  const CustomShowBase = () => (
    <ShowBase
    // id={id} resource="console/project"
    >
      <>
        <Grid container>
          <Grid item xs={8}>
            <SimpleShowLayout>...</SimpleShowLayout>
          </Grid>
          <Grid item xs={4}>
            Show instructions...
          </Grid>
        </Grid>
        <div>Post related links...</div>
      </>
    </ShowBase>
  );

  const CustomSimpleShowLayout = () => (
    <SimpleShowLayout>
      <TextField label="프로젝트" source="title" />
      <TextField label="프로젝트 상태" source="serverSettings.serverStatus" />
      <TextField
        label="Android Package Name"
        source="serverSettings.googlePackageName"
      />
      <TextField
        label="Facebook App ID"
        source="serverSettings.facebookAppId"
      />
      ...
    </SimpleShowLayout>
  );

  interface DataType {
    title: string;
    serverSettings: {
      serverStatus: number;
      googlePackageName: string | null;
      facebookAppId: string | null;
      androidPush: string | boolean;
      appleAppId: string | null;
      appleMarketLaunch: string | null;
      backupGooglePackageName: string | null;
      facebookAppSecret: string | null;
      googleHashDebugKey: string | null;
      googleHashDebugKey2: string | null;
      googleHashReleaseKey: string | null;
      googleHashReleaseKey2: string | null;
      googleMarketLaunch: string | null;
      iosDevelopmentPush: string | boolean;
      iosProductionPush: string | boolean;
    };
    socialSettings: {
      creationCriteria: string;
      maxCountFriend: number;
      maxCountMessage: number;
      maxLengthLetter: number;
      registrationCriteria: string;
    };
    // activations // --> 뷰 작업 생략
  }

  const CustomShow1 = ({ data }: { data: DataType }) => (
    <div>
      <Title title="Book Show" />
      <Card>
        <Stack spacing={1}>
          <div>
            <Typography variant="caption" display="block">
              Title
            </Typography>
            <Typography variant="body2">{data.title}</Typography>
          </div>
          <div>
            <Typography variant="caption" display="block">
              Publication Date
            </Typography>
            <Typography variant="body2">
              TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY
              2TEST BODY 2TEST BODY 2 ********TEST BODY 2TEST BODY 2TEST BODY
              2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY
              2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY 2TEST BODY
              2TEST BODY 2
            </Typography>
            <div className="flex-container">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>
        </Stack>
      </Card>
    </div>
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    verticalAlign: 'middle',
    color: theme.palette.text.secondary,
    height: 94.5,
  }));

  const CustomGrid = ({ record }: { record: DataType }) => (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <div>
          <h4>서버 설정</h4>
        </div>
        <Grid container spacing={2}>
          {/*  */}
          <Grid item xs={1}>
            <Item>프로젝트 상태</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              {record.serverSettings.serverStatus === 1
                ? '오프라인'
                : record.serverSettings.serverStatus === 0
                ? '온라인'
                : '점검'}
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item>
              Android Package
              <br />
              Name
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.serverSettings.googlePackageName ?? '없음'}</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Facebook App ID</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.serverSettings.facebookAppId ?? '없음'}</Item>
          </Grid>
          {/*  */}
          {/*  */}
          <Grid item xs={1}>
            <Item>출시 설정</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              구글 플레이 -{' '}
              {record.serverSettings.googleMarketLaunch === 'n'
                ? '테스트'
                : '라이브'}
              <br /> 앱 스토어 -{' '}
              {record.serverSettings.appleMarketLaunch === 'n'
                ? '테스트'
                : '라이브'}
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item>
              iOS Bundle
              <br />
              Identifier
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.serverSettings.appleAppId ?? '없음'}</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>Facebook App Secret</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.serverSettings.facebookAppSecret ?? '없음'}</Item>
          </Grid>
          {/*  */}
          {/*  */}
          <Grid item xs={1}>
            <Item>구글 해시키</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              {record.serverSettings.googleHashDebugKey ?? '없음'}
              <br />
              {record.serverSettings.googleHashReleaseKey ?? '없음'}
              <br />
              {record.serverSettings.googleHashDebugKey2 ?? '없음'}
              <br />
              {record.serverSettings.googleHashReleaseKey2 ?? '없음'}
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item>푸시키 등록</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              Android - {record.serverSettings.androidPush ? '등록' : '미등록'}
              <br />
              iOS[Production] -{' '}
              {record.serverSettings.iosProductionPush ? '등록' : '미등록'}
              <br />
              iOS[Development] -{' '}
              {record.serverSettings.iosDevelopmentPush ? '등록' : '미등록'}
            </Item>
          </Grid>
          {/*  */}
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <div>
          <h4>소셜 설정</h4>
        </div>
        <Grid container spacing={2}>
          {/*  */}
          <Grid item xs={1}>
            <Item>최대 친구 보유수</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.socialSettings.maxCountFriend}</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>최대 쪽지 보유수</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.socialSettings.maxCountMessage}</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>쪽지 글자수 제한</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.socialSettings.maxLengthLetter}</Item>
          </Grid>
          {/*  */}
          {/*  */}
          <Grid item xs={1}>
            <Item>길드 생성 조건</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.socialSettings.creationCriteria}</Item>
          </Grid>
          <Grid item xs={1}>
            <Item>길드 가입 조건</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>{record.socialSettings.registrationCriteria}</Item>
          </Grid>

          {/*  */}
        </Grid>
      </Box>
    </>
    //
  );

  return (
    <>
      {isLoading ? (
        <div>
          <h1>LOADING</h1>
        </div>
      ) : (
        <RecordContextProvider value={record}>
          <h3>{record.title}</h3>
          <br />
          <CustomGrid record={record} />
        </RecordContextProvider>
      )}
    </>
  );
};
