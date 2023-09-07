const userMutations = {
    SET_LOGIN_STATUS(state, payload) {
        // 'idle' | 'loading' | 'success' | 'error';
        state.loginStatus = payload;
    },
    SET_USER_DATA(state, payload) {
        state.user_id = payload.user_id;
        state.username = payload.username;
    },
    CLEAR_USER_DATA(state) {
        state.user_id = null;
        state.username = null;
    },
    SET_LOGIN_ERROR_MESSAGE(state, payload) {
        state.loginErrorMessage = payload;
    },
    SET_SIGNUP_SUCCESS_MESSAGE(state, payload) {
        state.signupSuccessMessage = payload;
    },
    SET_SIGNUP_ERROR_MESSAGE(state, payload) {
        state.signupErrorMessage = payload;
    },
    CLEAR_LOGIN_ERROR_MESSAGE(state) {
        state.loginErrorMessage = null;
    },
    CLEAR_SIGNUP_SUCCESS_MESSAGE(state) {
        state.signupSuccessMessage = null;
    },
    CLEAR_SIGNUP_ERROR_MESSAGE(state) {
        state.signupErrorMessage = null;
    }
}

export default userMutations;
