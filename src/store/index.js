import {createStore} from 'vuex';
import chatBox from './chatbox';
import chatViewer from './chatviewer';
import User from './user';

const store = createStore({
    modules: {
        chatbox: chatBox,
        chatviewer: chatViewer,
        user: User
    }
})

export default store;
