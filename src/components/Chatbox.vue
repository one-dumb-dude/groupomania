<script setup>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';

const store = useStore();

const errorMessage = computed(() => store.state.chatbox.errorMessage);

const state = reactive({
  inputValue: ''
});

const handleSubmit = () => {
  console.log(state.inputValue);
  if (state.inputValue !== '') {
    store.dispatch('chatbox/postMessage', {user_id: 1, text: state.inputValue});
    state.inputValue = '';
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" name="chat-input" v-model="state.inputValue"/>
    <button type="submit">Send</button>
  </form>
  <h5 v-if="errorMessage !== null">{{errorMessage.error.message}}</h5>
</template>

<style lang="sass">

</style>
