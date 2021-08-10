<template>
  <div class="login-container"
       @keyup.enter="handleLogin">
    <div class="login-time">
      {{time}}
    </div>
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <img class="img"
             src="/img/logo.png"
             alt="">
        <p class="title">{{ $t('login.info') }}</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <p class="login-title">
            {{ $t('login.title') }}{{website.title}}
            <top-lang></top-lang>
          </p>
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin v-else-if="activeName==='third'"></thirdLogin>
          <faceLogin v-else-if="activeName==='face'"></faceLogin>
          <div class="login-menu">
            <a href="#"
               @click.stop="activeName='user'">{{ $t('login.userLogin') }}</a>
            <a href="#"
               @click.stop="activeName='code'">{{ $t('login.phoneLogin') }}</a>
            <a href="#"
               @click.stop="activeName='face'">{{ $t('login.faceLogin') }}</a>
            <a href="#"
               @click.stop="activeName='third'">{{ $t('login.thirdLogin') }}</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import userLogin from "./userlogin.vue";
import codeLogin from "./codelogin.vue";
import thirdLogin from "./thirdlogin.vue";
import faceLogin from "./facelogin.vue";
import { dateFormat } from "@/utils/date";
import { validatenull } from "@/utils/validate";
import topLang from "@/page/index/top/top-lang.vue";
export default {
  name: "login",
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    faceLogin,
    topLang
  },
  data () {
    return {
      time: "",
      activeName: "user"
    };
  },
  watch: {
    $route () {
      const params = this.$route.query;
      this.socialForm = params
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: `${this.socialForm.state === "WX" ? "微信" : "QQ"
            }登录中,请稍后。。。`,
          spinner: "el-icon-loading"
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
    }
  },
  created () {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  mounted () { },
  props: [],
  methods: {
    getTime () {
      this.time = dateFormat(new Date());
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/login.scss";
</style>