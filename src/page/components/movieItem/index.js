import {
  Card,
  CardMedia,
  makeStyles,
  CardContent,
  Typography,
} from '@material-ui/core';
import React from 'react';
import store from '@/store';
import defaultImg from '@/assets/placeholder.png';

const useStyles = makeStyles(theme => ({
  movieRoot: {
    width: '100%',
  },
  movieImage: {
    paddingTop: '133.33%',
  },
  movieTitle: {
    padding: '5px 10px!important',
  },
}));

const MovieItem = props => {
  const { tile } = props;
  const styles = useStyles();

  const { detail, jumpUtil } = store.useContainer();
  const { jumpToDetail } = jumpUtil;
  const onMovieClick = () => {
    detail.setNowMovie(tile);
    jumpToDetail(tile);
  };

  const bkUrl = `url(${tile.vod_pic}),url(${defaultImg})`;

  return (
    <Card className={styles.movieRoot} onClick={onMovieClick}>
      <CardMedia
        style={{ backgroundImage: bkUrl }}
        className={styles.movieImage}
        // image={tile.vod_pic}
        title={tile.vod_name}
      />
      <CardContent className={styles.movieTitle}>
        <Typography
          align="center"
          noWrap
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {tile.vod_name}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MovieItem;
