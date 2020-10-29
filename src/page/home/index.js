import React from 'react';
import { MyAppBar } from '@/components';
import store from '@/store';
import HomeMain from './home_main/';
import HomeCategory from './home_category/';
import Toast from '@/components/toast/toast';
import {
  Tab,
  Tabs,
  Toolbar,
  CssBaseline,
  Fade,
  Paper,
} from '@material-ui/core';
import MyDrawer from './home_drawer';

const tabs = [
  { title: '首页', sub: '1' },
  { title: '电影', sub: '2' },
  { title: '电视剧', sub: '3' },
  { title: '动漫', sub: '4' },
  { title: '综艺', sub: '5' },
];

const Home = props => {
  const { home, dy, dsj, dm, zy, jumpUtil } = store.useContainer();
  const { jumpToSearch } = jumpUtil;
  const { setTabIndex, tabIndex, adviceMovieList } = home;

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const onSearch = value => {
    console.log(value);
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
          variant="fullWidth"
          value={tabIndex}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="首页" />
          <Tab label="电视剧" />
          <Tab label="动漫" />
          <Tab label="电影" />
          <Tab label="综艺" />
        </Tabs>
      </MyAppBar>
      <MyDrawer />
      <Toolbar />
      <Toolbar />

      {tabIndex === 0 && <HomeMain data={adviceMovieList} />}
      {tabIndex === 1 && (
        <HomeCategory
          type="dsj"
          data={dsj.list}
          isLoading={dsj.isFetching}
          getCategoryList={dsj.getData}
        />
      )}
      {tabIndex === 2 && (
        <HomeCategory
          type="dm"
          data={dm.list}
          isLoading={dm.isFetching}
          getCategoryList={dm.getData}
        />
      )}
      {tabIndex === 3 && (
        <HomeCategory
          type="dy"
          data={dy.list}
          isLoading={dy.isFetching}
          getCategoryList={dy.getData}
        />
      )}
      {tabIndex === 4 && (
        <HomeCategory
          type="zy"
          data={zy.list}
          isLoading={zy.isFetching}
          getCategoryList={zy.getData}
        />
      )}
      {/* <Fade mountOnEnter unmountOnExit in={tabIndex===0} ><div><HomeMain data={adviceMovieList} /></div></Fade>
      <Fade mountOnEnter unmountOnExit in={tabIndex === 1}>
        <div>
          <HomeCategory
            type="dy"
            data={dy.list}
            isLoading={dy.isFetching}
            getCategoryList={dy.getData}
          />
        </div>
      </Fade>
      <Fade mountOnEnter unmountOnExit in={tabIndex === 2}>
        <div>
          <HomeCategory
            type="dsj"
            data={dsj.list}
            isLoading={dsj.isFetching}
            getCategoryList={dsj.getData}
          />
        </div>
      </Fade>
      <Fade mountOnEnter unmountOnExit in={tabIndex === 3}>
        <div>
          <HomeCategory
            type="dm"
            data={dm.list}
            isLoading={dm.isFetching}
            getCategoryList={dm.getData}
          />
        </div>
      </Fade>
      <Fade mountOnEnter unmountOnExit in={tabIndex === 4}>
        <div>
          <HomeCategory
            type="zy"
            data={zy.list}
            isLoading={zy.isFetching}
            getCategoryList={zy.getData}
          />
        </div>
      </Fade> */}
    </div>
  );
};

export default Home;
