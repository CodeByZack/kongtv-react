import { RouteComponentProps } from '@reach/router';
import { CssBaseline, Tab, Tabs, Toolbar } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import MyDrawer from '../../components/MyDrawer';
import MyAppBar from '../../components/MyAppBar';
import store from '../../store';
import { Box } from '@material-ui/system';
import HomeCategory from './homeCategory';
import { MovieType } from '../../types';
import HomeMain from './homeMain';

interface IProps extends RouteComponentProps {}

const swStyle = { height: '100%' };

const Home = (props: IProps) => {
  const { home } = store.useContainer();
  const { drawerStatus, setDrawerStatus, tabIndex, setTabIndex, adviceMovieList } = home;

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
      <MyAppBar title="风影院" toggoleDrawer={() => setDrawerStatus(true)}>
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
      <MyDrawer open={drawerStatus} onClose={() => setDrawerStatus(false)} />
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
          <HomeMain data={adviceMovieList} />
          <HomeCategory type={MovieType.dy} />
          <HomeCategory type={MovieType.dsj} />
          <HomeCategory type={MovieType.dm} />
          <HomeCategory type={MovieType.zy} />
        </SwipeableViews>
      </Box>
    </Box>
  );
};
export default Home;
