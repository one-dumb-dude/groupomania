const chatViewerMutations = {
    loadMessages(state, payload) {
        state.messages = payload
    }
}

export default chatViewerMutations;
