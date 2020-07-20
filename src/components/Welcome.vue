<template>
  <div>
    <h1>aboutmsg: {{aboutmsg}}</h1>
    <button @click="changeMsg">change msg</button>
    <h2 class="red">this is prop message: {{propMsg}}</h2>
  </div>
</template>
<style scoped>
.red {
  color: red;
}
</style>
<script>
import { ref, onMounted } from '@vue/composition-api'

export default {
  props: {
    message: String,
  },
  setup(props) {
    const propMsg = props.message
    const { aboutmsg, changeMsg } = countFn()
    return {
      aboutmsg,
      changeMsg,
      propMsg
    }
  }
}
function countFn() {
   let aboutmsg = ref('welcome')
    function changeMsg () {
      aboutmsg.value = 'welcome changed success !'
    }
    onMounted(()=> {
      console.log('mounted')
    })
    return {
      aboutmsg,
      changeMsg
    }
}
</script>