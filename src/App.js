import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './page/home';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
