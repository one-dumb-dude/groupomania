<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";

const store = useStore();

interface Message {
  message_id: number;
  user_id: number;
  text: string;
}

onMounted(() => {
  store.dispatch('chatviewer/fetchMessages');
});

const messages = computed(() => store.state.chatviewer.messages as Message[]);

</script>
n
<template>
  <h2>Messages:</h2>
  <ul>
    <li v-for="message in messages" :key="message.message_id">
      {{message.user_id}}: {{message.text}}
    </li>
  </ul>
</template>

<style lang="sass" scoped>
  h2
    font-size: 55px
    color: red
</style>
