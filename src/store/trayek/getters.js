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
        }
    }
}