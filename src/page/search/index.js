import React from 'react';
import MovieList from '../home/components/movieList/index';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchBar, Toast, NavBar, Icon } from 'antd-mobile';

const MovieSearch = props => {
  const { searchText, searchRes, setSearchText, search, history } = props;
  const onSearch = e => {
    if (!searchText) {
      Toast.info('输入搜索关键字！');
      return;
    }
    search(searchText);
  };
  return (
    <div className="movie-search-page">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={history.goBack}
      >
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
const mapState = state => ({
  searchText: state.search.searchText,
  searchRes: state.search.searchRes,
  isSearching: state.search.isSearching,
});
const mapDispatch = ({ search: { search, setSearchText } }) => ({
  search: e => search(e),
  setSearchText: t => setSearchText(t),
});
export default connect(mapState, mapDispatch)(withRouter(MovieSearch));
