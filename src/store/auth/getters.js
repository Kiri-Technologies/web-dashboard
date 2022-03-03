export default {
    profile(state) {
        return {
            email: state.email,
            access_token: state.access_token,
            name: state.name,
            no_hp: state.no_hp,
            birthdate: state.birthdate,
            role: state.role,
            token_type: state.token_type
        }
    },
    isAuthenticated(state) {
        return !!state.access_token;
    },
    didAutoLogout(state){
        return state.didAutoLogout;
    },
    profileName(state){
        return state.name;
    },
    getAllAccount(state){
        return state.allAccount;
    },
    getAdminAccountById(state){
        return state.adminAccount;
    }
};