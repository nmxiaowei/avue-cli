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
      <el-tooltip v-if="setting.debug"
                  effect="dark"
                  :content="logsFlag?$t('navbar.bug'):logsLen+$t('navbar.bugs')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip>
      <el-tooltip v-if="setting.lock"
                  effect="dark"
                  :content="$t('navbar.lock')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <el-tooltip v-if="setting.theme"
                  effect="dark"
                  :content="$t('navbar.theme')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme></top-theme>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="$t('navbar.notice')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-notice></top-notice>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="$t('navbar.language')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-lang></top-lang>
        </div>
      </el-tooltip>
      <el-tooltip v-if="setting.fullscren"
                  effect="dark"
                  :content="isFullScren?$t('navbar.screenfullF'):$t('navbar.screenfull')"
                  placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip>
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
export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topNotice,
    topLang
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