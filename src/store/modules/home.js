import { getIndex,getCategory } from "../../http";

const home = {
  state: {
    adviceMovieList: [],
    tabIndex:0,
    dyCategory: {
      list : [],
      page : 0
    },
    dmCategory: {
      list : [],
      page : 0
    },
    zyCategory: {
      list : [],
      page : 0
    },
    dsjCategory: {
      list : [],
      page : 0
    }
  },
  reducers: {
    setAdviceList(state, movies) {
      return {
        ...state,
        adviceMovieList: movies
      };
    },
    addCategoryData(state, key, value){
      return{
        ...state,
        [key]: value
      }
    },
    setTabIndex(state,index){
      return{
        ...state,
        tabIndex : index
      }
    }
  },
  effects: {
    async getAdviceList() {
      const list = await getIndex();
      this.setAdviceList(list);
    },
    async getCategoryList({type},{home}) {
      const key = `${type}Category`;
      const { list, page } = home[key];
      const data = await getCategory(type,page+1);
      list.push(...data);
      const value = {
        list: [ ...list ],
        page: page+1
      };
      this.addCategoryData(key,value);
    }
  }
};

export default home;
