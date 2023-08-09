const chatViewerMutations = {
    LOAD_MESSAGES(state, payload) {
        state.messages = payload
    }
}

export default chatViewerMutations;
