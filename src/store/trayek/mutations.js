export default {
    addNewTrayek(state, { trayek }){
        state.allTrayek = trayek;
    },
    setTrayekData(state, {id, kode_trayek, titik_awal, titik_akhir}){
        state.id = id;
        state.kode_trayek = kode_trayek;
        state.titik_awal = titik_awal;
        state.titik_akhir = titik_akhir;
    },
    deleteTrayekById(state, {id}){
        state.allTrayek.forEach((element, index) => {
            if (element.id == id) {
                state.allTrayek.splice(index, 1);
            }
        });
    }
}