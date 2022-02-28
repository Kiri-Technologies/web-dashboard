import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            email: null,
            access_token: null,
            name: null,
            birthdate: null,
            role: null,
            token_type: null,
            no_hp: null,
            image: null,
            didAutoLogout: false
        };
    },
    mutations,
    actions,
    getters
}