const userMutations = {
    SET_USER_INFO(state, payload) {
        state.first_name = payload.first_name;
        state.last_name = payload.last_name;
        state.email = payload.email;
        state.username = payload.username;
    }
}

export default userMutations;
