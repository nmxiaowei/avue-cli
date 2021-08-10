import Layout from '@/page/index/index.vue'
export default [{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    meta: {
      i18n: 'dashboard'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/index.vue')
  }, {
    path: 'more',
    name: '控制台',
    meta: {
      i18n: 'more',
      menu: false,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/dashboard.vue')
  }]
}, {
  path: '/form-detail',
  component: Layout,
  children: [{
    path: 'index',
    name: '详情页',
    meta: {
      i18n: 'detail'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/form-detail.vue')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      i18n: 'info'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/info.vue')
  }, {
    path: 'setting',
    name: '个人设置',
    meta: {
      i18n: 'setting'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/setting.vue')
  }]
}, {
  path: '/query',
  component: Layout,
  children: [{
    path: ':params',
    name: '参数传递',
    meta: {
      i18n: 'params'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/params.vue')
  }]
}, {
  path: '/test',
  redirect: '/test/index',
  component: Layout,
  children: [{
    name: '测试页面',
    meta: {
      i18n: 'test'
    },
    path: 'index',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/test.vue')
  }]

}]