import React from 'react';
import { Icon, Tabs } from '@/components';
import store from '@/store';
// import { jumpToPlay, jumpBack, jumpToHome } from '@/utils/jumpUtil';

import './style.less';
import { NavBar } from '@/components/MyAppBar';
import { Toolbar, Paper, makeStyles, Card, CardMedia, Box, Typography,useTheme, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root : {
    backgroundColor : theme.palette.background.default,
    overflow : 'hidden',
    minHeight : '100vh'
  },
  movieImage: {
    paddingTop: '133.33%',
  },
  movieTop : {
    display : 'flex',
    margin : theme.spacing(2)    
  },
  movieTopCard : {
    width : '40vw',
    flexShrink : 0 
  },
  movieInfo : {
    paddingLeft : theme.spacing(1),
    flex : 1,
    '& p > span' : {
      color : theme.palette.text.secondary
    }
  },
  infoText : {
    lineClamp : 3,
    boxOrient : 'vertical',
    overflow : 'hidden',
    textOverflow : 'ellipsis',
    display: '-webkit-box'
  },
  movieDesc : {
    margin : theme.spacing(0,2),
    padding : theme.spacing(1)
  },
  movieList : {
    margin : theme.spacing(2),

  }
}));

const MovieDetail = () => {
  const { detail, play, jumpUtil } = store.useContainer();
  const { jumpToPlay, jumpBack, jumpToHome } = jumpUtil;
  const { nowMovie, clear } = detail;
  const styles = useStyles();

  if (!nowMovie) {
    jumpToHome('数据丢掉了,返回首页!');
    return null;
  }
  const onPlayClick = item => () => {
    const palyObj = {
      title: nowMovie.vod_name,
      ...item,
    };
    play.setNowPlay(palyObj);
    jumpToPlay(palyObj);
  };

  const onBackClick = () => {
    clear();
    jumpBack();
  };

  let playUrls = nowMovie.vod_play_url;
  playUrls = playUrls.split('$$$').map(diffSource => {
    let jujiArr = diffSource.split('#');
    jujiArr = jujiArr.map(juji => {
      const [text, link] = juji.split('$');
      return { text, link };
    });
    return jujiArr;
  });

  const tabs = playUrls.map((c, i) => ({ title: `源${i}` }));
  const tabContents = playUrls.map(jujiArr => {
    return (
      <div className="list-container">
        {jujiArr.map(url => {
          return (
            <div
              className="play-item"
              onClick={onPlayClick(url)}
              key={url.link}
            >
              {url.text}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className={styles.root}>
        <NavBar onBack={() => onBackClick()}>{nowMovie.vod_name}</NavBar>

        <div className={styles.movieTop}>
          <Card className={styles.movieTopCard}>
            <CardMedia className={styles.movieImage} title={nowMovie.vod_name} image={nowMovie.vod_pic}/>
          </Card>
          <div className={styles.movieInfo}>
            <Typography component="p" gutterBottom>导演:<span>{nowMovie.vod_director}</span></Typography>
            <Typography component="p" gutterBottom className={styles.infoText} >主演:<span>{nowMovie.vod_actor}</span></Typography>
            <Typography component="p" gutterBottom>类型:<span>{nowMovie.vod_class}</span></Typography>
            <Typography component="p" gutterBottom>地区:<span>{nowMovie.vod_area}</span></Typography>
            <Typography component="p" gutterBottom>语言:<span>{nowMovie.vod_remarks}</span></Typography>
          </div>
        </div>

        <Paper className={styles.movieDesc}>
          <h3>简介：</h3>
          <p>{nowMovie.vod_content}</p>
        </Paper>

        <div className={styles.movieList}>
          <p className="movie-play-list-title">
            <Icon type="ellipsis" />
            剧集列表
          </p>
          <Tabs
            tabs={tabs}
            initialPage={0}
            tabBarBackgroundColor="transparent"
            tabBarInactiveTextColor="#fff"
          >
            {tabContents}
          </Tabs>
        </div>
    </div>
  );
};

export default MovieDetail;
