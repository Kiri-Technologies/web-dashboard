export default {
    profile(state) {
        return {
            email: state.email,
            access_token: state.access_token,
            name: state.name,
            birthday: state.birthday,
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
    }
};