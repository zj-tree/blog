import request from "@/utils/request";

export function listAlbum(data) {
  return request({
    url: "/blog/album/list",
    method: "get",
    params: data
  });
}

export function listByAlbumId(albumId, data) {
  return request({
    url: `/blog/image/album/${albumId}`,
    method: "get",
    params: data
  });
}
