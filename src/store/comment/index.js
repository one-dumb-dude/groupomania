import commentMutations from './mutations';
import commentActions from './actions';

const comment = {
    namespaced: true,
    state: () => ({
        errorMessage: null,
        comments: null
    }),
    mutations: commentMutations,
    actions: commentActions
}

export default comment;
