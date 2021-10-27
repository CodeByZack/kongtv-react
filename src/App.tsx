import { Router } from '@reach/router';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Play from './pages/Play';
import store, { injectStore } from './store';

// const routes = [
//   { path: '/play', Component: PlayMovie },
//   { path: '/detail', Component: MovieDetail },
//   { path: '/search/:query', Component: MovieSearch },
//   { path: '/search', Component: MovieSearch },
//   { path: '/watchhistory', Component: WatchHistory },
//   { path: '/', Component: Home },
// ];

const App = () => {
  return (
    <Router>
      <store.Provider path="/">
        <Home path="/" />
        <Detail path="/detail" />
        <Play path="/play" />
      </store.Provider>
    </Router>
  );
};

export default App;
