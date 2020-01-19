import home from './modules/home';
import play from './modules/play';
import detail from './modules/detail';
import search from './modules/search';
import createRematchPersist from '@rematch/persist';
import { init } from '@rematch/core';
import ReduxTool from "../utils/reduxtool";
import { createStore } from "redux";

// const persistPlugin = createRematchPersist({
//   whitelist: ['play', 'detail', 'search'],
//   throttle: 1000,
//   version: 1,
// });

// const store = init({
//   models: {
//     home,
//     play,
//     detail,
//     search,
//   },
//   plugins: [persistPlugin],
// });

const store = createStore(ReduxTool.createReducer({
  home,play,detail,search
}));
ReduxTool.ejectDispatch(store);

export default store;
