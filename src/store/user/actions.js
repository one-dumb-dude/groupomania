import axios from 'axios';

const userActions = {
    async loginUser({commit}, payload) {
        try{
            const response = await axios.post('http://localhost:3001/api/users/login', payload);
            commit('SET_USER_DATA', response.data);
            commit('SET_ERROR_MESSAGE', null);
            return true;
        } catch (err) {
            console.error('Error: ', err);
            commit('SET_ERROR_MESSAGE', err.error || 'Login Failed')
            return false;
        }
    },

    async signupUser({commit}, payload) {
        try{
            const response = await axios.post('http://localhost:3001/api/users/signup', payload);
            commit('SET_USER_DATA', response.data);
            console.log(response.data)
            return true;
        } catch (err) {
            console.error('Error: ', err);
            return false;
        }
    }
}


export default userActions;
