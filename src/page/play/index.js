import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import './style.less';

const PlayMovie = props => {
  const { history, nowPlay } = props;

  useEffect(() => {
    let player;
    if (nowPlay) {
      player = window.videojs(
        'example-video',
        { poster: '', controls: 'true' },
        function() {
          this.on('play', function() {
            // console.log('正在播放');
          });
          //暂停--播放完毕后也会暂停
          this.on('pause', function() {
            // console.log('暂停中');
          });
          // 结束
          this.on('ended', function() {
            // console.log('结束');
          });
        }
      );
      player.src({ type: 'application/x-mpegURL', src: nowPlay.link });
      player.load(nowPlay.link);
    }
    return () => player && player.dispose();
  }, [nowPlay]);

  if (!nowPlay) return null;

  return (
    <div className="play-movie-container">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        {nowPlay.title}
      </NavBar>
      <div id="wrapper">
        <video
          id="example-video"
          className="video-js vjs-default-skin vjs-big-play-centered"
          poster=""
        ></video>
      </div>
    </div>
  );
};
const mapState = state => ({
  nowPlay: state.play.nowPlay,
});
const mapDispatch = ({ play: { clear } }) => ({
  clear: () => clear(),
});
export default connect(mapState, mapDispatch)(withRouter(PlayMovie));
