<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, reactive} from "vue";

const store = useStore();

const state = reactive({
  username: '',
  password: ''
});

const router = useRouter();

const errorMessage = computed(() => store.state.user.errorMessage);

const handleSignUp = () => {
  router.push('/signup')
}

const handleLogin = async () => {
  const success = await store.dispatch('user/loginUser', {username: state.username, password: state.password});
  if (success) {
    await router.push('/home');
  }
}
</script>

<template>
  <div id="login-main">
    <form id="login-form" @submit.prevent>
      <label for="username">Username:</label>
      <input type="text" name="username" v-model="state.username" />
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="state.password" />
      <button type="button" @click="handleSignUp">Sign-Up</button>
      <button type="submit" @click="handleLogin">Login</button>
    </form>
    <h4 id="error__message" v-if="errorMessage">{{errorMessage}}</h4>
  </div>
</template>

<style lang="sass" scoped>
#login-main
  display: flex
  flex-direction: column
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

#error__message
  font-family: sans-serif
  color: red
</style>
