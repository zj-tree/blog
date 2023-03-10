import request from "@/utils/request";

export function listArticle(data) {
  return request({
    url: "/blog/article/articles",
    method: "get",
    params: data
  });
}

export function getArticle(articleId) {
  return request({
    url: "/blog/article/get/" + articleId,
    method: "get"
  });
}

export function listByTypeId(typeId, data) {
  return request({
    url: "/blog/article/articlebyType/" + typeId,
    method: "get",
    params: data
  });
}

export function listByFlag(flagId, data) {
  return request({
    url: "/blog/article/articleByFlag/" + flagId,
    method: "get",
    params: data
  });
}
export function listRecommend(data) {
  return request({
    url: "/blog/article/recommend",
    method: "get",
    params: data
  });
}
