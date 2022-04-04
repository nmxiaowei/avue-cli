/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '@/store/';
import router from '@/router/'
import { serialize } from '@/utils/util'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import website from '@/config/website';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const http = axios.create({
  timeout: 10000,
  //跨域请求，允许保存cookie
  withCredentials: true,
  validateStatus(status) {
    //返回其他状态吗
    return status >= 200 && status <= 500; // 默认的
  }
});

// NProgress Configuration
NProgress.configure({
  showSpinner: false
});

//HTTPrequest拦截
http.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  if (getToken() && !isToken) {
    config.headers[website.Authorization] = 'Bearer ' + getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  return config
}, error => {
  return Promise.reject(error)
});

//HTTPresponse拦截
http.interceptors.response.use(res => {
  NProgress.done();
  const status = Number(res.status) || 200;
  const statusWhiteList = website.statusWhiteList || [];
  const message = res.data.message || '未知错误';
  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res);
  //如果是401则跳转到登录页面
  if (status === 401) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    ElMessage({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error));
})

export default http;
