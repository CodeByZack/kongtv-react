import React, { useState } from 'react';
import store from '@/store';
import storeUtils from '@/utils/storeUtils';
import './style.less';
import { NavBar } from '@/components/myAppBar';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
    minHeight: '100vh',
    '& h3': {
      fontWeight: 'bold',
    },
  },
  movieImage: {
    paddingTop: '133.33%',
  },
  movieTop: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  movieTopCard: {
    width: '40vw',
    flexShrink: 0,
  },
  movieInfo: {
    paddingLeft: theme.spacing(1),
    flex: 1,
  },
  greyText: {
    color: theme.palette.text.secondary,
  },
  infoText3: {
    lineClamp: 3,
    boxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    wordBreak: 'break-all'
  },
  infoText1: {
    lineClamp: 1,
    boxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    wordBreak: 'break-all'
  },
  movieDesc: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1),
  },
  movieList: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  jujiList: {
    textAlign: 'center',
    padding: theme.spacing(2, 0),
    '& button': {
      width: '100%',
    },
  },
}));

const decodeJuJi = playUrls => {
  return playUrls
    .split('$$$')
    .map(diffSource => {
      let jujiArr = diffSource.split('#');
      jujiArr = jujiArr.map(juji => {
        const [text, link] = juji.split('$');
        return { text, link };
      });
      return jujiArr;
    })
    .filter(arr => arr[0].link.endsWith('.m3u8'));
};

const MovieDetail = () => {
  const { detail, jumpUtil } = store.useContainer();
  const { jumpToPlay, jumpBack } = jumpUtil;
  const { nowMovie, clear } = detail;
  const [tabValue, setTabValue] = useState(0);
  const styles = useStyles();

  if (!nowMovie) return null;

  const onPlayClick = item => () => {
    storeUtils.addWatchHistory(nowMovie,item);
    const palyObj = {
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
    <div className={styles.root}>
      <NavBar title={nowMovie.vod_name} onBack={() => onBackClick()}>
        {nowMovie.vod_name}
      </NavBar>

      <div className={styles.movieTop}>
        <Card className={styles.movieTopCard}>
          <CardMedia
            className={styles.movieImage}
            title={nowMovie.vod_name}
            image={nowMovie.vod_pic}
          />
        </Card>
        <div className={styles.movieInfo}>
          <Typography color="textPrimary" component="p" gutterBottom className={styles.infoText1}>
            导演:
            <span className={styles.greyText}>{nowMovie.vod_director}</span>
          </Typography>
          <Typography color="textPrimary" component="p" gutterBottom className={styles.infoText3}>
            主演:<span className={styles.greyText}>{nowMovie.vod_actor}</span>
          </Typography>
          <Typography color="textPrimary" component="p" gutterBottom>
            类型:<span className={styles.greyText}>{nowMovie.vod_class}</span>
          </Typography>
          <Typography color="textPrimary" component="p" gutterBottom>
            地区:<span className={styles.greyText}>{nowMovie.vod_area}</span>
          </Typography>
          <Typography color="textPrimary" component="p" gutterBottom>
            语言:<span className={styles.greyText}>{nowMovie.vod_remarks}</span>
          </Typography>
        </div>
      </div>

      <Paper className={styles.movieDesc}>
        <Typography gutterBottom component="h3">
          简介：
        </Typography>
        <Typography className={styles.greyText} component="p">
          {nowMovie.vod_content}
        </Typography>
      </Paper>

      <Paper className={styles.movieList}>
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
              <Grid container spacing={1} className={styles.jujiList}>
                {playSource.map(juji => {
                  return (
                    <Grid item xs={3}>
                      <Button
                        className={styles.greyText}
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
    </div>
  );
};

export default MovieDetail;
