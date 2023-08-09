<script lang="ts" setup>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';
import { User } from "@/types";

const store = useStore();

const user = computed(()=> store.state.user as User);

const state = reactive({
  isEditable: false,
  editableUsername: user.value.username,
  editableFirstName: user.value.first_name,
  editableLastName: user.value.last_name,
  editableEmail: user.value.email
});

function toggleEditable() {
  state.isEditable = !state.isEditable
};

</script>

<template>
  <div id="userprofile__page">
    <h3>user profile</h3>
    <button type="button" @click="toggleEditable">Edit</button>
    <form id="userprofile__form" @submit.prevent>
      <label for="username">UserName</label>
      <input type="text" name="username" v-model="state.editableUsername" :readonly="!state.isEditable">
      <label for="first-name">First Name</label>
      <input type="text" name="first-name" v-model="state.editableFirstName" :readonly="!state.isEditable">
      <label for="last-name">Last Name</label>
      <input type="text" name="last-name" v-model="state.editableLastName" :readonly="!state.isEditable">
      <label for="email">Email</label>
      <input type="text" name="email" v-model="state.editableEmail" :readonly="!state.isEditable">
    </form>
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
