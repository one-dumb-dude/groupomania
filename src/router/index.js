import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import Posts from '@/components/Posts.vue';
import UserProfile from '@/views/UserProfile.vue';
import PostDetail from '@/components/PostDetail.vue';

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
        meta: { requiresAuth: true}
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
        meta: { requiresAuth: true}
    },
    {
        path: '/post/:postId',
        name: 'post-detail',
        component: PostDetail,
        meta: { requiresAuth: true}
    },
    {
        path: '/userprofile',
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiresAuth: true}
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

router.beforeEach((to,from,next) => {
   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
   const isAuthenticated = localStorage.getItem('jwtToken');

   if (to.path === '/') {
       if (isAuthenticated) {
           next('/home');
       } else {
           next('/login');
       }
   } else if (requiresAuth && !isAuthenticated) {
       next('/login');
   } else {
       next();
   }
});

export default router;
