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

const unreadPosts = computed(() => store.state.post.unreadPosts);

function logout() {
  store.dispatch('user/logoutUser');
  router.push('/');
}
</script>

<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__username">{{store.state.user.username}}</li>
      <li v-if="unreadPosts > 0" class="nav__unread-count">Unread Post: {{unreadPosts}}</li>
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
    display: flex
    align-items: center
    column-gap: 10px
    margin: 0
    padding: 0
    list-style-type: none

  &__username
    font-size: 20px
    font-weight: bold

  &__menu
    display: flex
    justify-content: center
    align-items: center
    grid-gap: 20px
    margin: 0
    padding: 0
    width: max-content
    list-style-type: none

    a
      font-size: 20px
      font-weight: bold
      color: red
      text-decoration: none

  &__logout
    font-size: 20px
    font-weight: bold
    padding: 15px
    cursor: pointer
    border: none
    border-radius: 10px
    background-color: white
    color: red

</style>
