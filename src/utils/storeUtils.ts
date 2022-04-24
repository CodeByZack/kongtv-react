import { IJuJi, IMovieItem } from '../types';

let WATCH_HISTORY: Array<IMovieItem & { watch_history?: string }> | null = null;
let SEARCH_HISTORY: Array<string> | null = null;

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

const addWatchHistory = (obj: IMovieItem & { watch_history?: string }, item: IJuJi) => {
  if (!WATCH_HISTORY) return;

  const oldRecord = WATCH_HISTORY.find((o) => obj.vod_id === o.vod_id);
  if (oldRecord && oldRecord.watch_history === item.text) return;

  if (!oldRecord) {
    obj.watch_history = item.text;
    WATCH_HISTORY.push(obj);
    if (WATCH_HISTORY.length > 30) {
      WATCH_HISTORY.shift();
    }
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(WATCH_HISTORY));
  } else {
    oldRecord.watch_history = item.text;
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(WATCH_HISTORY));
  }
};

const addSearchHistory = (obj: string) => {
  if (!SEARCH_HISTORY) return;
  if (SEARCH_HISTORY.includes(obj)) return;
  SEARCH_HISTORY.push(obj);
  if (SEARCH_HISTORY.length > 10) {
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
