export default {
    setAllAuthData(state, { email, access_token, name, birthday, role, token_type }) {
        state.email = email;
        state.access_token = access_token;
        state.name = name;
        state.birthday = birthday;
        state.role = role;
        state.token_type = token_type;
    },
    revokeAllAuthData(state) {
        state.email = null;
        state.access_token = null;
        state.name = null;
        state.birthday = null;
        state.role = null;
        state.token_type = null;
    },
    setAuth(state, { email, access_token, token_type }) {
        state.email = email;
        state.access_token = access_token;
        state.token_type = token_type;
    },
    setUserData(state, { email, name, birthday }) {
        state.email = email;
        state.name = name;
        state.birthday = birthday;
    },
    didAutoLogout(state, { didAutoLogout }) {
        state.didAutoLogout = didAutoLogout;
    }
}