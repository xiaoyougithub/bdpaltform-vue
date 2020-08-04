import axios from 'axios'

//axios的配置
const http = axios.create({
  baseURL: '/api',//每个接口都会访问的一截路径
  timeout: 10000,//响应超时时间
  // headers: {'X-Requested-With': 'XMLHttpRequest'},//设置头部信息，一般遇到跨域的时候，需要后台设置，不需要前端配置
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],   
});
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
http.defaults.withCredentials = true
// http.defaults.withCredentials = false//默认
// Vue.prototype.$http = axios
export default http