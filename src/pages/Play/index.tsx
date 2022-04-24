import { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { NavBar } from '../../components/MyAppBar';
import store from '../../store';
import { getQuery } from '../../utils';
import { useLocation } from 'react-router-dom';

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

const PlayMovie = () => {
  const { jumpUtil } = store.useContainer();
  const { jumpBack } = jumpUtil;
  const location = useLocation();
  const nowPlay = getQuery(location.search);

  useEffect(() => {
    if (!nowPlay.url) return;
    const playerXG = new window.HlsJsPlayer(PLAYER_CONFIG(nowPlay.url));
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
