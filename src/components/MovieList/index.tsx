import { Grid } from '@material-ui/core';
import { IMovieItem } from '../../types';
import MovieItem, { MovieItemSkeleton } from '../MovieItem';

interface IProps {
  movies: IMovieItem[];
}

const MovieList = (props: IProps) => {
  const { movies } = props;

  if (!movies) return null;

  return (
    <div>
      <Grid container spacing={1}>
        {movies.map((tile, index) => (
          <Grid key={index} item xs={4}>
            <MovieItem data={tile} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export const MovieListSkeleton = () => {
  return (
    <Grid container spacing={1}>
      {[1, 2, 3, 4, 5, 6].map((tile) => (
        <Grid  key={tile} item xs={4}>
          <MovieItemSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
