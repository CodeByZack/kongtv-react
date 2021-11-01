export interface IMovieItem {
  vod_id: number;
  type_id: number;
  vod_time: number;
  vod_level: number;
  type_id_1: number;
  vod_actor: string;
  vod_area: string;
  vod_blurb: string;
  vod_class: string;
  vod_content: string;
  vod_director: string;
  vod_lang: string;
  vod_name: string;
  vod_pic: string;
  vod_play_url: string;
  vod_remarks: string;
  vod_year: string;
}

export interface ICommonRequestParams {
  page?: number;
  pagesize?: number;
  year?: string;
  area?: string;
}

export enum tabsType {
  sy='首页',
  dsj='热播影视',
  dm='动漫',
  zy='综艺',
  dy='电影'
}

export enum homeType {
  dy='热播电影',
  dsj='电视剧',
  zy='热播综艺',
  dm='热播动漫'
}

export enum MovieType {
  dy = 'dy',
  dsj = 'dsj',
  zy = 'zy',
  dm = 'dm',
}

export interface IJuJi {
  text: string;
  link: string;
}
export interface IPlayInfo extends IJuJi {
  title: string;
}
