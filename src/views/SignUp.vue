<script setup>
</script>

<template>

  <div id="signup-form">
    <h2>Sign up</h2>
    <form>
      <label for="first-name">First Name</label>
      <input type="text" name="first-name"/>

      <label for="last-name">Last Name</label>
      <input type="text" name="last-name">

      <label for="email">Email</label>
      <input type="text" name="email"/>

      <label for="password">Password</label>
      <input type="password" name="password"/>
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
</style>
