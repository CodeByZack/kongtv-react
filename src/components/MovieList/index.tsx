import { Grid } from '@material-ui/core';
import { IMovieItem } from '../../types';
import MovieItem from '../MovieItem';

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
          <Grid item xs={4}>
            <MovieItem data={tile} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieList;
