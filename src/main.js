import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import http from "./http";
import axios from "axios";
import FastClick from "fastclick";
FastClick.attach(document.body);
import Vant from "vant";
import "vant/lib/index.css";
import "lib-flexible";

Vue.config.productionTip = false;
Vue.prototype.$axios = http;
Vue.use(Vant);


// 处理响应超时时间
axios.defaults.timeout = 10000;

// 设置post请求的响应头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 设置请求拦截
// axios.interceptors.request.use( config => {
//   const token = localStorage.token;
//   token && (config.headers.Authorization = token);
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// 设置响应拦截
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");