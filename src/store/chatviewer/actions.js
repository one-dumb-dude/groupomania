import axios from 'axios';

const chatViewerActions = {
    async fetchMessages({commit}, payload) {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await axios.get('http://localhost:3001/api/messages', {
                params: payload,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            commit('LOAD_MESSAGES', response.data)
        } catch (error) {
            console.error("error: ", error);
        }
    }
}

export default chatViewerActions;
