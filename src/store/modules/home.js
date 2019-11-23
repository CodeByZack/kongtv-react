import { getIndex, getCategory } from '../../http';

const home = {
  state: {
    adviceMovieList: [],
    tabIndex: 0,
    dyCategory: {
      list: [],
      page: 0,
      isFetching: false,
    },
    dmCategory: {
      list: [],
      page: 0,
      isFetching: false,
    },
    zyCategory: {
      list: [],
      page: 0,
      isFetching: false,
    },
    dsjCategory: {
      list: [],
      page: 0,
      isFetching: false,
    },
  },
  reducers: {
    setAdviceList(state, movies) {
      return {
        ...state,
        adviceMovieList: movies,
      };
    },
    addCategoryData(state, key, value) {
      return {
        ...state,
        [key]: value,
      };
    },
    setFetching(state, key, isFetching) {
      const obj = state[key];
      return {
        ...state,
        [key]: { ...obj, isFetching },
      };
    },
    setTabIndex(state, index) {
      return {
        ...state,
        tabIndex: index,
      };
    },
  },
  effects: {
    async getAdviceList() {
      const list = await getIndex();
      this.setAdviceList(list);
    },
    async getCategoryList({ type }, { home }) {
      const key = `${type}Category`;
      console.log(key);
      const { list, page, isFetching } = home[key];
      if (isFetching) return;

      this.setFetching(key, true);
      const data = await getCategory(type, page + 1);

      list.push(...data);
      const value = {
        list: [...list],
        page: page + 1,
        isFetching: false,
      };
      this.addCategoryData(key, value);
    },
  },
};

export default home;
