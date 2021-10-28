import { Router } from '@reach/router';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Play from './pages/Play';
import Search from './pages/Search';
import WatchHistory from './pages/WatchHistory';
import store, { injectStore } from './store';

const App = () => {
  return (
    <Router>
      <store.Provider path="/">
        <Home path="/" />
        <Detail path="/detail" />
        <Play path="/play" />
        <Search path="/search" />
        <WatchHistory path="/watchhistory" />
      </store.Provider>
    </Router>
  );
};

export default App;
