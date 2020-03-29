import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import { jumpBack } from '../../utils/jumpUtil';
import './style.less';

const PlayMovie = props => {
  const { nowPlay } = props;
  useEffect(() => {

    if(!nowPlay)return;

    let playerXG = new window.HlsJsPlayer({
      "id": "mse",
      "url": nowPlay.link,
      "playsinline": true,
      "whitelist": [
          ""
      ],
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      defaultPlaybackRate: 1,
      airplay: true,
      "pip": true,
      "fluid": true
        });

    return () => playerXG && playerXG.destroy();
  }, [nowPlay]);

  if (!nowPlay) return null;

  return (
    <div className="play-movie-container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={jumpBack}>
        {nowPlay.title}
      </NavBar>
      <div id="mse"></div>
    </div>
  );
};
const mapState = state => ({
  nowPlay: state.play.nowPlay,
});
const mapDispatch = ({ play: { clear } }) => ({
  clear: () => clear(),
});
export default connect(mapState, mapDispatch)(PlayMovie);
