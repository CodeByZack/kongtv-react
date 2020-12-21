import React, { useEffect } from 'react';
import MovieList from '@/page/components/movieList/';
import { Loading } from '@/components';
import { makeStyles } from '@material-ui/core/styles';
import { AreaChipList, YearChipList } from '../components/chipList';
import store from '@/store';

const useStyles = makeStyles(theme => ({
  homeCategoryRoot: {
    height: 'calc(100vh - 80px)',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1),
  },
}));

const HomeCategory = props => {
  const { type } = props;
  const styles = useStyles();
  const categoryObj = store.useContainer()[type];
  const { filterOption, setFilterOption, getData, isFetching, list } = categoryObj;

  useEffect(() => {
    let ticking = false;
    const doSomething = () => {
      if (isFetching) return;
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 20) {
        getData();
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
  // eslint-disable-next-line
  }, [isFetching]);

  const handleFilterChange = key => item => {
    const option = { ...filterOption, [key]: item };
    setFilterOption(option);
  };

  return (
    <div className={styles.homeCategoryRoot}>
      <YearChipList nowShow={filterOption.year} onChange={handleFilterChange('year')} />
      <AreaChipList nowShow={filterOption.area} onChange={handleFilterChange('area')} />
      <MovieList movies={list} />
      {isFetching && <Loading />}
    </div>
  );
};
export default HomeCategory;
