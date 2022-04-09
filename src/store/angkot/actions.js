import axios from "axios";

export default {
    async getAllAngkot(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/angkot`;

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
            let message;
            if (error.response.status == 400) {
                // if (error.response.data.message.email) {
                //     message = "Email sudah terdaftar";
                // }
                message = "Pastikan form sudah sesuai"
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }

        context.commit('setAllAngkot', {
            data: response.data.data
        });
    },
    async getAngkotById(context, { id }) {
        const url = `https://kiri.mfaiztriputra.id/api/angkot/${id}`;

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
            let message;
            if (error.response.status == 400) {
                // if (error.response.data.message.email) {
                //     message = "Email sudah terdaftar";
                // }
                message = "Pastikan form sudah sesuai"
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }

        context.commit('setAngkot', {
            data: response.data.data
        });
    },
    async updateStatusAngkot(context, { id, status }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/angkot/${id}/updateStatusApproval`;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'post',
                url: url,
                data: {
                    status
                },
                headers: {
                    Authorization: authHeader
                }
            });
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                // if (error.response.data.message.email) {
                //     message = "Email sudah terdaftar";
                // }
                message = "Pastikan form sudah sesuai"
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }
    },
}