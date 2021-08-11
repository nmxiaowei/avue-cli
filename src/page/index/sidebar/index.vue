<template>
  <el-scrollbar class="avue-menu"
                v-if="reload">
    <div v-if="menu&&menu.length==0&&!isHorizontal"
         class="avue-sidebar--tip">{{$t('menuTip')}}</div>
    <el-menu unique-opened
             :default-active="nowTagValue"
             :mode="setting.sidebar"
             :collapse="isCollapse">
      <sidebar-item :menu="menu"
                    first
                    :props="website.menu"
                    :collapse="isCollapse"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem.vue";
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
    ...mapGetters(["isHorizontal", "setting", "menu", "tag", "isCollapse", "menuId"]),
    nowTagValue () { return this.$route.path; }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>

