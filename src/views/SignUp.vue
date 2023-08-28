<script lang="ts" setup>
import {computed, reactive, ref} from "vue";
import axios from "axios";

type State = {
  username: string | null;
  usernameMinLength: number;
  usernameMaxLength: number;
  usernameRegExp: string;
  usernameErrorMessage: string | null;
  password: string | null;
  passwordMinLength: number;
  passwordMaxLength: number;
  passwordErrorMessage: string | null;
  confirmPassword: string | null;
  loginErrorMessage: string | null;
  validityValid: boolean;
}

const state = reactive<State>({
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
  loginErrorMessage: null,
  validityValid: false
});

const usernameRef = ref(null);
const passwordRef = ref(null);

const onInputChange = (inputReference, labelNameOfInput) => {
  const validity = inputReference.validity;
  state.validityValid = validity.valid;

  const labelNameOfInputUppercase = `${labelNameOfInput.charAt(0).toUpperCase() + labelNameOfInput.slice(1)}`;
  const statePropertyErrorMessage = `${labelNameOfInput}ErrorMessage`;

  if (!validity.valid) {
    if (validity.tooShort) {
      state[statePropertyErrorMessage] = `${labelNameOfInputUppercase} too short`;
    } else if (validity.tooLong) {
      state[statePropertyErrorMessage] = `${labelNameOfInputUppercase} too long`;
    } else if (validity.patternMismatch) {
      state[statePropertyErrorMessage] = `${labelNameOfInputUppercase} should be alphanumeric`;
    }
  } else {
    state[statePropertyErrorMessage] = null;
  }
};

const passwordMatch = computed(() => {
  return state.password === state.confirmPassword
});

const onSubmit = async (event) => {
  event.preventDefault();

  const userInfo = {
    username: state.username,
    password: state.password
  }
  try {
    const response = await axios.post('http://localhost:3001/api/users/signup', userInfo);
    const data = response.data;
    console.log(data);
  } catch (errorResponse) {
    console.log(errorResponse);
    state.loginErrorMessage = errorResponse.response.data.error;
  }

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
             @input="onInputChange(usernameRef, 'username')"
             @blur="onInputChange(usernameRef, 'username')"
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
             @input="onInputChange(passwordRef, 'password')"
             @blur="onInputChange(passwordRef, 'password')"
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
      <span v-if="state.loginErrorMessage">{{state.loginErrorMessage}}</span>
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

span
  color: red
  font-weight: bold
  font-family: sans-serif
  padding: 0
  margin: 0

</style>
