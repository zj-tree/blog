<template>
  <v-app v-if="$store.state.flag" id="app">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>
    <!-- 侧边导航栏 -->
    <SideNavBar></SideNavBar>
    <!-- 内容 -->
    <v-content>
      <router-view :key="$route.fullPath" />
    </v-content>
    <!-- 页脚 -->
    <Footer></Footer>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
    <!-- 搜索模态框 -->
    <searchModel></searchModel>
    <!-- 登录模态框 -->
    <LoginModel></LoginModel>
    <!-- 注册模态框 -->
    <RegisterModel></RegisterModel>
    <!-- 忘记密码模态框 -->
    <ForgetModel></ForgetModel>
    <!-- 绑定邮箱模态框 -->
    <EmailModel></EmailModel>
    <!-- 音乐播放器 -->
    <!-- <Player v-if="blogInfoData.isMusicPlayer == 1 && !isMobile" />
    聊天室
    <ChatRoom v-if="blogInfoData.isChatRoom == 1"></ChatRoom> -->
  </v-app>
</template>

<script>
import TopNavBar from "./components/layout/TopNavBar";
import SideNavBar from "./components/layout/SideNavBar";
import Footer from "./components/layout/Footer";
import BackTop from "./components/BackTop";
import searchModel from "./components/model/SearchModel";
import LoginModel from "./components/model/LoginModel";
import RegisterModel from "./components/model/RegisterModel";
import ForgetModel from "./components/model/ForgetModel";
import EmailModel from "./components/model/EmailModel";
// import Player from "./components/zw-player/player.vue";
// import ChatRoom from "./components/ChatRoom";
import { getIndexInfo, report } from "@/api/index";
import store from "@/store";
export default {
  data: function() {
    return {
      blogInfoData: {}
    };
  },

  created() {
    // 获取博客信息
    this.getBlogInfo();
    // 上传访客信息
    // this.axios.post("/api/report");
    store.commit("loginUser");
    this.reportView();
  },
  components: {
    TopNavBar,
    // Player,
    SideNavBar,
    Footer,
    BackTop,
    searchModel,
    LoginModel,
    RegisterModel,
    ForgetModel,
    EmailModel
    // ChatRoom
  },
  methods: {
    async getBlogInfo() {
      let { data } = await getIndexInfo();
      this.$store.commit("checkBlogInfo", data);
      this.blogInfoData = data;
    },
    async reportView() {
      await report();
    }
    // async getUserInfo () {
    //   if (store.state.token) {
    //     let { data } = await getInfo()
    //     store.commit("login", data)
    //   }
    //   store.state.flag = true;
    // }
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },

    isMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  }
};
</script>
