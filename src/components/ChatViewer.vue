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

function formatDate(timestamp) {
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return ` ${month}${day}, ${year} ${hours}:${minutes}:${seconds}${ampm}`;
}

function timeSince(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now - past) / 1000);

  // Define time periods in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;  // an average month is roughly 30 days
  const year = day * 365; // not accounting for leap years

  if (seconds < minute) return "now";

  let elapsedTime = "";

  const years = Math.floor(seconds / year);
  if (years) elapsedTime += years + "y ";

  const months = Math.floor((seconds % year) / month);
  if (months) elapsedTime += months + "M ";

  const days = Math.floor((seconds % month) / day);
  if (days) elapsedTime += days + "d ";

  const hours = Math.floor((seconds % day) / hour);
  if (hours) elapsedTime += hours + "H ";

  const minutes = Math.floor((seconds % hour) / minute);
  if (minutes) elapsedTime += minutes + "m";

  return elapsedTime.trim();
}

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
