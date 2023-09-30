import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import Posts from '@/components/Posts.vue';
import UserProfile from '@/views/UserProfile.vue';
import PostDetail from '@/components/PostDetail.vue';
import CreatePost from '@/views/CreatePost.vue';
import {useStore} from 'vuex';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {requiresAuth: true}
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
        meta: {requiresAuth: true}
    },
    {
        path: '/create-a-post',
        name: 'CreatePost',
        component: CreatePost,
        meta: {requiresAuth: true}
    },
    {
        path: '/post/:postId',
        name: 'post-detail',
        component: PostDetail,
        meta: {requiresAuth: true}
    },
    {
        path: '/userprofile',
        name: 'UserProfile',
        component: UserProfile,
        meta: {requiresAuth: true}
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

router.beforeEach((to, from, next) => {
    const store = useStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem('jwtToken');

    const userId = store.state.user.user_id;

    if (to.path === '/') {
        if (isAuthenticated) {
            next('/home');
        } else {
            next('/login');
        }
    } else if (requiresAuth && (!isAuthenticated || !userId)) {
        next('/login');
    } else {
        next();
    }
});

export default router;
