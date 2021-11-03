import { Card, CardMedia, CardContent, Typography, Skeleton } from '@mui/material';
import defaultImg from '../../assets/placeholder.png';
import store from '../../store';
import { IMovieItem } from '../../types';
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
    jumpToDetail(data);
  };

  const bkUrl = `url(${data.vod_pic}),url(${defaultImg})`;

  return (
    <Card onClick={onMovieClick}>
      <CardMedia
        sx={{
          paddingTop: '133.33%',
        }}
        style={{ backgroundImage: bkUrl }}
        component="div"
        // image={tile.vod_pic}
        title={data.vod_name}
      />
      <CardContent
        sx={{
          padding: '5px 10px!important',
        }}
      >
        <Typography align="center" noWrap variant="body2" color="textSecondary" component="p">
          {data.vod_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const MovieItemSkeleton = () => {
  return (
    <Card>
      <Skeleton animation="wave" variant="rectangular" width="100%">
        <CardMedia
          sx={{
            paddingTop: '133.33%',
          }}
          component="div"
        />
      </Skeleton>
      <Skeleton animation="wave" variant="rectangular" width="100%">
        <CardContent
          sx={{
            padding: '5px 10px!important',
          }}
        >
          <Typography align="center" noWrap variant="body2" color="textSecondary" component="p">
            .
          </Typography>
        </CardContent>
      </Skeleton>
    </Card>
  );
};

export default MovieItem;
