module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      // "/api": {
      //   target: "https://www.talkxj.com/",
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   "^/api": ""
      //   // }
      // },
      "/blog": {
        target: "http://127.0.0.1:10000",
        changeOrigin: true
        // pathRewrite: {
        //   "^/blog": "/blog"
        // }
      }
    },
    disableHostCheck: true
  },
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false
  }
};
