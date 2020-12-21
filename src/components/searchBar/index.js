import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { InputBase, AppBar, Toolbar, IconButton, Chip, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import storeUtils from '@/utils/storeUtils';

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
  searchHistoryRoot: {
    padding: theme.spacing(0, 4),
  },
  chip: {
    color: theme.palette.primary.contrastText,
    // borderColor:theme.palette.primary.contrastText,
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const SearchBar = props => {
  const { onSearch, placeholder = defaultPlaceHolder, onBack = noop } = props;

  const classes = useStyles();
  const [showHistory, setShowHistory] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleInput = e => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13 && onSearch) {
      onSearch(searchText);
      setShowHistory(false);
    }
  };

  const handleHistoryClick = e => () => {
    console.log(e);
    setSearchText(e);
    onSearch(e);
    setShowHistory(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowHistory(false)}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={onBack} edge="start" className={classes.menuButton} color="inherit">
            <ArrowBackIcon />
          </IconButton>
          <InputBase
            onFocus={() => setShowHistory(true)}
            // onBlur={() => setShowHistory(false)}
            onKeyUp={handleKeyUp}
            value={searchText}
            placeholder={placeholder}
            onChange={handleInput}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
          <IconButton onClick={()=>onSearch(searchText)} edge="end" className={classes.menuButton} color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>

        {showHistory && (
          <div className={classes.searchHistoryRoot}>
            {storeUtils.getSearchHistory().map(t => (
              <Chip
                onClick={handleHistoryClick(t)}
                className={classes.chip}
                color="primary"
                size="small"
                label={t}
                variant="outlined"
              />
            ))}
          </div>
        )}
      </AppBar>
    </ClickAwayListener>
  );
};
export default SearchBar;
