const userMutations = {
    SET_USER_DATA(state, payload) {
        state.user_id = payload.user_id;
        state.username = payload.username;
    },
    SET_LOGIN_ERROR_MESSAGE(state, payload) {
        state.loginErrorMessage = payload;
    },
    SET_SIGNUP_SUCCESS_MESSAGE(state, payload) {
        state.signupSuccessMessage = payload;
    }
}

export default userMutations;
