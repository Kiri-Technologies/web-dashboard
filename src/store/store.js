import { createStore } from "vuex";
import authModule from './auth/index.js';
import trayekModule from './trayek/index.js';
import alertModule from './alert/index.js'
import halteVirtualModule from './haltevirtual/index.js'

const store = createStore({
    modules: {
        auth: authModule,
        trayek: trayekModule,
        alert: alertModule,
        halteVirtual: halteVirtualModule
    }
});

export default store;