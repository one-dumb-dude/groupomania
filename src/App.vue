<script setup>
import Navbar from '@/views/Navbar.vue';
import {computed, watchEffect} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();
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
  flex: 1
  height: 100vh
</style>
