import React from 'react';

// import { Tabs } from 'antd-mobile';
import { NavBar, Icon, MyAppBar } from '@/components';
import Toast from '@/components/toast/toast';
import HomeMain from './home_main/';
import HomeCategory from './home_category/';
import store from "@/store";
import { Tab,Tabs,Toolbar,CssBaseline, Fade,Paper } from "@material-ui/core";


const tabs = [
  { title: '首页', sub: '1' },
  { title: '电影', sub: '2' },
  { title: '电视剧', sub: '3' },
  { title: '动漫', sub: '4' },
  { title: '综艺', sub: '5' },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home = (props) => {
  const { home, dy, dsj, dm, zy, jumpUtil } = store.useContainer();
  const { jumpToSearch } = jumpUtil;
  const { setTabIndex, tabIndex, adviceMovieList } = home;

  const [value, setValue] = React.useState(0); 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onSearch = (value)=>{
    console.log(value);
    jumpToSearch();
  };

  if (adviceMovieList.length === 0) {
    return <Toast type="loading" content="加载数据中..." />;
  }
  console.log(value);
  return (
    <div className="home-page">
      <CssBaseline />
      <MyAppBar onSearch={onSearch}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="首页" {...a11yProps(0)} />
          <Tab label="电影" {...a11yProps(1)} />
          <Tab label="电视剧" {...a11yProps(2)} />
          <Tab label="综艺" {...a11yProps(3)} />
          <Tab label="动漫" {...a11yProps(4)} />
        </Tabs>
      </MyAppBar>

      <Toolbar />
      <Toolbar />

      <Fade mountOnEnter unmountOnExit in={value===0} ><div><HomeMain data={adviceMovieList} /></div></Fade>
      <Fade mountOnEnter unmountOnExit in={value===1} ><div><HomeCategory type="dy" data={dy.list} isLoading={dy.isFetching} getCategoryList={dy.getData} /></div></Fade>
      <Fade mountOnEnter unmountOnExit in={value===2} ><div><HomeCategory type="dsj" data={dsj.list} isLoading={dsj.isFetching} getCategoryList={dsj.getData} /></div></Fade>
      <Fade mountOnEnter unmountOnExit in={value===3} ><div><HomeCategory type="dm" data={dm.list} isLoading={dm.isFetching} getCategoryList={dm.getData} /></div></Fade>
      <Fade mountOnEnter unmountOnExit in={value===4} ><div><HomeCategory type="zy" data={zy.list} isLoading={zy.isFetching} getCategoryList={zy.getData} /></div></Fade>

    </div>
  );
};

export default Home;
