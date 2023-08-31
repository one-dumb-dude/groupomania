import axios from 'axios';

const userActions = {
    async loginUser({commit}, payload) {
        try{
            const response = await axios.post(`${process.env.NODE_DEVELOPMENT_SERVER}/api/users/login`, payload);
            commit('SET_USER_DATA', response.data);
            commit('SET_LOGIN_ERROR_MESSAGE', null);
            return true;
        } catch (err) {
            console.error('Error: ', err);
            // TODO: Go to server.js and give a better e
            commit('SET_LOGIN_ERROR_MESSAGE', err.error || 'Login Failed')
            return false;
        }
    },

    async signupUser({commit}, payload) {
        try{
            const response = await axios.post(`${process.env.NODE_DEVELOPMENT_SERVER}/api/users/signup`, payload);
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
                commit('SET_SIGNUP_SUCCESS_MESSAGE', 'Signup was successful.  Please login');
            }
        } catch (err) {
            console.error('Error: ', err);
        }
    }
}


export default userActions;
