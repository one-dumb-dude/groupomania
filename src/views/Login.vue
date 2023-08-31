<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, reactive} from "vue";

const store = useStore();

const state = reactive({
  username: '',
  password: ''
});

const router = useRouter();

const loginErrorMessage = computed(() => store.state.user.loginErrorMessage);
const signupSuccessMessage = computed(()=> store.state.user.signupSuccessMessage);

const handleSignUp = () => {
  router.push('/signup');
}

const handleLogin = async () => {
  await store.dispatch('user/loginUser', {username: state.username, password: state.password});
}
</script>

<template>
  <div id="login__main">
    <form id="login__form" @submit.prevent>
      <label for="username">Username:</label>
      <input type="text" name="username" v-model="state.username" />
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="state.password" />
      <button type="button" @click="handleSignUp">Sign-Up</button>
      <button type="submit" @click="handleLogin">Login</button>
    </form>
    <h4 id="message__login_error" v-if="loginErrorMessage">{{loginErrorMessage}}</h4>
    <span id="message__signup_success" v-if="signupSuccessMessage">{{signupSuccessMessage}}</span>
  </div>
</template>

<style lang="sass" scoped>
#login
  &__main
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    height: 100%

  &__form
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

#message
  &__login_error
    font-family: sans-serif
    color: red

  &__signup_success
    font-family: sans-serif
    color: lawngreen
</style>
