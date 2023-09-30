const commentMutations = {
    SET_ERROR_MESSAGE(state, payload) {
        state.errorMessage = payload
    },
    LOAD_COMMENTS(state, payload) {
        state.comments = payload
    }
}

export default commentMutations;
