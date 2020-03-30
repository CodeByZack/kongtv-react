import { createContainer } from './unstate-next';
import { useState, useEffect } from 'react';
import { getCategory, getIndex, searchMovie } from '../http';
import { Toast } from 'antd-mobile';

const useStore = () => {
  const home = useHome();
  const dy = useCategory('dy');
  const dsj = useCategory('dsj');
  const dm = useCategory('dm');
  const zy = useCategory('zy');
  const detail = useDetail();
  const play = usePlay();
  const searchState = useSearch();
  return {
    home,
    dy,
    dsj,
    dm,
    zy,
    detail,
    play,
    searchState,
  };
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
    const data = await getCategory(type, page + 1);
    const newList = [...list, ...data];
    setIsFetching(false);
    setList(newList);
    setPage(page + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    isFetching,
    page,
    list,
    getData,
  };
};
const useDetail = () => {
  const [nowMovie, setNowMovie] = useState(null);
  const clear = () => setNowMovie(null);
  return {
    nowMovie,
    setNowMovie,
    clear,
  };
};
const usePlay = () => {
  const [nowPlay, setNowPlay] = useState(null);
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
