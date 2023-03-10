<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">{{ photoAlbumName }}</h1>
    </div>
    <!-- 相册列表 -->
    <v-card class="blog-container">
      <div class="photo-wrap">
        <img
          v-for="(item, index) of photoList"
          class="photo"
          :key="index"
          :src="item"
          @click="preview(index)"
        />
      </div>
      <!-- 无限加载 -->
      <!-- <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" />
        <div slot="no-results" />
      </infinite-loading> -->
    </v-card>
  </div>
</template>

<script>
import { listByAlbumId } from "@/api/image";
export default {
  data: function() {
    return {
      photoAlbumName: "",
      photoAlbumCover: "",
      photoList: [],
      current: 1,
      size: 10
    };
  },
  created() {
    this.infiniteHandler();
  },
  methods: {
    preview(index) {
      this.$imagePreview({
        images: this.photoList,
        index: index
      });
    },
    async infiniteHandler($state) {
      const { data } = await listByAlbumId(this.$route.params.albumId);
      // this.photoAlbumCover = data.
      this.photoAlbumCover = data.albumCover;
      this.photoAlbumName = data.albumName;
      if (data.list.length) {
        // this.current++;
        // this.photoList.push(...data.list);
        // this.photoList = data.list;
        const imgList = [];
        for (let index = 0; index < data.list.length; index++) {
          imgList.push(data.list[index].imgUrl);
        }
        console.log(imgList);
        this.photoList = imgList;
        $state.loaded();
      } else {
        $state.complete();
      }
      // console.log(data);
      // console.log($state);

      // this.axios
      //   .get("/api/albums/" + this.$route.params.albumId + "/photos", {
      //     params: {
      //       current: this.current,
      //       size: this.size
      //     }
      //   })
      //   .then(({ data }) => {
      //     this.photoAlbumCover = data.data.photoAlbumCover;
      //     this.photoAlbumName = data.data.photoAlbumName;
      //     if (data.data.photoList.length) {
      //       this.current++;
      //       this.photoList.push(...data.data.photoList);
      //       $state.loaded();
      //     } else {
      //       $state.complete();
      //     }
      //   });
    }
  },
  computed: {
    cover() {
      return (
        "background: url(" +
        this.photoAlbumCover +
        ") center center / cover no-repeat"
      );
    }
  }
};
</script>

<style scoped>
.photo-wrap {
  display: flex;
  flex-wrap: wrap;
}
.photo {
  margin: 3px;
  cursor: pointer;
  flex-grow: 1;
  object-fit: cover;
  height: 200px;
}
.photo-wrap::after {
  content: "";
  display: block;
  flex-grow: 9999;
}
@media (max-width: 759px) {
  .photo {
    width: 100%;
  }
}
</style>
