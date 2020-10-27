import axios from 'axios';

// axios.defaults.baseURL = 'http://47.94.254.236:55';
// axios.defaults.baseURL = 'https://fengxiaoci.cn';
axios.defaults.baseURL = 'http://api.fengxiaoci.cn/movie';
axios.defaults.timeout = 20000;

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // console.log(response);
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const getIndex = () => {
  return axios.get('/index', {
    params: {
      router: 'index',
    },
  });
};

const getCategory = (type, page, pagesize = 9) => {
  return axios.get(`/${type}`, {
    params: {
      page,
      pagesize
    },
  });
};

const searchMovie = searchText => {
  return axios.get('/search', {
    params: {
      router: 'search',
      word: searchText,
    },
  });
};

export { getIndex, getCategory, searchMovie };
export default axios;
