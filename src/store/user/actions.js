import axios from 'axios';

const userActions = {
    async loginUser({commit}, payload) {
        try{
            console.log(payload);
            const response = await axios.post('http://localhost:3001/api/users', payload);
            console.log(response);
            commit('SET_USER_INFO', response.data);
        } catch (err) {
            console.error('Error: ', err);
            // set error message mutation -> state
        }
    }
}

export default userActions;
