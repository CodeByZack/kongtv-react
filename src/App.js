import React, { Suspense, lazy, useState } from 'react';
import Store from '@/store';
import { Slide } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import ScrollToTop from '@/components/scrollToTop';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { checkBrowser } from './utils';
import { Loading } from './components';
import themeObj from '@/utils/theme';

const Home = lazy(() => import(/* webpackChunkName: "home" */ '@/page/home'));
const PlayMovie = lazy(() => import(/* webpackChunkName: "playmovie" */ '@/page/play'));
const MovieDetail = lazy(() => import(/* webpackChunkName: "moviedetail" */ '@/page/detail'));
const MovieSearch = lazy(() => import(/* webpackChunkName: "moviesearch" */ '@/page/search'));
const WatchHistory = lazy(() =>
  import(/* webpackChunkName: "watchhistory" */ '@/page/watchHistory')
);

const routes = [
  { path: '/play', Component: PlayMovie },
  { path: '/detail', Component: MovieDetail },
  { path: '/search/:query', Component: MovieSearch },
  { path: '/search', Component: MovieSearch },
  { path: '/watchhistory', Component: WatchHistory },
  { path: '/', Component: Home },
];

const isSafari = checkBrowser() === 'Safari';
// const isMobile = checkIsMobile();

const renderWithTransition = (path, Component) => {
  const render = props => {
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
  const [theme,setTheme] = useState(themeObj.defaultTheme);
  const toggoleTheme = (type)=>{
    if(type === "dark"){
      setTheme(themeObj.ThemeArr.dark);
      themeObj.setThemeLocal("dark");
    }else{
      themeObj.setThemeLocal("light");
      setTheme(themeObj.ThemeArr.light);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Store.Provider initialState={{toggoleTheme,theme}}>
        <Suspense fallback={<Loading fullpage />}>
          <ScrollToTop>
            <ThemeProvider theme={theme}>
              <Switch>
                {routes.map(({ path, Component }) => renderWithTransition(path, Component))}
              </Switch>
            </ThemeProvider>
          </ScrollToTop>
        </Suspense>
        </Store.Provider>
      </BrowserRouter>
    </div>
  );
};



export default App;
