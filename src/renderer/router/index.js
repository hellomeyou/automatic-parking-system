import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/pages/index').default
    },
    {
      path: '/usermode/index',
      name: 'usermode',
      component: require('@/pages/usermode/index').default
    },
    {
      path: '/calibrationmodel/index',
      name: 'calibrationmodel',
      component: require('@/pages/calibrationmodel/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
