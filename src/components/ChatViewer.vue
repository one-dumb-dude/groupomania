<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import {Message, User} from "@/types";

const store = useStore();

onMounted(() => {
  store.dispatch('chatviewer/fetchMessages');
});

const messages = computed(() => store.state.chatviewer.messages as Message[]);
const user = computed(() => store.state.user as User);

</script>
n
<template>
  <h4>Groupomania chat:</h4>
  <ul>
    <li v-for="message in messages" :key="message.message_id">
      <span>{{user.username}}</span>: {{message.text}}
    </li>
  </ul>
</template>

<style lang="sass" scoped>
  h4
    font-family: sans-serif
    color: red

  ul
    padding: 0

    li
      list-style-type: none

      span
        font-weight: bold
</style>
