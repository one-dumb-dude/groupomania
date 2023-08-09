import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import UserProfile from '@/views/UserProfile.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/userprofile',
        name: 'UserProfile',
        component: UserProfile
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
