import axios from 'axios';

const chatboxActions = {
    async postMessage({commit, dispatch}, payload) {
        try {
            await axios.post('http://localhost:3001/api/messages', payload);
            await dispatch('chatviewer/fetchMessages', null, {root: 'true'});
        } catch (error) {
            console.error('Error: ', error);
            commit('SET_LOGIN_ERROR_MESSAGE', {error});
        }
    }
};

export default chatboxActions;
