import { useState } from 'react';
import {
  Paper,
  Card,
  CardMedia,
  Typography,
  Tabs,
  Tab,
  Grid,
  Button,
  Fade,
  Box,
  CssBaseline,
} from '@material-ui/core';
import store from '../../store';
import { NavBar } from '../../components/MyAppBar';
import { IJuJi, IPlayInfo } from '../../types';
import { RouteComponentProps } from '@reach/router';

interface IProps extends RouteComponentProps {}

const decodeJuJi = (playUrls: string) => {
  return playUrls
    .split('$$$')
    .map((diffSource) => {
      const jujiArr: IJuJi[] = diffSource.split('#').map((juji) => {
        const [text, link] = juji.split('$');
        return { text, link };
      });
      return jujiArr;
    })
    .filter((arr) => arr[0].link.endsWith('.m3u8'));
};

const MovieDetail = (props: IProps) => {
  const { detail, jumpUtil } = store.useContainer();
  const { jumpToPlay, jumpBack } = jumpUtil;
  const { nowMovie, clear } = detail;
  const [tabValue, setTabValue] = useState(0);

  if (!nowMovie) return null;

  const onPlayClick = (item: IJuJi) => () => {
    // storeUtils.addWatchHistory(nowMovie,item);
    const palyObj: IPlayInfo = {
      title: nowMovie.vod_name,
      ...item,
    };
    jumpToPlay(palyObj);
  };

  const onBackClick = () => {
    clear();
    jumpBack();
  };

  const playSources = decodeJuJi(nowMovie.vod_play_url);

  return (
    <Box sx={{ overflow: 'hidden', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <NavBar title={nowMovie.vod_name} onBack={() => onBackClick()} />
      <Box sx={{ display: 'flex', m: 2 }}>
        <Card sx={{ width: '40%', flexShrink: 0 }}>
          <CardMedia sx={{ pt: '133%' }} title={nowMovie.vod_name} image={nowMovie.vod_pic} />
        </Card>
        <Box sx={{ flex: 1, pl: 1 }}>
          <Typography
            color="textPrimary"
            component="p"
            gutterBottom
            sx={{ textOverflow: 'ellipsis' }}
          >
            导演:
            <Box component="span" sx={{ color: 'text.secondry' }}>
              {nowMovie.vod_director}
            </Box>
          </Typography>
          <Typography
            color="textPrimary"
            component="p"
            gutterBottom
            sx={{ textOverflow: 'ellipsis' }}
          >
            主演:
            <Box component="span" sx={{ color: 'text.secondry' }}>
              {nowMovie.vod_actor}
            </Box>
          </Typography>
          <Typography color="textPrimary" component="p" gutterBottom>
            类型:
            <Box component="span" sx={{ color: 'text.secondry' }}>
              {nowMovie.vod_class}
            </Box>
          </Typography>
          <Typography color="textPrimary" component="p" gutterBottom>
            地区:
            <Box component="span" sx={{ color: 'text.secondry' }}>
              {nowMovie.vod_area}
            </Box>
          </Typography>
          <Typography color="textPrimary" component="p" gutterBottom>
            语言:
            <Box component="span" sx={{ color: 'text.secondry' }}>
              {nowMovie.vod_remarks}
            </Box>
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ m: 2, p: 1 }}>
        <Typography gutterBottom component="h3">
          简介：
        </Typography>
        <Typography sx={{ color: 'text.secondry' }} component="p">
          {nowMovie.vod_content}
        </Typography>
      </Paper>

      <Paper sx={{ mx: 2, p: 1 }}>
        <Typography gutterBottom component="h3">
          剧集列表：
        </Typography>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          {playSources.map((t, i) => (
            <Tab label={`源${i}`} />
          ))}
        </Tabs>
        {playSources.map((playSource, index) => {
          return (
            <Fade unmountOnExit in={tabValue === index}>
              <Grid container spacing={1} sx={{ textAlign: 'center' }}>
                {playSource.map((juji) => {
                  return (
                    <Grid item xs={3}>
                      <Button
                        sx={{ color: 'text.secondry' }}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={onPlayClick(juji)}
                      >
                        {juji.text}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Fade>
          );
        })}
      </Paper>
    </Box>
  );
};

export default MovieDetail;
