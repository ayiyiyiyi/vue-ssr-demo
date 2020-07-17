<template>
  <div>
    <button @click="increment">click</button>
    <p>count: {{count}}</p>
    <p>double count: {{double}}</p>
  </div>
</template>
<script>
import { ref, computed, onMounted } from '@vue/composition-api'

export default {
  props: {
    msg: String,
  },
  setup(props) {
    console.log(props.msg)
    const {count, double, increment} = countFn()

    return {
      count,
      double,
      increment
    }
  }
}
function countFn() {
   let count = ref(0)
    let double = computed(() => count.value * 2)
    function increment () {
      count.value++
    }
    onMounted(()=> {
      console.log('mounted')
    })
    return {
      count,
      double,
      increment
    }
}
</script>