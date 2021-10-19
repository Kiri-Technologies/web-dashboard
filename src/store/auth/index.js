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
            birthday: null,
            role: null,
            token_type: null,
            didAutoLogout: false
        };
    },
    mutations,
    actions,
    getters
}