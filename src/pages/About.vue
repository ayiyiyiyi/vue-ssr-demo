<template>
  <div class="home">
    <h1>about page test</h1>
    <p>y: {{x}}</p>
    <p>y: {{y}}</p>
    <welcome message="Welcome to about page" />
        ------------------------------------
    <div>
      <p>it seems the async api worked !</p>
    </div>
  </div>
</template>
<script>
import Welcome from './../components/Welcome'
import { reactive, toRefs } from '@vue/composition-api'

export default {
    name: 'home',
    components: {
        Welcome
    },

    setup() {
      const { x, y } = testReactive()
      return { x, y }
    }
}
function testReactive() {
  const pos = reactive({
    x: 0,
    y: 0
  })
  return toRefs(pos)
}
</script>
