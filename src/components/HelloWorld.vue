<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @load="countAdd" @click="countAdd">
    count is: {{ state.count }}
  </button>
  <p id='aaa'>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive, nextTick } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
const countAdd = (e) => {
  state.count++
  console.log(e)
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
