import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './page/home';
import MovieDetail from './page/detail';
import PlayMovie from './page/play';
import store from './store/index';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/play" component={PlayMovie} />
            <Route path="/detail" component={MovieDetail} />
            <Route path="/" component={Home} />
          </Switch>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
