import React, { useEffect } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import './style.less';

const PlayMovie = props => {
  console.log(props);
  const { history, location } = props;
  const data = location.state.data;

  useEffect(() => {
    var player = window.videojs(
      "example-video",
      { poster: "", controls: "true" },
      function() {
        this.on("play", function() {
          console.log("正在播放");
        });
        //暂停--播放完毕后也会暂停
        this.on("pause", function() {
          console.log("暂停中");
        });
        // 结束
        this.on("ended", function() {
          console.log("结束");
        });
      }
    );
  }, [data]);

  return (
    <div className="play-movie-container">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        {data.title}
      </NavBar>
      <div id="wrapper">
        <video
          id="example-video"
          className="video-js vjs-default-skin vjs-big-play-centered"
          poster=""
        >
          <source
            src={data.link}
            type="application/x-mpegURL"
            id="target"
          />
        </video>
      </div>
    </div>
  );
};
export default withRouter(PlayMovie);
