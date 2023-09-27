import axios from 'axios';
import router from '@/router';

const nodeServer = import.meta.env.VITE_NODE_DEVELOPMENT_SERVER;

const postActions = {
    async getPosts({commit}, payload) {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await axios.get(`${nodeServer}/api/posts`, {
                params: payload,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            commit('LOAD_POSTS', response.data);
        } catch (err) {
            console.error('error', err);
        }
    },

    async getAPost({commit}, payload) {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No token found');
                return;
            }

            const {user_id, post_id} = payload;

            const response = await axios.get(`${nodeServer}/api/posts/${post_id}`, {
                params: {user_id},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            commit('LOAD_A_POST', response.data);
        } catch (err) {
            console.error('Error getting a post');
        }
    },

    async createPost({commit}, payload) {
        try {

        } catch (err) {
        }
    }

}

export default postActions;
