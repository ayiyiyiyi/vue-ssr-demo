<template>
  <div>
    <h1>{{msg}}</h1>
    <button @click="changeMsg">change</button>
  </div>
</template>
<script>
import { ref, onMounted } from '@vue/composition-api'

export default {
  setup(props) {
    console.log(props.msg)
    const {msg, changeMsg} = countFn()
    return {
      msg,
      changeMsg
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