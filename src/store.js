import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 通用 API（请忽略此 API 具体实现细节）
import { fetchItem } from './api'

export default function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then(res => {
            const item = res.data[0] ? res.data[0] : {}
            commit('setItem', { id, item })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}