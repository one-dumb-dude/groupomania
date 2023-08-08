<script setup>
import Home from './views/Home.vue'
import Login from '@/views/Login.vue';
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="sass" scoped>
main
  width: 100vw
  height: 100vh
</style>
