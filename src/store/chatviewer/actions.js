import axios from 'axios';

const chatViewerActions = {
    async fetchMessages({commit}) {
        try {
            const response = await axios.get('http://localhost:3001/api/messages');
            commit('LOAD_MESSAGES', response.data)
        } catch (error) {
            console.error("error: ", error);
        }
    }
}

export default chatViewerActions;
