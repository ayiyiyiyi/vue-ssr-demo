<template>
  <div>
    <h1>{{msg}}</h1>
    <button @click="changeMsg">change</button>
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
    msg: String,
  },
  setup(props) {
    console.log(props.msg)
    const propMsg = props.msg
    const { msg, changeMsg } = countFn()
    return {
      msg,
      changeMsg,
      propMsg
    }
  }
}
function countFn() {
   let msg = ref('welcome')
    function changeMsg () {
      msg.value = 'welcome changed success !'
    }
    onMounted(()=> {
      console.log('mounted')
    })
    return {
      msg,
      changeMsg
    }
}
</script>