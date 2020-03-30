import React, { useEffect } from 'react';

import logo from '../../assets/logo192.png';
import HomeMain from './home_main/';
import HomeCategory from './home_category/';

import { NavBar, Icon, Tabs, Toast } from 'antd-mobile';
import { jumpToSearch } from '../../utils/jumpUtil';

import store from "../../store";

const tabs = [
  { title: '首页', sub: '1' },
  { title: '电影', sub: '2' },
  { title: '电视剧', sub: '3' },
  { title: '动漫', sub: '4' },
  { title: '综艺', sub: '5' },
];

const Home = props => {

  const {home,dy,dsj,dm,zy} = store.useContainer();

  const { setTabIndex, tabIndex, adviceMovieList  } = home;

  if (adviceMovieList.length === 0) {
    Toast.loading('content', 0, null, true);
    return '';
  } else {
    Toast.hide();
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
        onTabClick={(tab, index) => {
          setTabIndex(index);
        }}
      >
        <HomeMain data={adviceMovieList} />
        <HomeCategory
          type="dy"
          data={dy.list}
          getCategoryList={dy.getData}
        />
        <HomeCategory
          type="dsj"
          data={dsj.list}
          getCategoryList={dsj.getData}
        />
        <HomeCategory
          type="dm"
          data={dm.list}
          getCategoryList={dm.getData}
        />
        <HomeCategory
          type="zy"
          data={zy.list}
          getCategoryList={zy.getData}
        />
      </Tabs>
    </div>
  );
};


export default Home;
