<template>
  <div class="home">
    <h1>about page test</h1>
    <p>y: {{obj.x}}</p>
    <p>y: {{obj.y}}</p>
    <welcome message="Welcome to about page" />
        ------------------------------------
    <div>
      <p>it seems the async api worked !</p>
    </div>
  </div>
</template>
<script>
import Welcome from './../components/Welcome'
import { reactive } from '@vue/composition-api'

export default {
    name: 'home',
    components: {
        Welcome
    },

    setup() {
      const obj = reactive({
        x: 0,
        y: 'a'
      })
      return { obj }
    }
}
</script>
