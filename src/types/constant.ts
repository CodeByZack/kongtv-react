import { MovieType } from '.';

export const noop = () => {};

export const TABS = [MovieType.dy, MovieType.dsj, MovieType.dm, MovieType.zy];

export const TABS_NAME = {
  [MovieType.dy]: '电影',
  [MovieType.dsj]: '电视剧',
  [MovieType.dm]: '动漫',
  [MovieType.zy]: '综艺',
};
