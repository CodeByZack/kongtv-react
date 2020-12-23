import storeUtils from '@/utils/storeUtils';
import { useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavBar } from '@/components/myAppBar';
import store from '@/store';

import React from 'react';

const useStyle = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh - 56px)'
  },
  listAvatar: {
    marginTop: 0,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  mt: {
    marginTop: theme.spacing(0.5),
  },
  text: {
    color: theme.palette.text.primary,
    margin: 0,
    paddingLeft: theme.spacing(2),
  },
}));

const WatchHistory = () => {
  const [history, setHistory] = useState([]);
  const classes = useStyle();
  const { jumpUtil,detail } = store.useContainer();
  const { jumpBack,jumpToDetail } = jumpUtil;
  useEffect(() => {
    const watchHistory = storeUtils.getWatchHistory();
    if (watchHistory.length) {
      setHistory(watchHistory);
    }
  }, []);

  const jump = movie => {
    detail.setNowMovie(movie);
    jumpToDetail(movie);
  };

  return (
    <>
      <NavBar title="观看记录" onBack={jumpBack} />
      {history.length > 0 ? (
        <List className={classes.root}>
          {history.map(item => {
            const textInfo = (
              <>
                <p className={classes.mt}>{`${item.vod_area}-${item.vod_class}-${item.vod_director}`}</p>
                <p className={classes.mt}>{`观看至${item.watch_history}`}</p>
              </>
            );

            return (
              <ListItem alignItems="flex-start" onClick={()=>{jump(item)}}>
                <ListItemAvatar className={classes.listAvatar}>
                  <Avatar className={classes.avatar} variant="square" src={item.vod_pic} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.text}
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
