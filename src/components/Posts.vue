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
  await store.dispatch('post/getPosts', {user_id: user.value.user_id});
});

function navigateToLink(id) {
  router.push({name: 'post-detail', params: {postId: id}});
}

</script>

<template>
  <h4>Groupomania:</h4>
  <div id="post-container" ref="postsContainer">
    <ul v-if="posts">

        <li v-for="post in posts" :key="post.post_id" @click="navigateToLink(post.post_id)">
          <div>
            {{ post.username }}
          </div>
          <div>
            {{ post.title }}
          </div>
          <div>
            {{ post.content }}
          </div>
        </li>

    </ul>
  </div>

</template>

<style lang="sass" scoped>
h4
  font-family: sans-serif
  color: red

#post-container
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
