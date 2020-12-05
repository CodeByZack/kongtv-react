let WATCH_HISTORY = null;
let SEARCH_HISTORY = null;

const WATCH_HISTORY_KEY = 'WATCH_HISTORY_KEY';
const SEARCH_HISTORY_KEY = 'SEARCH_HISTORY_KEY';

const initLocalStorage = () => {
  const wHistory = localStorage.getItem(WATCH_HISTORY_KEY) || '[]';
  const sHistory = localStorage.getItem(SEARCH_HISTORY_KEY) || '[]';
  WATCH_HISTORY = JSON.parse(wHistory);
  SEARCH_HISTORY = JSON.parse(sHistory);
};

const getWatchHistory = () => {
  return WATCH_HISTORY;
};

const getSearchHistory = () => {
  return SEARCH_HISTORY;
};

const addWatchHistory = obj => {
  WATCH_HISTORY.push(obj);
  if (SEARCH_HISTORY.length > 30) {
    SEARCH_HISTORY.shift();
  }
  localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(WATCH_HISTORY));
};

const addSearchHistory = obj => {
  SEARCH_HISTORY.push(obj);
  if (SEARCH_HISTORY.length > 5) {
    SEARCH_HISTORY.shift();
  }
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(SEARCH_HISTORY));
};

initLocalStorage();

export default {
  getWatchHistory,
  getSearchHistory,
  addSearchHistory,
  addWatchHistory,
};
