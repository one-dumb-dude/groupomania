import axios from 'axios';

const commentActions = {
    async createComment({commit, dispatch}, payload) {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await axios.post('http://localhost:3001/api/comments', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                commit('LOAD_COMMENTS', response.data);
            }
        } catch (error) {
            console.error('Error: ', error);
            commit('SET_ERROR_MESSAGE', error.response?.data?.message || 'Error creating comment');
        }
    }
};

export default commentActions;
