export default {
    setAllAuthData(state, { email, access_token, name, birthdate, role, no_hp, image, token_type }) {
        state.email = email;
        state.access_token = access_token;
        state.name = name;
        state.birthdate = birthdate;
        state.role = role;
        state.no_hp = no_hp;
        state.image = image;
        state.token_type = token_type;
    },
    revokeAllAuthData(state) {
        state.email = null;
        state.access_token = null;
        state.name = null;
        state.birthdate = null;
        state.role = null;
        state.no_hp = null;
        state.image = null;
        state.token_type = null;
    },
    setAuth(state, { email, access_token, token_type }) {
        state.email = email;
        state.access_token = access_token;
        state.token_type = token_type;
    },
    setUserData(state, { email, name, birthdate, no_hp, image }) {
        state.email = email;
        state.name = name;
        state.birthdate = birthdate;
        state.no_hp = no_hp;
        state.image = image;
    },
    didAutoLogout(state, { didAutoLogout }) {
        state.didAutoLogout = didAutoLogout;
    },
    addNewAccount(state, {id, name, email, birthdate, no_hp}){
        state.allAccount.push({
            id: id,
            name: name,
            email: email,
            birthdate: birthdate,
            no_hp: no_hp
        });
        console.log(state.allAccount);
    }
}