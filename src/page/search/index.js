import React from 'react';
// import { SearchBar } from 'antd-mobile';

import { Icon, NavBar, Toast, SearchBar } from '@/components';

import store from '@/store';
import { jumpBack } from '@/utils/jumpUtil';
import MovieList from '@/page/home/components/movieList/index';
import './style.less';

const MovieSearch = () => {
  const { searchState } = store.useContainer();
  const { searchText, searchRes, setSearchText, search } = searchState;
  const onSearch = e => {
    if (!searchText) {
      Toast.info('输入搜索关键字！');
      return;
    }
    search(searchText);
  };
  return (
    <div className="movie-search-page">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={jumpBack}>
        搜索页面
      </NavBar>
      <SearchBar
        onSearch={onSearch}
        placeholder="输入你要搜索的名字"
        value={searchText}
        onChange={setSearchText}
      />
      <div style={{ padding: '0 8px' }}>
        <MovieList movies={searchRes} />
      </div>
    </div>
  );
};
export default MovieSearch;
