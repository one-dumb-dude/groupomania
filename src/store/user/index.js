import userMutations from './mutations';
import userActions from './actions';

const User = {
    namespaced: true,
    state: () => ({
        first_name: null,
        last_name: null,
        email: null,
        username: null
    }),
    mutations: userMutations,
    actions: userActions
}

export default User;
