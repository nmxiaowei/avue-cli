<template>
  <el-scrollbar class="avue-menu"
                v-if="reload">
    <div v-if="validatenull(menu)&&!isHorizontal"
         class="avue-sidebar--tip">{{$t('menuTip')}}</div>
    <el-menu unique-opened
             :default-active="nowTagValue"
             :mode="setting.sidebar"
             :collapse="keyCollapse">
      <sidebar-item :menu="menu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem";
export default {
  name: "sidebar",
  components: { sidebarItem },
  inject: ["index"],
  data () {
    return {
      reload: true
    };
  },
  created () {
    this.index.openMenu()
  },
  watch: {
    isHorizontal () {
      this.reload = false;
      this.$nextTick(() => {
        this.reload = true;
      })
    }
  },
  computed: {
    ...mapGetters(["isHorizontal", "setting", "menu", "tag", "keyCollapse", "menuId"]),
    nowTagValue () { return this.$route.path; }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>

