import { createStore } from "vuex";
import authModule from './auth/index.js';
import trayekModule from './trayek/index.js';
import alertModule from './alert/index.js'

const store = createStore({
    modules: {
        auth: authModule,
        trayek: trayekModule,
        alert: alertModule
    }
});

export default store;