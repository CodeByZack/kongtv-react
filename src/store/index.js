import home from './modules/home';
import play from './modules/play';
import detail from './modules/detail';
import search from './modules/search';
import ReduxTool from '../utils/reduxtool';
import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

let rootReducer = ReduxTool.createReducer({
  home,
  play,
  detail,
  search,
});
rootReducer = persistReducer(
  {
    whitelist: ['play', 'detail', 'search'],
    throttle: 1000,
    version: 1,
    storage: storage,
    key: 'root',
  },
  rootReducer
);
const store = createStore(rootReducer);
ReduxTool.ejectDispatch(store);
export const persistor = persistStore(store);

export default store;
