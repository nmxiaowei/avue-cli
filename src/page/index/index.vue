<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse,}">
    <setting></setting>
    <div class="avue-layout"
         :class="{'avue-layout--horizontal':isHorizontal}">
      <div class="avue-sidebar"
           v-show="validSidebar">
        <!-- 左侧导航栏 -->
        <logo />
        <sidebar />
      </div>
      <div class="avue-main">
        <!-- 顶部导航栏 -->
        <top ref="top" />
        <!-- 顶部标签卡 -->
        <tags />
        <transition name="fade-scale">
          <search class="avue-view"
                  v-show="isSearch"></search>
        </transition>
        <!-- 主体视图层 -->
        <div style="flex:auto;overflow-y:auto;overflow-x:hidden;"
             id="avue-view"
             v-show="!isSearch"
             v-if="isRefresh">
          <router-view #="{ Component }">
            <keep-alive :include="$store.getters.tagsKeep">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
        <div class="avue-footer">
          <p class="copyright">© 2018-2021 Avue designed by smallwei</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags.vue";
import setting from './setting.vue';
import search from "./search.vue";
import logo from "./logo.vue";
import top from "./top/index.vue";
import sidebar from "./sidebar/index.vue";
import admin from "@/utils/admin";
import { validatenull } from "@/utils/validate";
import { calcDate } from "@/utils/date.js";
import { getStore } from "@/utils/store.js";
export default {
  components: {
    top,
    logo,
    tags,
    search,
    sidebar,
    setting
  },
  name: "index",
  provide () {
    return {
      index: this
    };
  },
  data () {
    return {
      //搜索控制
      isSearch: false,
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
  mounted () {
    this.init();
  },
  computed: {
    ...mapGetters(["isHorizontal", "setting", "isRefresh", "isLock", "isCollapse", "menu"]),
    validSidebar () {
      return !((this.$route.meta || {}).menu == false || (this.$route.query || {}).menu == 'false')
    }
  },
  props: [],
  methods: {
    // 屏幕检测
    init () {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
    //打开菜单
    openMenu (item = {}) {
      this.$store.dispatch("GetMenu", item.parentId).then(data => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true);
        }
        //当点击顶部菜单做的事件
        if (!validatenull(item)) {
          let itemActive = {},
            childItemActive = 0;
          //vue-router路由
          if (item.path) {
            itemActive = item;
          } else {
            if (this.menu[childItemActive].length == 0) {
              itemActive = this.menu[childItemActive];
            } else {
              itemActive = this.menu[childItemActive].children[childItemActive];
            }
          }
          this.$store.commit('SET_MENUID', item);
          this.$router.push({
            path: itemActive.path
          });
        }

      });
    },
    // 10分钟检测一次token
    refreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: "token",
          debug: true
        }) || {};
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefeshToken")
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
};
</script>