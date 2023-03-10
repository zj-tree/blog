import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { getInfo } from "@/api/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    searchFlag: false,
    loginFlag: false,
    registerFlag: false,
    forgetFlag: false,
    emailFlag: false,
    drawer: false,
    loginUrl: "",
    intro: null,
    webSite: null,
    loginType: null,
    articleLikeSet: [],
    commentLikeSet: [],
    talkLikeSet: [],
    blogInfo: {},
    token: getToken(),
    userInfo: undefined,
    info: {},
    flag: false,
    email: ""
  },
  mutations: {
    loginToken(state, userToken) {
      state.token = userToken;
      setToken(userToken);
    },
    login(state, user) {
      state.userInfo = user;
      state.userId = user.userId;
      state.avatar = user.avatar;
      state.nickname = user.nikeName;
      state.email = user.email;
      console.log(user);
    },
    logout(state) {
      state.userInfo = undefined;
      state.userId = null;
      state.avatar = null;
      state.nickname = null;
      state.token = null;
      removeToken();
    },
    saveLoginUrl(state, url) {
      state.loginUrl = url;
    },
    saveEmail(state, email) {
      state.email = email;
    },
    updateUserInfo(state, user) {
      state.nickname = user.nickname;
      state.intro = user.intro;
      state.webSite = user.webSite;
    },
    savePageInfo(state, pageList) {
      state.pageList = pageList;
    },
    updateAvatar(state, avatar) {
      state.avatar = avatar;
    },
    checkBlogInfo(state, blogInfo) {
      state.blogInfo = blogInfo;
      // state.commit("loginUser")
      store.state.flag = true;
    },
    closeModel(state) {
      state.registerFlag = false;
      state.loginFlag = false;
      state.searchFlag = false;
      state.emailFlag = false;
    },
    articleLike(state, articleId) {
      var articleLikeSet = state.articleLikeSet;
      if (articleLikeSet.indexOf(articleId) != -1) {
        articleLikeSet.splice(articleLikeSet.indexOf(articleId), 1);
      } else {
        articleLikeSet.push(articleId);
      }
    },
    commentLike(state, commentId) {
      var commentLikeSet = state.commentLikeSet;
      if (commentLikeSet.indexOf(commentId) != -1) {
        commentLikeSet.splice(commentLikeSet.indexOf(commentId), 1);
      } else {
        commentLikeSet.push(commentId);
      }
    },
    talkLike(state, talkId) {
      var talkLikeSet = state.talkLikeSet;
      if (talkLikeSet.indexOf(talkId) != -1) {
        talkLikeSet.splice(talkLikeSet.indexOf(talkId), 1);
      } else {
        talkLikeSet.push(talkId);
      }
    },
    async loginUser(state) {
      if (store.state.token) {
        let { data } = await getInfo();
        store.commit("login", data);
      }
      state.flag = true;
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});

export default store;
