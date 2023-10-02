<script lang="ts" setup>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';
import { UserProfile } from "@/types";

const store = useStore();

const user = computed(()=> store.state.user as UserProfile);

const deleteAccountMessage = computed(() => store.state.user.deleteUserResponseMessage);

const state = reactive({
  isEditable: false,
  editableUsername: user.value.username,
  editableEmail: user.value.email
});

function toggleEditable() {
  state.isEditable = !state.isEditable
}

function deleteUserAccount() {
  store.dispatch('user/deleteUser', user.value.user_id);
}

</script>

<template>
  <div id="userprofile__page">
    <h3>user profile</h3>

    <form id="userprofile__form" @submit.prevent>
      <button type="button" @click="deleteUserAccount">Delete User Account</button>
    </form>
    <div v-if="deleteAccountMessage">{{deleteAccountMessage}}</div>
  </div>
</template>

<style lang="sass" scoped>
#userprofile
  &__page
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    height: 100%

  &__form
    display: flex
    flex-direction: column
    width: 300px
    height: max-content

</style>
