import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fade from '@material-ui/core/Fade';
import Store from '@/store';

const noop = () => {};
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Fade appear={false} direction="down" in={!trigger}>
      {children}
    </Fade>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create('right'),
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      right: 0,
      pointerEvents: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '20ch',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const MyAppBar = props => {
  const { title = '风影院', onSearch = noop} = props;
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const { home } = Store.useContainer();
  const { setDrawerStatus = noop, drawerStatus } = home;

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch(searchValue);
    }
  };

  const onLeftClick = ()=>{
    setDrawerStatus(!drawerStatus);
  };

  const search = () => {
    onSearch();
  };
  return (
    <HideOnScroll {...props}>
      <AppBar {...props}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={onLeftClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.search} onKeyDown={handleKeyDown}>
            <div className={classes.searchIcon} onClick={search}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="输入电影名字"
              onChange={e => setSearchValue(e.target.value)}
              value={searchValue}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
        {props.children}
      </AppBar>
    </HideOnScroll>
  );
};

export const NavBar = props => {
  const { title = '风影院', onBack = noop } = props;
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          onClick={onBack}
          edge="start"
          className={classes.menuButton}
          color="inherit"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
