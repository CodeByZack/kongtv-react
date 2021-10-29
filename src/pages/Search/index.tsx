import { Box, CssBaseline, Toolbar } from '@mui/material';
import MovieList from '../../components/MovieList';
import SearchBar from '../../components/SearchBar';
import store from '../../store';

const MovieSearch = () => {
  const { searchState, jumpUtil } = store.useContainer();
  const { jumpBack } = jumpUtil;
  const { searchRes, search } = searchState;

  const onSearch = (e: string) => {
    if (!e) {
      console.info('输入搜索关键字！');
      return;
    }
    search(e);
  };

  return (
    <div className="movie-search-page">
      <CssBaseline />
      <SearchBar onBack={jumpBack} onSearch={onSearch} placeholder="输入你要搜索的名字" />
      <Toolbar />
      <Box sx={{ bgcolor: 'background.default', p: 1, minHeight: 'calc(100vh - 56px)' }}>
        <MovieList movies={searchRes} />
      </Box>
    </div>
  );
};
export default MovieSearch;
