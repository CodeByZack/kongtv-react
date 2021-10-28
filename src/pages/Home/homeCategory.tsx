import { CircularProgress } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useEffect, useRef } from 'react';
import { YearChipList, AreaChipList } from '../../components/ChipList';
import MovieList from '../../components/MovieList';
import store from '../../store';
import { MovieType } from '../../types';

interface IProps {
  type: MovieType;
}

const HomeCategory = (props: IProps) => {
  const { type } = props;
  const categoryObj = store.useContainer()[type];
  const { filterOption, setFilterOption, getData, isFetching, list } = categoryObj;
  const boxRef = useRef<HTMLDivElement>();

  const handleFilterChange = (key: string) => (item: string) => {
    const option = { ...filterOption, [key]: item };
    setFilterOption(option);
  };

  useEffect(() => {
    if (!boxRef.current) return;
    let ticking = false;
    const doSomething = () => {
      if (isFetching) return;
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 20) {
        getData();
      }
    };
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething();
          ticking = false;
        });
        ticking = true;
      }
    };
    console.log(boxRef.current);
    boxRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      boxRef.current?.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, [isFetching]);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <YearChipList nowShow={filterOption.year} onChange={handleFilterChange('year')} />
      <AreaChipList nowShow={filterOption.area} onChange={handleFilterChange('area')} />
      <MovieList movies={list} />
      {isFetching && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <CircularProgress size={20} />
        </Box>
      )}
    </Box>
  );
};
export default HomeCategory;
