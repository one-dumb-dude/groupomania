import chatboxMutations from './mutations';
import chatboxActions from './actions';

const chatBox = {
    namespaced: true,
    state: () => ({
        errorMessage: null
    }),
    mutations: chatboxMutations,
    actions: chatboxActions
}

export default chatBox;
