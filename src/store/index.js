import { createContainer } from './unstate-next';
import { useState, useEffect } from 'react';
import { getCategory, getIndex, searchMovie } from '@/http';
import { Toast } from '@/components';
import { useHistory, useLocation } from 'react-router-dom';
import storeUtils from '@/utils/storeUtils';

const useStore = () => {
  const home = useHome();
  const dy = useCategory('dy');
  const dsj = useCategory('dsj');
  const dm = useCategory('dm');
  const zy = useCategory('zy');
  const detail = useDetail();
  const searchState = useSearch();
  const jumpUtil = useJumpUtil();
  return {
    home,
    dy,
    dsj,
    dm,
    zy,
    detail,
    searchState,
    jumpUtil,
  };
};

const useJumpUtil = () => {
  const history = useHistory();

  const jumpToDetail = state => {
    history.push({ pathname: '/detail', state });
  };

  const jumpToSearch = () => {
    history.push({ pathname: '/search' });
  };

  const jumpToPlay = state => {
    storeUtils.addWatchHistory(state);
    const url = `/play?name=${state.title}-${state.text}&url=${state.link}`;
    history.push(url);
  };

  const jumpToHome = msg => {
    // eslint-disable-next-line no-console
    console.log(msg);
    history.push({ pathname: '/' });
  };

  const jumpBack = () => history.goBack();

  return { jumpToDetail, jumpToSearch, jumpToPlay, jumpBack, jumpToHome };
};

const useHome = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [adviceMovieList, setAdviceMovieList] = useState([]);

  const getAdviceData = async () => {
    const data = await getIndex();
    setAdviceMovieList(data);
  };

  useEffect(() => {
    getAdviceData();
  }, []);

  return {
    tabIndex,
    setTabIndex,
    adviceMovieList,
    drawerStatus,
    setDrawerStatus,
  };
};
const useCategory = type => {
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterOption, setFilterOption] = useState({});

  const getData = async resetPage => {
    if (resetPage) {
      setIsFetching(true);
      const data = await getCategory(type, filterOption, 1);
      const newList = [...data];
      setList(newList);
      setPage(1);
      setIsFetching(false);
      return;
    }

    if (isFetching) return;
    setIsFetching(true);
    const data = await getCategory(type, filterOption, page + 1);
    const newList = [...list, ...data];
    setList(newList);
    setPage(page + 1);
    setIsFetching(false);
  };

  useEffect(() => {
    getData(true);
    // eslint-disable-next-line
  }, [filterOption]);

  return {
    isFetching,
    page,
    list,
    getData,
    filterOption,
    setFilterOption,
  };
};
const useDetail = () => {
  const location = useLocation();
  const nowMovieFromState = location.pathname === '/detail' ? location.state : null;
  const [nowMovie, setNowMovie] = useState(nowMovieFromState);
  const clear = () => setNowMovie(null);
  return {
    nowMovie,
    setNowMovie,
    clear,
  };
};

const useSearch = () => {
  const [searchRes, setSearchRes] = useState([]);

  const search = async (text) => {
    Toast.loading('正在加载数据', 0);
    // setSearchText(searchText);
    storeUtils.addSearchHistory(text);
    const data = await searchMovie(text);
    if (data.length === 0) {
      Toast.hide();
      Toast.info('没有搜索到相关影片');
    } else {
      Toast.hide();
    }
    setSearchRes(data);
  };
  return {
    searchRes,
    search,
  };
};

const store = createContainer(useStore);

export default store;
