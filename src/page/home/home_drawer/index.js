import React from 'react';
import Store from '@/store';
import appLogo from '@/assets/logo192.png';
import bk from '@/assets/sun_main.png';
import {
  Avatar,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HistoryIcon from '@material-ui/icons/History';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  drawerTop: {
    width: '75vw',
    height: '25vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${bk})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  drawerAppName: {
    paddingTop: theme.spacing(1),
    color: theme.palette.common.white,
    textShadow: '5px -2px 4px #1820268f',
    // fontSize: 18
  },
  drawerIcon: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  drawerList: {},
}));

const MyDrawer = props => {
  const { home } = Store.useContainer();
  const { setDrawerStatus, drawerStatus } = home;

  const styles = useStyles();

  return (
    <Drawer open={drawerStatus} anchor={'left'} onClose={() => setDrawerStatus(false)}>
      <div className={styles.drawerTop}>
        <Avatar src={appLogo} className={styles.drawerIcon} />
        <Typography component="p" className={styles.drawerAppName}>
          风影院 V1.0.0
        </Typography>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText secondary="观看记录" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText secondary="关于" />
        </ListItem>
      </List>
    </Drawer>
  );
};
export default MyDrawer;
