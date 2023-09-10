<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import {Message} from "@/types";

const chatMessagesContainer = ref(null);

const store = useStore();

const user = computed(() => store.state.user);
const messages = computed(() => store.state.chatviewer.messages as Message[]);

watch(messages, () => {
  nextTick(() => {
    chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight;
  });
});

onMounted(() => {
  store.dispatch('chatviewer/fetchMessages', { user_id: user.value.user_id });
});

</script>

<template>
  <h4>Groupomania chat:</h4>
  <div id="chat-container" ref="chatMessagesContainer">
    <ul>
      <li v-for="message in messages" :key="message.message_id">
        <span>{{message.username}}</span>:{{message.text}}
      </li>
    </ul>
  </div>

</template>

<style lang="sass" scoped>
  h4
    font-family: sans-serif
    color: red

  #chat-container
    border: 5px solid black
    overflow-y: scroll
    height: 50vh
    padding: 20px
    ul
      display: flex
      flex-direction: column
      grid-row-gap: 20px
      padding: 0

      li
        list-style-type: none
        border: 2px solid black
        padding: 20px 10px

        span
          font-weight: bold
</style>
