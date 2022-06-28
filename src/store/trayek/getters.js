export default {
    getAllTrayek(state){
        return state.allTrayek;
    },
    getTrayek(state){
        return {
            id: state.id,
            kode_trayek: state.kode_trayek,
            titik_awal: state.titik_awal,
            titik_akhir: state.titik_akhir,
            lat_titik_awal: state.lat_titik_awal,
            long_titik_awal: state.long_titik_awal,
            lat_titik_akhir: state.lat_titik_akhir,
            long_titik_akhir: state.long_titik_akhir,
        }
    }
}