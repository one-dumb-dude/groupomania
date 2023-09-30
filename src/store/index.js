import {createStore} from 'vuex';
import chatBox from './chatbox';
import chatViewer from './chatviewer';
import User from './user';
import Post from './post';
import Comment from './comment';

const store = createStore({
    modules: {
        chatbox: chatBox,
        chatviewer: chatViewer,
        user: User,
        post: Post,
        comment: Comment
    }
});

export default store;
