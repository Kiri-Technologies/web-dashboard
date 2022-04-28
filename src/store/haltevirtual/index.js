import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            id: "",
            nama_lokasi: "",
            lat: null,
            lng: null,
            allHalteVirtual: [],
        };
    },
    mutations,
    actions,
    getters
}