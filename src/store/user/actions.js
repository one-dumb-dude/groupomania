import axios from 'axios';
import router from '@/router';

const nodeServer = import.meta.env.VITE_NODE_DEVELOPMENT_SERVER;

const userActions = {
    async loginUser({commit}, payload) {
        try{
            const response = await axios.post(`${nodeServer}/api/users/login`, payload);

            const token = response.data.token;

            localStorage.setItem('jwtToken', token);

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

    async logoutUser({commit}) {
        localStorage.removeItem('jwtToken');
        commit('SET_LOGIN_STATUS', 'idle');
        commit('CLEAR_USER_DATA');
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
    },

    async deleteUser({commit}, userId) {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await axios.delete(`${nodeServer}/api/users/${userId}`, {
                headers: `Authorization: Bearer ${token}`
            });

            const responseMessage = response?.data?.message || 'Error deleting user account';

            localStorage.removeItem('jwtToken');

            commit('SET_LOGIN_STATUS', 'idle');
            commit('CLEAR_USER_DATA');
            commit('SET_LOGIN_ERROR_MESSAGE', responseMessage || 'Login Failed');

            await router.push('/');

        } catch (err) {
            const responseMessage = err?.response?.data?.message;
            commit('SET_DELETE_USER_RESPONSE_MESSAGE', responseMessage || 'Error deleting user account');
        }
    }
}


export default userActions;
