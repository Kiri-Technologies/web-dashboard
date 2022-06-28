import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            id: "",
            route_id: "",
            nama_lokasi: "",
            lat: null,
            lng: null,
            arah: "",
            allHalteVirtual: [],
        };
    },
    mutations,
    actions,
    getters
}