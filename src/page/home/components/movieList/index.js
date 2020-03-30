import React from 'react';
import { jumpToDetail } from '../../../../utils/jumpUtil';
import RatioImage from '../ratioImage/';
import store from "../../../../store";
import './style.less';

const MovieList = props => {
  const { movies } = props;
  
  const { detail } = store.useContainer();

  const onMovieClick = movie => () => {
    detail.setNowMovie(movie);
    jumpToDetail(movie)
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
            <RatioImage imgUrl={item.vod_pic} ratio={1.4} />
            <div className="movie-name">{item.vod_name}</div>
          </div>
        );
      })}
    </div>
  );
};
export default MovieList;
