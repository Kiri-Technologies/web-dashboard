import axios from "axios";

export default {
    async getTotalPendapatanBulanIni(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalPendapatanBulanIni`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPendapatanBulanIni', {
            totalPendapatanBulanIni: response.data.data
        });
    },
    async getTotalPendapatanBulanLalu(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalPendapatanBulanLalu`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPendapatanBulanLalu', {
            totalPendapatanBulanLalu: response.data.data
        });
    },
    async getTotalAngkotMendaftarBulanIni(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalAngkotMendaftarBulanIni`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalAngkotMendaftarBulanIni', {
            totalAngkotMendaftarBulanIni: response.data.data
        });
    },
    async getTotalAngkotTerdaftar(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalAngkotTerdaftar`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalAngkotTerdaftar', {
            totalAngkotTerdaftar: response.data.data
        });
    },
    async getTotalPendapatanHarianByIdAngkot(context, { idAngkot }) {
        const url = `https://kiri.mfaiztriputra.id/api/ownersupir/chart/pendapatanHarian?angkot_id=${idAngkot}`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPendapatanHarian', {
            totalPendapatanHarian: response.data.data
        });
    },
    async getTotalPendapatanHarian(context) {
        const url = `https://kiri.mfaiztriputra.id/api/ownersupir/chart/pendapatanHarian`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPendapatanHarian', {
            totalPendapatanHarian: response.data.data
        });
    },
    async getTotalUsers(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalUsers`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalUsers', {
            totalUsers: response.data.data
        });
    },
    async getMostUsedTrayek(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/mostUsedTrayek`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setMostUsedTrayek', {
            mostUsedTrayek: response.data.data
        });
    },
    async getMostUsedHalteVirtual(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/mostUsedSetpoint`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setMostUsedHalteVirtual', {
            mostUsedHalteVirtual: response.data.data
        });
    },
    async getTotalFeedbackApp(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalFeedbackApp`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalFeedbackApp', {
            totalFeedbackApp: response.data.data
        });
    },
    async getTotalPerjalananBulanIni(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalPerjalananBulanIni`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPerjalananBulanIni', {
            totalPerjalananBulanIni: response.data.data
        });
    },
    async getTotalPerjalananBulanLalu(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalPerjalananBulanLalu`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPerjalananBulanLalu', {
            totalPerjalananBulanLalu: response.data.data
        });
    },
    async getTotalUsersThisMonth(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalUsersThisMonth`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalUsersThisMonth', {
            totalUsersThisMonth: response.data.data
        });
    },
    async getTotalUsersLastSixMonth(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalUsersLastSixMonth`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalUsersLastSixMonth', {
            totalUsersLastSixMonth: response.data.data
        });
    },
    async getTotalPremiumUsersThisMonth(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalPremiumUserThisMonth`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPremiumUsersThisMonth', {
            totalPremiumUsersThisMonth: response.data.data
        });
    },

    async getTotalPremiumUsersLastSixMonth(context) {
        const url = `https://kiri.mfaiztriputra.id/api/admin/chart/totalPremiumUserLastSixMonth`;

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
            const errorMessage = new Error("Failed to get data");
            throw errorMessage;
        }

        context.commit('setTotalPremiumUsersLastSixMonth', {
            totalPremiumUsersLastSixMonth: response.data.data
        });
    },
}