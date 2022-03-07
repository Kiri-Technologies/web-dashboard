import { createStore } from "vuex";
import authModule from './auth/index.js';
import trayekModule from './trayek/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        trayek: trayekModule
    }
});

export default store;