import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            totalPendapatanBulanIni: 0,
            totalPendapatanBulanLalu: 0,
            totalAngkotMendaftarBulanIni: 0,
            totalAngkotTerdaftar: 0,
            totalPendapatanHarian: {},
            totalUsers: {},
            totalFeedbackApp: {},
            mostUsedTrayek: [],
            mostUsedHalteVirtual: [],
        };
    },
    mutations,
    actions,
    getters
}