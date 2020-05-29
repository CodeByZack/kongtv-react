import React from 'react';
import { Icon } from '@/components/';
import './style.less';

const defaultPlaceHolder = '请输入';

const SearchBar = props => {
  const { onSearch, placeholder = defaultPlaceHolder, value, onChange } = props;
  const handleInput = e => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13 && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="search-bar" onKeyUp={handleKeyUp}>
      <Icon type="search" className="icon" />
      <input
        onChange={handleInput}
        value={value}
        placeholder={placeholder}
        className="search-bar-input"
      />
      <span className="search-bar-btn" onClick={onSearch}>
        搜索
      </span>
    </div>
  );
};
export default SearchBar;
