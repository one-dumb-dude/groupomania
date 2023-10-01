const postMutations = {
    LOAD_UNREAD_COUNT(state, payload) {
        state.unreadPosts = payload;
    },
    LOAD_POSTS(state, payload) {
        state.posts = payload;
    },
    LOAD_POST_DETAILS(state, payload) {
        state.postData = payload;
    }
};

export default postMutations;
