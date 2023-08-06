import axios from 'axios';

const chatViewerActions = {
    async fetchMessages({commit}) {
        try {
            const response = await axios.get('http://localhost:3001/api/messages');
            console.log(response)
            commit('addMessages', response.data)
        } catch (error) {
            console.error("error: ", error);
        }
    }
}

export default chatViewerActions
