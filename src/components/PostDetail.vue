<script lang="ts" setup>
import {onMounted, computed, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex';
import {Comment, Post} from "@/types";
import timeSince from '@/utils/timeSince'

const store = useStore();
const route = useRoute();
const postId = route.params.postId;
const userId = store.state.user.user_id;
const postData = computed(() => store.state.post.postData as Post);
const comments = computed(() => store.state.post.comments as Comment[]);

onMounted(async () => {
  await store.dispatch('post/getAPost', {user_id: userId, post_id: postId});
});

</script>

<template>
  <div class="post-details">
    <h4>Post Details</h4>
    <ul v-if="postData" class="post-list">
      <li class="post-list__username">{{ postData.username }}</li>
      <li class="post-list__title">{{ postData.title }}</li>
      <li class="post-list__content">{{ postData.content }}</li>
    </ul>
    <div v-else class="post-list__message">
      No Post Data
    </div>

    <h4>Comments</h4>
    <ul v-if="comments && comments.length" class="comments-list">
      <li v-for="comment in comments" :key="comment.comment_id">
        <div class="comments-list__row">
          <span class="comments-list__username">{{ comment.username }}</span>
          <span class="comments-list__created_at">{{ timeSince(comment.created_at) }}</span>
        </div>
        <div class="comments-list__text">{{ comment.text }}</div>
      </li>
    </ul>
    <div v-else class="comments-list__message">
      Be the first to comment!
    </div>
  </div>
  <div class="create-comment">
    <form @submit.prevent class="create-comment__form">
      <label class="create-comment__label">Create a comment</label>
      <textarea class="create-comment__textarea" placeholder="Enter comment" rows="3"></textarea>
      <button class="create-comment__submit" type="submit">Post comment</button>
    </form>

  </div>
</template>

<style lang="sass" scoped>
.post-details
  display: flex
  flex-direction: column
  justify-content: center
  row-gap: 15px
  flex: 1
  margin: 50px auto
  width: 75%

  h4
    //font-weight: normal
    text-align: center

  .post-list, .comments-list
    list-style-type: none

  .post-list__message, .comments-list__message
    font-size: 24px
    font-weight: bold
    color: red

  .post-list
    display: flex
    flex-direction: column
    row-gap: 10px

    &__username
      align-self: flex-end
      font-size: 18px
      font-weight: bold

    &__title
      font-size: 32px
      font-weight: bold

    &__content
      font-size: 18px

  .comments-list
    display: flex
    flex-direction: column
    justify-content: center
    row-gap: 20px

    &__row
      display: flex
      align-items: center
      column-gap: 20px

    &__username
      font-size: 20px
      font-weight: bold

    &__created_at
      font-size: 18px

.create-comment
  background-color: pink
  padding: 20px
  box-sizing: border-box

  &__form
    display: flex
    flex-direction: column
    width: 100%

  &__label
    font-size: 20px
    width: max-content

  &__textarea
    resize: vertical
    width: 100%
    max-height: 100%

  &__submit
    padding: 10px 0
    cursor: pointer
</style>

