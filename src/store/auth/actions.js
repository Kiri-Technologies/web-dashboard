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
        const expiresIn = (rememberMe ? 86400 : 3600) * 1000;
        const tokenExpirationDate = Date.now() + expiresIn;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('token_type', 'Bearer');
        localStorage.setItem('email', email);
        localStorage.setItem('tokenExpirationDate', tokenExpirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setAllAuthData', {
            id: response.data.data.id,
            email: email,
            access_token: access_token,
            name: response.data.data.name,
            birthdate: response.data.data.birthdate,
            role: response.data.data.role,
            phone_number: response.data.data.phone_number,
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
            const errorMessage = new Error('Failed to get data!');
            throw errorMessage;
        }

        context.commit('setAllAuthData', {
            id: response.data.data.id,
            email: email,
            access_token: access_token,
            name: response.data.data.name,
            birthdate: response.data.data.birthdate,
            role: response.data.data.role,
            phone_number: response.data.data.phone_number,
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
    async updateProfile(context, { name, email, birthdate, phone_number, password }) {
        const urlProfile = 'https://kiri.mfaiztriputra.id/api/profile/update';
        const urlPassword = 'https://kiri.mfaiztriputra.id/api/profile/update/password';

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`

        try {
            await axios({
                method: 'post',
                url: urlProfile,
                data: {
                    name: name,
                    email: email,
                    birthdate: birthdate,
                    phone_number: phone_number,
                    role: 'admin'
                },
                headers: {
                    Authorization: authHeader
                }
            });

            if (password !== '') {
                await axios({
                    method: 'post',
                    url: urlPassword,
                    data: {
                        password: password,
                    },
                    headers: {
                        Authorization: authHeader
                    }
                });
            }
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                if (error.response.data.message.email) {
                    message = "Email sudah terdaftar";
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
            phone_number: phone_number
        });
    },
    async register(context, { name, email, birthdate, phone_number, password }) {
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
                    phone_number: phone_number,
                    password: password,
                    role: 'admin'
                }
            });
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                if (error.response.data.message.email) {
                    message = "Email sudah terdaftar";
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
            phone_number: phone_number
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
            const errorMessage = new Error('Failed to get data!');
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
            phone_number: response.data.data.phone_number,
        });
    },
    async updateAdminAccount(context, { id, name, email, birthdate, phone_number, password }) {
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
                    phone_number: phone_number,
                    password: password,
                    role: 'admin'
                },
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            let message = 'Failed to store data!';
            if (error.response.status == 400) {
                message = "Pastikan form sudah sesuai"
                if (error.response.data.message.email) {
                    message = "Email sudah diambil";
                }
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }

        context.commit('setAdminAccountData', {
            id: id,
            email: email,
            name: name,
            birthdate: birthdate,
            phone_number: phone_number
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
        context.commit('deleteAdminAccountById', { id });
        context.dispatch('getAllAccount');
    },
    async logout(context) {
        const url = 'https://kiri.mfaiztriputra.id/api/logout';

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'get',
                url: url,
                headers: {
                    Authorization: authHeader
                }
            });
            context.dispatch('clearAuthData');
        } catch (error) {
            context.dispatch('clearAuthData');
            // const errorMessage = new Error('Failed to store data!');
            // throw errorMessage;
        }

    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('didAutoLogout', {
            didAutoLogout: true
        });
    },
    clearAuthData(context) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('email');
        localStorage.removeItem('tokenExpirationDate');

        clearTimeout(timer);

        context.commit('revokeAllAuthData');
    }
};