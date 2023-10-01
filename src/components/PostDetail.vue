<script lang="ts" setup>
// TODO: You need to perform input validation for the form
import {onMounted, computed, watch, reactive, ref} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex';
import {Comment, Post} from "@/types";
import {onInputChange} from '@/utils/formValidation';
import timeSince from '@/utils/timeSince'

const store = useStore();
const route = useRoute();
const postId = route.params.postId;
const userId = store.state.user.user_id;
const commentInputRef = ref(null);
const postData = computed(() => store.state.post.postData as Post);
const comments = computed(() => store.state.comment.comments as Comment[]);

const state = reactive({
  comment: null,
  commentMinLength: 5,
  commentMaxLength: 200,
  commentErrorMessage: null,
  isSubmitting: false,
  validityValid: false
});

watch(() => store.state.comment.errorMessage, (newValue) => {
  state.commentErrorMessage = store.state.comment.errorMessage;
});

const checkValidity = computed(() => {
  return !state.validityValid || !state.comment;
});

onMounted(async () => {
  await store.dispatch('post/getPost', {user_id: userId, post_id: postId});
});

const handleKeyDown = (event) => {
  if (!state.validityValid || !state.comment) {
    return
  }
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    createComment(event);
  }
}

const clearErrorMessages = () => {
  store.state.comment.errorMessage = null;
  state.commentErrorMessage = null;
}

const handleFocus = () => {
  clearErrorMessages();
}

const createComment = (event) => {
  event.preventDefault();

  state.isSubmitting = true;

  const payload = {
    user_id: userId,
    post_id: postId,
    comment: state.comment
  };
  store.dispatch('comment/createComment', payload);
  state.comment = null;
  clearErrorMessages();
  state.isSubmitting = false;
}

</script>

<template>
  <div class="post-details">
    <!--    <h4>Post Details</h4>-->
    <ul v-if="postData" class="post">
      <li class="post__username">{{ postData.username }}</li>
      <li class="post__title">{{ postData.title }}</li>
      <li class="post__content">{{ postData.content }}</li>
      <li v-if="postData.image_url">
        <img class="post__image" :src="postData.image_url" alt="Uploaded image content">
      </li>
    </ul>
    <div v-else class="post__message">
      No Post Data
    </div>

    <h4>Comments</h4>
    <div class="comments__wrapper">
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
  </div>
  <div class="create-comment">
    <form @submit="createComment" class="create-comment__form">
      <label for="comment" class="create-comment__label">Create a comment</label>
      <strong v-if="state.commentErrorMessage">{{state.commentErrorMessage}}</strong>
      <input id="comment"
                class="create-comment__input"
                type="text"
                placeholder="Enter comment"
                name="comment"
                :minlength="state.commentMinLength"
                :maxlength="state.commentMaxLength"
                ref="commentInputRef"
                v-model="state.comment"
                @focus="handleFocus"
                @input="onInputChange(commentInputRef, 'comment', state)"
                @keydown="handleKeyDown">
      <button class="create-comment__submit" type="submit" :disabled="checkValidity">Post comment</button>
    </form>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles/abstracts/mixins'
@use '@/assets/styles/abstracts/functions' as funcs

.post-details
  flex: 1
  display: flex
  flex-direction: column
  justify-content: center
  row-gap: 15px
  margin: 50px auto
  width: 75%
  overflow: hidden

  @include mixins.mobile_break
    row-gap: funcs.get-mobile-vw(15px)
    margin: funcs.get-mobile-vw(50px) auto

  h4
    //font-weight: normal
    font-size: 22px
    text-align: center

    @include mixins.mobile_break
      font-size: funcs.get-mobile-vw(22px)

  .post, .comments
    list-style-type: none

  .post__message, .comments__message
    font-size: 24px
    font-weight: bold
    color: red

    @include mixins.mobile_break
      font-size: funcs.get-mobile-vw(24px)

  .post
    display: flex
    flex-direction: column
    row-gap: 10px

    @include mixins.mobile_break
      row-gap: funcs.get-mobile-vw(10px)

    &__username, &__title, &__content
      display: flex

    &__username, &__title::before, &__content::before
      font-size: 14px

      @include mixins.mobile_break
        font-size: funcs.get-mobile-vw(14px)

    &__username
      flex-direction: row
      column-gap: 10px
      align-self: flex-end
      font-size: 18px
      font-weight: bold

      @include mixins.mobile_break
        column-gap: funcs.get-mobile-vw(10px)
        font-size: funcs.get-mobile-vw(18px)

      &::before
        content: 'OP:'

    &__title
      flex-direction: column
      font-size: 32px
      font-weight: bold

      @include mixins.mobile_break
        font-size: funcs.get-mobile-vw(32px)

      &::before
        content: 'Title'

    &__content
      flex-direction: column
      font-size: 18px

      @include mixins.mobile_break
        font-size: funcs.get-mobile-vw(18px)

      &::before
        content: 'Content'
        font-weight: bold

    &__image
      width: 45%
      height: auto


  .comments
    display: flex
    flex-direction: column
    justify-content: center
    row-gap: 20px

    @include mixins.mobile_break
      row-gap: funcs.get-mobile-vw(20px)

    &__wrapper
      overflow-y: scroll

    &__list
      display: flex
      flex-direction: column
      row-gap: 10px

      @include mixins.mobile_break
        row-gap: funcs.get-mobile-vw(10px)

    &__row
      display: flex
      align-items: center
      justify-content: space-between
      padding-right: 20px

    &__username
      font-size: 20px
      font-weight: bold

      @include mixins.mobile_break
        font-size: funcs.get-mobile-vw(20px)

    &__created_at
      font-size: 18px

      @include mixins.mobile_break
        font-size: funcs.get-mobile-vw(18px)

    &__text
      font-size: 18px
      width: 98%
      align-self: flex-end

      @include mixins.mobile_break
        font-size: funcs.get-mobile-vw(18px)

.create-comment
  background-color: pink
  padding: 20px
  box-sizing: border-box

  @include mixins.mobile_break
    padding: funcs.get-mobile-vw(20px)

  &__form
    display: flex
    flex-direction: column
    row-gap: 10px
    width: 100%

  &__label
    font-size: 20px
    width: max-content

    @include mixins.mobile_break
      font-size: funcs.get-mobile-vw(20px)

  &__input
    font-size: 18px
    height: 50px
    resize: vertical
    width: 100%
    max-height: 100%

  &__submit
    padding: 10px 0
    cursor: pointer

    @include mixins.mobile_break
      padding: funcs.get-mobile-vw(10px) 0
</style>

