import React from 'react';
import Home from './page/home';
import store, { persistor } from './store/index';
import { PersistGate } from 'redux-persist/lib/integration/react';
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
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
