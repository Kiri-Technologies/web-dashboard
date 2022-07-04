import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            id: 1,
            user_id: "user-123456",
            payment_date: "2022-01-01",
            from: "2022-01-01",
            to: "2022-01-01",
            premiumUser: [],
        };
    },
    mutations,
    actions,
    getters
}