import request from "@/utils/request";

export function likeArticle(data) {
  return request({
    url: "blog/like/" + data + "/" + 1,
    method: "post"
  });
}

export function likeCommon(data) {
  return request({
    url: "blog/like/" + data + "/" + 4,
    method: "post"
  });
}

export function likeTalk(data) {
  return request({
    url: "blog/like/" + data + "/" + 3,
    method: "post"
  });
}
