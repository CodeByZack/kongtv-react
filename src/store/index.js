import { init } from '@rematch/core';
import home from './modules/home';
import play from './modules/play';
import detail from './modules/detail';

const store = init({
  models: {
    home,
    play,
    detail,
  },
});

export default store;
