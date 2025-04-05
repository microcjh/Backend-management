import axios from "axios";
import { ElMessage } from "element-plus"
import config from '@/config'
// 您可以将拦截器添加到 axios 的自定义实例。
const instance = axios.create({
  baseURL: config.baseApi
})
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code == 200) {
    return data
  } else {
    const NETWORK_ERROR = "网络错误..."
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }

});

//设置默认方法为get
function request(options) {
  // console.log(options)
  options.method = options.method || "get";

  //关于get请求参数的调整
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  //对mock的开关做一个处理
  // const isMock = config.mock;
  let isMock = config.mock;
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }

  //针对环境做一个处理
  if (config.env === 'prod') {
    instance.defaults.baseURL = config.baseApi
  } else {
    instance.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return instance(options);
}

export default request