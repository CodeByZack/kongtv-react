import Swiper from '../../components/swiper';
import store from '../../store';
import { IMovieItem,homeType } from '../../types';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Skeleton, Typography } from '@mui/material';
import MovieList, { MovieListSkeleton } from '../../components/MovieList';

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
      {
        Object.entries(homeType).map((item,index)=> <HomeItemSkeleton title={item[1]} key={index}/> )
      }
    </div>
  );
};

const HomeMain = () => {
  const { home } = store.useContainer();
  const { adviceMovieList: data, isFetching } = home;
  const mapListData = ( v:string ):IMovieItem[] => {
    let type:string = ( v == 'dy' || v == 'dsj' ) ? 'type_id_1' : 'type_id'
    return data.filter((movie) => movie[type] ===( Object.keys(homeType).indexOf(v)+1))
  }
  const { detail, jumpUtil } = store.useContainer();
  const { jumpToDetail } = jumpUtil;
  const mapSwipers = ():IMovieItem[]=>{
    let list:IMovieItem[] = [mapListData('dy')[1]]
    Object.entries(homeType).forEach( item=>list.push(mapListData(item[0])[0]) )
    return list.filter((i) => i)
  }
  const onSwiperItemClick = (movie: IMovieItem):void => {
    detail.setNowMovie(movie);
    jumpToDetail(movie);
  };

  if (isFetching) {
    return <HomeMainSkeleton />;
  }

  return (
    <div className="home_main_page">
      <Swiper imgArr={[...mapSwipers()]} onSwiperItemClick={onSwiperItemClick}></Swiper>
      {
        Object.entries(homeType).map((item,index)=> <HomeItem title={item[1]} movies={mapListData(item[0])} key={index}/> )
      }
    </div>
  );
};

export default HomeMain;
