<script setup>
import {onInputChange} from '@/utils/formValidation';
import {computed, reactive, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const titleInputRef = ref(null);
const contentTextAreaRef = ref(null);
const inputFileRef = ref(null);

const state = reactive({
  title: null,
  titleMinLength: 10,
  titleMaxLength: 100,
  titleErrorMessage: null,
  content: null,
  contentMinLength: 25,
  contentMaxLength: 200,
  contentErrorMessage: null,
  validityValid: false,
  imgPreviewDataUrl: null,
  isSubmitting: false
});

const checkValidity = computed(() => {
  return !state.validityValid || !state.title || !state.content
});

function handleImageChange () {
  const imageFile = inputFileRef.value.files[0];

  if (imageFile) {
    const reader = new FileReader();

    reader.onload = () => {
      state.imgPreviewDataUrl = reader.result;
    };

    reader.readAsDataURL(imageFile);
  }
}

const onSubmit = (event) => {
  event.preventDefault();

  state.isSubmitting = true;

  let createPostData;

  if (inputFileRef.value && inputFileRef.value.files.length > 0) {
    const formData = new FormData();
    formData.append('user_id', store.state.user.user_id);
    formData.append('title', state.title);
    formData.append('content', state.content);
    formData.append('image', inputFileRef.value.files[0]);
    createPostData = formData;
  } else {
    createPostData = {
      user_id: store.state.user.user_id,
      title: state.title,
      content: state.content
    }
  }
  store.dispatch('post/createPost', createPostData);

  state.isSubmitting = false;
}
</script>

<template>
  <section class="create-post">
    <form @submit="onSubmit" class="create-post__form">
      <label for="title" class="create-post__title-label">Title</label>
      <input id="title"
             class="create-post__title-input"
             ref="titleInputRef"
             name="title"
             type="text"
             :minlength="state.titleMinLength"
             :maxlength="state.titleMaxLength"
             @input="onInputChange(titleInputRef, 'title', state)"
             v-model="state.title"
      >
      <span v-if="state.titleErrorMessage">{{state.titleErrorMessage}}</span>
      <label for="content" class="create-post__content-label">Content</label>
      <textarea id="content"
                class="create-post__content-textarea"
                name="content"
                ref="contentTextAreaRef"
                :minlength="state.contentMinLength"
                :maxlength="state.contentMaxLength"
                @input="onInputChange(contentTextAreaRef, 'content', state)"
                v-model="state.content"
      >
      </textarea>
      <div>
        <label for="image">Add an image:</label>
        <input id="image" type="file" name="image" accept="image/*" ref="inputFileRef" @change="handleImageChange">
      </div>
      <img v-if="state.imgPreviewDataUrl" :src="state.imgPreviewDataUrl" alt="Preview of uploaded image">
      <span v-if="state.contentErrorMessage">{{state.contentErrorMessage}}</span>
      <button class="create-post__submit" type="submit" :disabled="checkValidity || state.isSubmitting">Create Post</button>
    </form>
  </section>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/abstracts/mixins'

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

//@include validation-error
</style>
