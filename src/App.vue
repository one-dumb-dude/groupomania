<script setup>
import Navbar from '@/views/Navbar.vue';
import {computed, watchEffect} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

const userId = computed(() => store.state.user_id);

watchEffect(() => {
  if (userId.value === null && router.currentRoute.value.path !== '/login') {
    router.push('/login');
  }
});
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
