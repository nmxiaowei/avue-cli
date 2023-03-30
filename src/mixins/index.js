import { validatenull } from "@/utils/validate";
import { getStore } from "@/utils/store.js";
export default {
  data () {
    return {
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: ""
    };
  },
  created () {
    //实时检测刷新token
    this.refreshToken();
  },
  methods: {
    // 10分钟检测一次token
    refreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: "token",
          debug: true
        }) || {};
        let date1 = this.$dayjs(token.datetime);
        let date2 = this.$dayjs()
        const date = date2.diff(date1, 'seconds')
        if (validatenull(date)) return;
        if (date >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefreshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 1000);
    }
  }
}