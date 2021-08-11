<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item[childrenKey]) && validRoles(item)"
                    :index="getPath(item)"
                    @click="open(item)"
                    :key="item[labelKey]">
        <i :class="item[iconKey]"></i>
        <template #title>
          <span :alt="item[pathKey]">{{getTitle(item)}}</span>
        </template>
      </el-menu-item>
      <el-submenu v-else-if="!validatenull(item[childrenKey])&&validRoles(item)"
                  :index="getPath(item)"
                  :key="item[labelKey]">
        <template #title>
          <i :class="item[iconKey]"></i>
          <span :class="{'el-menu--display':collapse && first}">{{getTitle(item)}}</span>
        </template>
        <template v-for="(child,cindex) in item[childrenKey]">
          <el-menu-item :index="getPath(child)"
                        @click="open(child)"
                        v-if="validatenull(child[childrenKey])"
                        :key="child[labelKey]">
            <template #title>
              <i :class="child[iconKey]"></i>
              <span>{{getTitle(child)}}</span>
            </template>

          </el-menu-item>
          <sidebar-item v-else
                        :menu="[child]"
                        :key="cindex"
                        :props="props"
                        :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { isURL, validatenull } from 'utils/validate'
export default {
  name: "sidebarItem",
  props: {
    menu: {
      type: Array
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    collapse: {
      type: Boolean
    }
  },
  created () { },
  mounted () { },
  computed: {
    ...mapGetters(["roles"]),
    labelKey () {
      return this.props.label
    },
    pathKey () {
      return this.props.path
    },
    queryKey () {
      return this.props.query
    },
    iconKey () {
      return this.props.icon
    },
    childrenKey () {
      return this.props.children
    },
    metaKey () {
      return this.props.meta
    },
    nowTagValue () { return this.$route.path }
  },
  methods: {
    getPath (item) {
      return item[this.pathKey] + ''
    },
    getTitle (item) {
      return this.$router.$avueRouter.generateTitle(
        item[this.labelKey],
        item.meta.i18n
      );
    },
    validRoles (item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull (val) {
      return validatenull(val);
    },
    open (item) {
      this.$router.push({
        path: item[this.pathKey],
        query: item[this.queryKey]
      });
    }
  }
};
</script>

