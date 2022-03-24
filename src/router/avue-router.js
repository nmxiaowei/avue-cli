
import website from '@/config/website'
function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
let RouterPlugin = function () {
  this.$router = null;
  this.$store = null;
};
RouterPlugin.install = function (option = {}) {
  this.$router = option.router;
  this.$store = option.store;
  let i18n = option.i18n
  this.$router.$avueRouter = {
    safe: this,
    // 设置标题
    setTitle: (title) => {
      const defaultTitle = i18n.t('title');
      title = title ? `${title}——${defaultTitle}` : defaultTitle;
      document.title = title;
    },
    closeTag: (value) => {
      let tag = value || this.$store.getters.tag;
      if (typeof value === 'string') {
        tag = this.$store.getters.tagList.find(ele => ele.fullPath === value)
      }
      this.$store.commit('DEL_TAG', tag)
    },
    generateTitle: (item, props = {}) => {
      let query = item[props.query || 'query'] || {}
      let title = query.name || item[props.label || 'label']
      let meta = item[props.meta || 'meta'] || {}
      let key = meta.i18n
      if (key) {
        const hasKey = i18n.te('route.' + key)
        if (hasKey) return i18n.t('route.' + key)
      }
      return title
    },
    //动态路由
    formatRoutes: function (aMenu = [], first) {
      const aRouter = []
      const propsConfig = website.menu
      const propsDefault = {
        label: propsConfig.label,
        path: propsConfig.path,
        icon: propsConfig.icon,
        children: propsConfig.children,
        meta: propsConfig.meta,
      }
      if (aMenu.length === 0) return;
      for (let i = 0; i < aMenu.length; i++) {
        const oMenu = aMenu[i];
        let path = oMenu[propsDefault.path],
          component = oMenu.component,
          name = oMenu[propsDefault.label],
          icon = oMenu[propsDefault.icon],
          children = oMenu[propsDefault.children],
          query = oMenu[propsDefault.query],
          meta = oMenu[propsDefault.meta];
        if (option.keepAlive) meta.keepAlive = meta.keepAlive || option.keepAlive
        const isChild = children && children.length !== 0;
        const oRouter = {
          path: path,
          component (resolve) {
            // 判断是否为首路由
            if (first) {
              option.store.getters.isMacOs ? require(['../page/index/layout.vue'], resolve) : require(['../page/index'], resolve)
              // 判断是否为多层路由
            } else if (isChild && !first) {
              require(['../page/index/layout'], resolve)
              // 判断是否为最终的页面视图
            } else {
              require([`../${component}.vue`], resolve)
            }
          },
          name,
          icon,
          meta,
          query,
          redirect: (() => {
            if (!isChild && first) return `${path}`
            else return '';
          })(),
          // 处理是否为一级路由
          children: !isChild ? (() => {
            if (first) {
              oMenu[propsDefault.path] = path;
              return [{
                component (resolve) { require([`../${component}.vue`], resolve) },
                icon,
                name,
                meta,
                query,
                path: ''
              }]
            }
            return [];
          })() : (() => {
            return this.formatRoutes(children, false)
          })()
        }
        aRouter.push(oRouter)
      }
      if (first) {
        aRouter.forEach((ele) => this.safe.$router.addRoute(ele))
      } else {
        return aRouter
      }

    }
  }
}
export const formatPath = (ele, first) => {
  const propsDefault = website.menu;
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = !icon ? propsDefault.iconDefault : icon;
  ele.meta = ele.meta || {}
  const iframeComponent = 'components/iframe/main';
  const iframeSrc = (href) => {
    return href.replace(/&/g, "#")
  }
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path]
    if (isURL(ele[propsDefault.href])) {
      let href = ele[propsDefault.href]
      ele.component = iframeComponent
      ele[propsDefault.query] = { url: iframeSrc(href) }
    }
  } else {
    ele[propsDefault.children] && ele[propsDefault.children].forEach(child => {
      if (isURL(child[propsDefault.href])) {
        let href = child[propsDefault.href]
        child.component = iframeComponent
        child[propsDefault.query] = { url: iframeSrc(href) }
      }
      child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path]}`
      formatPath(child);
    })
  }
}
export default RouterPlugin;