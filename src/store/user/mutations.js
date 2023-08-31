const userMutations = {
    SET_USER_DATA(state, payload) {
        state.user_id = payload.user_id;
        state.username = payload.username;
    },
    SET_ERROR_MESSAGE(state, payload) {
        state.errorMessage = payload;
    }
}

export default userMutations;
