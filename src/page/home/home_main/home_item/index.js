import React from 'react';
import { Icon } from '@/components';
import { makeStyles, Typography, Box, Divider, Paper  } from '@material-ui/core';
import MovieList from '@/page/components/movieList/';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import './style.less';

const useStyles = makeStyles((theme)=>({

  homeItemRoot : {
    margin : `0 ${theme.spacing(2)}px`,
    marginBottom : theme.spacing(1)
  },
  homeItemTitle : {
    padding : `${theme.spacing(1)}px 0`,
    fontSize : theme.spacing(2),
    color : theme.palette.text.secondary,
    display : 'flex',
    alignItems: 'center',
    "& span" : {
      flex : 1
    }
  }
}));

const HomeItem = props => {
  const { title, movies } = props;
  const styles = useStyles();
  return (
    <div className={styles.homeItemRoot}>
      <div className={styles.homeItemTitle}>
        <LocalMoviesIcon/>
        <Typography variant="span"><Box fontWeight={600} component="span" >{title}</Box></Typography>
        <KeyboardArrowRightIcon/>
      </div>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomeItem;
