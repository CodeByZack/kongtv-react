import { CssBaseline, Tab, Tabs, Toolbar, Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import MyDrawer from '../../components/MyDrawer';
import MyAppBar from '../../components/MyAppBar';
import store from '../../store';
import HomeCategory from './homeCategory';
import { MovieType,tabsType } from '../../types';
import HomeMain from './homeMain';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
// import DarkIcon from '@mui/icons-material/Brightness4';
import LightIcon from '@mui/icons-material/Brightness7';
import DarkIcon from '@mui/icons-material/Brightness4';
import themeObj from '../../utils/theme'; 


const swStyle = { height: '100%' };


const useInitMenus = (jumpToWatchHistory: () => void,toggoleTheme:()=>void,themeHelper:any) => {
  const menus = [
    { txt: '观看记录', icon: <HistoryIcon />, onClick: jumpToWatchHistory },
    { txt: themeHelper.theme.palette.mode === 'dark' ? '夜间模式' : '白天模式',
      icon: themeHelper.theme.palette.mode === 'dark' ? <DarkIcon /> : <LightIcon />,
      onClick: toggoleTheme 
    },
    { txt: '关于', icon: <InfoIcon /> },
  ];
  return menus;
};

const Home = () => {
  const { home, jumpUtil,themeHelper } = store.useContainer();
  const { drawerStatus, setDrawerStatus, tabIndex, setTabIndex } = home;
  const toggoleTheme = ()=>{
    themeHelper.theme === themeObj.ThemeArr.dark ?
      themeHelper.toggoleTheme("light") : 
      themeHelper.toggoleTheme("dark");
    setDrawerStatus(false);
  }
  const menus = useInitMenus(jumpUtil.jumpToWatchHistory,toggoleTheme,themeHelper);

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
          {
            Object.entries(tabsType).map(item=>{
              return <Tab label={item[1]} key={item[0]} />
            })
          }
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
          {
            Object.keys(MovieType).map( item => {
              return <HomeCategory type={MovieType[item as MovieType]} />
            })
          }
        </SwipeableViews>
      </Box>
    </Box>
  );
};
export default Home;
