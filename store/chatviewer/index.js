import chatViewerMutations from './mutations';
import chatViewerActions from './actions';

const chatViewer = {
    namespaced:true,
    state: () => ({
        messages: null
    }),
    mutations: chatViewerMutations,
    actions: chatViewerActions
}

export default chatViewer
