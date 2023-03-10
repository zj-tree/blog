import request from "@/utils/request";

export function listType(typeId, data) {
  return request({
    url: `/blog/article/articlebyType/${typeId}`,
    method: "get",
    params: data
  });
}

export function typeGroup() {
  return request({
    url: "/blog/type/typeGroup",
    method: "get"
  });
}
