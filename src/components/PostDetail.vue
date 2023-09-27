<script lang="ts" setup>
import {onMounted, computed, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex';
import {Comment, Post} from "@/types";

const store = useStore();
const route = useRoute();
const postId = route.params.postId;
const userId = store.state.user.user_id;
const postData = computed(() => store.state.post.postData as Post);
const comments = computed(() => store.state.post.comments as Comment[]);

watch(postData, (newValue, oldValue) => {
  console.log('Post changed:', newValue.content);
});

onMounted(async () => {
  await store.dispatch('post/getAPost', {user_id: userId, post_id: postId});
});

</script>

<template>
  <div>
    <ul v-if="postData">
      <li>{{ postData.username }}</li>
      <li>{{ postData.title }}</li>
      <li>{{ postData.content }}</li>
    </ul>
    <div v-else>
      No Post Data
    </div>

    <ul v-if="comments && comments.length">
      <li v-for="comment in comments" :key="comment.comment_id">
        {{comment.username}}<br/>
        {{comment.created_at}}<br/>
        {{ comment.text }}
      </li>
    </ul>
    <div v-else>
      No comment Data
    </div>
  </div>
</template>

