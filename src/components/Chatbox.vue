<script setup>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';

const store = useStore();
const state = reactive({
  inputValue: ''
});

const text = computed(() => store.state.chatbox.text);

const handleSubmit = () => {
  console.log(state.inputValue);
  store.commit('chatbox/updateText', state.inputValue);
  state.inputValue = '';
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="chat-input">Chat input</label>
    <input type="text" name="chat-input" v-model="state.inputValue"/>
    <button type="submit">Send</button>
  </form>
  <h4>{{text}}</h4>
</template>

<style lang="sass">

</style>
