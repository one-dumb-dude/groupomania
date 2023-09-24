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
  <nav>
    <ul>
      <li>{{store.state.user.username}}</li>
    </ul>
    <menu>
      <li>
        <router-link to="/home">Home</router-link>
      </li>
      <li>
        <router-link to="/userprofile">Userprofile</router-link>
      </li>
      <li v-if="showLogout">
        <button @click="logout">Log Out</button>
      </li>
    </menu>
  </nav>
</template>

<style lang="sass" scoped>
nav
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  height: max-content
  padding: 20px 25px
  background-color: pink

  & > ul
    margin: 0
    padding: 0
    & > li
      list-style-type: none

  menu
    display: flex
    justify-content: center
    align-items: center
    grid-gap: 10px
    margin: 0
    padding: 0
    width: max-content
    li
      list-style-type: none

</style>
