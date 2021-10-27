import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import HideOnScroll from '../HideOnScroll';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { PropsWithChildren } from 'react';
import { noop } from '../../types/constant';

interface IProps {
  title: string;
  toggoleDrawer?: () => void;
}

interface INavBarProps {
  title: string;
  onBack?: () => void;
}

const MyAppBar = (props: PropsWithChildren<IProps>) => {
  const { title, toggoleDrawer, ...restProps } = props;

  return (
    <HideOnScroll {...restProps}>
      <AppBar {...restProps}>
        <Toolbar>
          <IconButton onClick={toggoleDrawer} edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
            {title}
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="enter search">
            <SearchIcon />
          </IconButton>
        </Toolbar>
        {props.children}
      </AppBar>
    </HideOnScroll>
  );
};

export const NavBar = (props: INavBarProps) => {
  const { title = '风影院', onBack = noop } = props;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={onBack} edge="start" sx={{ mr: 2 }} color="inherit">
          <ArrowBackIcon />
        </IconButton>
        <Typography flexGrow={1} variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
