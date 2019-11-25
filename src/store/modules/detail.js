const detail = {
  state: {
    nowMovie: null,
  },
  reducers: {
    setNowMovie(state, movie) {
      return {
        ...state,
        nowMovie: movie,
      };
    },
    clear() {
      return {
        nowMovie: null,
      };
    },
  },
};

export default detail;
