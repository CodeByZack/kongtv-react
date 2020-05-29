import React from 'react';

import Store from '@/store';
import Home from '@/page/home';
import PlayMovie from '@/page/play';
import MovieDetail from '@/page/detail';
import MovieSearch from '@/page/search';
import ScrollToTop from '@/components/scrollToTop';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Store.Provider>
          <ScrollToTop>
            <Switch>
              <Route path="/play" component={PlayMovie} />
              <Route path="/detail" component={MovieDetail} />
              <Route path="/search/:query" component={MovieSearch} />
              <Route path="/search" component={MovieSearch} />
              <Route path="/" component={Home} />
            </Switch>
          </ScrollToTop>
        </Store.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
