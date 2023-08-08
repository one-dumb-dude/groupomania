<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();

const handleSignUp = () => {
  router.push('/signup')
}

const handleLogin = () => {
  console.log('Login pressed')
  router.push('/home')
}
</script>

<template>
  <div id="login-main">
    <form id="login-form" @submit.prevent>
      <label for="username">Username:</label>
      <input type="text" name="username" />
      <label for="password">Password:</label>
      <input type="password" name="password" />
      <button type="button" @click="handleSignUp">Sign-Up</button>
      <button type="submit" @click="handleLogin">Login</button>
    </form>
  </div>
</template>

<style lang="sass" scoped>
#login-main
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 100%

  #login-form
    display: flex
    flex-direction: column
    grid-gap: 15px
    width: 300px
    height: max-content
    border: 2px solid black
    padding: 40px

    button
      &:hover
        cursor: pointer
</style>
