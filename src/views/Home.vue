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
@use '@/assets/styles/abstracts/mixins'
@use '@/assets/styles/abstracts/functions' as funcs

.home
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  padding-bottom: 50px

  @include mixins.mobile_break
    padding-bottom: funcs.get-mobile-vw(50px)

  &__wrapper
    display: flex
    flex-direction: column
    grid-row-gap: 40px
    width: 90%

    @include mixins.mobile_break
      grid-row-gap: funcs.get-mobile-vw(40px)
      width: 100%
</style>
