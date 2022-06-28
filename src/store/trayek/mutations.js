export default {
    addAllTrayek(state, { allTrayek }){
        state.allTrayek = allTrayek;
    },
    setTrayekByid(state, {id, kode_trayek, titik_awal, titik_akhir, lat_titik_awal, long_titik_awal, lat_titik_akhir, long_titik_akhir}){
        state.id = id;
        state.kode_trayek = kode_trayek;
        state.titik_awal = titik_awal;
        state.titik_akhir = titik_akhir;
        state.lat_titik_awal = lat_titik_awal;
        state.long_titik_awal = long_titik_awal;
        state.lat_titik_akhir = lat_titik_akhir;
        state.long_titik_akhir = long_titik_akhir;
    },
}