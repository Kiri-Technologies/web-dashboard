import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            id: 1,
            name: "",
            input: 0,
            target: 0,
            targets: [],
        };
    },
    mutations,
    actions,
    getters
}