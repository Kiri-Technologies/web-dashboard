import { createStore } from "vuex";
import authModule from './auth/index.js';
import trayekModule from './trayek/index.js';
import alertModule from './alert/index.js'
import halteVirtualModule from './haltevirtual/index.js'
import feedbackAppModule from './feedbackapp/index.js'
import angkotModule from './angkot/index.js'
import listSupirModule from "./listsupir/index.js";
import riwayatSupirNarikModule from "./riwayatsupirnarik/index.js";
import perjalananModule from "./perjalanan/index.js";
import chartModule from "./chart/index.js";
import premiumUserModule from "./premiumuser/index.js";
import targetModule from "./changetarget/index.js";

const store = createStore({
    modules: {
        auth: authModule,
        trayek: trayekModule,
        alert: alertModule,
        halteVirtual: halteVirtualModule,
        feedbackApp: feedbackAppModule,
        angkot: angkotModule,
        listSupir: listSupirModule,
        riwayatSupirNarik: riwayatSupirNarikModule,
        perjalanan: perjalananModule,
        chart: chartModule,
        premiumUser: premiumUserModule,
        target: targetModule,
    }
});

export default store;