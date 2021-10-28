import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Box, Chip, ClickAwayListener, IconButton, InputBase } from '@material-ui/core';
import { useState } from 'react';
import storeUtils from '../../utils/storeUtils';

interface IProps {
  onBack: () => void;
  onSearch: (str: string) => void;
  placeholder?: string;
}

const SearchBar = (props: IProps) => {
  const { onBack, onSearch, placeholder } = props;
  const [showHistory, setShowHistory] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13 && onSearch) {
      onSearch(searchText);
    }
  };

  const handleHistoryClick = (e: string) => () => {
    setSearchText(e);
    onSearch(e);
    setShowHistory(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowHistory(false)}>
      <AppBar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '2px 4px',
          }}
        >
          <IconButton onClick={onBack} sx={{ p: '10px', color: 'common.white' }}>
            <ArrowBackIcon />
          </IconButton>
          <InputBase
            onFocus={() => setShowHistory(true)}
            value={searchText}
            onKeyUp={handleKeyUp}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ ml: 1, flex: 1, color: 'common.white' }}
            placeholder={placeholder || ''}
          />
          <IconButton
            sx={{ p: '10px', color: 'common.white' }}
            onClick={() => onSearch(searchText)}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        {showHistory && (
          <Box sx={{ p: '4px' }}>
            {storeUtils.getSearchHistory()?.map((t) => (
              <Chip
                sx={{ color: 'primary.contrastText', px: 1 }}
                onClick={handleHistoryClick(t)}
                color="primary"
                size="small"
                label={t}
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </AppBar>
    </ClickAwayListener>
  );
};

export default SearchBar;