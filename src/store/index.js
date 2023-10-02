import {createStore} from 'vuex';
import User from './user';
import Post from './post';
import Comment from './comment';

const store = createStore({
    modules: {
        user: User,
        post: Post,
        comment: Comment
    }
});

export default store;
