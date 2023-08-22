<script setup>
import {computed, reactive, ref} from "vue";

const state = reactive({
  password: null,
  confirmPassword: null,
  firstNameError: null,
  lastNameError: null,
  emailError: null
});

const firstNameInput = ref(null);
const lastNameInput = ref(null);
const emailInput = ref(null);

const passwordMatch = computed(() => {
  return state.password === state.confirmPassword
});

const checkInputValidity = (inputElement, key) => {
  console.log(inputElement.validity);
  if (!inputElement.validity.valid) {
    if (inputElement.validity.typeMismatch && inputElement.type === 'email') {
      state[key] = 'Invalid email format';
    } else if (inputElement.validity.patternMismatch) {
      state[key] = 'Pattern does not match';
    } else if (inputElement.validity.tooShort) {
      state[key] = 'Value is too short';
    } else if (inputElement.validity.tooLong) {
      state[key] = 'Value is too long';
    }
  } else {
    state[key] = null;
  }
}
</script>

<template>

  <div id="signup-form">
    <h2>Sign up</h2>
    <form>
      <label for="first-name">First Name</label>
      <input type="text"
             id="first-name"
             ref="firstNameInput"
             name="firstName"
             pattern="^[A-Za-z]{1,48}$"
             minlength="1" maxlength="48"
             @input="() => checkInputValidity(firstNameInput, 'firstNameError')"
             required />
      <span v-if="state.firstNameError">{{state.firstNameError}}</span>

      <label for="last-name">Last Name</label>
      <input type="text"
             id="last-name"
             ref="lastNameInput"
             name="lastName"
             pattern="[A-Za-z]{1,48}"
             minlength="1" maxlength="48"
             @input="() => checkInputValidity(lastNameInput, 'lastNameError')"
             required>
      <span v-if="state.lastNameError">{{state.lastNameError}}</span>

      <label for="email">Email</label>
      <input type="email"
             id="email"
             ref="emailInput"
             name="email"
             @input="()=> checkInputValidity(emailInput, 'emailError')"
             required/>
      <span v-if="state.emailError">{{state.emailError}}</span>

      <label for="password">Password</label>
      <input type="password" id="password" name="password" minlength="8" maxlength="128" v-model="state.password" autocomplete="new-password" required/>

      <label for="confirm-password">Confirm Password</label>
      <input type="password" id="confirm-password" name="confirmPassword" minlength="8" maxlength="128" v-model="state.confirmPassword" autocomplete="new-password" required/>

      <span v-if="!passwordMatch" class="error-message">Passwords do not match</span>

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

span
  color: red
  font-weight: bold
  font-family: sans-serif
  padding: 0
  margin: 0

</style>
