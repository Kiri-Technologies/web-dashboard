export default {
    setAllAuthData(state, { id, email, access_token, name, birthdate, role, phone_number, image, token_type }) {
        state.id = id;
        state.email = email;
        state.access_token = access_token;
        state.name = name;
        state.birthdate = birthdate;
        state.role = role;
        state.phone_number = phone_number;
        state.image = image;
        state.token_type = token_type;
    },
    revokeAllAuthData(state) {
        state.email = null;
        state.access_token = null;
        state.name = null;
        state.birthdate = null;
        state.role = null;
        state.phone_number = null;
        state.image = null;
        state.token_type = null;
    },
    setAuth(state, { email, access_token, token_type }) {
        state.email = email;
        state.access_token = access_token;
        state.token_type = token_type;
    },
    setUserData(state, { id, email, name, birthdate, phone_number, image }) {
        state.id = id;
        state.email = email;
        state.name = name;
        state.birthdate = birthdate;
        state.phone_number = phone_number;
        state.image = image;
    },
    didAutoLogout(state, { didAutoLogout }) {
        state.didAutoLogout = didAutoLogout;
    },
    addNewAccount(state, data){
        state.allAccount = data;
    },
    setAdminAccountData(state, { id, email, name, birthdate, phone_number, image }) {
        state.adminAccount.id = id;
        state.adminAccount.email = email;
        state.adminAccount.name = name;
        state.adminAccount.birthdate = birthdate;
        state.adminAccount.phone_number = phone_number;
        state.adminAccount.image = image;
    },
    deleteAdminAccountById(state, {id}){
        state.allAccount.forEach((element, index) => {
            if (element.id == id) {
                state.allAccount.splice(index, 1);
            }
        });
    }
}