import postMutations from './mutations';
import postActions from './actions';

const Post = {
    namespaced: true,
    state: () => ({
        posts: null,
        postData: null
    }),
    mutations: postMutations,
    actions: postActions
}

export default Post;
