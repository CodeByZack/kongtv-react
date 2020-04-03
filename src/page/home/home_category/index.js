import React, { useRef } from 'react';
import MovieList from '../components/movieList/';
import { throttle } from '@/utils/';
import './style.less';

const HomeCategory = props => {
  const { data, type, getCategoryList } = props;
  const realDom = useRef(null);

  const handleScroll = e => {
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if (scrollHeight - scrollTop - offsetHeight < 20) {
      getCategoryList({ type });
    }
  };

  return (
    <div
      ref={realDom}
      onScroll={throttle(handleScroll, 100)}
      className="home_category_page"
    >
      <MovieList movies={data} />
    </div>
  );
};
export default HomeCategory;
