import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, SearchBar, Tabs } from 'antd-mobile';
import HomeMain from './home_main/';
import HomeCategory from './home_category/';
const tabs = [
  { title: '首页', sub: '1' },
  { title: '电影', sub: '2' },
  { title: '电视剧', sub: '3' },
  { title: '动漫', sub: '4' },
  { title: '综艺', sub: '5' },
];

const Home = props => {
  const { getAdviceList, getCategoryList, setTabIndex } = props;
  const {
    tabIndex,
    adviceMovieList,
    dyCategoryList,
    dmCategoryList,
    dsjCategoryList,
    zyCategoryList,
  } = props;
  const [showSearch, toggleSearch] = useState(false);

  useEffect(() => {
    getAdviceList();
    getCategoryList({ type: 'dy' });
    getCategoryList({ type: 'dm' });
    getCategoryList({ type: 'dsj' });
    getCategoryList({ type: 'zy' });
  }, [getAdviceList, getCategoryList]);

  return (
    <div className="home-page">
      {getHeader(showSearch, toggleSearch)}

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
          data={dyCategoryList}
          getCategoryList={getCategoryList}
        />
        <HomeCategory
          type="dsj"
          data={dsjCategoryList}
          getCategoryList={getCategoryList}
        />
        <HomeCategory
          type="zy"
          data={zyCategoryList}
          getCategoryList={getCategoryList}
        />
        <HomeCategory
          type="dm"
          data={dmCategoryList}
          getCategoryList={getCategoryList}
        />
      </Tabs>
    </div>
  );
};

const mapState = state => ({
  adviceMovieList: state.home.adviceMovieList,
  dyCategoryList: state.home.dyCategory.list,
  dmCategoryList: state.home.dmCategory.list,
  zyCategoryList: state.home.zyCategory.list,
  dsjCategoryList: state.home.dsjCategory.list,
  tabIndex: state.home.tabIndex,
});
const mapDispatch = ({
  home: { getAdviceList, getCategoryList, setTabIndex },
}) => ({
  getAdviceList: () => getAdviceList(),
  getCategoryList: d => getCategoryList(d),
  setTabIndex: i => setTabIndex(i),
});
export default connect(mapState, mapDispatch)(Home);

const getHeader = (showSearch, toggleSearch) => {
  return !showSearch ? (
    <NavBar
      mode="light"
      icon={<Icon type="ellipsis" />}
      onLeftClick={() => toggleSearch(true)}
      rightContent={[
        <Icon key="0" type="search" onClick={() => toggleSearch(true)} />,
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
        console.log('onchange');
      }}
    />
  );
};
