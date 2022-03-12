import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            id: "d01",
            kode_trayek: "d01",
            titik_awal: "Buah Batu",
            titik_akhir: "Dipatiukur",
            allTrayek: [],
        };
    },
    mutations,
    actions,
    getters
}