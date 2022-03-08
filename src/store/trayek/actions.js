import axios from "axios";
export default {
    async createTrayek(context, { kode_trayek, titik_awal, titik_akhir }) {
        const url = 'https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek.json';

        let response;

        // const access_token = localStorage.getItem('access_token');
        // const token_type = localStorage.getItem('token_type');
        // const authHeader = `${token_type} ${access_token}`;

        try {
            response = await axios({
                method: 'post',
                url: url,
                data: {
                    kode_trayek,
                    titik_awal,
                    titik_akhir
                }
            });
        } catch (error) {
            throw error.message;
        }

        context.commit('addNewTrayek', {
            id: response.data.name,
            kode_trayek,
            titik_awal,
            titik_akhir
        });
    },
    async getAllTrayek(context) {
        const url = 'https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek.json';

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
                    kode_trayek: response.data[id].kode_trayek,
                    titik_awal: response.data[id].titik_awal,
                    titik_akhir: response.data[id].titik_akhir
                });
            }

            let trayek = results;
            context.commit('addNewTrayek', {
                trayek
            });

        } catch (error) {
            throw error.message;
        }
    },
    async getTrayekById(context, { id }) {
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${id}.json`;

        let response;

        try {
            response = await axios({
                method: 'get',
                url: url
            });
        } catch (error) {
            console.log(error)
        }
        console.log(response);

        context.commit('setTrayekData', {
            id: id,
            kode_trayek: response.data.kode_trayek,
            titik_awal: response.data.titik_awal,
            titik_akhir: response.data.titik_akhir,
        });
    },
    async updateTrayekById(context, { id, kode_trayek, titik_awal, titik_akhir }) {
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${id}.json`;

        // let response;

        // const access_token = localStorage.getItem('access_token');
        // const token_type = localStorage.getItem('token_type');
        // const authHeader = `${token_type} ${access_token}`;

        try {
            await axios({
                method: 'patch',
                url: url,
                data: {
                    kode_trayek,
                    titik_awal,
                    titik_akhir
                }
            });
        } catch (error) {
            throw error.message;
        }

        context.commit('setTrayekData', {
            id: id,
            kode_trayek,
            titik_awal,
            titik_akhir
        });
    },
    async deleteTrayekById(context, { id }) {
        const url = `https://kiri-web-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/trayek/${id}.json`;

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
            throw error.message;
        }

        context.dispatch('getAllTrayek');
        context.commit('setTrayekData', {
            id: id,
        });
    }
}