<script lang="ts" setup>
import {computed, onBeforeUnmount, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onInputChange} from "@/utils/formValidation";
import {Signup} from '@/types';

const usernameRef = ref(null);
const passwordRef = ref(null);

const store = useStore();
const router = useRouter();

onBeforeUnmount(() => {
  store.commit('user/CLEAR_SIGNUP_ERROR_MESSAGE');
});

const state = reactive<Signup>({
  username: null,
  usernameMinLength: 5,
  usernameMaxLength: 15,
  usernameRegExp: "^[a-zA-Z0-9]+$",
  usernameErrorMessage: null,
  password: null,
  passwordMinLength: 8,
  passwordMaxLength: 128,
  passwordErrorMessage: null,
  confirmPassword: null,
  validityValid: false
});

const passwordMatch = computed(() => {
  return state.password === state.confirmPassword
});

const onSubmit = async (event) => {
  event.preventDefault();

  const userInfo = {
    username: state.username,
    password: state.password
  }

  await store.dispatch('user/signupUser', userInfo);
}
</script>

<template>
  <div id="signup-form">
    <h2>Sign up</h2>
    <form @submit="onSubmit">
      <label for="username">Username</label>
      <input type="text"
             ref="usernameRef"
             id="username"
             name="username"
             :minlength="state.usernameMinLength"
             :maxlength="state.usernameMaxLength"
             :pattern="state.usernameRegExp"
             @input="onInputChange(usernameRef, 'username', state)"
             @blur="onInputChange(usernameRef, 'username', state)"
             v-model="state.username"
             required/>

      <span v-if="state.usernameErrorMessage">{{ state.usernameErrorMessage }}</span>

      <label for="password">Password</label>
      <input type="password"
             ref="passwordRef"
             id="password"
             name="password"
             :minlength="state.passwordMinLength"
             :maxlength="state.passwordMaxLength"
             @input="onInputChange(passwordRef, 'password', state)"
             @blur="onInputChange(passwordRef, 'password', state)"
             v-model="state.password"
             autocomplete="new-password"
             required/>
      <span v-if="state.passwordErrorMessage">{{ state.passwordErrorMessage }}</span>

      <label for="confirm-password">Confirm Password</label>
      <input type="password"
             id="confirm-password"
             name="confirmPassword"
             :minlength="state.passwordMinLength"
             :maxlength="state.passwordMaxLength"
             v-model="state.confirmPassword"
             autocomplete="new-password"
             required/>

      <span v-if="!passwordMatch" class="error-message">Passwords do not match</span>

      <button :disabled="!state.validityValid || !passwordMatch" type="submit">Submit</button>
      <span v-if="store.state.user.signupErrorMessage">{{ store.state.user.signupErrorMessage }}</span>
    </form>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/abstracts/mixins'

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

//@include validation-error
</style>
