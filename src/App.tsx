import { Slide } from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Play from './pages/Play';
import Search from './pages/Search';
import WatchHistory from './pages/WatchHistory';
import store from './store';
import { checkBrowser } from './utils';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import themeObj from './utils/theme';
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
          <Switch>
            {routes.map(({ path, Component }) => renderWithTransition(path, Component))}
          </Switch>
        </ThemeProvider>
      </store.Provider>
    </BrowserRouter>
  );
};

export default App;
