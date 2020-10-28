import React from 'react';

import Store from '@/store';
import Home from '@/page/home';
import PlayMovie from '@/page/play';
import MovieDetail from '@/page/detail';
import MovieSearch from '@/page/search';
import { Fade, Slide } from '@material-ui/core';
import ScrollToTop from '@/components/scrollToTop';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { checkBrowser } from './utils';

const routes = [
  { path: '/play', Component: PlayMovie },
  { path: '/detail', Component: MovieDetail },
  { path: '/search/:query', Component: MovieSearch },
  { path: '/search', Component: MovieSearch },
  { path: '/', Component: Home },
];

const isSafari = checkBrowser() === 'Safari';

const renderWithTransition = (path, Component) => {
  const render = props => {
    const { match, history } = props;
    console.log('isSafari', isSafari);

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
  return (
    <div className="App">
      <BrowserRouter>
        <Store.Provider>
          <ScrollToTop>
            <Switch>
              {routes.map(({ path, Component }) =>
                renderWithTransition(path, Component)
              )}
            </Switch>
          </ScrollToTop>
        </Store.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
