const postMutations = {
    LOAD_POSTS(state, payload) {
        state.posts = payload;
    },
    LOAD_A_POST(state, payload) {
        const {postData, comments} = payload;
        state.postData = postData;
        state.comments = comments;
    }
};

export default postMutations;
