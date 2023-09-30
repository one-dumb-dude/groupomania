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

const createPost = () => {
  alert('chucha')
}

</script>

<template>
  <div class="post-details">
<!--    <h4>Post Details</h4>-->
    <ul v-if="postData" class="post">
      <li class="post__username">{{ postData.username }}</li>
      <li class="post__title">{{ postData.title }}</li>
      <li class="post__content">{{ postData.content }}</li>
    </ul>
    <div v-else class="post__message">
      No Post Data
    </div>

    <h4>Comments</h4>
    <ul v-if="comments && comments.length" class="comments">
      <li class="comments__list" v-for="comment in comments" :key="comment.comment_id">
        <div class="comments__row">
          <span class="comments__username">{{ comment.username }}</span>
          <span class="comments__created_at">{{ timeSince(comment.created_at) }}</span>
        </div>
        <div class="comments__text">{{ comment.text }}</div>
      </li>
    </ul>
    <div v-else class="comments__message">
      Be the first to comment!
    </div>
  </div>
  <div class="create-comment">
    <form @submit.prevent class="create-comment__form">
      <label class="create-comment__label">Create a comment</label>
      <textarea class="create-comment__textarea" placeholder="Enter comment" rows="3"></textarea>
      <button class="create-comment__submit" type="submit" @click="createPost">Post comment</button>
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
    font-size: 22px
    text-align: center

  .post, .comments
    list-style-type: none

  .post__message, .comments__message
    font-size: 24px
    font-weight: bold
    color: red

  .post
    display: flex
    flex-direction: column
    row-gap: 10px

    &__username, &__title, &__content
      display: flex

    &__username, &__title::before, &__content::before
      font-size: 14px

    &__username
      flex-direction: row
      column-gap: 10px
      align-self: flex-end
      font-size: 18px
      font-weight: bold

      &::before
        content: 'OP:'

    &__title
      flex-direction: column
      font-size: 32px
      font-weight: bold

      &::before
        content: 'Title'

    &__content
      flex-direction: column
      font-size: 18px

      &::before
        content: 'Content'
        font-weight: bold

  .comments
    display: flex
    flex-direction: column
    justify-content: center
    row-gap: 20px


    &__list
      display: flex
      flex-direction: column
      row-gap: 10px

    &__row
      display: flex
      align-items: center
      justify-content: space-between

    &__username
      font-size: 20px
      font-weight: bold

    &__created_at
      font-size: 18px

    &__text
      font-size: 18px
      width: 98%
      align-self: flex-end

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

