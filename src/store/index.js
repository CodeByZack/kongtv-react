import { createContainer } from './unstate-next';
import { useState, useEffect } from 'react';
import { getCategory, getIndex, searchMovie } from '@/http';
import { Toast } from '@/components';
import { useHistory, useLocation } from 'react-router-dom';

const useStore = () => {
  const home = useHome();
  const dy = useCategory('dy');
  const dsj = useCategory('dsj');
  const dm = useCategory('dm');
  const zy = useCategory('zy');
  const detail = useDetail();
  const play = usePlay();
  const searchState = useSearch();
  const jumpUtil = useJumpUtil();
  return {
    home,
    dy,
    dsj,
    dm,
    zy,
    detail,
    play,
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
    history.push({ pathname: '/play', state });
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
  };
};
const useCategory = type => {
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getData = async () => {
    if (isFetching) return;
    setIsFetching(true);
    const data = await getCategory(type, page + 1);
    const newList = [...list, ...data];
    setList(newList);
    setPage(page + 1);
    setIsFetching(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return {
    isFetching,
    page,
    list,
    getData,
  };
};
const useDetail = () => {
  const location = useLocation();
  const [nowMovie, setNowMovie] = useState(location.state);
  const clear = () => setNowMovie(null);
  return {
    nowMovie,
    setNowMovie,
    clear,
  };
};
const usePlay = () => {
  const location = useLocation();
  const [nowPlay, setNowPlay] = useState(location.state);
  const clear = () => setNowPlay(null);
  return {
    nowPlay,
    setNowPlay,
    clear,
  };
};
const useSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);

  const search = async () => {
    Toast.loading('正在加载数据', 0);
    setSearchText(searchText);
    const data = await searchMovie(searchText);
    if (data.length === 0) {
      Toast.hide();
      Toast.info('没有搜索到相关影片');
    } else {
      Toast.hide();
    }
    setSearchRes(data);
  };

  return {
    searchText,
    setSearchText,
    searchRes,
    search,
  };
};

const store = createContainer(useStore);

export default store;
