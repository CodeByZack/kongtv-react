import React from "react";
import './style.less';
const MovieList = (props) => {
  const { movies } = props;
  return (
    <div className="movie-list">
      {movies.map(item => {
        return (
          <div className="movie-item">
            <div className="img-wrapper">
              <img src={item.pic} alt={item.title}/>
            </div>
            <div className="movie-name">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};
export default MovieList;
