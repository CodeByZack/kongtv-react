import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  CssBaseline,
} from '@mui/material';
import store from '../../store';
import storeUtils from '../../utils/storeUtils';
import { IMovieItem } from '../../types';
import { NavBar } from '../../components/MyAppBar';
import { RouteComponentProps } from '@reach/router';

interface IProps extends RouteComponentProps {}

const WatchHistory = (props: IProps) => {
  const [history, setHistory] = useState<
    (IMovieItem & {
      watch_history?: string | undefined;
    })[]
  >([]);
  const { jumpUtil, detail } = store.useContainer();
  const { jumpBack, jumpToDetail } = jumpUtil;
  useEffect(() => {
    const watchHistory = storeUtils.getWatchHistory();
    if (watchHistory?.length) {
      setHistory(watchHistory);
    }
  }, []);

  const jump = (movie: IMovieItem) => {
    detail.setNowMovie(movie);
    jumpToDetail(movie);
  };

  return (
    <>
      <NavBar title="观看记录" onBack={jumpBack} />
      <CssBaseline />
      {history.length > 0 ? (
        <List sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 56px)' }}>
          {history.map((item) => {
            const textInfo = (
              <>
                <Box
                  sx={{ mt: 0.5, textOverflow: 'ellipsis' }}
                  component="p"
                >{`${item.vod_area}-${item.vod_class}-${item.vod_director}`}</Box>
                <Box sx={{ mt: 0.5 }} component="p">{`观看至${item.watch_history}`}</Box>
              </>
            );

            return (
              <ListItem
                key={item.vod_name}
                alignItems="flex-start"
                onClick={() => {
                  jump(item);
                }}
              >
                <ListItemAvatar sx={{ mt: 0 }}>
                  <Avatar sx={{ width: 80, height: 80 }} variant="square" src={item.vod_pic} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ m: 0, pl: 2, color: 'text.primary' }}
                  primary={item.vod_name}
                  secondary={textInfo}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        ''
      )}
    </>
  );
};
export default WatchHistory;
