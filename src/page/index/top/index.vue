<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="avue-breadcrumb"
           :class="[{ 'avue-breadcrumb--active': isCollapse }]"
           v-if="setting.collapse&&!isHorizontal">
        <i class="icon-navicon"
           @click="setCollapse"></i>
      </div>
    </div>
    <div class="top-bar__title">
      <div class="top-bar__item top-bar__item--show"
           v-if="setting.menu">
        <top-menu ref="topMenu"></top-menu>
      </div>
      <span class="top-bar__item"
            v-if="setting.search">
        <top-search></top-search>
      </span>
    </div>
    <div class="top-bar__right">
      <div v-if="setting.debug"
           class="top-bar__item">
        <top-logs></top-logs>
      </div>
      <div v-if="setting.lock"
           class="top-bar__item">
        <top-lock></top-lock>
      </div>
      <div v-if="setting.theme"
           class="top-bar__item top-bar__item--show">
        <top-theme></top-theme>
      </div>
      <div class="top-bar__item top-bar__item--show">
        <top-notice></top-notice>
      </div>
      <div class="top-bar__item top-bar__item--show">
        <top-lang></top-lang>
      </div>
      <div class="top-bar__item"
           v-if="setting.fullscren">
        <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'"
           @click="handleScreen"></i>
      </div>
      <img class="top-bar__img"
           :src="userInfo.avatar">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/">{{$t('navbar.dashboard')}}</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/info/index">{{$t('navbar.userinfo')}}</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/info/setting">{{$t('navbar.setting')}}</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click="logout"
                              divided>{{$t('navbar.logOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="top-bar__item">
        <top-setting></top-setting>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { fullscreenToggel, listenfullscreen } from "utils/util";
import topLock from "./top-lock.vue";
import topMenu from "./top-menu.vue";
import topSearch from "./top-search.vue";
import topTheme from "./top-theme.vue";
import topLogs from "./top-logs.vue";
import topNotice from './top-notice.vue'
import topLang from "./top-lang.vue";
import topSetting from "../setting.vue";
export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topNotice,
    topLang,
    topSetting
  },
  name: "top",
  data () {
    return {};
  },
  filters: {},
  created () { },
  mounted () {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapGetters([
      "setting",
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
      "isHorizontal"
    ])
  },
  methods: {
    handleScreen () {
      fullscreenToggel();
    },
    setCollapse () {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen () {
      this.$store.commit("SET_FULLSCREN");
    },
    logout () {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>