import userMutations from './mutations';
import userActions from './actions';
import {userStore} from "../../types/userStore";

const User = {
    namespaced: true,
    state: (): userStore => ({
        user_id: null,
        username: null,
        loginStatus : 'idle',
        loginErrorMessage: null,
        signupSuccessMessage: null
    }),
    mutations: userMutations,
    actions: userActions
}

export default User;
