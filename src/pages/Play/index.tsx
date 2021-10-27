import React, { useEffect } from 'react';
import { Box, CssBaseline } from '@material-ui/core';
import { RouteComponentProps, useLocation } from '@reach/router';
import { NavBar } from '../../components/MyAppBar';
import store from '../../store';
import { getQuery } from '../../utils';

interface IProps extends RouteComponentProps {}

const VIDEO_ID = 'VIDEO_ID';

const PLAYER_CONFIG = (url: string) => ({
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

const PlayMovie = (props: IProps) => {
  const { jumpUtil } = store.useContainer();
  const { jumpBack } = jumpUtil;
  const location = useLocation();
  const nowPlay = getQuery(location.href);

  useEffect(() => {
    if (!nowPlay.url) return;
    let playerXG = new window.HlsJsPlayer(PLAYER_CONFIG(nowPlay.url));
    return () => playerXG.destroy();
  }, [nowPlay.url]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar title={nowPlay.name} onBack={jumpBack} />
      <div id={VIDEO_ID}></div>
    </Box>
  );
};
export default PlayMovie;
