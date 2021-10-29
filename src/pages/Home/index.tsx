import { CssBaseline, Tab, Tabs, Toolbar, Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import MyDrawer from '../../components/MyDrawer';
import MyAppBar from '../../components/MyAppBar';
import store from '../../store';
import HomeCategory from './homeCategory';
import { MovieType } from '../../types';
import HomeMain from './homeMain';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
// import DarkIcon from '@mui/icons-material/Brightness4';
import LightIcon from '@mui/icons-material/Brightness7';

const swStyle = { height: '100%' };

const useInitMenus = (jumpToWatchHistory: () => void) => {
  const menus = [
    { txt: '观看记录', icon: <HistoryIcon />, onClick: jumpToWatchHistory },
    { txt: '夜间模式', icon: <LightIcon /> },
    { txt: '关于', icon: <InfoIcon /> },
  ];
  return menus;
};

const Home = () => {
  const { home, jumpUtil } = store.useContainer();
  const { drawerStatus, setDrawerStatus, tabIndex, setTabIndex } = home;

  const menus = useInitMenus(jumpUtil.jumpToWatchHistory);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <MyAppBar
        title="风影院"
        onSearch={() => jumpUtil.jumpToSearch()}
        toggoleDrawer={() => setDrawerStatus(true)}
      >
        <Tabs
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="inherit"
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label="首页" />
          <Tab label="电视剧" />
          <Tab label="动漫" />
          <Tab label="电影" />
          <Tab label="综艺" />
        </Tabs>
      </MyAppBar>
      <MyDrawer menus={menus} open={drawerStatus} onClose={() => setDrawerStatus(false)} />
      <Toolbar />
      <Toolbar />

      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <SwipeableViews
          style={swStyle}
          slideStyle={swStyle}
          containerStyle={swStyle}
          index={tabIndex}
          onChangeIndex={handleChangeIndex}
        >
          <HomeMain />
          <HomeCategory type={MovieType.dsj} />
          <HomeCategory type={MovieType.dm} />
          <HomeCategory type={MovieType.dy} />
          <HomeCategory type={MovieType.zy} />
        </SwipeableViews>
      </Box>
    </Box>
  );
};
export default Home;
