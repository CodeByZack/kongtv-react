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
} from '@mui/material';
import store from '../../store';
import { NavBar } from '../../components/MyAppBar';
import { IJuJi, IPlayInfo } from '../../types';
import storeUtils from '../../utils/storeUtils';

interface IDescLine {
  title: string;
  desc: string;
  lines?: number;
}

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

const DescLine = (props: IDescLine) => {
  const { title, desc, lines = 1 } = props;

  return (
    <Typography
      sx={{
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        wordBreak: 'break-all',
      }}
      color="textPrimary"
      component="p"
      gutterBottom
    >
      {title}
      <Box component="span" sx={{ color: 'text.secondary' }}>
        {desc}
      </Box>
    </Typography>
  );
};

const MovieDetail = () => {
  const { detail, jumpUtil } = store.useContainer();
  const { jumpToPlay, jumpBack } = jumpUtil;
  const { nowMovie, clear } = detail;
  const [tabValue, setTabValue] = useState(0);

  if (!nowMovie) return null;

  const onPlayClick = (item: IJuJi) => () => {
    storeUtils.addWatchHistory(nowMovie, item);
    const palyObj: IPlayInfo = {
      title: nowMovie.vod_name,
      ...item,
    };
    jumpToPlay(palyObj);
  };

  const onBackClick = (): void => {
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
          <CardMedia sx={{ pt: '150%' }} title={nowMovie.vod_name} image={nowMovie.vod_pic} />
        </Card>
        <Box sx={{ flex: 1, pl: 1 }}>
          <DescLine title="导演:" desc={nowMovie.vod_director} />
          <DescLine title="主演:" desc={nowMovie.vod_actor} lines={2} />
          <DescLine title="类型:" desc={nowMovie.vod_class} lines={2} />
          <DescLine title="地区:" desc={nowMovie.vod_area} />
          <DescLine title="语言:" desc={nowMovie.vod_remarks} />
        </Box>
      </Box>

      <Paper sx={{ m: 2, p: 1 }}>
        <Typography fontWeight="bold" gutterBottom component="h3">
          简介：
        </Typography>
        <Typography sx={{ color: 'text.secondry' }} component="p">
          {nowMovie.vod_blurb}
        </Typography>
      </Paper>

      <Paper sx={{ mx: 2, p: 1 }}>
        <Typography fontWeight="bold" gutterBottom component="h3" sx={{ color: 'secondary.main' }}>
          剧集列表：
        </Typography>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          {playSources.map((t, i) => (
            <Tab key={i} label={`源${i}`} />
          ))}
        </Tabs>
        {playSources.map((playSource, index) => {
          return (
            <Fade key={index} unmountOnExit in={tabValue === index}>
              <Grid container spacing={1} sx={{ textAlign: 'center', py: 2 }}>
                {playSource.map((juji, i) => {
                  return (
                    <Grid key={i} item xs={3}>
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
