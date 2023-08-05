import {createStore} from 'vuex';
import chatBox from './chatbox';

const store = createStore({
    modules: {
        chatbox: chatBox
    }
})

export default store;
