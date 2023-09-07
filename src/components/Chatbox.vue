<script setup>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';

const store = useStore();

const loginErrorMessage = computed(() => store.state.chatbox.loginErrorMessage);
const user = computed(() => store.state.user)

const state = reactive({
  inputValue: ''
});

const handleSubmit = () => {
  if (state.inputValue !== '') {
    store.dispatch('chatbox/postMessage', {user_id: user.value.user_id, text: state.inputValue});
    state.inputValue = '';
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" name="chat-input" v-model="state.inputValue"/>
    <button type="submit">Send</button>
  </form>
  <h5 v-if="loginErrorMessage !== null">{{loginErrorMessage.error.message}}</h5>
</template>

<style lang="sass" scoped>
form
  display: flex
  width: 100%

  input
    flex: 1

  button
    flex: 0 0 33.33%

</style>
