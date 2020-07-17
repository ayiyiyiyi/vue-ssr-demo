import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { sync } from "vuex-router-sync"
import App from './App.vue'
import createStore from './store'
import createRouter from './router'

Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

export default function createApp () {

  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })
  return {app, router, store}
}
