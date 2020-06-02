import axios from 'axios';

axios.defaults.baseURL = 'https://fengxiaoci.cn';
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
  return axios.get('/hackapi.php', {
    params: {
      router: 'index',
    },
  });
};

const getCategory = (type, page) => {
  return axios.get('/hackapi.php', {
    params: {
      router: type,
      page,
    },
  });
};

const searchMovie = searchText => {
  return axios.get('/hackapi.php', {
    params: {
      router: 'search',
      name: searchText,
    },
  });
};

export { getIndex, getCategory, searchMovie };
export default axios;
