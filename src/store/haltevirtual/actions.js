import axios from "axios";
export default {
    async createHalteVirtual(context, { trayekid, nama_lokasi, lat, lng }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/haltevirtual/create`;

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
                    route_id: trayekid,
                    nama_lokasi: nama_lokasi,
                    lat,
                    long: lng
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
    async getAllHalteVirtualByTrayek(context, { trayekid }) {
        const url = `https://kiri.mfaiztriputra.id/api/haltevirtual?route_id=${trayekid}`;

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

        console.log(response.data.data);

        let data = response.data.data.map((item) => {
            return {
                id: item.id,
                nama_lokasi: item.nama_lokasi,
                lat: Number(item.lat),
                lng: Number(item.long),
            }
        })

        context.commit('addAllHalteVirtual', {
            data: data,
        });
    },
    async getHalteVirtualById(context, { id }) {
        const url = `https://kiri.mfaiztriputra.id/api/haltevirtual/${id}`;

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

        context.commit('setHalteVirtualById', {
            id: id,
            route_id: response.data.data.route_id,
            nama_lokasi: response.data.data.nama_lokasi,
            lat: Number(response.data.data.lat),
            lng: Number(response.data.data.long)
        });
    },
    async updateHalteVirtual(context, { id, route_id, nama_lokasi, lat, lng }) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/haltevirtual/${id}/update`;

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
                    nama_lokasi,
                    route_id,
                    lat,
                    long: lng
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
    async deleteHalteVirtual(context, { id }){
        const url = `https://kiri.mfaiztriputra.id/api/admin/haltevirtual/${id}/delete`;

        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'delete',
                url: url,
                headers: {
                    Authorization: authHeader,
                }
            });
        } catch (error) {
            const errorMessage = new Error('Gagal menghapus halte virtual');
            throw errorMessage;
        }
    }
}