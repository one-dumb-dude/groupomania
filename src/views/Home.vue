<script lang="ts" setup>
import Chatbox from '@/components/Chatbox.vue';
import ChatViewer from "@/components/ChatViewer.vue";

</script>

<template>
  <section>
    <div>
      <ChatViewer />
      <Chatbox />
    </div>
  </section>
</template>

<style lang="sass" scoped>
section
  display: flex
  justify-content: center
  align-items: center
  width: 100%

  & > div
    display: flex
    flex-direction: column
    grid-row-gap: 40px
    width: 50%
  h2
    font-size: 55px
    color: red
</style>
