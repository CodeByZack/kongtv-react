/* eslint-disable react/display-name */
import { createContainer } from './unstate-next';
import { useState, useEffect } from 'react';
import { getCategory, getIndex, searchMovie } from '../http';
import React from 'react';
import { IMovieItem, IPlayInfo, MovieType } from '../types';
import storeUtils from '../utils/storeUtils';
import { useHistory } from 'react-router-dom';
import Toast from '../components/Toast';

const useStore = (themeHelper: any) => {
  const home = useHome();
  const dy = useCategory(MovieType.dy);
  const dsj = useCategory(MovieType.dsj);
  const dm = useCategory(MovieType.dm);
  const zy = useCategory(MovieType.zy);
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
    themeHelper,
  };
};

const useJumpUtil = () => {
  const history = useHistory();

  const jumpToDetail = (data: IMovieItem) => {
    history.push({ pathname: '/detail', state: data });
  };

  const jumpToSearch = () => {
    history.push({ pathname: '/search' });
  };

  const jumpToWatchHistory = () => {
    history.push({ pathname: '/watchhistory' });
  };

  const jumpToPlay = (playInfo: IPlayInfo) => {
    const url = `/play?name=${playInfo.title}-${playInfo.text}&url=${playInfo.link}`;
    history.push(url);
  };

  const jumpToHome = (msg?: string) => {
    // eslint-disable-next-line no-console
    console.log(msg);
    history.push({ pathname: '/' });
  };

  const jumpBack = () => history.goBack();

  return { jumpToDetail, jumpToWatchHistory, jumpToSearch, jumpToPlay, jumpBack, jumpToHome };
};

const useHome = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [adviceMovieList, setAdviceMovieList] = useState<IMovieItem[]>([]);

  const getAdviceData = async () => {
    setIsFetching(true);
    const data = await getIndex();
    setAdviceMovieList(data);
    setIsFetching(false);
  };

  useEffect(() => {
    getAdviceData();
  }, []);

  return {
    isFetching,
    tabIndex,
    setTabIndex,
    adviceMovieList,
    drawerStatus,
    setDrawerStatus,
  };
};
const useCategory = (type: MovieType) => {
  const [page, setPage] = useState(0);
  const [list, setList] = useState<IMovieItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterOption, setFilterOption] = useState<{ [x: string]: any }>({});

  const getData = async (resetPage?: boolean) => {
    if (resetPage) {
      setIsFetching(true);
      const data = await getCategory(type, { page: 1, pagesize: 9, ...filterOption });
      const newList = [...data];
      setList(newList);
      setPage(1);
      setIsFetching(false);
      return;
    }

    if (isFetching) return;
    setIsFetching(true);
    const data = await getCategory(type, { page: page + 1, pagesize: 9, ...filterOption });
    const newList = [...list, ...data];
    setList(newList);
    setPage(page + 1);
    setIsFetching(false);
  };

  useEffect(() => {
    getData(true);
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
  const [nowMovie, setNowMovie] = useState<IMovieItem>();
  const clear = () => setNowMovie(undefined);
  return {
    nowMovie,
    setNowMovie,
    clear,
  };
};

const useSearch = () => {
  const [searchRes, setSearchRes] = useState<IMovieItem[]>([]);

  const search = async (text: string) => {
    Toast.loading('正在加载数据', 0);
    // setSearchText(searchText);
    storeUtils.addSearchHistory(text);
    const data = await searchMovie(text);
    if (data.length === 0) {
      Toast.destroy();
      Toast.info('没有搜索到相关影片');
    } else {
      Toast.destroy();
    }
    setSearchRes(data);
  };
  return {
    searchRes,
    search,
  };
};

const store = createContainer(useStore);

export const injectStore =
  <T extends React.FC<any>>(Comp: T) =>
  (props: React.ComponentProps<T>) =>
    (
      <store.Provider>
        <Comp {...props} />
      </store.Provider>
    );

export default store;
