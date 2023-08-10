<script lang="ts" setup>
import io from 'socket.io-client';
import Chatbox from '@/components/Chatbox.vue';
import ChatViewer from "@/components/ChatViewer.vue";
import {onMounted, onUnmounted} from "vue";

const socket = io('http://localhost:3001');

onMounted(() => {
  socket.on('user-login', () => {
    console.log('User logged in')
  });
});

onUnmounted(() => {
  socket.disconnect();
});


</script>

<template>
  <router-link to="/userprofile">User Profile</router-link>
  <ChatViewer />
  <Chatbox />
</template>

<style lang="sass" scoped>
  h2
    font-size: 55px
    color: red
</style>
