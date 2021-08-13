import router from './router/'
import store from './store'
import { validatenull } from '@/utils/validate'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Store } from 'vuex'
NProgress.configure({ showSpinner: false });
const lockPage = '/lock'; //锁屏页
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  store.commit('SET_IS_MENU', isMenu === undefined);
  if (getToken()) {
    if (store.getters.isLock && to.path != lockPage) { //如果系统激活锁屏，全部跳转到锁屏页
      next({ path: lockPage })
    } else if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
      next({ path: '/' })
    } else {
      //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(() => {
          next({ ...to, replace: true })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        const value = to.path;
        const query = to.query
        const label = query.name || to.name;
        const meta = to.meta
        if (meta.target) {
          window.open(query.url.replace(/#/g, "&"))
          return
        } else if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
          store.commit('ADD_TAG', {
            label: label,
            value: value,
            params: to.params,
            query: to.query,
            meta: to.meta
          });
        }
        next()
      }
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(to => {
  NProgress.done();
  let title = to.name;
  let i18n = to.meta.i18n;
  title = router.$avueRouter.generateTitle(title, i18n)
  //根据当前的标签也获取label的值动态设置浏览器标题
  router.$avueRouter.setTitle(title);
  store.commit('SET_IS_SEARCH', false)
});