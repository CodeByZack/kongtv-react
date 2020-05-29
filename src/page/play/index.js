import React, { useEffect } from 'react';
import { Icon, NavBar } from '@/components';
import store from '@/store';
// import { jumpBack,jumpToHome } from '@/utils/jumpUtil';

const PlayMovie = () => {
  const { play, jumpUtil } = store.useContainer();
  const { jumpBack, jumpToHome } = jumpUtil;
  const { nowPlay } = play;
  useEffect(() => {
    if (!nowPlay) return;

    let playerXG = new window.HlsJsPlayer({
      id: 'mse',
      url: nowPlay.link,
      playsinline: true,
      whitelist: [''],
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      defaultPlaybackRate: 1,
      download: true,
      closeVideoTouch: true,
      airplay: true,
      fluid: true,
    });

    return () => playerXG && playerXG.destroy();
  }, [nowPlay]);

  if (!nowPlay) {
    jumpToHome('数据丢掉了,返回首页!');
    return null;
  }

  return (
    <div className="play-movie-container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={jumpBack}>
        {nowPlay.title}
      </NavBar>
      <div id="mse"></div>
    </div>
  );
};
export default PlayMovie;
