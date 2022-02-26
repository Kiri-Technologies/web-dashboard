import axios from "axios";

let timer;

export default {
    async login(context, { email, password, rememberMe }) {

        const url = 'https://kiri.mfaiztriputra.id/api/login';

        let response;

        try {
            response = await axios.post(url, {
                email: email,
                password: password
            });
        } catch (error) {
            const errorMessage = new Error(response.data.message || 'Failed to store data!');
            throw errorMessage;
        }

        if (response.data.role !== 'admin') {
            const errorMessage = new Error('Anda tidak dapat login!');
            throw errorMessage;
        }

        console.log(response);

        const expiresIn = (rememberMe ? 86400 : 3600) * 1000;
        const tokenExpirationDate = Date.now() + expiresIn;

        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('token_type', response.data.token_type);
        localStorage.setItem('email', email);
        localStorage.setItem('tokenExpirationDate', tokenExpirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setAllAuthData', {
            email: email,
            access_token: response.data.access_token,
            name: response.data.name,
            birthday: response.data.birthday,
            role: response.data.role,
            token_type: response.data.token_type,
        });

        context.commit('didAutoLogout', {
            didAutoLogout: false
        });
    },
    async getProfile(context) {
        const url = 'https://kiri.mfaiztriputra.id/api/profile';

        let response;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const email = localStorage.getItem('email');
        const token = access_token.split('|')[1];
        const authHeader = `${token_type} ${token}`

        try {
            response = await axios({
                method: 'post',
                url: url,
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            const errorMessage = new Error('Failed to store data!');
            throw errorMessage;
        }

        context.commit('setAllAuthData', {
            email: email,
            access_token: access_token,
            name: response.data.name,
            birthday: response.data.birthday,
            role: response.data.role,
            token_type: token_type,
        });
    },
    async autoLogin(context) {
        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const email = localStorage.getItem('email');
        const tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
        const expiresIn = tokenExpirationDate - Date.now();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (access_token && token_type && email) {
            context.commit('setAuth', {
                email: email,
                access_token: access_token,
                token_type: token_type,
            })
        } else {
            context.dispatch('autoLogout');
        }
    },
    async updateProfile(context, { name, email, birthday }) {
        console.log('updateporasdlas');
        const url = 'https://kiri.mfaiztriputra.id/profile/update';

        let response;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const token = access_token.split('|')[1];
        const authHeader = `${token_type} ${token}`

        try {
            response = await axios({
                method: 'post',
                url: url,
                data: {
                    name: name,
                    email: email,
                    birthday: birthday
                },
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            const errorMessage = new Error(response.data.message || 'Failed to store data!');
            throw errorMessage;
        }

        console.log(response);

        context.commit('setUserData', {
            email: email,
            name: name,
            birthday: birthday
        });
    },
    logout(context) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('email');
        localStorage.removeItem('tokenExpirationDate');

        clearTimeout(timer);

        context.commit('revokeAllAuthData');
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('didAutoLogout', {
            didAutoLogout: true
        });
    }
};