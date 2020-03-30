import React from 'react';
import MovieList from '../home/components/movieList/index';

import { jumpBack } from '../../utils/jumpUtil';
import { SearchBar, Toast, NavBar, Icon } from 'antd-mobile';
import store from '../../store';

const MovieSearch = props => {
  const { searchState } = store.useContainer();
  const { searchText,searchRes,setSearchText,search  } = searchState;
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
        onCancel={onSearch}
        onSubmit={onSearch}
        placeholder="输入你要搜索的名字"
        value={searchText}
        cancelText="搜索"
        onChange={setSearchText}
      />
      <div style={{ padding: '0 8px' }}>
        <MovieList movies={searchRes} />
      </div>
    </div>
  );
};
export default MovieSearch;
