import axios from "axios";

axios.defaults.baseURL = "http://47.94.254.236:55";
axios.defaults.timeout = 5000;

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // console.log(response);
  return response.data;
}, function (error) {
  return Promise.reject(error);
});


const getIndex = ()=>{
  return axios.get("/hackapi.php",{params:{
    router : "index"
  }});
}


const getCategory = (type)=>{
  return axios.get("/hackapi.php",{params:{
    router : type
  }});
}



export { getIndex, getCategory }
export default axios;