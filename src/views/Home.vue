<script lang="ts" setup>
import Chatbox from '@/components/Chatbox.vue';
import ChatViewer from "@/components/ChatViewer.vue";
import Posts from "@/components/Posts.vue";

</script>

<template>
  <section class="home">
    <div class="home__wrapper">
      <Posts />
<!--      <ChatViewer />-->
<!--      <Chatbox />-->
    </div>
  </section>
</template>

<style lang="sass" scoped>
.home
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%

  &__wrapper
    display: flex
    flex-direction: column
    grid-row-gap: 40px
    width: 90%
</style>
