import request from "@/utils/request";
const bash = "/blog/talk";

export function listTalk(data) {
  return request({
    url: `${bash}/list`,
    method: "get",
    params: data
  });
}

export function listTalkPage(data) {
  return request({
    url: `${bash}/listPage`,
    method: "get",
    params: data
  });
}

export function sendTalk(data) {
  return request({
    url: `${bash}/send`,
    method: "post",
    data: data
  });
}
