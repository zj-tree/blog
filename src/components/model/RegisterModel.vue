<template>
  <v-dialog v-model="registerFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="registerFlag = false">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field v-model="username" label="邮箱号" placeholder="请输入您的邮箱号" clearable @keyup.enter="register" />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field maxlength="6" v-model="code" label="验证码" placeholder="请输入6位验证码" @keyup.enter="register" />
          <v-btn text small :disabled="flag" @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 密码 -->
        <v-text-field v-model="password" class="mt-7" label="密码" placeholder="请输入您的密码" @keyup.enter="register"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
          @click:append="show = !show" />
        <!-- 注册按钮 -->
        <v-btn class="mt-7" block color="red" style="color:#fff" @click="register">
          注册
        </v-btn>
        <!-- 登录 -->
        <div class="mt-10 login-tip">
          已有账号？<span @click="openLogin">登录</span>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { register, sendCode, login } from "@/api/user"
export default {
  data: function () {
    return {
      username: "",
      code: "",
      password: "",
      flag: true,
      codeMsg: "发送",
      time: 60,
      show: false,
      uuid: ""
    };
  },
  methods: {
    openLogin () {
      this.$store.state.registerFlag = false;
      this.$store.state.loginFlag = true;
    },
    async sendCode () {
      const that = this;
      that.countDown();
      let result = await sendCode({ mail: that.username })
      console.log(result);
      if (result.code === 200) {
        that.uuid = result.data.uuid
        that.$toast({ type: "success", message: "发送成功" });
      } else {
        that.$toast({ type: "error", message: result.msg });
      }
    },
    countDown () {
      this.flag = true;
      this.timer = setInterval(() => {
        this.time--;
        this.codeMsg = this.time + "s";
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.codeMsg = "发送";
          this.time = 60;
          this.flag = false;
        }
      }, 1000);
    },
    async register () {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$toast({ type: "error", message: "邮箱格式不正确" });
        return false;
      }
      if (this.code.trim().length != 6) {
        this.$toast({ type: "error", message: "请输入6位验证码" });
        return false;
      }
      if (this.password.trim().length < 6) {
        this.$toast({ type: "error", message: "密码不能少于6位" });
        return false;
      }
      const user = {
        username: this.username,
        password: this.password,
        code: this.code,
        uuid: this.uuid
      };
      let result = await register(user)
      if (result.code === 200) {
        let r = await login({ username: user.username, password: user.password });
        console.log(r);
        this.$store.commit("loginToken", r.data.token);
        this.$store.commit("loginUser");
        this.$router.replace({ path: '/empty' })
        console.log(this.$store.state);
        this.$store.commit("closeModel");
        this.$toast({ type: "success", message: "登录成功" });
      } else {
        this.$toast({ type: "error", message: result.msg });
      }
    }
  },
  computed: {
    registerFlag: {
      set (value) {
        this.$store.state.registerFlag = value;
      },
      get () {
        return this.$store.state.registerFlag;
      }
    },
    isMobile () {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 960) {
        return false;
      }
      return true;
    }
  },
  watch: {
    username (value) {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(value)) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>
