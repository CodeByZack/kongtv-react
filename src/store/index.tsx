/* eslint-disable react/display-name */
import { createContainer } from './unstate-next';
import { useState, useEffect } from 'react';
import { getCategory, getIndex, searchMovie } from '../http';
import React from 'react';
import { useNavigate } from '@reach/router';
import { IMovieItem, IPlayInfo, MovieType } from '../types';
import storeUtils from '../utils/storeUtils';

const useStore = () => {
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
  };
};

const useJumpUtil = () => {
  const navigate = useNavigate();

  const jumpToDetail = (data: IMovieItem) => {
    console.log(data);
    navigate('/detail', { replace: true });
  };

  const jumpToSearch = () => {
    navigate('/search');
  };

  const jumpToWatchHistory = () => {};

  const jumpToPlay = (playInfo: IPlayInfo) => {
    const url = `/play?name=${playInfo.title}-${playInfo.text}&url=${playInfo.link}`;
    navigate(url);
  };

  const jumpToHome = () => {};

  const jumpBack = () => {
    navigate('../');
  };

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
    // Toast.loading('正在加载数据', 0);
    // setSearchText(searchText);
    storeUtils.addSearchHistory(text);
    const data = await searchMovie(text);
    if (data.length === 0) {
      //   Toast.hide();
      //   Toast.info('没有搜索到相关影片');
    } else {
      //   Toast.hide();
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
