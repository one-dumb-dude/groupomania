import axios from 'axios';

const commentActions = {
    async postMessage({commit, dispatch}, payload) {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No token found');
                return;
            }

            const userId = payload instanceof FormData ? payload.get('user_id') : payload.user_id;

            await axios.post('http://localhost:3001/api/comments', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userObj = { user_id: userId };

            await dispatch('chatviewer/fetchMessages', userObj, {root: 'true'});
        } catch (error) {
            console.error('Error: ', error);
            commit('SET_ERROR_MESSAGE', {error});
        }
    }
};

export default commentActions;
