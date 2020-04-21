import React from 'react';
import { Icon } from '@/components';
import MovieList from '../../components/movieList/';
import './style.less';

const HomeItem = props => {
  const { title, movies } = props;
  return (
    <div className="home-item-section">
      <div className="home-item-title">
        <Icon type="search" />
        {title}
      </div>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomeItem;
