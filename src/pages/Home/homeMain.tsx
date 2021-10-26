import Swiper from '../../components/swiper';
import store from '../../store';
import { IMovieItem } from '../../types';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Box, Skeleton, Typography } from '@material-ui/core';
import MovieList, { MovieListSkeleton } from '../../components/MovieList';

interface IProps {
  data: IMovieItem[];
}
interface IHomeItemProps {
  title: string;
  movies: IMovieItem[];
}

const HomeItem = (props: IHomeItemProps) => {
  const { title, movies } = props;
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <LocalMoviesIcon />
        <Typography component="span">{title}</Typography>
        <Box sx={{ flex: 1 }} />
        <KeyboardArrowRightIcon />
      </Box>
      <MovieList movies={movies} />
    </Box>
  );
};

const HomeItemSkeleton = (props: Pick<IHomeItemProps, 'title'>) => {
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <LocalMoviesIcon />
        <Typography component="span">{props.title}</Typography>
        <Box sx={{ flex: 1 }} />
        <KeyboardArrowRightIcon />
      </Box>
      <MovieListSkeleton />
    </Box>
  );
};
const HomeMainSkeleton = () => {
  return (
    <div className="home_main_page" style={{ height: '100%', overflow: 'auto' }}>
      <Skeleton animation="wave" sx={{ m: 2 }} variant="rectangular" height={198} />
      <HomeItemSkeleton title={'热播影视'} />
      <HomeItemSkeleton title={'热播电影'} />
      <HomeItemSkeleton title={'热播综艺'} />
      <HomeItemSkeleton title={'热播动漫'} />
    </div>
  );
};

const HomeMain = () => {
  const { home } = store.useContainer();
  const { adviceMovieList: data, isFetching } = home;

  const dy = data.filter((movie) => movie.type_id_1 === 1);
  const dsj = data.filter((movie) => movie.type_id_1 === 2);
  const zy = data.filter((movie) => movie.type_id === 3);
  const dm = data.filter((movie) => movie.type_id === 4);

  const { detail, jumpUtil } = store.useContainer();
  const { jumpToDetail } = jumpUtil;

  const swipers = [dy[0], dsj[0], zy[0], dm[0], dy[1]].filter((i) => i);

  const onSwiperItemClick = (movie: IMovieItem) => {
    detail.setNowMovie(movie);
    jumpToDetail();
  };

  if (isFetching) {
    return <HomeMainSkeleton />;
  }

  return (
    <div className="home_main_page">
      <Swiper imgArr={swipers} onSwiperItemClick={onSwiperItemClick}></Swiper>
      <HomeItem title={'热播影视'} movies={dsj} />
      <HomeItem title={'热播电影'} movies={dy} />
      <HomeItem title={'热播综艺'} movies={zy} />
      <HomeItem title={'热播动漫'} movies={dm} />
    </div>
  );
};

export default HomeMain;
