<script setup>
import Navbar from '@/views/Navbar.vue';
</script>

<template>
  <main class="main">
    <Navbar/>
    <router-view></router-view>
  </main>
</template>

<style lang="sass" scoped>
.main
  display: flex
  flex-direction: column
  width: 100vw
  height: 100vh
</style>
