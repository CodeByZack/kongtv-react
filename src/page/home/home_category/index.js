import React, { useEffect } from 'react';
import MovieList from '@/page/components/movieList/';
import { Loading } from '@/components';
import './style.less';

const HomeCategory = props => {
  const { data, type, getCategoryList, isLoading } = props;

  useEffect(()=>{
    let ticking = false;
    const doSomething = ()=> {
      if (isLoading) return;
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 20) {
        console.log("到底部了")
        getCategoryList({ type });
      }
    }
    const handleScroll = e => {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          doSomething();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll",handleScroll);
    return ()=>{
      window.removeEventListener("scroll",handleScroll);
    }
  },[isLoading]);

  return (
    <div className="home_category_page">
      <MovieList movies={data} />
      {isLoading && <Loading />}
    </div>
  );
};
export default HomeCategory;
