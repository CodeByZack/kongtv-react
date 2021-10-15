import { Router } from '@reach/router';
import Home from './pages/Home';
import Play from './pages/Play';

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
    <div>
      <Router>
        <Home path="/" />
        <Play path="/play" />
      </Router>
    </div>
  );
};

export default App;
