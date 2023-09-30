const postMutations = {
    LOAD_POSTS(state, payload) {
        state.posts = payload;
    },
    LOAD_A_POST(state, payload) {
        state.postData = payload;
    }
};

export default postMutations;
