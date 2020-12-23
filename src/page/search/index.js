import React from 'react';
import store from '@/store';
import { Toast, SearchBar } from '@/components';
import MovieList from '@/page/components/movieList/index';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    minHeight: 'calc(100vh - 56px)'
  },
}));

const MovieSearch = () => {
  const { searchState, jumpUtil } = store.useContainer();
  const { jumpBack } = jumpUtil;
  const { searchText, searchRes, setSearchText, search } = searchState;
  const styles = useStyles();
  const onSearch = e => {
    if (!e) {
      Toast.info('输入搜索关键字！');
      return;
    }
    search(e);
  };
  return (
    <div className="movie-search-page">
      <SearchBar
        onBack={jumpBack}
        onSearch={onSearch}
        placeholder="输入你要搜索的名字"
        value={searchText}
        onChange={setSearchText}
      />
      <div className={styles.root}>
        <MovieList movies={searchRes} />
      </div>
    </div>
  );
};
export default MovieSearch;
