import axios from "axios";
export default {
    async createTrayek(context, { kode_trayek, titik_awal, titik_akhir }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/routes/create`;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'post',
                url: url,
                headers: {
                    Authorization: authHeader,
                },
                data: {
                    kode_trayek,
                    titik_awal,
                    titik_akhir
                }
            });
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                message = "Pastikan form sudah sesuai"
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }
    },
    async getAllTrayek(context) {
        const url = `https://kiri.mfaiztriputra.id/api/routes`;

        let response;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'get',
                url: url,
                headers: {
                    Authorization: authHeader,
                }
            });
        } catch (error) {
            const errorMessage = new Error("Failed to get data!");
            throw errorMessage;
        }

        context.commit('addAllTrayek', {
            allTrayek: response.data.data,
        });
    },
    async getTrayekById(context, { id }) {
        const url = `https://kiri.mfaiztriputra.id/api/routes/${id}`;

        let response;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'get',
                url: url,
                headers: {
                    Authorization: authHeader,
                }
            });
        } catch (error) {
            const errorMessage = new Error("Failed to get data!");
            throw errorMessage;
        }

        context.commit('setTrayekByid', {
            id: id,
            kode_trayek: response.data.data.kode_trayek,
            titik_awal: response.data.data.titik_awal,
            titik_akhir: response.data.data.titik_akhir,
        });
    },
    async updateTrayekById(context, { id, kode_trayek, titik_awal, titik_akhir }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/routes/${id}/update`;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'post',
                url: url,
                headers: {
                    Authorization: authHeader,
                },
                data: {
                    kode_trayek,
                    titik_awal,
                    titik_akhir
                }
            });
        } catch (error) {
            let message;
            if (error.response.status == 400) {
                message = "Pastikan form sudah sesuai"
            } else {
                message = 'Failed to store data!';
            }
            const errorMessage = new Error(message);
            throw errorMessage;
        }
    },
    async deleteTrayekById(context, { id }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/routes/${id}/delete`;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'post',
                url: url,
                headers: {
                    Authorization: authHeader,
                }
            });
        } catch (error) {
            const errorMessage = new Error('Gagal menghapus trayek');
            throw errorMessage;
        }

        context.dispatch('getAllTrayek');
    }
}