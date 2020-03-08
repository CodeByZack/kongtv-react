import { createHashHistory } from 'history';
import store from '../store/index';
const history = createHashHistory();

const jumpToDetail = movie => {
  store.dispatch.detail.setNowMovie(movie);
  history.push({ pathname: '/detail' });
};

const jumpToSearch = () => {
  history.push({ pathname: '/search' });
};

const jumpToPlay = playObj => {
  store.dispatch.play.setNowPlay(playObj);
  history.push({ pathname: '/play' });
};

const jumpBack = () => history.goBack();

export { jumpToDetail, jumpToSearch, jumpToPlay, jumpBack };
