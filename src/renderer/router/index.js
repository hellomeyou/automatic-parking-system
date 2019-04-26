import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/pages/index').default,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/usermode/index',
      name: 'usermode',
      component: require('@/pages/usermode/index').default,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/calibrationmodel/index',
      name: 'calibrationmodel',
      component: require('@/pages/calibrationmodel/index').default,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
