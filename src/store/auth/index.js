import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            id: null,
            email: null,
            access_token: null,
            name: null,
            birthdate: null,
            role: null,
            token_type: null,
            phone_number: null,
            image: null,
            didAutoLogout: false,
            allAccount: null,
            adminAccount: {
                id: "adul-as890d",
                name: "Adul",
                email: "Adul@gmail.com",
                birthdate: "2000-01-25",
                phone_number: "123412341234",
            }
        };
    },
    mutations,
    actions,
    getters
}