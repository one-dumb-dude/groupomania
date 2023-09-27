<script setup>
import {onInputChange} from '@/utils/formValidation';
import {reactive} from 'vue';

const state = reactive({
  validityValid: false
});


</script>

<template>
  <section class="create-post">
    <form class="create-post__form">
      <label for="title" class="create-post__title-label">Title</label>
      <input id="title" class="create-post__title-input" name="title" type="text">
      <label for="content" class="create-post__content-label">Content</label>
      <textarea id="content" class="create-post__content-textarea" name="content"></textarea>
      <button class="create-post__submit" type="submit">Create Post</button>
    </form>
  </section>
</template>

<style lang="sass" scoped>
.create-post
  display: flex
  justify-content: center
  align-items: center
  flex: 1

  &__form
    display: flex
    flex-direction: column
    row-gap: 10px
    width: 40%

  &__title-label, &__content-label
    font-size: 20px
    font-weight: bold

  &__content-textarea
    height: 300px
    resize: vertical

  &__submit
    padding: 20px 0
</style>
