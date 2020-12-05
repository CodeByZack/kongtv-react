import React from 'react';
import './style.less';
import MovieItem from '../movieItem';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  gridList: {},
  gridListItem: {},
  titleBar: {},
  icon: {},
}));

const MovieList = props => {
  const { movies } = props;
  const classes = useStyles();

  if (!movies) return null;

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.gridList}>
        {movies.map((tile, index) => (
          <Grid item xs={4}>
            <MovieItem tile={tile} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieList;
