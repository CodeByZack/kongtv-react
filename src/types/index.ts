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
