import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './page/home';
import MovieDetail from './page/detail';
import PlayMovie from './page/play';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/play" component={PlayMovie} />
          <Route path="/detail" component={MovieDetail} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
