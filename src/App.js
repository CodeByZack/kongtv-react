import React from 'react';
import Home from './page/home';
import store from './store/index';
import PlayMovie from './page/play';
import MovieDetail from './page/detail';
import MovieSearch from './page/search';
import ScrollToTop from './components/ScrollToTop';

import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <ScrollToTop>
            <Switch>
              <Route path="/play" component={PlayMovie} />
              <Route path="/detail" component={MovieDetail} />
              <Route path="/search/:query" component={MovieSearch} />
              <Route path="/search" component={MovieSearch} />
              <Route path="/" component={Home} />
            </Switch>
          </ScrollToTop>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
