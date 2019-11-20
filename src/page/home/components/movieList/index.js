import React from "react";
import { withRouter } from "react-router-dom";
import './style.less';
const MovieList = (props) => {
  const { movies,history } = props;
  const onMovieClick = (movie)=>()=>{
    history.push({ pathname: "/detail", state: { movie }});
  }

  return (
    <div className="movie-list">
      {movies.map(item => {
        return (
          <div className="movie-item" onClick={onMovieClick(item)}>
            <div className="img-wrapper">
              <img src={item.vod_pic} alt={item.vod_name}/>
            </div>
            <div className="movie-name">{item.vod_name}</div>
          </div>
        );
      })}
    </div>
  );
};
export default withRouter(MovieList);
