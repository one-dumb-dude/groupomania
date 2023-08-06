import {createStore} from 'vuex';
import chatBox from './chatbox';
import chatViewer from './chatviewer';

const store = createStore({
    modules: {
        chatbox: chatBox,
        chatviewer: chatViewer
    }
})

export default store;
