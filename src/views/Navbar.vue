<script setup>
import {useStore} from 'vuex';
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const showLogout = computed(() => {
  return route.name !== 'Login' &&  route.name !== 'Signup';
});

function logout() {
  store.dispatch('user/logoutUser');
  router.push('/');
}
</script>

<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__username">{{store.state.user.username}}</li>
    </ul>
    <menu class="nav__menu">
      <li>
        <router-link to="/home">Home</router-link>
      </li>
      <li>
        <router-link to="/userprofile">Userprofile</router-link>
      </li>
      <li v-if="showLogout">
        <button class="nav__logout" @click="logout">Log Out</button>
      </li>
    </menu>
  </nav>
</template>

<style lang="sass" scoped>
.nav
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  height: max-content
  padding: 20px 25px
  background-color: pink

  &__list
    margin: 0
    padding: 0

  &__username
    list-style-type: none

  &__menu
    display: flex
    justify-content: center
    align-items: center
    grid-gap: 10px
    margin: 0
    padding: 0
    width: max-content
    list-style-type: none

  &__logout
    padding: 10px

</style>
