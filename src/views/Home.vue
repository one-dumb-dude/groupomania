<script lang="ts" setup>
import Chatbox from '@/components/Chatbox.vue';
import ChatViewer from "@/components/ChatViewer.vue";

</script>

<template>
  <section class="home">
    <div class="home__wrapper">
      <ChatViewer />
      <Chatbox />
    </div>
  </section>
</template>

<style lang="sass" scoped>
.home
  display: flex
  justify-content: center
  align-items: center
  width: 100%

  &__wrapper
    display: flex
    flex-direction: column
    grid-row-gap: 40px
    width: 90%
</style>
