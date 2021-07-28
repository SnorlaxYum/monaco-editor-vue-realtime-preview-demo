<template>
  <Monaco msg="Hello Vue 3 + Vite" />
</template>

<script setup>
import Monaco from './components/Monaco.vue'
import { nextTick } from 'vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
nextTick(() => {
  document.querySelector('#app').style.height = window.innerHeight+'px'
})
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid: auto-flow / repeat(2, 1fr)
}
</style>
