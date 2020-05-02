import React from 'react';
import MovieList from '../components/movieList/';
import { Loading } from '@/components';
import './style.less';

const HomeCategory = props => {
  const { data, type, getCategoryList, isLoading } = props;

  const handleScroll = e => {
    console.log(isLoading);
    if (isLoading) return;
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if (scrollHeight - scrollTop - offsetHeight < 20) {
      getCategoryList({ type });
    }
  };

  return (
    <div onScroll={handleScroll} className="home_category_page">
      <MovieList movies={data} />
      {isLoading && <Loading />}
    </div>
  );
};
export default HomeCategory;
