import userMutations from './mutations';
import userActions from './actions';

const User = {
    namespaced: true,
    state: () => ({
        user_id: null,
        username: null,
        errorMessage: null
    }),
    mutations: userMutations,
    actions: userActions
}

export default User;
