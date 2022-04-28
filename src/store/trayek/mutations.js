export default {
    addAllTrayek(state, { allTrayek }){
        state.allTrayek = allTrayek;
    },
    setTrayekByid(state, {id, kode_trayek, titik_awal, titik_akhir}){
        state.id = id;
        state.kode_trayek = kode_trayek;
        state.titik_awal = titik_awal;
        state.titik_akhir = titik_akhir;
    },
}