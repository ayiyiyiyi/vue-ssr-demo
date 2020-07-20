<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>home hot loading test</h1>
    <hello-world msg="Welcome to Your Vue.js App" />
        ------------------------------------
    <div>
      <p>it seems the async api worked !</p>
      <h1>
        title: {{item.title}}
      </h1>
    </div>
  </div>
</template>
<script>
import HelloWorld from './../components/HelloWorld'
import { computed } from '@vue/composition-api'

export default {
    name: 'home',
    components: {
        HelloWorld
    },
    asyncData ({ store, route }) {
      // 触发 action 后，会返回 Promise // 202004020
      console.log('id', route.params.id)
      return store.dispatch('fetchItem', '202004020')
    },
    setup(props, context) {
      const item = computed(() => context.root.$store.state.items['202004020'])
      console.log('item', item)
      return { item }
    },
    // computed: {
    //   // 从 store 的 state 对象中的获取 item。
    //   item () {
    //     return this.$store.state.items[this.$route.params.id]
    //   }
    // }
}
</script>
