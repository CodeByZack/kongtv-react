import React from 'react';
import { MyAppBar } from '@/components';
import store from '@/store';
import HomeMain from './home_main/';
import HomeCategory from './home_category/';
import Toast from '@/components/toast/toast';
import { Tab, Tabs, Toolbar, CssBaseline } from '@material-ui/core';
import MyDrawer from './home_drawer';

// const tabs = [
//   { title: '首页', sub: '1' },
//   { title: '电影', sub: '2' },
//   { title: '电视剧', sub: '3' },
//   { title: '动漫', sub: '4' },
//   { title: '综艺', sub: '5' },
// ];

const Home = props => {
  const { home, jumpUtil } = store.useContainer();
  const { jumpToSearch } = jumpUtil;
  const { setTabIndex, tabIndex, adviceMovieList } = home;

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const onSearch = value => {
    jumpToSearch();
  };

  if (adviceMovieList.length === 0) {
    return <Toast type="loading" content="加载数据中..." />;
  }
  return (
    <div className="home-page">
      <CssBaseline />
      <MyAppBar onSearch={onSearch}>
        <Tabs
          variant="scrollable"
          value={tabIndex}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="首页" />
          <Tab label="电视剧" />
          <Tab label="动漫" />
          <Tab label="电影" />
          <Tab label="综艺" />
          <Tab label="福利" />
        </Tabs>
      </MyAppBar>
      <MyDrawer />
      <Toolbar />
      <Toolbar />

      {tabIndex === 0 && <HomeMain data={adviceMovieList} />}
      {tabIndex === 1 && <HomeCategory type="dsj" />}
      {tabIndex === 2 && <HomeCategory type="dm" />}
      {tabIndex === 3 && <HomeCategory type="dy" />}
      {tabIndex === 4 && <HomeCategory type="zy" />}
      {tabIndex === 5 && <HomeCategory type="ll" />}
    </div>
  );
};

export default Home;
