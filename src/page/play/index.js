import React, { useEffect } from 'react';
import store from '@/store';
import { getQuery } from '@/utils';
import { NavBar } from '@/components/myAppBar';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

const VIDEO_ID = 'VIDEO_ID';

const PLAYER_CONFIG = url => ({
  id: VIDEO_ID,
  url,
  playsinline: true,
  whitelist: [''],
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  defaultPlaybackRate: 1,
  download: true,
  closeVideoTouch: true,
  airplay: true,
  fluid: true,
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
}));

const PlayMovie = () => {
  const { jumpUtil } = store.useContainer();
  const { jumpBack } = jumpUtil;
  const styles = useStyles();
  const location = useLocation();
  const nowPlay = getQuery(location.search);

  useEffect(() => {
    if (!nowPlay.url) return;
    let playerXG = new window.HlsJsPlayer(PLAYER_CONFIG(nowPlay.url));
    return () => playerXG.destroy();
  }, [nowPlay.url]);

  return (
    <div className={styles.root}>
      <NavBar title={nowPlay.name} onBack={jumpBack} />
      <div id={VIDEO_ID}></div>
    </div>
  );
};
export default PlayMovie;
