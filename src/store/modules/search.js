import { Toast } from 'antd-mobile';
import { searchMovie } from '../../http';
const search = {
  state: {
    searchText: '',
    searchRes: [],
    isSearching: false,
  },
  reducers: {
    setSearchText(state, text) {
      return {
        ...state,
        searchText: text,
      };
    },
    setSearchRes(state, res) {
      return {
        ...state,
        searchRes: res,
      };
    },
    setIsSearching(state, isSearching) {
      return {
        ...state,
        isSearching: isSearching,
      };
    },
  },
  effects: {
    async search(searchText) {
      Toast.loading('正在加载数据', 0);
      this.setSearchText(searchText);
      const data = await searchMovie(searchText);
      if (data.length === 0) {
        Toast.hide();
        Toast.info('没有搜索到相关影片');
      } else {
        Toast.hide();
      }
      this.setSearchRes(data);
    },
  },
};

export default search;
