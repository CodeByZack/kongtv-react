import React from 'react';

// import { Tabs } from 'antd-mobile';
import { NavBar, Icon, Tabs } from '@/components';
import Toast from '@/components/toast/toast';
import HomeMain from './home_main/';
import HomeCategory from './home_category/';

import store from '@/store';
import logo from '@/assets/logo192.png';
// import { jumpToSearch } from '@/utils/jumpUtil';

const tabs = [
  { title: '首页', sub: '1' },
  { title: '电影', sub: '2' },
  { title: '电视剧', sub: '3' },
  { title: '动漫', sub: '4' },
  { title: '综艺', sub: '5' },
];

const Home = () => {
  const { home, dy, dsj, dm, zy, jumpUtil } = store.useContainer();
  const { jumpToSearch } = jumpUtil;
  const { setTabIndex, tabIndex, adviceMovieList } = home;

  if (adviceMovieList.length === 0) {
    return <Toast type="loading" content="加载数据中..." />;
  }

  return (
    <div className="home-page">
      <NavBar
        mode="light"
        icon={<img src={logo} alt="logo" style={{ width: 30, height: 30 }} />}
        rightContent={[<Icon key="0" type="search" onClick={jumpToSearch} />]}
      >
        风影院
      </NavBar>
      <Tabs
        tabs={tabs}
        initialPage={tabIndex}
        onChange={(tab, index) => {
          setTabIndex(index);
        }}
        onTabClick={index => {
          setTabIndex(index);
        }}
      >
        <HomeMain data={adviceMovieList} />
        <HomeCategory
          type="dy"
          isLoading={dy.isFetching}
          data={dy.list}
          getCategoryList={dy.getData}
        />
        <HomeCategory
          type="dsj"
          isLoading={dsj.isFetching}
          data={dsj.list}
          getCategoryList={dsj.getData}
        />
        <HomeCategory
          isLoading={dm.isFetching}
          type="dm"
          data={dm.list}
          getCategoryList={dm.getData}
        />
        <HomeCategory
          isLoading={zy.isFetching}
          type="zy"
          data={zy.list}
          getCategoryList={zy.getData}
        />
      </Tabs>
    </div>
  );
};

export default Home;
