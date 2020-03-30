import { createHashHistory } from 'history';
const history = createHashHistory();

const jumpToDetail = movie => {
  history.push({ pathname: '/detail' });
};

const jumpToSearch = () => {
  history.push({ pathname: '/search' });
};

const jumpToPlay = playObj => {
  history.push({ pathname: '/play' });
};

const jumpBack = () => history.goBack();

export { jumpToDetail, jumpToSearch, jumpToPlay, jumpBack };
