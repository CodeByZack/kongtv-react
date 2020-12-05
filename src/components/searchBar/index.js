import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const noop = () => {};
const defaultPlaceHolder = '请输入';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchBar = props => {
  const {
    onSearch,
    value,
    placeholder = defaultPlaceHolder,
    onBack = noop,
    onChange = noop,
  } = props;

  const classes = useStyles();
  const [showHistory, setShowHistory] = useState(false);

  const handleInput = e => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13 && onSearch) {
      onSearch();
      setShowHistory(false);
    }
  };

  const handleFocus = e => {
    console.log(e);
    setShowHistory(true);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={onBack} edge="start" className={classes.menuButton} color="inherit">
          <ArrowBackIcon />
        </IconButton>
        <InputBase
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
          value={value}
          placeholder={placeholder}
          onChange={handleInput}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton onClick={onSearch} edge="end" className={classes.menuButton} color="inherit">
          <SearchIcon />
        </IconButton>
      </Toolbar>
      {/* {showHistory && <div>历史记录，</div>} */}
    </AppBar>
  );
};
export default SearchBar;
