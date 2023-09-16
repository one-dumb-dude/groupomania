<script setup>
import {useStore} from 'vuex';
import {computed, reactive, ref} from 'vue';

const store = useStore();

const loginErrorMessage = computed(() => store.state.chatbox.loginErrorMessage);
const user = computed(() => store.state.user);

const state = reactive({
  inputValue: '',
  imgPreviewDataUrl: null
});

const imageInputRef = ref(null);

function handleImageChange () {
  const imageFile = imageInputRef.value.files[0];

  if (imageFile) {
    const reader = new FileReader();

    reader.onload = () => {
      state.imgPreviewDataUrl = reader.result;
    };

    reader.readAsDataURL(imageFile);
  }
}

const handleSubmit = () => {
  // Check if there's neither text nor image, and if so, exit early.
  if (state.inputValue === '' && (!imageInputRef.value || imageInputRef.value.files.length === 0)) {
    return;
  }

  let payload;

  if (imageInputRef.value && imageInputRef.value.files.length > 0) {
    const formData = new FormData();
    formData.append('user_id', user.value.user_id);
    formData.append('text', state.inputValue);
    formData.append('image', imageInputRef.value.files[0])
    payload = formData;
  } else {
    payload = {
      user_id: user.value.user_id,
      text: state.inputValue
    }
  }

  store.dispatch('chatbox/postMessage', payload);
  // clear input values
  imageInputRef.value.value = null;
  state.imgPreviewDataUrl = null;
  state.inputValue = '';

}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="send-form">
    <div class="send-form__image-preview">
      <img v-if="state.imgPreviewDataUrl" class="send-form__image-preview-image" :src="state.imgPreviewDataUrl" alt="Preview of uploaded image">
    </div>
    <div class="send-form__image-upload">
      <label class="send-form__image-upload-label" for="upload-image">Upload Image</label>
      <input id="upload-image" class="send-form__image-upload-input"
             type="file" name="image" accept="image/*"
             ref="imageInputRef" @change="handleImageChange">
    </div>
    <div class="send-form__message">
      <input class="send-form__message-input" type="text" name="chat-input" autocomplete="off" v-model="state.inputValue">
      <button class="send-form__message-submit" type="submit">Send</button>
    </div>
  </form>
  <strong v-if="loginErrorMessage !== null">{{loginErrorMessage.error.message}}</strong>
</template>

<style lang="sass" scoped>
.send-form
  display: flex
  flex-direction: column
  align-items: center
  grid-row-gap: 20px
  width: 100%

  &__image-preview
    width: 200px
    height: auto

    &-image
      width: 100%
      height: 100%

  &__image-upload, &__message
    display: flex

  &__image-upload
    justify-content: center
    align-items: center
    column-gap: 20px

    &-label
      font-size: 18px

  &__message
    width: 100%

    &-input
      flex: 1

    &-submit
      flex: 0 0 33.33%


</style>
