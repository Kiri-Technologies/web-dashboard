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
            let errorMessage;
            if (error.response.status == 401) {
                errorMessage = new Error('Email atau password tidak sesuai');
            } else {
                // errorMessage = new Error(response.data.message || 'Failed to store data!');
                errorMessage = new Error('Failed to store data!');
            }
            throw errorMessage;
        }

        if (response.data.data.role !== 'admin') {
            const errorMessage = new Error('Anda tidak dapat login!');
            throw errorMessage;
        }

        const access_token = response.data.data.token.original.token;
        const token_type = response.data.data.token.original.token_type;
        const expiresIn = (rememberMe ? 86400 : response.data.data.token.original.expires_in) * 1000;
        const tokenExpirationDate = Date.now() + expiresIn;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('token_type', token_type);
        localStorage.setItem('email', email);
        localStorage.setItem('tokenExpirationDate', tokenExpirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setAllAuthData', {
            email: email,
            access_token: access_token,
            name: response.data.data.name,
            birthdate: response.data.data.birthdate,
            role: response.data.data.role,
            no_hp: response.data.data.noh_hp,
            image: response.data.data.image,
            token_type: token_type,
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
        const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'get',
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
            name: response.data.data.name,
            birthdate: response.data.data.birthdate,
            role: response.data.data.role,
            no_hp: response.data.data.no_hp,
            image: response.data.data.image,
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
    async updateProfile(context, { name, email, birthdate, no_hp, password }) {
        const url = 'https://kiri.mfaiztriputra.id/api/profile/update';

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`

        try {
            await axios({
                method: 'post',
                url: url,
                data: {
                    name: name,
                    email: email,
                    birthdate: birthdate,
                    no_hp: no_hp,
                    password: password,
                    role: 'admin'
                },
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                if (error.response.data.message.email) {
                    message = error.response.data.message.email;
                }
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }

        context.commit('setUserData', {
            email: email,
            name: name,
            birthdate: birthdate,
            no_hp: no_hp
        });
    },
    async register(context, { name, email, birthdate, no_hp, password }) {
        const url = 'https://kiri.mfaiztriputra.id/api/register';

        let response;

        try {
            response = await axios({
                method: 'post',
                url: url,
                data: {
                    name: name,
                    email: email,
                    birthdate: birthdate,
                    no_hp: no_hp,
                    password: password,
                    role: 'admin'
                }
            });
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                if (error.response.data.message.email) {
                    message = error.response.data.message.email;
                }
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }

        context.commit('addNewAccount', {
            id: response.data.data.id,
            name: name,
            email: email,
            birthdate: birthdate,
            no_hp: no_hp
        });
    },
    async getAllAccount(context) {
        const url = 'https://kiri.mfaiztriputra.id/api/admin/users/find?role=admin';

        let response;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'get',
                url: url,
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            const errorMessage = new Error('Failed to store data!');
            throw errorMessage;
        }

        context.commit('addNewAccount', response.data.data);

    },
    async getAccountById(context, { id }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/users/${id}`;

        let response;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'get',
                url: url,
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            const errorMessage = new Error('Failed to store data!');
            throw errorMessage;
        }

        context.commit('setAdminAccountData', {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            birthdate: response.data.data.birthdate,
            no_hp: response.data.data.no_hp,
        });
    },
    async updateAdminAccount(context, { id, name, email, birthdate, no_hp, password }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/users/${id}/update`;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`

        try {
            await axios({
                method: 'post',
                url: url,
                data: {
                    name: name,
                    email: email,
                    birthdate: birthdate,
                    no_hp: no_hp,
                    password: password,
                    role: 'admin'
                },
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                if (error.response.data.message.email) {
                    message = error.response.data.message.email;
                }
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }

        context.commit('setAdminAccountData', {
            id: id,
            email: email,
            name: name,
            birthdate: birthdate,
            no_hp: no_hp
        });
    },
    async deleteAdminAccount(context, { id }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/users/${id}/delete`;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'delete',
                url: url,
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            const errorMessage = new Error('Gagal menghapus akun');
            throw errorMessage;
        }
        context.commit('deleteAdminAccountById', {id});
        context.dispatch('getAllAccount');
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