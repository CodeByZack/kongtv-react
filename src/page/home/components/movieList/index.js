import React from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../../store/index';
import RatioImage from '../ratioImage/';
import './style.less';

const MovieList = props => {
  const { movies, history } = props;
  const onMovieClick = movie => () => {
    store.dispatch.detail.setNowMovie(movie);
    history.push({ pathname: '/detail' });
  };

  return (
    <div className="movie-list">
      {movies.map(item => {
        return (
          <div
            className="movie-item"
            onClick={onMovieClick(item)}
            key={item.vod_id}
          >
            {/* <div className="img-wrapper">
              <img src={item.vod_pic} alt={item.vod_name} />
            </div> */}
            <RatioImage imgUrl={item.vod_pic} ratio={1.4}/>
            <div className="movie-name">{item.vod_name}</div>
          </div>
        );
      })}
    </div>
  );
};
export default withRouter(MovieList);
