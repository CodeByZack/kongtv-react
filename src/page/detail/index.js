import React from 'react';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.less';
const MovieDetail = props => {
  const { history, nowMovie, clear, setNowPlay } = props;

  if (!nowMovie) return null;

  const onPlayClick = item => () => {
    setNowPlay({
      title: nowMovie.vod_name,
      ...item,
    });
    history.push({ pathname: '/play' });
  };

  const onBackClick = () => {
    clear();
    history.goBack();
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
    <div className="movie-detail-wrapper">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => onBackClick()}
      >
        {nowMovie.vod_name}
      </NavBar>

      <div className="movie-detail-top">
        <div className="movie-pic">
          <img src={nowMovie.vod_pic} alt={nowMovie.vod_name} />
        </div>
        <div className="movie-info">
          <p>导演:{nowMovie.vod_director}</p>
          <p>主演:{nowMovie.vod_actor}</p>
          <p>类型:{nowMovie.vod_class}</p>
          <p>地区:{nowMovie.vod_area}</p>
          <p>语言:{nowMovie.vod_remarks}</p>
        </div>
      </div>

      <div className="movie-detail-desc">
        <h3>简介：</h3>
        <p>{nowMovie.vod_content}</p>
      </div>

      <div className="movie-play-list">
        <p>
          <Icon type="loading" />
          剧集列表
        </p>
        <Tabs tabs={tabs} initialPage={0}>
          {tabContents}
        </Tabs>
      </div>
    </div>
  );
};

const mapState = state => ({
  nowMovie: state.detail.nowMovie,
});
const mapDispatch = ({ detail: { clear }, play: { setNowPlay } }) => ({
  clear: () => clear(),
  setNowPlay: play => setNowPlay(play),
});

export default connect(mapState, mapDispatch)(withRouter(MovieDetail));
