import React from 'react';

import Store from '@/store';
import Home from '@/page/home';
import PlayMovie from '@/page/play';
import MovieDetail from '@/page/detail';
import MovieSearch from '@/page/search';
import { Slide } from '@material-ui/core';
import ScrollToTop from '@/components/scrollToTop';
import { BrowserRouter, Route, Switch, matchPath } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { checkBrowser } from './utils';
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";

const history = createBrowserHistory();



const routes = [
  { path: '/play', Component: PlayMovie },
  { path: '/detail', Component: MovieDetail },
  { path: '/search/:query', Component: MovieSearch },
  { path: '/search', Component: MovieSearch },
  { path: '/', Component: Home },
];

Sentry.init({
  dsn: "https://9b7d035b5c8c4853a689ccfeac8426df@o476076.ingest.sentry.io/5515101",
  integrations: [
    new Integrations.BrowserTracing({
      // Can also use reactRouterV4Instrumentation
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history,routes,matchPath),
    })
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

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
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Store.Provider>
          <ScrollToTop>
            <Switch>
              {routes.map(({ path, Component }) => renderWithTransition(path, Component))}
            </Switch>
          </ScrollToTop>
        </Store.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
