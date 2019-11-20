import React, { useState } from "react";
import {
  NavBar,
  Icon,
  SearchBar,
  Tabs
} from "antd-mobile";
import HomeMain from './home_main/';
import HomeCategory from './home_category/';
const tabs = [
  { title: '首页', sub: '1' },
  { title: '电影', sub: '2' },
  { title: '电视剧', sub: '3' },
  { title: '动漫', sub: '4' },
  { title: '综艺', sub: '5' },
];

const Home = (props) => {
  const [showSearch, toggleSearch] = useState(false);
  return (
    <div className="home-page">
      {getHeader(showSearch, toggleSearch)}

      <Tabs
        tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          console.log("onChange", index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log("onTabClick", index, tab);
        }}
      >
        <HomeMain/>
        <HomeCategory type="电影"/>
        <HomeCategory type="电视剧"/>
        <HomeCategory type="综艺"/>
        <HomeCategory type="动漫"/>
      </Tabs>
    </div>
  );
};

export default Home;

const getHeader = (showSearch, toggleSearch) => {
  return !showSearch ? (
    <NavBar
      mode="light"
      icon={<Icon type="ellipsis" />}
      onLeftClick={() => toggleSearch(true)}
      rightContent={[
        <Icon key="0" type="search" onClick={() => toggleSearch(true)} />
      ]}
    >
      风影院
    </NavBar>
  ) : (
    <SearchBar
      placeholder="Search"
      onBlur={() => toggleSearch(false)}
      onCancel={() => toggleSearch(false)}
      showCancelButton
      style={{ height: 45 }}
      onChange={() => {
        console.log("onchange");
      }}
    />
  );
};
