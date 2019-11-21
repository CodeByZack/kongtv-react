const detail = {
  state: {
    nowMovie: null,
  },
  reducers: {
    setNowMovie(state, movie) {
      console.log( movie );
      return {
        ...state,
        nowMovie: movie
      };
    },
    clear(){
      return {
        nowMovie : null
      }
    }
  }
};

export default detail;
