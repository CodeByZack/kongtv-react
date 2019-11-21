import { getIndex } from "../../http";

const home = {
  state: {
    adviceMovieList: [],
    dyList: [],
    dmList: [],
    zyList: [],
    dsjList: [],
  },
  reducers: {
    setAdviceList(state, movies) {
      return {
        ...state,
        adviceMovieList: movies
      };
    }
  },
  effects: {
    async getAdviceList() {
      const list = await getIndex();
      console.log(list);
      this.setAdviceList(list);
    }
  }
};

export default home;
