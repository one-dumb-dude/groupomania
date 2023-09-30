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
            // TODO: set error message
        }
    },

    async getPost({commit}, payload) {
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

            const {postData, comments} = response.data;

            commit('LOAD_A_POST', postData);
            commit('comment/LOAD_COMMENTS', comments, { root: true });
        } catch (err) {
            console.error('Error getting a post');
            // TODO: set error message
        }
    },

    async createPost({commit}, payload) {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No token found!');
                return;
            }

            const response = await axios.post(`${nodeServer}/api/posts`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201 || response.status === 200) {
                await router.push('/')
            }

        } catch (err) {
            console.error('Error creating a post');
            // TODO: set error message
        }
    }

}

export default postActions;
