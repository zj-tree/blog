import request from "@/utils/request";

export function listFlag(flagId, data) {
  return request({
    url: `/blog/article/articleByFlag/${flagId}`,
    method: "get",
    params: data
  });
}

export function listFlagGrop() {
  return request({
    url: "/blog/flag/flagGroup",
    method: "get"
  });
}
