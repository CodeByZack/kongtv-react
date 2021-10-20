import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import defaultImg from '../../assets/placeholder.png';
import store from '../../store';
import { IMovieItem } from '../../types';

// const useStyles = makeStyles((theme) => ({
//   movieRoot: {
//     width: '100%',
//   },
//   movieImage: {
//     paddingTop: '133.33%',
//   },
//   movieTitle: {
//     padding: '5px 10px!important',
//   },
// }));

interface IProps {
  data: IMovieItem;
}

const MovieItem = (props: IProps) => {
  const { data } = props;
  //   const styles = useStyles();

  const { detail, jumpUtil } = store.useContainer();
  const { jumpToDetail } = jumpUtil;
  const onMovieClick = () => {
    detail.setNowMovie(data);
    jumpToDetail();
  };

  const bkUrl = `url(${data.vod_pic}),url(${defaultImg})`;

  return (
    <Card onClick={onMovieClick}>
      <CardMedia
        sx={{
            paddingTop: '133.33%'
        }}
        style={{ backgroundImage: bkUrl }}
        // image={tile.vod_pic}
        title={data.vod_name}
      />
      <CardContent sx={{
          padding: '5px 10px!important',
      }}>
        <Typography align="center" noWrap variant="body2" color="textSecondary" component="p">
          {data.vod_name}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MovieItem;
