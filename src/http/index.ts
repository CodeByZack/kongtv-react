import axios from 'axios';
import { ICommonRequestParams, IMovieItem, MovieType } from '../types';

// axios.defaults.baseURL = 'http://47.94.254.236:55';
// axios.defaults.baseURL = 'https://fengxiaoci.cn';
axios.defaults.baseURL = 'https://api.zackdk.com/movie';
// axios.defaults.baseURL = 'http://127.0.0.1:8360/movie';
axios.defaults.timeout = 20000;

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response.data;
  },
  function (error) {
    // Toast.error(error.message);
    return Promise.reject(error);
  }
);

const getIndex = () => axios.get<IMovieItem[], IMovieItem[]>('/index');

const getCategory = (type: MovieType, params: ICommonRequestParams) =>
  axios.get<IMovieItem[], IMovieItem[]>(`/${type}`, { params });

const searchMovie = (searchText: string) => {
  const params = {
    router: 'search',
    word: searchText,
    pagesize: 100,
  };
  return axios.get<IMovieItem[], IMovieItem[]>('/search', { params });
};

const clearCacheAndRefresh = async () => {
  const res = await axios.get('http://fengxiaoci.cn/api.php/timming/index.html?enforce=1&name=bdzy');
  const res2 = await axios.get('https://api.fengxiaoci.cn/movie/updateindex');
};

export { getIndex, getCategory, searchMovie, clearCacheAndRefresh };
export default axios;
