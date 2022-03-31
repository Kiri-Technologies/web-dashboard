import axios from "axios";

export default {
    async getListSupirByAngkot(context, { idAngkot }) {
        const url = `https://kiri.mfaiztriputra.id/api/ownersupir/driver?angkot_id=${idAngkot}`;

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

        context.commit('setListSupir', {
            data: response.data.data
        });
    },
}