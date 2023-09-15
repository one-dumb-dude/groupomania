<script setup>
import {useStore} from 'vuex';
import {computed, reactive, ref} from 'vue';

const store = useStore();

const loginErrorMessage = computed(() => store.state.chatbox.loginErrorMessage);
const user = computed(() => store.state.user);

const state = reactive({
  inputValue: ''
});

const imageInputRef = ref(null);

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
  state.inputValue = '';

}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="send-form">
    <div class="send-form__image-upload">
      <label class="send-form__image-upload-label" for="upload-image">Upload Image</label>
      <input id="upload-image" class="send-form__image-upload-input" type="file" name="image" accept="image/*" ref="imageInputRef">
    </div>
    <div class="send-form__message">
      <input class="send-form__message-input" type="text" name="chat-input" v-model="state.inputValue">
      <button class="send-form__message-submit" type="submit">Send</button>
    </div>
  </form>
  <strong v-if="loginErrorMessage !== null">{{loginErrorMessage.error.message}}</strong>
</template>

<style lang="sass" scoped>
.send-form
  display: flex
  flex-direction: column
  grid-row-gap: 20px
  width: 100%

  &__image-upload, &__message
    display: flex

  &__image-upload
    flex-direction: column
    justify-content: center
    align-items: center
    &-label
      font-size: 18px

  &__message
    &-input
      flex: 1

    &-submit
      flex: 0 0 33.33%


</style>
