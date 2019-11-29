import home from './modules/home';
import play from './modules/play';
import detail from './modules/detail';
import search from './modules/search';

import { init } from '@rematch/core';

const store = init({
  models: {
    home,
    play,
    detail,
    search,
  },
});

export default store;
