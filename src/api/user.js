import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/blog/auth/login",
    method: "post",
    data
  });
}

export function logoutUser() {
  return request({
    url: "/blog/auth/logout",
    method: "post"
  });
}

export function getInfo() {
  return request({
    url: "/blog/user/userInfo",
    method: "get"
  });
}

export function register(user) {
  return request({
    url: "/blog/auth/register",
    method: "post",
    data: user
  });
}

export function sendCode(data) {
  return request({
    url: "/blog/auth/sendCode",
    method: "post",
    params: data
  });
}
