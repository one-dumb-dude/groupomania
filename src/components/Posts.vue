<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import {Post} from "@/types";
import {useRouter} from "vue-router";

const router = useRouter();
const postsContainer = ref(null);
const store = useStore();

const user = computed(() => store.state.user);
const posts = computed(() => store.state.post.posts as Post[]);

onMounted(async () => {
  await store.dispatch('post/getUnreadPostsCount', {user_id: user.value.user_id});
  await store.dispatch('post/getPosts', {user_id: user.value.user_id});
});

function navigateToLink(id) {
  router.push({name: 'post-detail', params: {postId: id}});
}

</script>

<template>
  <h1>Groupomania</h1>
  <div id="post-container" class="posts" ref="postsContainer">
    <div>
      <router-link :to="{name: 'CreatePost'}">Create Post</router-link>
    </div>
    <ul class="posts__order-list" v-if="posts">
      <li class="posts__list" v-for="post in posts" :key="post.post_id" @click="navigateToLink(post.post_id)">
        <p>
          {{post.post_status}}
        </p>
        <strong class="posts__username">
          {{ post.username }}
        </strong>
        <h6 class="posts__title">
          {{ post.title }}
        </h6>
        <p class="posts__content">
          {{ post.content }}
        </p>
      </li>

    </ul>
  </div>

</template>

<style lang="sass" scoped>
@use '@/assets/styles/abstracts/mixins'

h1
  font-size: 40px
  font-family: sans-serif
  color: red
  text-align: center
  padding: 0
  margin: 20px 0 0 0

.posts
  display: flex
  flex-direction: column
  row-gap: 20px
  border: 5px solid black
  padding: 20px
  flex: 1

  &__order-list
    display: flex
    flex-direction: column
    grid-row-gap: 20px
    list-style-type: none
    padding: 0

  &__list
    display: flex
    flex-direction: column
    row-gap: 5px
    border: 2px solid purple
    padding: 20px 10px
    cursor: pointer

  &__username
    align-self: flex-end
    font-size: 21px

  &__title
    font-size: 30px
    margin: 0
    text-align: center

  &__content
    font-size: 14px
    -webkit-box-orient: vertical
    -webkit-line-clamp: 1
    overflow: hidden

</style>
