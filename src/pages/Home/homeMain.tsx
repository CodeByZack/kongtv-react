import Swiper from '../../components/swiper';
import store from '../../store';
import { IMovieItem } from '../../types';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Box, Typography } from '@material-ui/core';
import MovieList from '../../components/MovieList';

interface IProps {
  data: IMovieItem[];
}

interface IHomeItemProps{
    title : string;
    movies : IMovieItem[];
}

const HomeItem = (props : IHomeItemProps) => {
  const { title, movies } = props;
  return (
    <Box>
      <Box>
        <LocalMoviesIcon />
        <Typography>{title}</Typography>
        <KeyboardArrowRightIcon />
      </Box>
      <MovieList movies={movies} />
    </Box>
  );
};

const HomeMain = (props: IProps) => {
  const { data } = props;

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
