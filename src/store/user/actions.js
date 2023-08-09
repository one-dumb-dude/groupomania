import axios from 'axios';

const userActions = {
    async loginUser({commit}, payload) {
        try{
            const response = await axios.post('http://localhost:3001/api/users', payload);
            commit('SET_USER_DATA', response.data);
            commit('SET_ERROR_MESSAGE', null);
            return true;
        } catch (err) {
            console.error('Error: ', err);
            commit('SET_ERROR_MESSAGE', err.message || 'Login Failed')
            return false
        }
    }
}

export default userActions;
