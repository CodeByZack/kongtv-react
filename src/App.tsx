import { Slide } from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import { checkBrowser } from './utils';
import { ThemeProvider } from '@mui/material/styles';
import { lazy, Suspense, useState } from 'react';
import themeObj from './utils/theme';
import LoadingPage from './components/LoadingPage';

const Home = lazy(() => import('./pages/Home'));
const Play = lazy(() => import('./pages/Play'));
const Detail = lazy(() => import('./pages/Detail'));
const Search = lazy(() => import('./pages/Search'));
const WatchHistory = lazy(() => import('./pages/WatchHistory'));

const routes = [
  { path: '/play', Component: Play },
  { path: '/detail', Component: Detail },
  { path: '/search/:query', Component: Search },
  { path: '/search', Component: Search },
  { path: '/watchhistory', Component: WatchHistory },
  { path: '/', Component: Home },
];

const isSafari = checkBrowser() === 'Safari';
// const isMobile = checkIsMobile();

const renderWithTransition = (path: string, Component: React.FC) => {
  const render = (props: any) => {
    const { match, history } = props;

    if (!isSafari) {
      const direction = history.action === 'POP' ? 'right' : 'left';
      return (
        <Slide direction={direction} in={match != null} unmountOnExit>
          <div className="page">
            <Component />
          </div>
        </Slide>
      );
    } else {
      if (history.action === 'POP') {
        return <Component />;
      } else {
        return (
          <Slide direction="left" in={match != null} unmountOnExit>
            <div className="page">
              <Component />
            </div>
          </Slide>
        );
      }
    }
  };
  return (
    <Route key={path} exact path={path}>
      {render}
    </Route>
  );
};

const App = () => {
  const [theme, setTheme] = useState(themeObj.defaultTheme);
  const toggoleTheme = (type: any): void => {
    setTheme(themeObj.ThemeArr[type]);
    themeObj.setThemeLocal(type);
  };
  return (
    <BrowserRouter>
      <store.Provider initialState={{ toggoleTheme, theme }}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              {routes.map(({ path, Component }) => renderWithTransition(path, Component))}
            </Switch>
          </Suspense>
        </ThemeProvider>
      </store.Provider>
    </BrowserRouter>
  );
};

export default App;
