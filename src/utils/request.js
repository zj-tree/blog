import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
// import router from './router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  async config => {
    // do something before request is sent
    let token = store.state.token;
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        store.commit("logout");
        MessageBox.confirm("登录已过期", "Confirm logout", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          store.state.loginFlag = true;
        });
        return Promise.reject(new Error(res.msg || "Error"));
      }

      if (res.data) {
        for (let i of Object.values(res.data)) {
          Message({
            message: i || "Error",
            type: "error",
            duration: 5 * 1000
          });
        }
      } else if (res.msg) {
        Message({
          message: res.msg || "Error",
          type: "error",
          duration: 5 * 1000
        });
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
      return res;
    } else {
      return res;
    }
  },
  error => {
    console.log("err:" + error); // for debug
    Message({
      message: error.msg,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
