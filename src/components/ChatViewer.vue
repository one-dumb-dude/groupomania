<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";

const store = useStore();

onMounted(() => {
  store.dispatch('chatviewer/fetchMessages');
  console.log('que paso')
})

const messages = computed(() => store.state.chatviewer.messages);

</script>
n
<template>
  <h2>Messages:</h2>
  {{messages}}
</template>

<style lang="sass" scoped>
  h2
    font-size: 55px
    color: red
</style>
