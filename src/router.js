import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default function createRouter () {
  return new Router({
    mode: 'history', // SSR vue-router 一定要是 History 模式,
    routes: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './pages/Home.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ './pages/About.vue')
      }
    ]
  })
}