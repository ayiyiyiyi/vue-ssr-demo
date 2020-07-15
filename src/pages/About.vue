<template>
  <div class="about">
    <h1>hot loading test</h1>
    <Welcome msg="Welcome" />
  </div>
</template>
<script>
import Welcome from './../components/Welcome'
export default {
    name: 'about',
    components: {
        Welcome
    }
}
</script>
