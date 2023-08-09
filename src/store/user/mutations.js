const userMutations = {
    SET_USER_DATA(state, payload) {
        state.user_id = payload.user_id;
        state.first_name = payload.first_name;
        state.last_name = payload.last_name;
        state.email = payload.email;
        state.username = payload.username;
    },
    SET_ERROR_MESSAGE(state, payload) {
        state.errorMessage = payload
    }
}

export default userMutations;
