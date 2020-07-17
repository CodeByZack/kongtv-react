import React from 'react';
// import { jumpToDetail } from '../../../../utils/jumpUtil';
import store from '../../../../store';
import './style.less';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { RatioImage } from '@/components';

const useStyles = makeStyles(theme => ({
  root: {
    width:"100%",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    width:"100%",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListItem:{
    // height:"300px!important"
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
      <GridList cols={3} cellHeight={"auto"} spacing={1} className={classes.gridList}>
        {movies.map((tile, index) => (
          <GridListTile
            key={tile.vod_pic}
            classes={{
              root: classes.gridListItem
            }}
          >
            <RatioImage imgUrl={tile.vod_pic} imgAlt={tile.vod_name} ratio={4/3} />
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
