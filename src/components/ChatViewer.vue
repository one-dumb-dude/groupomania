<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import {Message} from "@/types";
import timeSince from '@/utils/timeSince'

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
        <div>
          <span>{{message.username}}</span>
          {{timeSince(message.created_at)}}
        </div>
        <div v-if="message.image_url">
          <img :src="message.image_url" alt="An image uploaded by a user">
        </div>
        <div v-if="message.text">
          {{message.text}}
        </div>
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
    padding: 20px
    flex: 1

    ul
      display: flex
      flex-direction: column
      grid-row-gap: 20px
      padding: 0

      li
        list-style-type: none
        border: 2px solid black
        padding: 20px 10px

        img
          width: 50%
          height: auto

        span
          font-weight: bold
</style>
