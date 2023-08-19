<script lang="ts" setup>
import {computed, reactive} from "vue";

const state = reactive({
  password: null,
  confirmPassword: null
});

const passwordMatch = computed(() => {
  return state.password === state.confirmPassword
});

</script>

<template>

  <div id="signup-form">
    <h2>Sign up</h2>
    <form>
      <label for="first-name">First Name</label>
      <input type="text" id="first-name" name="firstName" pattern="[A-Za-z]{1,48}" required/>

      <label for="last-name">Last Name</label>
      <input type="text" id="last-name" name="lastName" pattern="[A-Za-z]{1,48}" required>

      <label for="email">Email</label>
      <input type="email" id="email" name="email" required/>

      <label for="password">Password</label>
      <input type="password" id="password" name="password" minlength="8" maxlength="128" v-model="state.password" autocomplete="new-password" required/>

      <label for="confirm-password">Confirm Password</label>
      <input type="password" id="confirm-password" name="confirmPassword" minlength="8" maxlength="128" v-model="state.confirmPassword" autocomplete="new-password" required/>

      <p v-if="!passwordMatch" class="error-message">Passwords do not match</p>

      <button :disabled="!passwordMatch" type="submit">Submit</button>
    </form>
  </div>

</template>

<style lang="sass" scoped>
#signup-form
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  height: 100%

  & > form
    display: flex
    flex-direction: column
    grid-gap: 10px
    width: 300px
    height: max-content

input:invalid
  border: 2px solid red

.error-message
  color: red
  font-weight: bold
</style>
