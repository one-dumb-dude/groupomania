import chatboxMutations from './mutations';

const chatBox = {
    namespaced: true,
    state: () => ({
        text: 'initial'
    }),
    mutations: chatboxMutations
}

export default chatBox;
