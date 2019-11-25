const play = {
  state: {
    nowPlay: null,
  },
  reducers: {
    setNowPlay(state, play) {
      return {
        ...state,
        nowPlay: play,
      };
    },
    clear() {
      return {
        nowPlay: null,
      };
    },
  },
};

export default play;
