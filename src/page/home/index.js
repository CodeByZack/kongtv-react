import React, { useEffect } from 'react';

import logo from '../../assets/logo192.png';
import HomeMain from './home_main/';
import HomeCategory from './home_category/';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavBar, Icon, Tabs } from 'antd-mobile';

const tabs = [
  { title: '首页', sub: '1' },
  { title: '电影', sub: '2' },
  { title: '电视剧', sub: '3' },
  { title: '动漫', sub: '4' },
  { title: '综艺', sub: '5' },
];

const Home = props => {
  const { getAdviceList, getCategoryList, setTabIndex, history } = props;
  const {
    tabIndex,
    adviceMovieList,
    dyCategoryList,
    dmCategoryList,
    dsjCategoryList,
    zyCategoryList,
  } = props;

  useEffect(() => {
    getAdviceList();
    getCategoryList({ type: 'dy' });
    getCategoryList({ type: 'dm' });
    getCategoryList({ type: 'dsj' });
    getCategoryList({ type: 'zy' });
  }, [getAdviceList, getCategoryList]);

  return (
    <div className="home-page">
      <NavBar
        mode="light"
        icon={<img src={logo} alt="logo" style={{ width: 30 }} />}
        rightContent={[
          <Icon
            key="0"
            type="search"
            onClick={() => history.push('/search')}
          />,
        ]}
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
export default connect(mapState, mapDispatch)(withRouter(Home));
