import { CssBaseline, Tab, Tabs, Toolbar, Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import MyDrawer from '../../components/MyDrawer';
import MyAppBar from '../../components/MyAppBar';
import store from '../../store';
import HomeCategory from './homeCategory';
import HomeMain from './homeMain';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import LightIcon from '@mui/icons-material/Brightness7';
import RefreshIcon from '@mui/icons-material/Refresh';
import DarkIcon from '@mui/icons-material/Brightness4';
import themeObj from '../../utils/theme';
import { TABS, TABS_NAME } from '../../types/constant';
import Toast from '../../components/Toast';
import { clearCacheAndRefresh } from '../../http';
const swStyle = { height: '100%' };

const useInitMenus = (
  jumpToWatchHistory: () => void,
  toggoleTheme: () => void,
  themeHelper: any
) => {
  const menus = [
    { txt: '观看记录', icon: <HistoryIcon />, onClick: jumpToWatchHistory },
    {
      txt: themeHelper.theme.palette.mode === 'dark' ? '夜间模式' : '白天模式',
      icon: themeHelper.theme.palette.mode === 'dark' ? <DarkIcon /> : <LightIcon />,
      onClick: toggoleTheme,
    },
    {
      txt: '更新资源',
      onClick: async () => {
        window.open('http://fengxiaoci.cn/api.php/timming/index.html?enforce=1&name=bdzy');
        window.open('https://api.fengxiaoci.cn/movie/updateindex');
      },
      icon: <RefreshIcon />,
    },
    { txt: '关于', icon: <InfoIcon /> },
  ];
  return menus;
};

const Home = () => {
  const { home, jumpUtil, themeHelper } = store.useContainer();
  const { drawerStatus, setDrawerStatus, tabIndex, setTabIndex } = home;
  const toggoleTheme = () => {
    themeHelper.theme === themeObj.ThemeArr.dark
      ? themeHelper.toggoleTheme('light')
      : themeHelper.toggoleTheme('dark');
    setDrawerStatus(false);
  };
  const menus = useInitMenus(jumpUtil.jumpToWatchHistory, toggoleTheme, themeHelper);

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
          <Tab label="首页" key="home" sx={{ minWidth: 72, p: '6px 12px' }} />
          {TABS.map((item) => {
            return <Tab label={TABS_NAME[item]} key={item} sx={{ minWidth: 72, p: '6px 12px' }} />;
          })}
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
          {TABS.map((item) => (
            <HomeCategory type={item} key={item} />
          ))}
        </SwipeableViews>
      </Box>
    </Box>
  );
};
export default Home;
