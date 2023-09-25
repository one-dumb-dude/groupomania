<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

</script>

<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>Author: {{ post.username }}</p>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

