import request from "@/utils/request";

export function getComment(type, id, data) {
  return request({
    url: "blog/comment/getCommon/" + type + "/" + id,
    method: "get",
    params: data
  });
}
export function addComment(data) {
  return request({
    url: "/blog/comment/send",
    method: "post",
    data: data
  });
}

export function reComment(commentId) {
  return request({
    url: `blog/comment/${commentId}/replies`,
    method: "get"
  });
}
