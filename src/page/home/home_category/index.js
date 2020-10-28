import React, { useEffect } from 'react';
import MovieList from '@/page/components/movieList/';
import { Loading } from '@/components';
import { makeStyles, useScrollTrigger } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  homeCategoryRoot : {
    height : 'calc(100vh - 80px)',
    boxSizing : 'border-box',
    backgroundColor : theme.palette.common.white,
    padding : theme.spacing(1),
    WebkitOverflowScrolling : 'touch'
  },
}))

const HomeCategory = props => {
  const { data, type, getCategoryList, isLoading } = props;
  const styles = useStyles();

  useEffect(() => {
    let ticking = false;
    const doSomething = () => {
      if (isLoading) return;
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 20) {
        console.log('到底部了');
        getCategoryList({ type });
      }
    };
    const handleScroll = e => {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          doSomething();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <div className={styles.homeCategoryRoot}>
      <MovieList movies={data} />
      {isLoading && <Loading />}
    </div>
  );
};
export default HomeCategory;
