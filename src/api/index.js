import request from "@/utils/request";

export function getIndexInfo() {
  return request({
    url: "/blog/index",
    method: "get"
  });
}

export function report() {
  return request({
    url: "/blog/view/report",
    method: "post"
  });
}
