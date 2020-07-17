import React from 'react';
// import { jumpToDetail } from '../../../../utils/jumpUtil';
import RatioImage from '../../../../components/ratioImage';
import store from '../../../../store';
import './style.less';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const MovieList = props => {
  const { movies } = props;

  const { detail, jumpUtil } = store.useContainer();
  const { jumpToDetail } = jumpUtil;

  const classes = useStyles();
  const onMovieClick = movie => () => {
    detail.setNowMovie(movie);
    jumpToDetail(movie);
  };
  if (!movies) return null;
  return (
    <div className={classes.root}>
      {/* {movies.map(item => {
        return (
          <div
            className="movie-item"
            onClick={onMovieClick(item)}
            key={item.vod_id}
          >
            <RatioImage imgUrl={item.vod_pic} ratio={1.4} />
            <div className="movie-name">{item.vod_name}</div>
          </div>
        );
      })} */}
      <GridList cols={3} cellHeight={100} spacing={1} className={classes.gridList}>
        {movies.map((tile, index) => (
          <GridListTile
            key={tile.vod_pic}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
          >
            <img src={tile.vod_pic} alt={tile.vod_name} />
            <GridListTileBar
              title={tile.vod_name}
              titlePosition="bottom"
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.vod_name}`}
                  className={classes.icon}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
export default MovieList;
