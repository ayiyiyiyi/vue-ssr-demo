<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>home hot loading test</h1>
    <hello-world msg="Welcome to Your Vue.js App" />
  </div>
</template>
<script>
import HelloWorld from './../components/HelloWorld'
export default {
    name: 'home',
    components: {
        HelloWorld
    }
}
</script>
