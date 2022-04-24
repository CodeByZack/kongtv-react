import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import HideOnScroll from '../HideOnScroll';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { PropsWithChildren } from 'react';
import { noop } from '../../types/constant';

interface IProps {
  title: string;
  toggoleDrawer?: () => void;
  onSearch?: () => void;
}

interface INavBarProps {
  title: string;
  onBack?: () => void;
}

const MyAppBar = (props: PropsWithChildren<IProps>) => {
  const { title, toggoleDrawer, onSearch = noop, ...restProps } = props;

  return (
    <HideOnScroll {...restProps}>
      <AppBar {...restProps}>
        <Toolbar>
          <IconButton onClick={toggoleDrawer} edge="start" color="inherit" size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
            {title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onSearch} size="large">
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
        <IconButton onClick={onBack} edge="start" sx={{ mr: 2 }} color="inherit" size="large">
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
