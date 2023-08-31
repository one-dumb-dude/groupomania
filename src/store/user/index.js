import userMutations from './mutations';
import userActions from './actions';

const User = {
    namespaced: true,
    state: () => ({
        user_id: null,
        username: null,
        loginStatus : 'idle',
        loginErrorMessage: null,
        signupSuccessMessage: null,
        signupErrorMessage: null
    }),
    mutations: userMutations,
    actions: userActions
}

export default User;
