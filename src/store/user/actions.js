import axios from 'axios';
import router from '@/router';

const nodeServer = import.meta.env.VITE_NODE_DEVELOPMENT_SERVER;

const userActions = {
    async loginUser({commit}, payload) {
        try{
            const response = await axios.post(`${nodeServer}/api/users/login`, payload);
            commit('SET_USER_DATA', response.data);
            commit('SET_LOGIN_STATUS', 'success');
            commit('SET_LOGIN_ERROR_MESSAGE', null);
            await router.push('/home');
        } catch (err) {
            const responseMessage = err.response?.data?.message;
            commit('SET_LOGIN_STATUS', 'error');
            commit('SET_LOGIN_ERROR_MESSAGE', responseMessage || 'Login Failed');
        }
    },

    async signupUser({commit}, payload) {
        try{
            const response = await axios.post(`${nodeServer}/api/users/signup`, payload);
            const responseMessage = response?.data?.message;

            if (response.status === 200 || response.status === 201) {
                commit('SET_SIGNUP_SUCCESS_MESSAGE', responseMessage || 'Sign up successful');
                await router.push('/');
            }
        } catch (err) {
            const responseMessage = err?.response?.data?.message;
            commit('SET_SIGNUP_ERROR_MESSAGE', responseMessage || 'Error Signing up');
        }
    }
}


export default userActions;
