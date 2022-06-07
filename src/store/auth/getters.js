export default {
    profile(state) {
        return {
            email: state.email,
            access_token: state.access_token,
            name: state.name,
            phone_number: state.phone_number,
            birthdate: state.birthdate,
            role: state.role,
            token_type: state.token_type
        }
    },
    profileEmail(state){
        return state.email;
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
        return state.allAccount.filter(am => am.id !== state.id);
    },
    getAdminAccountById(state){
        return state.adminAccount;
    }
};