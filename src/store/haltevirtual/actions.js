import axios from "axios";
export default {
    async createHalteVirtual(context, { trayekid, name, lat, lng }) {
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${trayekid}/haltevirtual.json`;

        let response;

        // const access_token = localStorage.getItem('access_token');
        // const token_type = localStorage.getItem('token_type');
        // const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'post',
                url: url,
                data: {
                    name,
                    lat,
                    long: lng
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

        context.commit('setHalteVirtualData', {
            id: response.data.name,
            name,
            lat,
            lng
        });
    },
    async getAllHalteVirtualByTrayek(context, { trayekid }) {
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${trayekid}/haltevirtual.json`;

        let response;

        // const access_token = localStorage.getItem('access_token');
        // const token_type = localStorage.getItem('token_type');
        // const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'get',
                url: url,
            });

            let results = []

            for (const id in response.data) {
                results.push({
                    id: id,
                    name: response.data[id].name,
                    lat: Number(response.data[id].lat),
                    lng: Number(response.data[id].long)
                });
            }

            let halteVirtual = results;
            context.commit('addAllHalteVirtual', {
                data: halteVirtual
            });

        } catch (error) {
            const errorMessage = new Error("Failed to get data!");
            throw errorMessage;
        }
    },
    async getHalteVirtualById(context, { trayekid, id }) {
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${trayekid}/haltevirtual/${id}.json`;

        let response;

        try {
            response = await axios({
                method: 'get',
                url: url
            });
        } catch (error) {
            const errorMessage = new Error("Failed to get data!");
            throw errorMessage;
        }

        context.commit('setHalteVirtualData', {
            id: id,
            name: response.data.name,
            lat: response.data.lat,
            lng: response.data.long
        });
    },
    async updateHalteVirtual(context, { trayekid, id, name, lat, lng }) {
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${trayekid}/haltevirtual/${id}.json`;

        try {
            await axios({
                method: 'patch',
                url: url,
                data: {
                    name,
                    lat,
                    long: lng
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

        context.commit('setHalteVirtualData', {
            id: id,
            name,
            lat,
            lng
        });
    },
    async deleteHalteVirtual(context, { trayekid, id }){
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${trayekid}/haltevirtual/${id}.json`;

        // let response;

        // const access_token = localStorage.getItem('access_token');
        // const token_type = localStorage.getItem('token_type');
        // const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'delete',
                url: url,
            });
        } catch (error) {
            const errorMessage = new Error('Gagal menghapus halte virtual');
            throw errorMessage;
        }

        context.dispatch('getAllHalteVirtualByTrayek', {
            trayekid
        });
    }
}